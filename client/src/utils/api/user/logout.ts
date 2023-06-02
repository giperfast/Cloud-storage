import { destroyCookie } from 'nookies'
import { result } from '../result/result';

export const userLogout = async (session: string) => {

	const form = new URLSearchParams();
	form.append('session', session);
	
	const user = await fetch('http://localhost:4000/user/logout', {
        method: "POST",
		body: form,
       	//cache: 'no-store'
    });

	destroyCookie(null, 'cloud_session')

	return result(true);
}