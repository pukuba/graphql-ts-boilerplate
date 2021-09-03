import { File } from "config/types"

export interface FileUploadTestInput {
    input: {
        file: Promise<File>
    }
}