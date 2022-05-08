import { Query as health } from "~/resolvers/app/health"
import { Query as auth } from "~/resolvers/app/auth"

export default {
	...health,
	...auth,
}
