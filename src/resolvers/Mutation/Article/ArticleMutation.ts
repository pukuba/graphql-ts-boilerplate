import { Resolvers } from "~/shared/__generated__"

export const ArticleMutation: Resolvers["Mutation"] = {
	createArticle: async (parent, args, context) => {
		const { userId, content, title } = args.input
		const article = await context.repositories.article.create({
			userId,
			content,
			title,
		})
		return article
			? { __typename: "Article", ...article }
			: { __typename: "Error", message: "Article error" }
	},

	deleteArticle: async (parent, args, context) => {
		const { id } = args.input
		const article = await context.repositories.article.delete(id)
		return article
			? { __typename: "Article", ...article }
			: { __typename: "Error", message: "Article error" }
	},
}
