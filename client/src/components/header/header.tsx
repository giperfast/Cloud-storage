//import 'server-only'
'use server'
import Link from 'next/link';
import styles from './header.module.css';
//import { useAppSelector } from '../../redux/hooks';
//import { selectUser } from '../../redux/slices/user';
import { getUserFromCookie } from '@/utils/api/user/getFromCookie';
import UserCard from './UserCard';

async function Header() {
    const user = await getUserFromCookie();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>CLOUD</div>
                <div className={styles.buttons}>
                    <div className={styles.left_section}>
                        <Link href="/">Home</Link>
                        <Link href="/">Pricing</Link>
                    </div>
                    <div className={styles.right_section}>
                    {
                        user ?
                            <UserCard user={user}/>
                        :
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </> 
                    } 
                    </div>
                </div>
            </div>
        </header>
    )
}

export {Header};