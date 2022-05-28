import { Resolvers } from "~/shared/__generated__"

export const User: Resolvers["User"] = {
	externalId: (parent) => {
		return parent.id
	},
}
