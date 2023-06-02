export interface result {
    result: boolean,
    message: string
}

export function result(result: boolean, message: string = ''): result {
	return { result, message };
}