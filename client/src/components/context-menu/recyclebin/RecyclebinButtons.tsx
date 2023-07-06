'use client'
import { useEffect, memo, useCallback, useState } from 'react';
import styles from '../ContextMenu.module.css';
import { UploadButton } from '@/components/buttons/upload-button/UploadButton';
import { selectFiles } from '@/redux/slices/files';
import { useAppSelector } from '@/redux/hooks';
import { DeleteButton } from '@/components/buttons/delete-button/DeleteButton';
import { RestoreButton } from '@/components/buttons/restore-button/RestoreButton';

function FileButtons() {
    const contextFile = useAppSelector(selectFiles);

    return (
        <>
            <RestoreButton files={contextFile}>
                <button className={styles.button}>Restore</button>
            </RestoreButton>
            <DeleteButton files={contextFile}>
                <button className={styles.button}>Delete</button>
            </DeleteButton>
        </>
    )
}

function ContainerButtons() {
    return (
        <>
            <UploadButton isActive={true}>
                <button className={styles.button}>Clear</button>
            </UploadButton>
            <button className={styles.button}>Restore all</button>
        </>
    )
}

const RecyclebinButtons = memo(() => {

    const [active, setActive] = useState(false);
    const [type, setType] = useState('');

    const getButtonsFromType = (type: string) => {
        switch (type) {
            case 'file':
                return <FileButtons/>;
            default:
                return <ContainerButtons/>;
        }
    }

    const contextMenuHandler = useCallback((e) => {
        const target = e.target;

        if (target.closest('#modal')) {
            return false;
        }

        if (target.closest('.fileWrapper')) {
            e.preventDefault();
            setType('file')
            setActive(true);
            return true
        }

        if (target.closest('#files')) {
            e.preventDefault();
            setType('container')
            setActive(true);
            return true
        }

        setActive(false);
    }, [])

    useEffect(() => {
        window.addEventListener('contextmenu', contextMenuHandler);
        return () => {
            window.removeEventListener('contextmenu', contextMenuHandler);
        }
    }, [])

    if (active === false) {
        return <></>
    }

    return <>{getButtonsFromType(type)}</>
})

export { RecyclebinButtons };