import 'server-only'
import Link from 'next/link';
import styles from './header.module.css';
//import { useAppSelector } from '../../redux/hooks';
//import { selectUser } from '../../redux/slices/user';
import { getUser } from '../../utils/api/user/get';

import UserCard from './user-card';

async function Header() {
    const user = await getUser();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>CLOUD</div>
                <div className={styles.buttons}>
                    <div className={styles.left_section}>
                        <Link href="/">Home</Link>
                        <Link href="/">Pricing</Link>
                        <Link href="/cloud">cloud</Link>
                    </div>
                    <div className={styles.right_section}>
                    {
                        user ?
                            <UserCard user={user}/>
                        :
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/">Register</Link>
                        </> 
                    } 
                    </div>
                </div>
            </div>
        </header>
    )
}

export {Header};