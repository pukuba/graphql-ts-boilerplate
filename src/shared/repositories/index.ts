import "./mongodb"
import { UserRepository } from "./User"

export const repositories = {
	user: new UserRepository(),
}
