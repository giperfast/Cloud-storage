'use client'
import { useEffect } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation';
import { userLogout } from '@/utils/api/user/logout';

function Logout() {
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
			router.refresh();
			router.push('/');
			await userLogout(session);
		}
		go_logout();
	})

  	return <></>;
}

export default Logout;