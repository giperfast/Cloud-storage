'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/utils/api/user/register';
import { userLogin } from '@/utils/api/user/login';
import { IResult } from '../../utils/api/result/result';
import { Preloader } from '@/components/UI/preloader/Preloader';

const BUTTON_TITLE = 'REGISTER';

function Register() {
	const router = useRouter();
	const [error, setError] = useState('');
	const [buttonHTML, setButtonHTML] = useState(BUTTON_TITLE);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		setButtonHTML(<Preloader/>);
		const username: string = e.target.querySelector("#username").value;
		const password: string = e.target.querySelector("#password").value;

		const registered: IResult = await userRegister({username, password});

		if (!registered.result) {
			return false;
		}

		const logined: IResult = await userLogin({username, password});

		if (logined) {
			router.refresh();
			router.push('/cloud');
		}

		setButtonHTML(BUTTON_TITLE)
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
						<button type="submit" className={styles.button}>{buttonHTML}</button>
					</form>
				</div>
			</div>
		</>
  	)
}

export default Register;