import "reflect-metadata"
import "~/shared/common/lib/dotenv"

import { ApolloServer } from "apollo-server-express"
import { bodyParserGraphQL } from "body-parser-graphql"
import express from "express"
import depthLimit from "graphql-depth-limit"
import expressPlayground from "graphql-playground-middleware-express"
import { createComplexityLimitRule } from "graphql-validation-complexity"
import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import * as http from "http"
import { createContextFactory } from "~/graphql/context"
import resolvers from "~/resolvers"
import typeDefs from "~/shared/__generated__/typeDefs"

import { makeExecutableSchema } from "@graphql-tools/schema"

const app = express()
app.use(bodyParserGraphQL())
app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
app.use("/graphql", expressPlayground({ endpoint: "/api" }))
app.disable("x-powered-by")
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	inheritResolversFromInterfaces: true,
})

export default (async () => {
	const server = new ApolloServer({
		schema: schema,
		context: createContextFactory(),
		validationRules: [depthLimit(8), createComplexityLimitRule(1000)],
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
