import { Query } from "~/resolvers/Query"
import { User } from "./User"
import { UserMutation, ArticleMutation } from "~/resolvers/Mutation"
import { Node, NodeQueries } from "./Node"
import { Resolvers } from "~/shared/__generated__"
import { Article } from "./Article"

export default {
	Query: {
		...NodeQueries,
		...Query,
	},
	Mutation: {
		...UserMutation,
		...ArticleMutation,
	},
	User,
	Node,
	Article,
} as Resolvers
