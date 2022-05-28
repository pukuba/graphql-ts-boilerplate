import { Resolvers } from "~/shared/__generated__"

export const Article: Resolvers["Article"] = {
	externalId: (parent) => {
		return parent.id
	},
}
