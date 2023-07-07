'use client'
import styles from './RestoreButton.module.css';
import { useRouter } from 'next/navigation';
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

        const file_elements = document.querySelectorAll('.file-wrapper');

        files.map((file:IFile) => {
           //console.log(file);
            
            Array.from(file_elements).map((element:Element) => {
                const index = Number(element.firstElementChild?.getAttribute('index'));
                if (file.index === index) {
                    element.style.display = "none";
                    return false;
                }
            })
        })

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