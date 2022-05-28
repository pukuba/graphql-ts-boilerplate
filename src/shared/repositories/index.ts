import "./mongodb"
import { UserRepository } from "./User"
import { ArticleRepository } from "./Article"

export const repositories = {
	user: new UserRepository(),
	article: new ArticleRepository(),
}
