import {
	NodeResolveType,
	Resolvers,
	ResolversTypes,
} from "~/shared/__generated__"
import { fromGlobalId } from "graphql-relay"
import { match } from "ts-pattern"

type NodeResolve = ResolversTypes[NodeResolveType]

export const NodeQueries: Resolvers["Query"] = {
	node: async (parent, args, context): Promise<NodeResolve | null> => {
		const { type, id } = fromGlobalId(args.id) as {
			id: string
			type: NodeResolveType
		}
		const node = await match(type)
			.with("User", async () => {
				return context.repositories.user.find(id)
			})
			.otherwise(() => null)
		if (!node) return null
		return node
	},
}
