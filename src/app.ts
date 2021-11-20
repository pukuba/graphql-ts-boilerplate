import dotenv from "dotenv"
dotenv.config()

import { env, mongoDB } from "config"
import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer } from "apollo-server-express"
import { createServer } from "http"
import depthLimit from "graphql-depth-limit"
import { permissions } from "lib"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLUpload } from "graphql-upload"
import * as graphqlScalars from "graphql-scalars"
import { applyMiddleware } from "graphql-middleware"

import { loadFilesSync } from "@graphql-tools/load-files"
const typeDefs = loadFilesSync("src/**/*.graphql")

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { bodyParserGraphQL } from "body-parser-graphql"

import resolvers from "resolvers"

const app = express()
app.use(bodyParserGraphQL())
app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
app.use("/graphql", expressPlayground({ endpoint: "/api" }))

const schema = makeExecutableSchema({
    typeDefs: `
        ${graphqlScalars.typeDefs.join("\n")}
        ${typeDefs}
    `,
    resolvers: {
        ...resolvers,
        ...graphqlScalars.resolvers,
        Upload: GraphQLUpload,
    },
})

export default (async () => {
    const db = await mongoDB.get()
    const server = new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        context: () => {
            return { db }
        },
        validationRules: [depthLimit(8)],
        debug: env.NODE_ENV !== "production",
        introspection: env.NODE_ENV !== "production",
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: "/api",
    })

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    return httpServer
})()
