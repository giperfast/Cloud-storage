'use client'
import { useState, useEffect, memo } from 'react';
import styles from './DragDropArea.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const DragDropArea = ({isActive}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [drag, setDrag] = useState(false);

    useEffect(() => {
        var counter = 0;

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
            
            for (let i = 0; i < files.length; i++) {
                const file: File | null = files[i];
                dispatch(uploadFile(file)).then(() => {
                    router.refresh();
                });
            }
        }

        window.addEventListener('dragenter', dragStartHandler)
        window.addEventListener('dragleave', dragLeaveHandler)
        window.addEventListener('dragover', dragOverHandler)
        window.addEventListener('drop', dropHandler)
    }, [])


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