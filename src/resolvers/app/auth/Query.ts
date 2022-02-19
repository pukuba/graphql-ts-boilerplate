import { Context } from "config"

export const isAuthorized = (parent: void, args: void, context: Context) => {
	return context.user
}
