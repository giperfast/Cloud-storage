'use client'
import { useContext, memo } from 'react';
import styles from './File.module.css';
import Image from 'next/image';
import { FilesFunctionsContext } from '@/utils/context/files.context';
import { generateShortName } from '@/utils/files/files';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFile, removeFiles, addFile, setFiles, setContextFile } from '@/redux/slices/files';

export interface IFileData {
    file_id: string,
    name: string,
    extension: string,
    type: string,
}

export interface IFileProps {
    data: IFileData,
    selected?: boolean
}

const File = ({data, selected = false}: IFileProps) => {
    const dispatch = useAppDispatch();

    const clickHandle = (e: any) => {
        console.log(e);
        if (!e.ctrlKey) {
            dispatch(setFiles(data));
            return true;
        }
        console.log(selected);
        
        if (selected) {
            dispatch(removeFile(data.file_id));
        } else {
            dispatch(addFile(data));
        }
    }

    const contextMenuHandle = (e: any) => {
        
        if (selected) {
            return false;
        }

        dispatch(setFiles(data));
        
        /*console.log(e);
        dispatch(removeFiles());
        dispatch(setContextFile(data));*/
    }

    const selectedClass = selected ? styles.selected : '';
    const fullName = `${data.name}.${data.extension}`;
    return (
        <div className={styles.file + ' ' + selectedClass} onClick={clickHandle} onContextMenu={contextMenuHandle}>
            
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