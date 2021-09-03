import dotenv from "dotenv"
dotenv.config()
import env from "config/env"

import { express as voyagerMiddleware } from "graphql-voyager/middleware"
import { ApolloServer, GraphQLUpload } from "apollo-server-express"
import { readFileSync } from "fs"
import { createServer } from "http"
import depthLimit from "graphql-depth-limit"
import DB from "config/connectDB"
import { permissions } from "lib"
import { makeExecutableSchema } from "@graphql-tools/schema"
import * as graphqlScalars from 'graphql-scalars'
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
app.use("/api-docs", express.static("docs"))

const schema = makeExecutableSchema({
    typeDefs: `
        scalar Upload   
        ${graphqlScalars.typeDefs.join('\n')}
        ${typeDefs}
    `,
    resolvers: {
        ...resolvers,
        Upload: GraphQLUpload as import("graphql").GraphQLScalarType,
        ...graphqlScalars.resolvers
    }
})

const start = async () => {
    const db = await DB.get()
    const server = new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        context: () => {
            return { db }
        },
        validationRules: [
            depthLimit(8),
        ]
    })

    server.applyMiddleware({
        app,
        path: "/api"
    })

    const httpServer = createServer(app)
    httpServer.timeout = 5000
    httpServer.listen({ port: env.PORT || 3000 }, () => {
        console.log(`GraphQL API Running at http://localhost:${env.PORT || 3000}/api`)
        console.log(`GraphQL Docs Running at http://localhost:${env.PORT || 3000}/api-docs`)
    })
}

start()