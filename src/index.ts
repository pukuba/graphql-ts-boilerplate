import app from "~/app"
import { getConstant } from "~/shared/common"
;(async () => {
	const server = await app
	const port = getConstant("PORT")
	server.listen(port, () => {
		console.log(`server running http://localhost:${port}/graphql`)
	})
})()
