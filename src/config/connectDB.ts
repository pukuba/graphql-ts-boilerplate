/* istanbul ignore file */

import { env } from "config"
import { MongoClient, Db } from "mongodb"

let db: Db | null = null
const connectDB = () => {
	const connect = async () => {
		try {
			const client = await MongoClient.connect(process.env.DB_HOST || env.DB_HOST, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			const _db = client.db()
			return _db
		} catch (e) {
			console.error(e)
			return null
		}
	}

	const get = async () => {
		if (db !== null) {
			return db
		} else {
			console.log("getting new db connection")
			db = await connect()
			return db
		}
	}

	return { get }
}

export const mongoDB = connectDB()
