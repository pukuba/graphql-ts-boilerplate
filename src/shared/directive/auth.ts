import { GraphQLSchema, defaultFieldResolver } from "graphql"
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"

import { jwt } from "~/shared"

export const authDirectiveTransformer = (schema: GraphQLSchema) => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const authDirective = getDirective(
				schema,
				fieldConfig,
				"isAuthenticated",
			)?.[0]

			if (authDirective) {
				/* istanbul ignore next */
				const { resolve = defaultFieldResolver } = fieldConfig
				fieldConfig.resolve = async function (...args) {
					const [_parent, _input, context, info] = args
					const { redis } = context
					const token = context.req.headers.authorization?.split("Bearer ")[1]
					const user = jwt.decode(token)
					const authorizationError = {
						__typename: "AuthorizationError",
						path: info.fieldName,
						message: "You must be logged in to access this resource",
					}
					if (user === null) {
						return authorizationError
					} else if ((await redis.get(`blacklist:${token}`)) !== null) {
						return authorizationError
					}
					args[2].user = user
					args[2].token = token
					return resolve.apply(this, args)
				}
				return fieldConfig
			}
		},
	})
}
