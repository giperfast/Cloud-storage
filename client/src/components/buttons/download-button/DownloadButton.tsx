'use client'
import Link from 'next/link';
import styles from './DownloadButton.module.css';
import { Icon } from '@/components/icon/Icon';
//import { downloadFiles } from '@/utils/api/files/download';

import { downloadFile } from '@/redux/slices/downloadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';


function DownloadButton({title, icon, files}) {
    const dispatch = useAppDispatch();

    const clickHandle = async () => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            dispatch(downloadFile(file));
        }
    }

    return (
        <>
            <button onClick={clickHandle} className={styles.button + ' ' + styles.upload}>
                <span className={styles.icon}><Icon name={icon}/></span>
                {title}
            </button >
        </>
    )
}

export { DownloadButton };