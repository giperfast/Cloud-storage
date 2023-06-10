'use client'
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/utils/api/user/register';
import { userLogin } from '@/utils/api/user/login';
import { IResult } from '../../utils/api/result/result';

function Register() {
	const router = useRouter();

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
					<form onSubmit={handleSubmit}>
						<input type="text" id="username" name="username" autoComplete="username"/>
						<input type="password" id="password" name="password" autoComplete="current-password"/>
						<button type="submit">REGISTER</button>
					</form>
				</div>
			</div>
		</>
  	)
}

export default Register;