import { ReadStream } from "fs"
import { Request } from "express"

export interface FileInput {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => ReadStream
}

import { Db } from "mongodb"
import { User } from "config"

export interface Context {
	db: Db
	req: Request
	user?: User
}
