import { Resolvers } from "~/shared/__generated__"
import { globalIdResolver, getTypeName } from "~/shared/common/graphql/relay"

export const Node: Resolvers["Node"] = {
	__resolveType: (parent) => {
		return getTypeName(parent)
	},

	id: (parent, args, context, info) => {
		return globalIdResolver(parent.id, info.parentType.name)
	},
}
