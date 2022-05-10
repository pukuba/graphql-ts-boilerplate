import { Resolvers } from "~/shared/__generated__/types"

export const Query: Resolvers["Query"] = {
	ping: () => true,
	live: () => Date(),
}
