import assert from "assert"
import fetch from "node-fetch"

const endpoint = "http://localhost:3000/api"
describe(`Server Init Test`, () => {

    it(`Server Running Test-1`, async () => {
        const query = `
            query{
                test
            }
        `
        const res = await fetch(`${endpoint}?query=${query}`, {
            method: "GET"
        })
        const { data } = await res.json()
        assert.strictEqual(data.test, "Server On")
    })
    it(`Server Running Test-2`, async () => {
        const query = `
            query{
                test1
            }
        `
        const res = await fetch(`${endpoint}?query=${query}`, {
            method: "GET"
        })
        const data = await res.json()
        assert.strictEqual(data.errors[0].message, 'Cannot query field "test1" on type "Query". Did you mean "test"?')
    })
})