import { createHashedPassword } from "~/shared"
import { Resolvers } from "~/shared/__generated__"

export const UserMutation: Resolvers["Mutation"] = {
	createUser: async (parent, args, context) => {
		const { id, password } = args.input
		const hashedPassword = createHashedPassword(password)
		const user = await context.repositories.user.create(id, hashedPassword)
		return user
			? { __typename: "User", ...user }
			: { __typename: "Error", message: "User already exists" }
	},

	deleteUser: async (parent, args, context) => {
		const { id } = args.input
		const user = await context.repositories.user.delete(id)
		return user
			? { __typename: "User", ...user }
			: { __typename: "Error", message: "User not found" }
	},
}
