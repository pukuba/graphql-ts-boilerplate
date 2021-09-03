import { UserInputError } from "apollo-server-express"
import { GraphQLScalarType, Kind } from "graphql"

const isValidContent = (value: string) => {
    if (value.length <= 5e3) return value
    throw new UserInputError("content length must be lower than 5e3")
}

const GraphQLContent = new GraphQLScalarType({
    name: "Content",
    description: "String of less than 5e3 in length",
    parseValue: isValidContent,
    serialize: isValidContent,
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return isValidContent(ast.value)
        }
        return new UserInputError("Content must be string")
    }
})

export const customScalar = {
    Content: GraphQLContent
}