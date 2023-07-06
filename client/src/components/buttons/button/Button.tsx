'use client'
import Link from 'next/link';
import styles from './Button.module.css';
import { Icon } from '@/components/UI/icon/Icon';

function Button({children, href = '', icon = '', theme = '', ...attrs}:{children:string|React.ReactNode, href:string, icon:string, theme:string}) {

    const theme_class = styles[theme] === undefined ? styles.transparent : styles[theme];

    if (href === '') {
        return (
            <>
                <button className={styles.button + ' ' + theme_class} {...attrs}>
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
            <Link href={href} className={styles.button + ' ' + theme_class} {...attrs}>
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