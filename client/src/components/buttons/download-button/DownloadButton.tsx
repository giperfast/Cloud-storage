'use client'
import styles from './DownloadButton.module.css';
import { downloadFile } from '@/redux/slices/downloadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IFile } from '@/types/file';
import { selectFiles } from '@/redux/slices/files';

function DownloadButton({children}:{children:React.ReactNode}) {
    const contextFile = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();
    
    const clickHandle = async () => {
        dispatch(downloadFile(contextFile));
    }

    return (
        <span onClick={clickHandle} className={styles.download}>
            {children}
        </span>
    )
}

export { DownloadButton };