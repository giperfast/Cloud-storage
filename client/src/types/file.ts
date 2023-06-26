export interface IFile {
    file_id: string,
    name: string,
    extension: string,
    type: string,
    expires?: number,
    index?: number
}