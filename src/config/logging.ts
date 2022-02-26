/* istanbul ignore file */
import { ApolloServerPluginUsageReporting } from "apollo-server-core"

export const loggingOption = ApolloServerPluginUsageReporting({
	sendVariableValues: { all: true },
	sendHeaders: {
		onlyNames: ["x-forwarded-for", "cf-connecting-ip", "referer", "user-agent", "host", "origin"],
	},
	generateClientInfo: ({ request }) => {
		const headers = request.http && request.http.headers
		return {
			clientName: headers?.get("apollographql-client-name") || "Unknown Client",
			clientVersion: headers?.get("apollographql-client-version") || "Unversioned",
		}
	},
})
