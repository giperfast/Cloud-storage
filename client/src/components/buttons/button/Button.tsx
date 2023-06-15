'use client'
import Link from 'next/link';
import styles from './Button.module.css';
import { Icon } from '@/components/icon/Icon';
import { createRef } from "react";
import { uploadFiles } from '@/utils/api/files/upload';

import { useRouter } from 'next/navigation';


/*export interface ISidebarUploadFileButtonProps {
    title: string,
    icon: string,
}*/


function Button({title, icon, theme = 'transparent'}) {


    return (
        <>
            <button className={styles.button + ' ' + styles[theme]}>
                <span className={styles.icon}><Icon name={icon}/></span>
                {title}
            </button >
        </>
    )
}

export { Button };