'use client'
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/utils/api/user/login';

function Login() {
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = e.target.querySelector("#username").value;
		const password = e.target.querySelector("#password").value;

		const logined = await userLogin({username, password});

		if (logined) {
			router.refresh();
			router.push('/cloud');
		}
	}

  	return (
		<>
			<div className={styles.content}>
				<div className={styles.container}>
					<p className={styles.title}>Login</p>
					<form onSubmit={handleSubmit}>
						<input type="text" id="username" name="username" autoComplete="username"/>
						<input type="password" id="password" name="password" autoComplete="current-password"/>
						<button type="submit">LOGIN</button>
					</form>
				</div>
			</div>
		</>
  	)
}

export default Login;