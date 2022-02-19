import { ReadStream } from "fs"

export interface FileInput {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => ReadStream
}

import { Db } from "mongodb"

export interface Context {
	db: Db
}
