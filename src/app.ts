import dotenv from "dotenv"
dotenv.config()

import { env, mongoDB, redis, loggingOption } from "~/config"
import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer } from "apollo-server-express"
import * as http from "http"
import depthLimit from "graphql-depth-limit"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { BaseRedisCache } from "apollo-server-cache-redis"
import Redis from "ioredis"
import { createComplexityLimitRule } from "graphql-validation-complexity"

import { directives } from "~/shared"
import typeDefs from "~/shared/__generated__/typeDefs"

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { bodyParserGraphQL } from "body-parser-graphql"

import resolvers from "~/resolvers"

const app = express()
app.use(bodyParserGraphQL())
app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
app.use("/graphql", expressPlayground({ endpoint: "/api" }))
app.disable("x-powered-by")
const schema = makeExecutableSchema({
	typeDefs: `${typeDefs}`,
	resolvers,
})

const plugins = []
/* istanbul ignore next */
env.NODE_ENV === "production" && plugins.push(loggingOption)

export default (async () => {
	const db = await mongoDB.get()
	const server = new ApolloServer({
		schema: Object.values(directives).reduce(
			(schema, fn) => fn(schema),
			schema,
		),
		context: ({ req }) => {
			return { db, req, redis }
		},
		validationRules: [depthLimit(8), createComplexityLimitRule(1000)],
		debug: env.NODE_ENV !== "production",
		introspection: env.NODE_ENV !== "production",
		persistedQueries: {
			cache: new BaseRedisCache({
				client: new Redis({
					host: env.REDIS_HOST,
				}),
			}),
		},
		plugins: plugins,
	})

	await server.start()

	server.applyMiddleware({
		app,
		path: "/api",
	})

	const httpServer = http.createServer(app)
	httpServer.timeout = 5000
	return httpServer as http.Server
})()
