'use client';
import styles from './DeleteButton.module.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteFiles } from '@/utils/api/files/delete';
import { IFile } from '@/types/file';
import { removeFiles, selectFiles } from '@/redux/slices/files';

function DeleteButton({children}:{children:React.ReactNode}) {
    const contextFile = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const clickHandle = async (e: React.MouseEvent<HTMLInputElement>) => {
        if (!contextFile) {
            return false;
        }
        
        const file_elements = document.querySelectorAll('.file-wrapper');

        contextFile.map((file:IFile) => {
            Array.from(file_elements).map((element:Element) => {
                const index = Number(element.getAttribute('index'));
                if (file.index === index) {
                    element.style.display = 'none';
                    return false;
                }
            });
        });

        await deleteFiles(contextFile);
        dispatch(removeFiles());
        router.refresh();
    };

    return (
        <span onClick={clickHandle} className={styles.delete}>
            {children}
        </span >
    );
}

export { DeleteButton };