'use client'
import { useState, useEffect, memo } from 'react';
import styles from './DragDropArea.module.css';
import Image from 'next/image';
import { uploadFiles } from '@/utils/api/files/upload';
import { useRouter } from 'next/navigation';

const DragDropArea = () => {
    const router = useRouter();
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
            console.log(e);
            console.log(e.dataTransfer.files);
            setDrag(false);
            counter = 0;
            await uploadFiles(e.dataTransfer.files);
            router.refresh();
        }

        window.addEventListener('dragenter', dragStartHandler)
        window.addEventListener('dragleave', dragLeaveHandler)
        window.addEventListener('dragover', dragOverHandler)
        window.addEventListener('drop', dropHandler)
    }, [])


    return (
        <div className={styles.container}>
        {
            drag ? <div className={styles.content}>Drop file</div>
            : ''
        }
        </div>
    )
}

export { DragDropArea } 