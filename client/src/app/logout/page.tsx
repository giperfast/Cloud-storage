'use client'
import { useEffect } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation';
import { userLogout } from '@/utils/api/user/logout';

async function Logout() {
	const router = useRouter();

	useEffect(() => {
		async function go_logout() {
			const cookies = parseCookies();
			const session = cookies['cloud_session'];

			if (session === undefined) {
				router.refresh();
				router.push('/');
				return;
			}

			await userLogout(session);
			router.refresh();
			router.push('/');
		}
		go_logout();
	})

  	return <>Logouting</>;
}

export default Logout;