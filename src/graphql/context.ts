import { ContextFunction } from "apollo-server-core"
import { ExpressContext } from "apollo-server-express"
import { memoize } from "lodash"
import { ApolloContext } from "~/shared"
import { decodeJWT } from "~/shared/common/lib/jwt"
import { UserEntity } from "~/shared/entity"
import { repositories } from "~/shared/repositories"

export const createContextFactory = (): ContextFunction<
	ExpressContext,
	any
> => {
	return async ({ req }): Promise<ApolloContext> => {
		return {
			repositories: repositories,
			req: req,
			viewer: memoize(async () => {
				const authToken = req.headers.authorization
				if (!authToken) return null
				const userObject = decodeJWT(authToken)
				return userObject
					? { ...new UserEntity({ id: userObject.id }), authToken }
					: null
			}),
		}
	}
}
