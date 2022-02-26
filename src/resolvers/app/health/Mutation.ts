import { MutationHealthCheckArgs } from "shared/types"

export const healthCheck = (parent: void, args: MutationHealthCheckArgs) => {
	return args.input.data === "ping" ? "pong" : null
}
