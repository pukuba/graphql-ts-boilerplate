import { ReadStream } from "fs"
import { Request } from "express"
import { redis } from "~/config"
import { JwtPayload } from "jsonwebtoken"

export interface FileInput {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => ReadStream
}

import { Db } from "mongodb"
import { User } from "~/shared"

export interface Context {
	db: Db
	redis: typeof redis
	req: Request
	user?: User & Required<JwtPayload>
	token?: string
}
