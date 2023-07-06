'use client'
import { useEffect } from 'react'
import styles from './page.module.css';
import { parseCookies } from 'nookies'
import { userLogout } from '@/utils/api/user/logout';
import { Preloader } from '@/components/UI/preloader/Preloader';

function Logout() {
	const cookies = parseCookies();
	const session = cookies['cloud_session'];

	useEffect(() => {
		async function go_logout() {
			if (session === undefined) {
				window.location.href = "/";
				return;
			}

			await userLogout(session);
			window.location.href = "/";

			/*router.refresh();*/
			//router.push('/');
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