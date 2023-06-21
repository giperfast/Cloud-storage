'use client'
import { useEffect, memo, useCallback, useState } from 'react';
import styles from './ContextMenu.module.css';
import { UploadButton } from '../buttons/upload-button/UploadButton';
import { selectFiles } from '@/redux/slices/files';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { DownloadButton } from '../buttons/download-button/DownloadButton';

function FileButtons() {
    const contextFile = useAppSelector(selectFiles);
    console.log(contextFile);
    
    return (
        <>
            <DownloadButton files={contextFile}>
                <button className={styles.button}>Download</button>
            </DownloadButton>
            <button className={styles.button}>Share</button>
            <button className={styles.button}>Rename</button>
            <button className={styles.button}>Delete</button>
            <button className={styles.button}>About</button>
        </>
    )
}

function ContainerButtons() {
    return (
        <>
            <UploadButton isActive={true}>
                <button className={styles.button}>Upload</button>
            </UploadButton>
            <button className={styles.button}>Create folder</button>
        </>
    )
}

const ContextMenu = memo(() => {
    const dispatch = useAppDispatch();

    const [active, setActive] = useState(false);
    const [type, setType] = useState('');
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

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

        if (target.closest('.fileWrapper')) {
            e.preventDefault();
            setType('file')
            setMousePos({x: e.pageX, y: e.pageY});
            setActive(true);
            console.log('file');
            return true
        }

        if (target.closest('#files')) {
            e.preventDefault();
            setType('container')
            setMousePos({x: e.pageX, y: e.pageY});
            setActive(true);
            console.log('fileContainer');
            return true
        }

        setActive(false);
    }, [])

    const windowClickHandler = useCallback((e: any) => {
        if (e.which !== 1) {
            return false;
        }

        if (!e.target.closest(`.${styles.button}`) && e.target.closest(`.${styles.menu}`)) {
            return false;
        }

        setActive(false);
    }, []);

    useEffect(() => {
        window.addEventListener('contextmenu', contextMenuHandler);
        window.addEventListener('mouseup', windowClickHandler);
        return () => {
            window.removeEventListener('contextmenu', contextMenuHandler);
            window.removeEventListener('mouseup', windowClickHandler);
        }
    }, [])

    const active_class = active === true ? styles.active : ''

    return (
        <div className={styles.menu + ' ' + active_class} style={{left: mousePos.x, top: mousePos.y}} id="context_menu">
            {getButtonsFromType(type)}
        </div>
    )
})

export { ContextMenu };