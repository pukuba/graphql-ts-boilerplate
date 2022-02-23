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

import { createClient } from "redis"

const redisClient = createClient(`redis://${env.REDIS_HOST}`)
import { promisify } from "util"
export const redis = {
	get: promisify(redisClient.get).bind(redisClient),
	setex: promisify(redisClient.setex).bind(redisClient),
	del: promisify(redisClient.del).bind(redisClient),
	ttl: promisify(redisClient.ttl).bind(redisClient),
	incr: promisify(redisClient.incr).bind(redisClient),
}
