import { Context, MutationRegisterArgs } from "config"
import { jwt } from "shared"

export const register = (parent: void, args: MutationRegisterArgs) => {
	const { email } = args.input
	return jwt.encode({ email }, "user")
}
