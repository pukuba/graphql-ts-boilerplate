/* istanbul ignore file */
import { getConstant } from ".."
import { Service } from "typedi"
import { MongoClient, Db } from "mongodb"

@Service("MongoDB")
export class MongoDB {
	private db?: Db
	private uri: string
	constructor() {
		this.uri = getConstant("MONGO_HOST")
	}

	private async connect() {
		console.log("getting new db connection")
		const client = await MongoClient.connect(this.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		return client.db()
	}

	async get(): Promise<Db> {
		if (!this.db) {
			this.db = await this.connect()
		}
		return this.db
	}
}
