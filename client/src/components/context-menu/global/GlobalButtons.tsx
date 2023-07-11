'use client';
import { useEffect, memo, useCallback, useState } from 'react';
import styles from '../ContextMenu.module.css';
import { UploadButton } from '@/components/buttons/upload-button/UploadButton';
import { DeleteButton } from '@/components/buttons/delete-button/DeleteButton';
import { DownloadButton } from '@/components/buttons/download-button/DownloadButton';
import { CreateFolderButton } from '@/components/buttons/create-folder-button/CreateFolderButton';

function FileButtons() {
    return (
        <>
            <DownloadButton>
                <button className={styles.button}>Download</button>
            </DownloadButton>
            <button className={styles.button}>Share</button>
            <button className={styles.button}>Rename</button>
            <DeleteButton>
                <button className={styles.button}>Delete</button>
            </DeleteButton>
            <button className={styles.button}>About</button>
        </>
    );
}

function ContainerButtons() {
    return (
        <>
            <UploadButton isActive={true}>
                <button className={styles.button}>Upload</button>
            </UploadButton>
            <CreateFolderButton>
                <button className={styles.button}>Create folder</button>
            </CreateFolderButton>
        </>
    );
}

const GlobalButtons = () => {

    const [active, setActive] = useState(false);
    const [type, setType] = useState('');

    const getButtonsFromType = (type: string) => {
        switch (type) {
            case 'file':
                return <FileButtons/>;
            default:
                return <ContainerButtons/>;
        }
    };

    const contextMenuHandler = useCallback((e: any) => {
        const target = e.target;

        if (target.closest('#modal')) {
            return false;
        }

        if (target.closest('.file-wrapper')) {
            e.preventDefault();
            setType('file');
            setActive(true);
            return true;
        }

        if (target.closest('#files')) {
            e.preventDefault();
            setType('container');
            setActive(true);
            return true;
        }

        setActive(false);
    }, []);

    useEffect(() => {
        window.addEventListener('contextmenu', contextMenuHandler);
        return () => {
            window.removeEventListener('contextmenu', contextMenuHandler);
        };
    }, []);

    if (active === false) {
        return <></>;
    }

    return <>{getButtonsFromType(type)}</>;
}

export { GlobalButtons };