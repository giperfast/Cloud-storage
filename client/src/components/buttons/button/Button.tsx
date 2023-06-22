'use client'
import Link from 'next/link';
import styles from './Button.module.css';
import { Icon } from '@/components/icon/Icon';

function Button({children, href = '', icon = '', theme = ''}) {

    const theme_class = styles[theme] === undefined ? styles.transparent : styles[theme];

    if (href === '') {
        return (
            <>
                <button className={styles.button + ' ' + theme_class}>
                    {
                        icon ? <span className={styles.icon}><Icon name={icon}/></span>
                        : ''
                    }
    
                    {children}
                </button>
            </>
        )
    }

    return (
        <>
            <Link href={href} className={styles.button + ' ' + theme_class}>
                {
                    icon ? <span className={styles.icon}><Icon name={icon}/></span>
                    : ''
                }

                {children}
            </Link>
        </>
    )
}

export { Button };