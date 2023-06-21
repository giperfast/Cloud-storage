'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/utils/api/user/register';
import { userLogin } from '@/utils/api/user/login';
import { IResult } from '../../utils/api/result/result';

function Register() {
	const router = useRouter();
	const [error, setError] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const username: string = e.target.querySelector("#username").value;
		const password: string = e.target.querySelector("#password").value;

		const registered: IResult = await userRegister({username, password});

		if (!registered.result) {
			return false;
		}

		const logined: IResult = await userLogin({username, password});

		if (logined) {
			router.refresh();
			router.push('/cloud'); //account
		}
	}

  	return (
		<>
			<div className={styles.content}>
				<div className={styles.container}>
					<p className={styles.title}>Register</p>
					<form onSubmit={handleSubmit} className={styles.form}>

						<label htmlFor="username" className={styles.label}>Username</label>
						<input type="text" id="username" name="username" autoComplete="username" className={styles.input}/>

						<label htmlFor="password" className={styles.label}>Password</label>
						<input type="password" id="password" name="password" autoComplete="current-password" className={styles.input}/>

						{
							error ? <div className={styles.error}>{error}</div> : ''
						}
						<button type="submit" className={styles.button}>REGISTER</button>
					</form>
				</div>
			</div>
		</>
  	)
}

export default Register;