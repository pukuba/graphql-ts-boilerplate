import { InputTest } from "resolvers/app/health/models"
export const testMutation = (parent: void, args: InputTest) => {
	return args.input
}
