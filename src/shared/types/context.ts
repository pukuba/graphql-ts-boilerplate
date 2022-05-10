import { Request } from "express"
import { redis } from "~/config"
import { Db } from "mongodb"

export interface ApolloContext {
	db: Db
	redis: typeof redis
	req: Request
	token?: string
}
