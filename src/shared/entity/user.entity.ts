interface IUserEntity {
	id: string
}

export class UserEntity implements IUserEntity {
	public readonly id: string
	public readonly $typename = "User"
	constructor(obj: IUserEntity) {
		this.id = obj.id
	}
}
