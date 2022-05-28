import { Container } from "typedi"
import { MongoDB } from "../mongodb"
import { UserEntity } from "~/shared/entity"

export class UserRepository {
	private readonly db: MongoDB

	constructor() {
		this.db = Container.get<MongoDB>("MongoDB")
	}

	async create(
		userId: string,
		hashedPassword: string,
	): Promise<UserEntity | null> {
		const db = await this.db.get()
		const userIsUnique = await db.collection("users").findOne({ userId })
		if (userIsUnique) {
			return null
		}
		const user = await (
			await db.collection("users").insertOne({ userId, hashedPassword })
		).ops[0]
		return new UserEntity({ id: user.userId })
	}

	async delete(userId: string): Promise<UserEntity | null> {
		const db = await this.db.get()
		const result = await db.collection("users").findOneAndDelete({ userId })
		return result.value ? new UserEntity({ id: result.value.userId }) : null
	}

	async find(userId: string): Promise<UserEntity | null> {
		const db = await this.db.get()
		const user = await db.collection("users").findOne({ userId })
		return user ? new UserEntity({ id: user.userId }) : null
	}
}
