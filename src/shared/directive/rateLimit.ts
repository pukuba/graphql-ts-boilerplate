import { GraphQLSchema, defaultFieldResolver } from "graphql"
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"

import { redis } from "config"

export const rateLimitDirectiveTransformer = (schema: GraphQLSchema) => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: fieldConfig => {
			const rateLimit = getDirective(schema, fieldConfig, "rateLimit")?.[0]
			if (rateLimit) {
				const { key, limit, time } = rateLimit.args
				/* istanbul ignore next */
				const { resolve = defaultFieldResolver } = fieldConfig
				fieldConfig.resolve = async function (...args) {
					const [parent, input, context, info] = args
					const ip = context.req.headers["x-forwarded-for"]
					const redisKey = `rateLimit-${key}:${ip}`
					const [requestCount, ttl = time] = await Promise.all([redis.get(redisKey), redis.ttl(redisKey)])
					if (parseInt(requestCount || "0", 10) >= limit) {
						return {
							__typename: "RateLimitError",
							message: `You have reached the rate limit of ${limit} requests per ${time} seconds`,
							path: info.fieldName,
							ttl,
						}
					}
					const newRequestCount = String(parseInt(requestCount || "0", 10) + 1)
					await redis.setex(redisKey, ttl, newRequestCount)

					return resolve.apply(this, args)
				}
				return fieldConfig
			}
		},
	})
}
