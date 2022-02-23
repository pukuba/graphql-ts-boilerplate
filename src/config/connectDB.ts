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
			await Promise.all([_db.collection("user").createIndex({ email: 1 }, { unique: true })])
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

import Redis from "ioredis"

const redisClient = new Redis({ host: env.REDIS_HOST })

export const redis = {
	get: redisClient.get,
	setex: redisClient.setex,
	del: redisClient.del,
	ttl: redisClient.ttl,
	incr: redisClient.incr,
}
