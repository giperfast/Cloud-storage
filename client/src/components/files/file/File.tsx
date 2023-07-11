'use client';
import { useEffect } from 'react';
import styles from './File.module.css';
import Image from 'next/image';
import { generateShortName, generateFullName } from '@/utils/common/files';
import { useAppDispatch } from '@/redux/hooks';
import { removeFile, removeFiles, addFile, setFiles, removeUnknownFile } from '@/redux/slices/files';
import { IFile } from '@/types/file';
import { convertUnixToDays } from '@/utils/common/date';
import { useRouter } from 'next/navigation';

export interface IFileProps {
    data: IFile,
    selected?: boolean
}

const File = ({data, selected = false}: IFileProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const clickHandle = (e: any) => {
        if (data.type !== 'folder') {
            clickFile(e);
            return false;
        }

        if (e.detail === 1) {
            clickFile(e);
        } else if (e.detail === 2) {
            dispatch(removeFiles());

            if (data.path === null) {
                return router.push(`cloud/${data.name}`);
            }

            router.push(`cloud/${data.path}/${data.name}`);
        }
    };

    const clickFile = (e: any) => {
        if (e.shiftKey) {
            dispatch(addFile(data));
            return true;
        }

        if (!e.ctrlKey) {
            dispatch(setFiles(data));
            return true;
        }
        
        if (selected) {
            dispatch(removeFile(data.file_id));
        } else {
            dispatch(addFile(data));
        }
    };

    const contextMenuHandle = (e: any) => {
        if (selected) {
            return false;
        }

        dispatch(setFiles(data));
    };


    useEffect(() => {
        if (selected === true) {
            dispatch(addFile(data));
        }

        dispatch(removeUnknownFile(data.index));
    }, [selected]);

    const selectedClass = selected ? styles.selected : '';

    return (
        <div className={`file-wrapper ${styles.file} ${selectedClass}`} onClick={clickHandle} onContextMenu={contextMenuHandle} index={data.index}>
            
            <div className={styles.image_wrapper}>
                <Image src={getImage(data.type)} width={80} height={80} alt="unknown file"/>
                {
                    data.expires ? <span className={styles.expires}>{convertUnixToDays(data.expires)} days</span>
                    : ''
                }
            </div>
            
            <p className={styles.name} title={generateFullName(data.name, data.extension)}>{generateShortName(data.name, data.extension)}</p>  
        </div>
    );
};

function getImage(type: string) {
    let result = '';
    switch (type.split('/')[0]) {
        case 'folder':
            result = 'folder';
            break;
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
    return `/file-icons/${result}.svg`;
}

export { File };