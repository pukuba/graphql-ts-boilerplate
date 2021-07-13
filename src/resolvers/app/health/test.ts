import assert from "assert"
import request from "supertest"
import app from "test"

const fileUpload = (query: string, variables: { [x: string]: string }) => {
    const map = Object.assign({}, Object.keys(variables).map(key => [`variables.${key}`]))
    const response = request(app)
        .post("/api")
        .set("Content-Type", "multipart/form-data")
        .field("operations", JSON.stringify({ query }))
        .field("map", JSON.stringify(map))

    Object.values(variables).forEach((value, i) => {
        response.attach(`${i}`, value)
    })
    return response
}


describe(`Server Init Test`, () => {

    it(`Server Running Test-1`, async () => {
        const query = `
            query{
                test
            }
        `
        await request(app)
            .get(`/api?query=${query}`)
            .expect(200)
    })
    it(`Server Running Test-2`, async () => {
        const query = `
            query{
                test1
            }
        `
        const { body } = await request(app)
            .get(`/api?query=${query}`)
            .expect(400)
        assert.strictEqual(body.errors[0].message, 'Cannot query field "test1" on type "Query". Did you mean "test"?')
    })

    it(`Server Running Test-3`, async () => {
        const { body } = await fileUpload(`
            mutation($file: Upload!){
                fileUploadTest(file: $file)
            }
        `, { file: 'src/test/test.jpeg' })
        assert.strictEqual(body.data.fileUploadTest, true)
    })
})