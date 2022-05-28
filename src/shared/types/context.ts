import { Request } from "express"
import { repositories } from "~/shared/repositories"

export interface ApolloContext {
	repositories: typeof repositories
	req: Request
}
