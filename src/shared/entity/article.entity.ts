interface IArticleEntity {
	id: string
	userId: string
	title: string
	content: string
}

export class ArticleEntity implements IArticleEntity {
	public readonly id: string
	public readonly userId: string
	public readonly title: string
	public readonly content: string
	public readonly $typename = "Article"
	constructor(obj: IArticleEntity) {
		this.id = obj.id
		this.userId = obj.userId
		this.title = obj.title
		this.content = obj.content
	}
}
