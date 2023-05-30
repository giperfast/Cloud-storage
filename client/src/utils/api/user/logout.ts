import { destroyCookie } from 'nookies'

export const userLogout = async (session: string) => {

	const form = new URLSearchParams();
	form.append('session', session);
	
	const user = await fetch('http://localhost:4000/user/logout', {
        method: "POST",
		body: form,
       	//cache: 'no-store'
    });

	destroyCookie(null, 'cloud_session')

	return true;
}