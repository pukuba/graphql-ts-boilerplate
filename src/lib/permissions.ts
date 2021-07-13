import { rule, shield, not, and } from "graphql-shield"
import { ApolloError } from "apollo-server-express"
import { Db } from "mongodb"

const isValid = rule()(async (parent: void, args: void, { db }: { db: Db }) => {
    return true
})

export const permissions = shield({
    Mutation: {

    },
    Query: {

    }
})