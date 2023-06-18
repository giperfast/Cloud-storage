'use client'
import { useState, useEffect, memo } from 'react';
import styles from './DragDropArea.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
const DragDropArea = () => {
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

            /*if (!e.dataTransfer.files) {
                return false;
            }

            await dispatch(uploadFiles(e.dataTransfer.files))
            router.refresh();*/
        }

        window.addEventListener('dragenter', dragStartHandler)
        window.addEventListener('dragleave', dragLeaveHandler)
        window.addEventListener('dragover', dragOverHandler)
        window.addEventListener('drop', dropHandler)
    }, [])


    if (drag === true) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>Drop file</div>
            </div>
        )
    }

    return <></>;
}

export { DragDropArea } 