import { deepStrictEqual as deepEqual } from "assert"
import request from "supertest"
import appPromise from "app"

describe(`Server running test`, () => {
    let app: any
    before(async () => {
        app = await appPromise
    })
    it(`Should be return http status code 200`, async () => {
        const query = `{testQuery(input:1)}`
        await request(app).get(`/api?query=${query}`).expect(200)
    })
    it(`Should be return http status code 400`, async () => {
        const query = `query{testQuery1(input:1)}`
        const { body } = await request(app).get(`/api?query=${query}`).expect(400)
        deepEqual(body.errors[0].message, 'Cannot query field "testQuery1" on type "Query". Did you mean "testQuery"?')
    })
})
