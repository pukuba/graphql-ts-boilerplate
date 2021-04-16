import { uploadStream, isValidImage } from "lib"
import { File } from "config/types"
import { Db } from "mongodb"
import { join } from "path"
import { ApolloError } from "apollo-server-express"

const path = join(__dirname, "../../../file")
export const imgUpload = async (
    parent: void, {
        file
    }: {
        file: File
    }, {
        db
    }: {
        db: Db
    }) => {
    const img = await file
    if (false === isValidImage(img.filename)) {
        throw new ApolloError("ile extension is not valid")
    }
    try {
        const stream = img.createReadStream()
        const originalPath = `${path}/${img.filename}`
        const result = await uploadStream(stream, originalPath)
        console.log(result)
        return true
    } catch {
        return false
    }
}