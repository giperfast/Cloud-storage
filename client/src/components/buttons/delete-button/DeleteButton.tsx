'use client'
import styles from './DeleteButton.module.css';
import { createRef } from "react";
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteFiles } from '@/utils/api/files/delete';
import { IFile } from '@/types/file';

export interface IDeleteFilesButtonProps {
    children: any,
    files: Array<IFile>,
}

function DeleteButton({children, files}: IDeleteFilesButtonProps) {
    const router = useRouter();

    const clickHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!files) {
            return false;
        }

        await deleteFiles(files);
        router.refresh();
        /*for (let i = 0; i < files.length; i++) {
            const file: File | null = files[i];
            
        }*/
    }

    return (
        <span onClick={clickHandle} className={styles.upload}>
            {children}
        </span >
    )
}

export { DeleteButton };