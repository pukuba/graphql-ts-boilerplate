import dotenv from "dotenv"
dotenv.config()

import { env, mongoDB, redis } from "config"
import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer } from "apollo-server-express"
import * as http from "http"
import depthLimit from "graphql-depth-limit"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLUpload } from "graphql-upload"
import { typeDefs as ScalarNameTypeDefinition, resolvers as scalarResolvers } from "graphql-scalars"
import { constraintDirective, constraintDirectiveTypeDefs } from "graphql-constraint-directive"
import { BaseRedisCache } from "apollo-server-cache-redis"
import Redis from "ioredis"
import { createComplexityLimitRule } from "graphql-validation-complexity"

import { directives } from "shared"
import { loadFilesSync } from "@graphql-tools/load-files"
const typeDefs = loadFilesSync("src/**/*.graphql")

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { bodyParserGraphQL } from "body-parser-graphql"

import resolvers from "resolvers"

const app = express()
app.use(bodyParserGraphQL())
app.disable("x-powered-by")
if (env.NODE_ENV !== "production") {
	app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
	app.use("/graphql", expressPlayground({ endpoint: "/api" }))
}

const schema = constraintDirective()(
	makeExecutableSchema({
		typeDefs: [...typeDefs, ...ScalarNameTypeDefinition, constraintDirectiveTypeDefs],
		resolvers: {
			...resolvers,
			...scalarResolvers,
			Upload: GraphQLUpload,
		},
	})
)

export default (async () => {
	const db = await mongoDB.get()
	const server = new ApolloServer({
		schema: Object.values(directives).reduce((schema, fn) => fn(schema), schema),
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
