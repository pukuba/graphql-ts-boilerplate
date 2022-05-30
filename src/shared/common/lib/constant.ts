import { z } from "zod"

const EnvSchema = z.object({
	MONGO_HOST: z.string(),
	PORT: z.string(),
	JWT_SECRET: z.string(),
})

const constant = EnvSchema.parse(process.env)

export const getConstant = <T extends keyof typeof constant>(
	key: T,
): typeof constant[T] => {
	return constant[key]
}
