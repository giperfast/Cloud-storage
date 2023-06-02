'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/utils/api/user/login';

function Login() {
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username: string = e.target.querySelector("#username").value;
		const password: string = e.target.querySelector("#password").value;

		const logined: boolean = await userLogin({username, password});
		console.log(logined);
		if (logined.result === true) {
			router.refresh();
			router.push('/cloud');
		}

		setError(logined.message)
	}

  	return (
		<>
			<div className={styles.content}>
				<div className={styles.container}>
					<p className={styles.title}>Login</p>
					<form onSubmit={handleSubmit} className={styles.form}>

						<label htmlFor="username" className={styles.label}>Username</label>
						<input type="text" id="username" name="username" autoComplete="username" className={styles.input}/>

						<label htmlFor="password" className={styles.label}>Password</label>
						<input type="password" id="password" name="password" autoComplete="current-password" className={styles.input}/>

						{
							error ? <div className={styles.error}>{error}</div> : ''
						}
						<button type="submit" className={styles.button}>LOGIN</button>
					</form>
				</div>
			</div>
		</>
  	)
}

export default Login;