import { Context, MutationRegisterArgs, MutationLoginArgs } from "config"
import { createHashedPassword, checkPassword, jwt } from "shared"

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

export const login = async (parent: void, args: MutationLoginArgs, ctx: Context) => {
	const { email, password } = args.input
	const user = await ctx.db.collection("user").findOne({ email })
	const LoginError = { __typename: "InvalidAccountError", path: "login" }
	if (!user) {
		return {
			...LoginError,
			message: "해당 이메일에 존재하는 계정이 없습니다",
			suggestion: "이메일을 정확하게 입력해주세요",
		}
	}
	if (checkPassword(password, user.password) === false) {
		return {
			...LoginError,
			message: "해당 이메일에 존재하는 계정과 입력하신 비밀번호가 일치하지 않습니다",
			suggestion: "비밀번호를 정확하게 입력해주세요",
		}
	}
	const document = await ctx.db
		.collection("user")
		.findOneAndUpdate({ email }, { $set: { updatedAt: Date.now() } }, { returnDocument: "after" })

	const { updatedAt, createdAt } = document.value
	return {
		__typename: "LoginInfo",
		user: document.value,
		token: jwt.encode({ email, updatedAt, createdAt }, "user"),
	}
}
