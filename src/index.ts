import app from "app"
import { env } from "config"
;(async () => {
    ;(await app).listen(env.PORT, () => {
        console.log(`server running http://localhost:${env.PORT}/graphql`)
    })
})()
