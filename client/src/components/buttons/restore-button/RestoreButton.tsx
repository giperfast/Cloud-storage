'use client'
import styles from './RestoreButton.module.css';
import { createRef } from "react";
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { restoreFiles } from '@/utils/api/files/restore';
import { IFile } from '@/types/file';

export interface IDeleteFilesButtonProps {
    children: any,
    files: Array<IFile>,
}

function RestoreButton({children, files}: IDeleteFilesButtonProps) {
    const router = useRouter();

    const clickHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!files) {
            return false;
        }

        await restoreFiles(files);
        router.refresh();
    }

    return (
        <span onClick={clickHandle} className={styles.restore}>
            {children}
        </span >
    )
}

export { RestoreButton };