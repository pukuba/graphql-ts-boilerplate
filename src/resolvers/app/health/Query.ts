import { InputTest } from "resolvers/app/health/models"
export const testQuery = (parent: void, args: InputTest) => {
    return args.input
}
