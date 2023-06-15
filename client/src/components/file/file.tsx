'use client'
import { useContext, useMemo } from 'react';
import styles from './File.module.css';
import Image from 'next/image';
import { FilesFunctionsContext } from '@/utils/context/files.context';
import { generateShortName } from '../../utils/files/files';

export interface IFileData {
    file_id: number,
    name: string,
    extension: string,
    type: string,
}

export interface IFileProps {
    data: IFileData,
    selected?: boolean
}

//function File({data, selected = false}: IFileProps) {
const File = ({data, selected = false}: IFileProps) => {
    //console.log(data);
    
    const [addFile, removeFile, removeAllFiles, isSelect]: any = useContext(FilesFunctionsContext);

    const clickHandle = (e: any) => {
        if (!e.ctrlKey) {
            removeAllFiles();
            addFile(data);
            return;
        }

        if (isSelect(data.file_id)) {
            removeFile(data.file_id);
        } else {
            addFile(data);
        }
    }

    const selectedClass = selected ? styles.selected : '';
    const fullName = `${data.name}.${data.extension}`;
    return (
        <div className={styles.file + ' ' + selectedClass} onClick={clickHandle}>
            
            <div className={styles.image_wrapper}>
                <Image src={getImage(data.type)} width={80} height={80} alt="unknown file"/>
            </div>
            <p className={styles.name} title={fullName}>{generateShortName(data.name, data.extension)}</p>  
           
        </div>
    )
}

function getImage(type) {
    let result = ''
    switch (type) {
        case 'text':
            result = 'text';
            break;
        case 'application':
            result = 'exe';
            break;
        default:
            result = 'unknown';
            break;
    }
    return `/file-icons/${result}.svg`
}

export { File } 