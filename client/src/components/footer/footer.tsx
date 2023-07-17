'use server';
import 'server-only';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Icon } from '@/components/UI/icon/Icon';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.title}>
                    <Icon name="cloud"/>
                    <span>© 2023 CLOUD</span>
                </div>

                <div className={styles.buttons}>
                    <Link href="/">Terms</Link>
                    <Link href="/">Privacy</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Status</Link>
                </div>
            </div>
        </footer>
    );
}

export { Footer };