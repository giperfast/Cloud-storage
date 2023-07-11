'use client';
import styles from './DownloadButton.module.css';
import { downloadFile } from '@/redux/slices/downloadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFiles } from '@/redux/slices/files';

function DownloadButton({children}:{children:React.ReactNode}) {
    const files = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();
    
    const clickHandle = async () => {
        if (!files) {
            return false;
        }
        
        dispatch(downloadFile(files));
    };

    return (
        <span onClick={clickHandle} className={styles.download}>
            {children}
        </span>
    );
}

export { DownloadButton };