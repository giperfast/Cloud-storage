'use server'
import { cookies } from 'next/headers';
import { result, IResult } from '../result/result';

export const userLogout = async (session: string): Promise<IResult> => {

	if (session === undefined) {
		return result(false);
	}

	const form = new URLSearchParams();
	form.append('session', session);
	
	const user = await fetch('http://localhost:4000/user/logout', {
        method: "POST",
		body: form,
       	cache: 'no-store'
    });

	/*cookies().set({
		name: 'cloud_session',
		value: '',
		expires: 0,
		path: '/',
	});*/
	cookies().set('cloud_session', '')

	return result(true);
}