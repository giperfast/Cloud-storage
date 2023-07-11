'use client';
import { useState, useEffect, memo, useCallback } from 'react';
import styles from './DragDropArea.module.css';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCurrentPath } from '@/app/hooks/useCurrentPath';

const DragDropArea = ({isActive}:{isActive:boolean}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const path = useCurrentPath();
    const [drag, setDrag] = useState(false);

    useEffect(() => {
       let counter = 0;

        const dragStartHandler = (e: any) => {
            e.preventDefault();
            setDrag(true);
            counter++;
        }

        const dragLeaveHandler = (e: any) => {
            e.preventDefault();
            counter--;
            if (counter !== 0) {
                return false;
            }
            setDrag(false);
        }

        const dragOverHandler = (e: any) => {
            e.preventDefault();
        };

        const dropHandler = async (e: any) => {
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

            for (let i = 0; i < files.length; i++) {
                const file: File | null = files[i];

                if (!file) {
                    continue;
                }

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
    }, [path]);

    if (drag === false) {
        return <></>;
    }

    const message = isActive === true ? 'Drop file' : 'Storage is full. Please free up space to upload files';

    return (
        <div className={styles.container}>
            <div className={styles.content}>{message}</div>
        </div>
    );
};

export { DragDropArea };