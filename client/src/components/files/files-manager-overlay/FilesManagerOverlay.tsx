'use client';
import { useState } from 'react';
import styles from './FilesManagerOverlay.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { cancelUploading, removeUploadFiles, selectUploadFiles } from '@/redux/slices/uploadFiles';
import { removeDownloadFiles, selectDownloadFiles } from '@/redux/slices/downloadFiles';
import { generateShortName } from '@/utils/common/files';
import { format } from 'util';
import { Icon } from '@/components/UI/icon/Icon';

interface IFileManagerProps {
    files: Array<any>,
    title: String,
    onClose: Function
}

function FilesManager({files, title, onClose}:IFileManagerProps) {
    const dispatch = useAppDispatch();
    const [minimal, setMinimal] = useState(false);

    if (files.length === 0) {
        return <></>;
    }

    const files_quantity = files.filter((file)=> {
        return file.progress === 100;
    }).length;

    const minimalClass = minimal ? styles.minimal : '';

    return (
        <>
            <div className={styles.header} onClick={() => setMinimal(!minimal)}>
                <span>{format(title, files_quantity, files.length)}</span>
                <span className={styles.fileOverlayClose} onClick={() => dispatch(onClose())}><Icon name="times"/></span>
            </div>
            <div className={styles.wrapper + ' ' + minimalClass}>
            {
                files.map((file) => {
                    return (
                        <div className={styles.file} key={file.id}>
                            <label htmlFor={`file_${file.id}`} title={file.name}>{generateShortName(file.name, file.extension)}</label>
                            <div className={styles.progressbar}>
                                <span>{file.progress !== 0 ? file.progress + '%' : file.status}</span>
                                <progress id={`file_${file.id}`} max="100" value={file.progress} >{file.progress}%</progress>

                                <span className={styles.cancel} onClick={() => dispatch(cancelUploading(file))}><Icon name="times"/></span>
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
    const files_upload = useAppSelector(selectUploadFiles);
    const files_download = useAppSelector(selectDownloadFiles);

    return (
        <div className={styles.container}>
            <FilesManager files={files_upload} title="%s/%s files uploaded" onClose={removeUploadFiles}/>
            <FilesManager files={files_download} title="%s/%s files downloaded" onClose={removeDownloadFiles}/>
        </div>
    );
}

export { FilesManagerOverlay };