import dotenv from "dotenv"
dotenv.config()

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

import express from "express"
import expressPlayground from "graphql-playground-middleware-express"
import { bodyParserGraphQL } from "body-parser-graphql"

import resolvers from "resolvers"
const typeDefsGraphQL = readFileSync("src/typeDefs.graphql", "utf-8")

const app = express()
app.use(bodyParserGraphQL())
app.use("/voyager", voyagerMiddleware({ endpointUrl: "/api" }))
app.use("/graphql", expressPlayground({ endpoint: "/api" }))
app.use("/api-docs", express.static("docs"))

const schema = makeExecutableSchema({
    typeDefs: `
        ${graphqlScalars.typeDefs.join('\n')}
        ${typeDefsGraphQL}
    `,
    resolvers: {
        ...resolvers,
        Upload: GraphQLUpload as import("graphql").GraphQLScalarType,
        ...graphqlScalars.resolvers
    }
})


const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: async () => {
        const db = await DB.get()
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
export default httpServer