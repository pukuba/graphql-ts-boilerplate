import { GraphQLSchema, defaultFieldResolver } from "graphql"
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"

import { jwt } from "shared"

export const authDirectiveTransformer = (schema: GraphQLSchema) => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: fieldConfig => {
			const authDirective = getDirective(schema, fieldConfig, "isAuthenticated")?.[0]

			if (authDirective) {
				/* istanbul ignore if */
				const { resolve = defaultFieldResolver } = fieldConfig
				fieldConfig.resolve = async function (...args) {
					const [parent, input, context, info] = args
					const user = jwt.decode(context.req.headers.authorization)
					if (user === null) {
						return {
							__typename: "AuthorizationError",
							message: "Unauthorized",
							path: info.fieldName,
						}
					}
					args[2].user = user
					return resolve.apply(this, args)
				}
				return fieldConfig
			}
		},
	})
}