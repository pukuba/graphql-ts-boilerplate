import { genSaltSync, hashSync, compareSync } from "bcryptjs"

export const createHashedPassword = (password: string) => {
	const saltRounds = 10
	const salt = genSaltSync(saltRounds)
	const hashedPassword = hashSync(password, salt)
	return hashedPassword
}

export const checkPassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword)

export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
