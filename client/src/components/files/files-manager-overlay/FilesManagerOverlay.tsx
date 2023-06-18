'use client'
import { useState } from 'react';
import styles from './FilesManagerOverlay.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { removeUploadFiles, selectUploadFiles } from '@/redux/slices/uploadFiles';
import { removeDownloadFiles, selectDownloadFiles } from '@/redux/slices/downloadFiles';
import { generateShortName } from '@/utils/files/files';
import { format } from 'util';
import { Icon } from '@/components/icon/Icon';

function FilesManager({files, title, clearFn}) {
    const dispatch = useAppDispatch();
    const [minimal, setMinimal] = useState(false);

    if (files.length === 0) {
        return <></>;
    }

    const files_quantity = files.filter((file)=> {
        return file.progress === 100;
    }).length

    const minimalClass = minimal ? styles.minimal : '';

    return (
        <>
            <div className={styles.header} onClick={() => setMinimal(!minimal)}>
                <span>{format(title, files_quantity, files.length)}</span>
                <span className={styles.fileOverlayClose} onClick={() => dispatch(clearFn())}><Icon name="times"/></span>
            </div>
            <div className={styles.wrapper + ' ' + minimalClass}>
            {
                files.map((file) => {
                    return (
                        <div className={styles.file} key={file.file_id}>
                            <label htmlFor={`file_${file.file_id}`} title={file.name}>{generateShortName(file.name, '')}</label>
                            <div className={styles.progressbar}>
                                <span>{file.progress}%</span>
                                <progress id={`file_${file.file_id}`} max="100" value={file.progress} >{file.progress}%</progress>
                            </div>
                        </div>
                    ) 
                })
            }
            </div>
        </>
    )
}


function FilesManagerOverlay() {
    const files_upload = useAppSelector(selectUploadFiles)
    const files_download = useAppSelector(selectDownloadFiles)

    return (
        <div className={styles.container}>
            <FilesManager files={files_upload} title="%s/%s files uploaded" clearFn={removeUploadFiles}/>
            <FilesManager files={files_download} title="%s/%s files downloaded" clearFn={removeDownloadFiles}/>
        </div>
    )
}

export { FilesManagerOverlay };