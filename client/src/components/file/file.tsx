'use client'
import { useContext, useMemo } from 'react';
import styles from './File.module.css';
import Image from 'next/image';
import { Context } from '@/utils/context/files.context';

export interface IFileData {
    id: number,
    name: string,
    extension: string,
}

export interface IFileProps {
    data: IFileData,
    selected?: boolean
}

//function File({data, selected = false}: IFileProps) {
const File = ({data, selected = false}: IFileProps) => {
    console.log(data);
    
    const [addFile, removeFile, removeAllFiles, isSelect]: any = useContext(Context);

    const clickHandle = (e: any) => {
        if (!e.ctrlKey) {
            removeAllFiles();
            addFile(data);
            return;
        }

        if (isSelect(data.id)) {
            removeFile(data.id);
        } else {
            addFile(data);
        }
    }

    const selectedClass = selected ? styles.selected : '';

    return (
        <div className={styles.file + ' ' + selectedClass} onClick={clickHandle}>
            <div className={styles.file_overlay}></div>
            <div className={styles.image_wrapper}>
                <Image src="/file-icons/unknown.svg" width={80} height={80} alt="unknown file"/>
            </div>

            <p className={styles.name}>{`${data.name}.${data.extension}`}</p>  
        </div>
    )
}

export { File } 