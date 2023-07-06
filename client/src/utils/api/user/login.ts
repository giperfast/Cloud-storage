'use server'
//import { setCookie } from 'nookies'
import { cookies } from 'next/headers';
import { result, IResult } from '../result/result';

export interface loginDTO {
	username: string,
	password: string
}

export const userLogin = async (dto: loginDTO): Promise<IResult> => {
	const form = new URLSearchParams();
	form.append('username', dto.username);
	form.append('password', dto.password);

	const response = await fetch('http://localhost:4000/user/login', {
        method: "POST",
		body: form,
    }).catch((error) => {
		console.log(error);
		return result(false, error);
	});

	if (!response) {
		return result(false, 'Internal server error');
	}

	const json = await response.json();

	if (json?.session === undefined) {
		return result(false, json.message);
	}

	const date:any = Date.now() + 2592000000;
	
	cookies().set({
		name: 'cloud_session',
		value: json.session,
		expires: date, // месяц
		path: '/',
	});

	//cookies().set('cloud_session', json.session)

	return result(true);
}