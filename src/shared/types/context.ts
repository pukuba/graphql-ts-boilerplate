import { Request } from "express"
import { redis } from "~/config"
import { JwtPayload } from "jsonwebtoken"
import { Db } from "mongodb"
import { User } from "~/shared/__generated__"

export interface ApolloContext {
	db: Db
	redis: typeof redis
	req: Request
	user?: User & Required<JwtPayload>
	token?: string
}
