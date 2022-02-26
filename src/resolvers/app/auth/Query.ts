import { Context } from "shared/types"

export const isAuthorized = (parent: void, args: void, context: Context) => {
	return { ...context.user, __typename: "User" }
}
