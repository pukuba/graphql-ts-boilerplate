import { Request } from "express"
import { repositories } from "~/shared/repositories"
import { UserEntity } from "../entity"

export interface ApolloContext {
	repositories: typeof repositories
	req: Request
	viewer(): Promise<(UserEntity & { authToken: string }) | null>
}
