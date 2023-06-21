'use client'
import { useEffect } from 'react'
import styles from './page.module.css';
import { parseCookies } from 'nookies'
import { useRouter } from 'next/navigation';
import { userLogout } from '@/utils/api/user/logout';
import { Preloader } from '@/components/preloader/Preloader';

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

			await userLogout(session);
			router.refresh();
			router.push('/');
		}
		go_logout();
	})
	
  	return (
		<div className={styles.content}>
			<div className={styles.container}>
				Logouting
				<Preloader/>
			</div>
		</div>
	);
}

export default Logout;