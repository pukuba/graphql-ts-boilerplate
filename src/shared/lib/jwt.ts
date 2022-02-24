import { verify, sign } from "jsonwebtoken"
import { env } from "config"

type Token = "user" | "emailCert" | "smsCert"

const expireFactory = (type: Token) => {
	const MINUTE = 60 * 1000
	const HOUR = 60 * MINUTE
	const DAY = 24 * HOUR
	switch (type) {
		case "user":
			return { expiresIn: DAY }
		case "smsCert":
			return { expiresIn: MINUTE * 3 }
		case "emailCert":
			return { expiresIn: MINUTE * 15 }
	}
}

const encode = (payload: object, type: Token) => sign(payload, env.JWT_SECRET, expireFactory(type))

const decode = (token: string) => {
	try {
		return verify(token, env.JWT_SECRET)
	} catch (err) {
		console.error(err)
		return null
	}
}

export const jwt = { encode, decode }
