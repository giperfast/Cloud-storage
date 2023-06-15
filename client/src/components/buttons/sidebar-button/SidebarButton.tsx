'use server'
import Link from 'next/link';
import styles from './SidebarButton.module.css';
import { Icon } from '@/components/icon/Icon';
import { createRef } from "react";
import { uploadFiles } from '../../utils/api/files/upload';

import { useRouter } from 'next/navigation';

export interface ISidebarButtonProps {
    active: boolean,
    title: string,
    icon: string,
}


function SidebarButton({active, title, icon}: ISidebarButtonProps) {
    const activeClass = active === true ? styles.active : ''

    return (
        <Link href="/" className={styles.button + ' ' + activeClass}>
            <span className={styles.icon}><Icon name={icon}/></span>
            {title}
        </Link>
    )
}

export { SidebarButton };