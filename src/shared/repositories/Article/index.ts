import { Container } from "typedi"
import { MongoDB } from "../mongodb"
import { ArticleEntity } from "~/shared/entity"
import { ObjectID } from "mongodb"

export class ArticleRepository {
	private readonly db: MongoDB

	constructor() {
		this.db = Container.get<MongoDB>("MongoDB")
	}

	async create({
		userId,
		title,
		content,
	}: {
		userId: string
		title: string
		content: string
	}): Promise<ArticleEntity | null> {
		const db = await this.db.get()
		const article = await db
			.collection("articles")
			.insertOne({ userId, title, content })
		return new ArticleEntity({ ...article.ops[0], id: article.insertedId })
	}

	async delete(articleId: string): Promise<ArticleEntity | null> {
		const db = await this.db.get()
		const result = await db
			.collection("articles")
			.findOneAndDelete({ articleId })
		return result.value
			? new ArticleEntity({ ...result.value, id: articleId })
			: null
	}

	async find(articleId: string): Promise<ArticleEntity | null> {
		const db = await this.db.get()
		const article = await db
			.collection("articles")
			.findOne({ _id: new ObjectID(articleId) })
		return article ? new ArticleEntity({ ...article, id: article._id }) : null
	}
}
