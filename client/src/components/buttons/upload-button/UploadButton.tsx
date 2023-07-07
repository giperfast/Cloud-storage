'use client'
import styles from './UploadButton.module.css';
import { createRef } from "react";
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useCurrentPath } from '@/app/hooks/useCurrentPath';

export interface ISidebarUploadFileButtonProps {
    children: any,
    isActive: boolean,
}

function UploadButton({children, isActive}: ISidebarUploadFileButtonProps) {
    const router = useRouter();
    const file_input = createRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const path = useCurrentPath();

    const uploadFiles = (e: React.MouseEvent) => {
        if (isActive === false) {
            return false;
        }

        const input_element: any = file_input.current;
        input_element.click();
        input_element.value = '';
    }

    const sendFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isActive === false) {
            return false;
        }
        const files = e.target.files;
        //console.log(files);
        
        if (!files) {
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            const file: File | null = files[i];
            dispatch(uploadFile({file, path})).then(() => {
                router.refresh();
            });
        }
    }

    return (
        <span onClick={uploadFiles} className={styles.upload}>
            <input type="file" className="hidden" ref={file_input} onChange={sendFile} multiple={true}/>
            {children}
        </span >
    )
}

export { UploadButton };