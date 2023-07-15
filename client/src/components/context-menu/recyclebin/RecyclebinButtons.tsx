'use client';
import { useEffect, memo, useCallback, useState } from 'react';
import styles from '../ContextMenu.module.css';
import { UploadButton } from '@/components/buttons/upload-button/UploadButton';
import { ForceDeleteButton } from '@/components/buttons/force-delete-button/ForceDeleteButton';
import { RestoreButton } from '@/components/buttons/restore-button/RestoreButton';

function FileButtons() {
    return (
        <>
            <RestoreButton>
                <button className={styles.button}>Restore</button>
            </RestoreButton>
            <ForceDeleteButton>
                <button className={styles.button}>Delete</button>
            </ForceDeleteButton>
        </>
    );
}

function ContainerButtons() {
    return (
        <>
            <UploadButton isActive={true}>
                <button className={styles.button}>Clear</button>
            </UploadButton>
            <button className={styles.button}>Restore all</button>
        </>
    );
}

const RecyclebinButtons = () => {
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

export { RecyclebinButtons };