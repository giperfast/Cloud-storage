'use client';
import styles from './RestoreButton.module.css';
import { useRouter } from 'next/navigation';
import { restoreFiles } from '@/utils/api/files/restore';
import { IFile } from '@/types/file';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFiles, selectFiles } from '@/redux/slices/files';

export interface IDeleteFilesButtonProps {
    children: any,
}

function RestoreButton({children}: IDeleteFilesButtonProps) {
    const files = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const clickHandle = async (e: React.MouseEvent<HTMLInputElement>) => {
        if (!files) {
            return false;
        }

        const file_elements = document.querySelectorAll('.file-wrapper');

        files.map((file:IFile) => {
            Array.from(file_elements).map((element:Element) => {
                const index = Number(element.getAttribute('index'));
                if (file.index === index) {
                    element.style.display = 'none';
                    return false;
                }
            });
        });

        await restoreFiles(files);
        dispatch(removeFiles());
        router.refresh();
    };

    return (
        <span onClick={clickHandle} className={styles.restore}>
            {children}
        </span >
    );
}

export { RestoreButton };