import { uploadStream, isValidImage } from "lib"
import { Context } from "config/types"
import { ApolloError } from "apollo-server-express"
import { FileUploadTestInput } from "resolvers/app/health/models"
export const fileUploadTest = async (parent: void, args: FileUploadTestInput, ctx: Context) => {
    const img = await args.input.file
    if (false === isValidImage(img.filename)) {
        throw new ApolloError("file extension is not valid")
    }
    try {
        const stream = img.createReadStream()
        const originalPath = `file/${img.filename}`
        await uploadStream(stream, originalPath)
        return originalPath
    } catch (e) {
        throw new ApolloError(e)
    }
}