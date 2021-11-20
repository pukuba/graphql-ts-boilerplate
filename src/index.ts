import app from "app"
;(async () => {
    ;(await app).listen(3000, () => {
        console.log(`server running http://localhost:3000/graphql`)
    })
})()
