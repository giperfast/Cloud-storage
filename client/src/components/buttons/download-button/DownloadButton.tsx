'use client'
import Link from 'next/link';
import styles from './DownloadButton.module.css';
import { Icon } from '@/components/icon/Icon';
//import { downloadFiles } from '@/utils/api/files/download';

import { downloadFile } from '@/redux/slices/downloadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';


function DownloadButton({children, files}) {
    const dispatch = useAppDispatch();
    
    const clickHandle = async () => {
        dispatch(downloadFile(files));

       /* for (let i = 0; i < files.length; i++) {
            const file = files[i];
            dispatch(downloadFile(file));
        }*/
    }

    return (
        <>
            <span onClick={clickHandle} className={styles.download}>
                {children}
            </span>
        </>
    )
}

export { DownloadButton };