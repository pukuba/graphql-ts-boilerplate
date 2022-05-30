import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

import { getConstant } from "./constant"

export const decodeJWT = (token: string) => {
	const secret = getConstant("JWT_SECRET")
	try {
		return jwt.verify(token, secret) as JwtPayload
	} catch (e) {
		console.error(e)
		return null
	}
}

export const encodeJWT = (
	obj: string | Buffer | object,
	option?: SignOptions,
) => {
	const secret = getConstant("JWT_SECRET")
	return jwt.sign(obj, secret, option)
}
