export interface IResult {
    result: boolean,
    message: string
}

export function result(result: boolean, message: string = ''): IResult {
	return { result, message };
}