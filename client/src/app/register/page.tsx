'use client'
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/utils/api/user/register';
import { userLogin } from '@/utils/api/user/login';

function Register() {
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username: string = e.target.querySelector("#username").value;
		const password: string = e.target.querySelector("#password").value;

		const registered: boolean = await userRegister({username, password});

		if (!registered) {
			return false;
		}

		const logined: boolean = await userLogin({username, password});

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