import { rule, shield, not, and } from "graphql-shield"
import { Context } from "config/types"
import { ApolloError } from "apollo-server-express"
import { Db } from "mongodb"

const isValid = rule()(async (parent: void, args: void, context: Context) => {
    return true
})

export const permissions = shield(
    {
        Mutation: {},
        Query: {},
    },
    { allowExternalErrors: true }
)
