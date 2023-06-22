'use client'
import { useState, useEffect } from 'react';
import styles from './File.module.css';
import Image from 'next/image';
import { generateShortName } from '@/utils/files/files';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFile, removeFiles, addFile, setFiles } from '@/redux/slices/files';
import { IFile } from '@/types/file';
import { convertUnixToDays } from '@/utils/common/date';

export interface IFileProps {
    data: IFile,
    selected?: boolean
}

const File = ({data, selected = false}: IFileProps) => {
    const dispatch = useAppDispatch();
    //const [time, setTime] = useState(data.expires);

    const clickHandle = (e: any) => {
        if (!e.ctrlKey) {
            dispatch(setFiles(data));
            return true;
        }
        
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
    }



    /*useEffect(() => {
        if (time === undefined) {
            return;
        }
        setInterval(() => {
            setTime(prev => prev - 1)
        }, 1000)
    }, [])*/


    const selectedClass = selected ? styles.selected : '';
    const fullName = `${data.name}.${data.extension}`;
    
    return (
        <div className={styles.file + ' ' + selectedClass} onClick={clickHandle} onContextMenu={contextMenuHandle}>
            
            <div className={styles.image_wrapper}>
                <Image src={getImage(data.type)} width={80} height={80} alt="unknown file"/>
                {
                    data.expires ? <span className={styles.expires}>{convertUnixToDays(data.expires)} days</span>
                    : ''
                }
            </div>
            <p className={styles.name} title={fullName}>{generateShortName(data.name, data.extension)}</p>  
        </div>
    )
}

function getImage(type: string) {
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