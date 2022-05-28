import { Query } from "~/resolvers/Query"
import { User } from "./User"
import { UserMutation } from "~/resolvers/Mutation"
import { Node, NodeQueries } from "./Node"
import { Resolvers } from "~/shared/__generated__"

export default {
	Query: {
		...NodeQueries,
		...Query,
	},
	Mutation: {
		...UserMutation,
	},
	User,
	Node,
} as Resolvers
