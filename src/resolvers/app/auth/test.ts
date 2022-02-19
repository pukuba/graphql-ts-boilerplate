import { expect } from "chai"
import request from "supertest"
import appPromise from "app"
import { Server } from "http"
import { Scalars, IsAuthorizedPayload, User, AuthorizationError } from "config"

describe("Server auth test", () => {
	let app: Server
	let token: string
	before(async () => {
		app = await appPromise
	})

	describe("Mutation register", () => {
		const query = `
            mutation ($input: RegisterInput!) {
                register(input: $input)
            }
        `
		it("Should return a JWT token", async () => {
			const response = await request(app)
				.post("/api")
				.send({
					query,
					variables: { input: { email: "pukuba@kakao.com", password: "test1234" } },
				})
				.expect(200)
			const data = response.body.data.register as Scalars["JWT"]
			expect(data).to.be.a("string")
			token = data
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
		it("Should return a User", async () => {
			const response = await request(app).post("/api").set("Authorization", token).send({ query }).expect(200)
			const data = response.body.data.isAuthorized as IsAuthorizedPayload as User
			const { email, __typename, ...date } = data
			expect(email).to.be.equal("pukuba@kakao.com")
			expect(date).to.be.a("object").and.to.be.have.keys("updatedAt", "createdAt")
			expect(__typename).to.be.equal("User")
		})

		it("Should return an AuthorizationError", async () => {
			const response = await request(app).post("/api").send({ query }).expect(200)
			const data = response.body.data.isAuthorized as IsAuthorizedPayload as AuthorizationError
			expect(data).to.be.deep.equal({
				message: "Authorization token이 유효하지 않습니다",
				path: "isAuthorized",
				__typename: "AuthorizationError",
			})
		})
	})
})
