'use server'
import { result, IResult } from '../result/result';

export interface registerDTO {
	username: string,
	password: string
}

export const userRegister = async (dto: registerDTO): Promise<IResult> => {

	const form = new URLSearchParams();
	form.append('username', dto.username);
	form.append('password', dto.password);
	
	const response = await fetch('http://localhost:4000/user/create', {
        method: "POST",
		body: form,
    });

	if (!response) {
		return result(false, 'Internal server error')
	}

	return result(true);
}