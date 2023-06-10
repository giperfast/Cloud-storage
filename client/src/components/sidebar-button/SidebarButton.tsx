'use client'
import Link from 'next/link';
import styles from './SidebarButton.module.css';
import { Icon } from '@/components/icon/Icon';
import { createRef } from "react";
import { uploadFiles } from '../../utils/api/files/upload';

export interface ISidebarButtonProps {
    active: boolean,
    title: string,
    icon: string,
}

export interface ISidebarUploadFileButtonProps {
    title: string,
    icon: string,
}

function SidebarButton({active, title, icon}: ISidebarButtonProps) {
    const activeClass = active === true ? styles.active : ''

    return (
        <Link href="/" className={styles.button + ' ' + activeClass}>
            <span className={styles.icon}><Icon name={icon}/></span>
            {title}
        </Link>
    )
}

function SidebarUploadFileButton({title, icon}: ISidebarUploadFileButtonProps) {
    
    const file_input = createRef<HTMLInputElement>();

    const uploadFile = (e: React.MouseEvent) => {
        const input_element: any = file_input.current;
        input_element.click();
        input_element.value = '';
        //document.getElementById('inputFile').click();
    }

    const sendFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);

        if (!e.target.files) {
            return false;
        }
        
        await uploadFiles(e.target.files);
    }

    return (
        <>
            <input type="file" className="hidden" ref={file_input} onChange={sendFile} multiple={true}/>
            <button onClick={uploadFile} className={styles.button + ' ' + styles.upload}>
                <span className={styles.icon}><Icon name={icon}/></span>
                {title}
            </button >
        </>
    )
}

export { SidebarButton, SidebarUploadFileButton };