'use client'
import { useState, useEffect, memo, useCallback } from 'react';
import styles from './DragDropArea.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCurrentPath } from '@/app/hooks/useCurrentPath';

const DragDropArea = ({isActive}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const path = useCurrentPath();
    const [drag, setDrag] = useState(false);

    /*let counter = 0;

    const dragStartHandler = useCallback((e) => {
        e.preventDefault();
        setDrag(true);
        counter++;
    }, [])

    const dragLeaveHandler = useCallback((e) => {
        e.preventDefault();
        counter--;
        if (counter !== 0) {
            return false;
        }
        setDrag(false);
    }, [])

    const dragOverHandler = useCallback((e) => {
        e.preventDefault();
    }, [])

    const dropHandler = useCallback((e) => {
        e.preventDefault();
        setDrag(false);
        counter = 0;

        if (isActive === false) {
            return false;
        }

        const files = e.dataTransfer.files;

        if (!files) {
            return false;
        }
        
        console.log(files);
        

        for (let i = 0; i < files.length; i++) {
            const file: File | null = files[i];
            dispatch(uploadFile({file, path})).then(() => {
                router.refresh();
            });
        }
    }, [])*/


    useEffect(() => {
       let counter = 0;

        const dragStartHandler = (e) => {
            e.preventDefault();
            setDrag(true);
            counter++;
        }

        const dragLeaveHandler = (e) => {
            e.preventDefault();
            counter--;
            if (counter !== 0) {
                return false;
            }
            setDrag(false);
        }

        const dragOverHandler = (e) => {
            e.preventDefault();
        }

        const dropHandler = async (e) => {
            e.preventDefault();
            setDrag(false);
            counter = 0;

            if (isActive === false) {
                return false;
            }

            const files = e.dataTransfer.files;

            if (!files) {
                return false;
            }
            
            console.log(files);
            

            for (let i = 0; i < files.length; i++) {
                const file: File | null = files[i];
                dispatch(uploadFile({file, path})).then(() => {
                    router.refresh();
                });
            }
        }

        window.addEventListener('dragenter', dragStartHandler)
        window.addEventListener('dragleave', dragLeaveHandler)
        window.addEventListener('dragover', dragOverHandler)
        window.addEventListener('drop', dropHandler)
        return () => {
            window.removeEventListener('dragenter', dragStartHandler)
            window.removeEventListener('dragleave', dragLeaveHandler)
            window.removeEventListener('dragover', dragOverHandler)
            window.removeEventListener('drop', dropHandler)
        };
    }, [path])


    /*useEffect(() => {
        window.addEventListener('dragenter', dragStartHandler)
        window.addEventListener('dragleave', dragLeaveHandler)
        window.addEventListener('dragover', dragOverHandler)
        window.addEventListener('drop', dropHandler)
        return () => {
            window.removeEventListener('dragenter', dragStartHandler)
            window.removeEventListener('dragleave', dragLeaveHandler)
            window.removeEventListener('dragover', dragOverHandler)
            window.removeEventListener('drop', dropHandler)
        };
    }, [])*/


    if (drag === false) {
        return <></>;
    }

    const message = isActive === true ? 'Drop file' : 'Storage is full. Please free up space to upload files'

    return (
        <div className={styles.container}>
            <div className={styles.content}>{message}</div>
        </div>
    )
}

export { DragDropArea } 