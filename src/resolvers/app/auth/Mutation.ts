import { Context, MutationRegisterArgs } from "config"
import { createHashedPassword } from "shared"

export const register = async (parent: void, args: MutationRegisterArgs, ctx: Context) => {
	const { email, password } = args.input
	const exists = await ctx.db.collection("user").findOne({ email })
	if (exists) {
		return {
			__typename: "DuplicateEmailError",
			message: "Email already exists",
			path: "register",
			suggestion: "다른 이메일로 시도해주세요",
		}
	}

	const date = Date.now()
	const user = {
		email,
		password: createHashedPassword(password),
		createdAt: date,
		updatedAt: date,
	}
	await ctx.db.collection("user").insertOne(user)
	return {
		__typename: "User",
		...user,
	}
}
