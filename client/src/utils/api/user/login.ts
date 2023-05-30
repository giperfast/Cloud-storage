import { setCookie } from 'nookies'

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
		return false
	}
	console.log(response);
	const session = await response.text();
	console.log(session);
	
	setCookie(null, 'cloud_session', session, {
		maxAge: 7 * 24 * 60 * 60,
		path: '/',
	});

	return true;
}