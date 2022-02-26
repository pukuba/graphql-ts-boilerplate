import { expect } from "chai"
import request from "supertest"
import appPromise from "app"
import { Server } from "http"
import { Db } from "mongodb"
import {
	IsAuthorizedPayload,
	User,
	RegisterPayload,
	AuthorizationError,
	jwt,
	LoginInfo,
	LoginPayload,
	LogoutPayload,
} from "shared"
import { mongoDB } from "config"

describe("Server auth test", () => {
	let app: Server
	let token: string
	before(async () => {
		app = await appPromise
	})

	describe("Mutation register", () => {
		const query = `
            mutation ($input: RegisterInput!) {
                register(input: $input) {
					__typename
					... on User {
						email
					}
					... on Error {
						message
						path
					}
					... on DuplicateEmailError {
						suggestion
					}
				}
            }
        `
		describe("Success", () => {
			it("Should return a User", async () => {
				const response = await request(app)
					.post("/api")
					.send({
						query,
						variables: { input: { email: "pukuba@kakao.com", password: "test1234" } },
					})
					.expect(200)
				const data = response.body.data.register as RegisterPayload as User
				expect(data).to.be.deep.equal({
					__typename: "User",
					email: "pukuba@kakao.com",
				})
			})
		})
		describe("Failure", () => {
			it("Should return a DuplicateEmailError", async () => {
				const response = await request(app)
					.post("/api")
					.send({
						query,
						variables: { input: { email: "pukuba@kakao.com", password: "test1234" } },
					})
					.expect(200)
				const data = response.body.data.register as RegisterPayload as AuthorizationError
				expect(data).to.be.deep.equal({
					__typename: "DuplicateEmailError",
					message: "Email already exists",
					path: "register",
					suggestion: "다른 이메일로 시도해주세요",
				})
			})
		})
	})

	describe("Mutation login", () => {
		const query = `
			mutation ($input: LoginInput!) {
				login(input: $input) {
					__typename
					... on LoginInfo {
						token
						user {
							email
						}
					}
					... on Error {
						message
						path
					}
					... on InvalidAccountError {
						suggestion
					}
				}
			}
		`
		describe("Success", () => {
			it("Should return a LoginInfo", async () => {
				const response = await request(app)
					.post("/api")
					.send({
						query,
						variables: { input: { email: "pukuba@kakao.com", password: "test1234" } },
					})
					.expect(200)
				const data = response.body.data.login as LoginPayload as LoginInfo
				expect(data.__typename).to.be.equal("LoginInfo")
				expect(data.user.email).to.be.equal("pukuba@kakao.com")
				token = data.token
			})
		})
		describe("Failure", () => {
			it("Should return a InvalidAccountError (Invalid email)", async () => {
				const response = await request(app)
					.post("/api")
					.send({
						query,
						variables: { input: { email: "test@ruu.kr", password: "test1234" } },
					})
					.expect(200)
				const data = response.body.data.login as LoginPayload as AuthorizationError
				expect(data).to.be.deep.equal({
					__typename: "InvalidAccountError",
					path: "login",
					message: "해당 이메일에 존재하는 계정이 없습니다",
					suggestion: "이메일을 정확하게 입력해주세요",
				})
			})
			it("Should return a InvalidAccountError (Invalid password)", async () => {
				const response = await request(app)
					.post("/api")
					.send({
						query,
						variables: { input: { email: "pukuba@kakao.com", password: "ts1231" } },
					})
					.expect(200)
				const data = response.body.data.login as LoginPayload as AuthorizationError
				expect(data).to.be.deep.equal({
					__typename: "InvalidAccountError",
					path: "login",
					message: "해당 이메일에 존재하는 계정과 입력하신 비밀번호가 일치하지 않습니다",
					suggestion: "비밀번호를 정확하게 입력해주세요",
				})
			})
			it("Should return a RateLimitError", async () => {
				return new Promise(resolve => {
					const intervalId = setInterval(async () => {
						const { body } = await request(app)
							.post("/api")
							.send({
								query,
								variables: { input: { email: "pukuba@kakao.com", password: "test25" } },
							})
							.expect(200)
						if (body.data.login.__typename === "RateLimitError") {
							clearInterval(intervalId)
							resolve()
						}
					}, 100)
				})
			})
		})
	})

	describe("Mutation logout", () => {
		const query = `
			mutation {
				logout {
					__typename
					... on User {
						email
					}
					... on Error {
						message
						path
					}
				}
			}
		`
		describe("Success", () => {
			it("Should return a User", async () => {
				const response = await request(app)
					.post("/api")
					.set("Authorization", `Bearer ${token}`)
					.send({ query })
					.expect(200)
				const data = response.body.data.logout as LogoutPayload as User
				expect(data).to.be.deep.equal({ __typename: "User", email: "pukuba@kakao.com" })
			})
		})
		describe("Failure", () => {
			it("Should return a AuthorizationError (using blacklist token)", async () => {
				const response = await request(app)
					.post("/api")
					.set("Authorization", `Bearer ${token}`)
					.send({ query })
					.expect(200)
				const data = response.body.data.logout as LogoutPayload as AuthorizationError
				expect(data).to.be.deep.equal({
					__typename: "AuthorizationError",
					path: "logout",
					message: "You must be logged in to access this resource",
				})
			})
		})
	})

	describe("Query isAuthorized", () => {
		const query = `
            query {
                isAuthorized {
                    ... on AuthorizationError {
                        message
                        path
                    }
                    ... on User {
                        email
                        updatedAt
                        createdAt
                    }
                    __typename
                }
            }
        `
		describe("Success", () => {
			it("Should return a User", async () => {
				const tmpToken = jwt.encode(
					{ email: "pukuba@kakao.com", updatedAt: Date.now(), createdAt: Date.now() },
					"user"
				)
				const response = await request(app)
					.post("/api")
					.set("Authorization", `Bearer ${tmpToken}`)
					.send({ query })
					.expect(200)
				const data = response.body.data.isAuthorized as IsAuthorizedPayload as User
				const { email, __typename, ...date } = data
				expect(email).to.be.equal("pukuba@kakao.com")
				expect(date).to.be.a("object").and.to.be.have.keys("updatedAt", "createdAt")
				expect(__typename).to.be.equal("User")
			})
		})

		describe("Failure", () => {
			it("Should return an AuthorizationError", async () => {
				const response = await request(app).post("/api").send({ query }).set("Authorization", token).expect(200)
				const data = response.body.data.isAuthorized as IsAuthorizedPayload as AuthorizationError
				expect(data).to.be.deep.equal({
					message: "You must be logged in to access this resource",
					path: "isAuthorized",
					__typename: "AuthorizationError",
				})
			})
		})
	})

	after(async () => {
		const db = (await mongoDB.get()) as Db
		await db.collection("user").deleteOne({ email: "pukuba@kakao.com" })
	})
})
