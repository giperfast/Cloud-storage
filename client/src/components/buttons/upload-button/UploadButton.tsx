'use client'
import Link from 'next/link';
import styles from './UploadButton.module.css';
import { Icon } from '@/components/icon/Icon';
import { createRef } from "react";
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/redux/slices/uploadFiles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export interface ISidebarButtonProps {
    active: boolean,
    title: string,
    icon: string,
}

export interface ISidebarUploadFileButtonProps {
    title: string,
    icon: string,
}

function UploadButton({title, icon}: ISidebarUploadFileButtonProps) {
    const router = useRouter();
    const file_input = createRef<HTMLInputElement>();
    const dispatch = useAppDispatch();

    const uploadFiles = (e: React.MouseEvent) => {
        const input_element: any = file_input.current;
        input_element.click();
        input_element.value = '';
        //document.getElementById('inputFile').click();
    }

    const sendFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

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

    return (
        <>
            <input type="file" className="hidden" ref={file_input} onChange={sendFile} multiple={true}/>
            <button onClick={uploadFiles} className={styles.button + ' ' + styles.upload}>
                <span className={styles.icon}><Icon name={icon}/></span>
                {title}
            </button >
        </>
    )
}

export { UploadButton };