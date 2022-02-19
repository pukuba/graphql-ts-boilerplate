import { MutationHealthCheckArgs } from "config"

export const healthCheck = (parent: void, args: MutationHealthCheckArgs) => {
	return args.input.data === "ping" ? "pong" : null
}
