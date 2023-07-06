'use client'
import styles from './DeleteButton.module.css';
import { createRef } from "react";
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteFiles } from '@/utils/api/files/delete';
import { IFile } from '@/types/file';
import { removeFiles, selectFiles } from '@/redux/slices/files';

export interface IDeleteFilesButtonProps {
    children: React.ReactNode,
}

function DeleteButton({children}: IDeleteFilesButtonProps) {
    const contextFile = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const clickHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!contextFile) {
            return false;
        }
        
        const file_elements = document.querySelectorAll('.fileWrapper');

        contextFile.map((file:IFile) => {
            console.log(file);
            
            Array.from(file_elements).map((element:Element) => {
                const index = Number(element.firstElementChild?.getAttribute('index'));
                if (file.index === index) {
                    element.style.display = "none";
                    return false;
                }
            })
        })

        await deleteFiles(contextFile);
        dispatch(removeFiles());
        router.refresh();
    }

    return (
        <span onClick={clickHandle} className={styles.delete}>
            {children}
        </span >
    )
}

export { DeleteButton };