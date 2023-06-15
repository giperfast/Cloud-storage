'use client'
import Link from 'next/link';
import styles from './DownloadButton.module.css';
import { Icon } from '@/components/icon/Icon';
import { downloadFiles } from '@/utils/api/files/download';

function DownloadButton({title, icon, files}) {

    const clickHandle = async () => {
        const blob = await downloadFiles(files);
        const file_url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = file_url;

        if (files.length > 1) {
            link.download = `files.zip`;
        } else {
            link.download = `${files[0]?.name}.${files[0]?.extension}`;
        }

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
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