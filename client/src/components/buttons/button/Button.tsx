'use client'
import Link from 'next/link';
import styles from './Button.module.css';
import { Icon } from '@/components/icon/Icon';
import { createRef } from 'react';
import { uploadFiles } from '@/utils/api/files/upload';

import { useRouter } from 'next/navigation';


function Button({children, icon = '', theme = ''}) {

    const theme_class = styles[theme] === undefined ? styles.transparent : styles[theme];

    return (
        <>
            <button className={styles.button + ' ' + theme_class}>
                {
                    icon ? <span className={styles.icon}><Icon name={icon}/></span>
                    : ''
                }

                {children}
            </button >
        </>
    )
}

export { Button };