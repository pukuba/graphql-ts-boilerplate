import { expect } from "chai"
import request from "supertest"
import appPromise from "app"
import { Server } from "http"

describe("Server running test", () => {
	let app: Server
	before(async () => {
		app = await appPromise
	})

	describe("Apollo-Server-Express Core", () => {
		it("should return http status code 200", async () => {
			await request(app).get("/.well-known/apollo/server-health").expect(200, { status: "pass" })
		})
	})

	describe("Query healthLive", () => {
		it("Should be return http status code 200", async () => {
			const query = "{healthLive}"
			const { body } = await request(app).get(`/api?query=${query}`).expect(200)
			expect(body.data.healthLive).to.be.a("string")
		})
		it("Should be return http status code 400", async () => {
			const query = "query{healthLive1}"
			const { body } = await request(app).get(`/api?query=${query}`).expect(400)
			expect(body.errors[0].message).to.be.equal(
				'Cannot query field "healthLive1" on type "Query". Did you mean "healthLive"?'
			)
		})
	})

	describe("Mutation testMutation", () => {
		const query = `
			mutation ($input: HealthCheckInput!){
				healthCheck(input: $input)
			}
		`
		it("Should be return http status code 200", async () => {
			await request(app)
				.post("/api")
				.set("Content-Type", "application/json")
				.send({ query, variables: { input: { data: "ping" } } })
				.expect(200, { data: { healthCheck: "pong" } })
		})
		it("Should be return http status code 400", async () => {
			const { body } = await request(app)
				.post("/api")
				.set("Content-Type", "application/json")
				.send({ query, variables: { input: { data: "pong" } } })
				.expect(400)
			expect(body.errors[0].message).to.be.equal(
				'Variable "$input" got invalid value "pong" at "input.data"; Expected type "HealthCheck". Must match ^ping$'
			)
		})
	})
})
