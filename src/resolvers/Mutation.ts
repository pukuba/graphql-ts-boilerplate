import { Mutation as health } from "resolvers/app/health"
import { Mutation as auth } from "resolvers/app/auth"

export default {
	...health,
	...auth,
}
