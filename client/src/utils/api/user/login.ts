import { setCookie } from 'nookies'
import { result } from '../result/result';

export interface loginDTO {
	username: string,
	password: string
}

export const userLogin = async (dto: loginDTO): boolean => {

	const form = new URLSearchParams();
	form.append('username', dto.username);
	form.append('password', dto.password);

	const response = await fetch('http://localhost:4000/user/login', {
        method: "POST",
		body: form,
    });

	if (!response) {
		return result(false, 'Internal server error');
	}

	const json = await response.json();

	if (json?.session === undefined) {
		return result(false, json.message);
	}
	
	setCookie(null, 'cloud_session', json.session, {
		maxAge: 7 * 24 * 60 * 60,
		path: '/',
	});

	return result(true);
}