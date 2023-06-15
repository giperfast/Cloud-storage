'use client'
import { createContext, useState, Children, useEffect, isValidElement, cloneElement, useCallback } from 'react';
import styles from './FilesContainer.module.css';
import { FilesFunctionsContext } from '@/utils/context/files.context';
import { IFileData, IFileProps } from '../file/File';
import { FilesOverlay } from "../files-overlay/FilesOverlay";

function FilesContainer({children}: any) {
    const [files, setFiles] = useState<Array<IFileData>>([]);

    console.log(files);
    
    const addFile = (file: IFileData): void => {
        setFiles(files => [...files, file])
    }

    const removeFile = (file_id: string): void => {
        setFiles(files.filter((file) => file.file_id != file_id));
    }

    const removeAllFiles = (): void => {
        setFiles([]);
    }

    const isSelect = (file_id: string): boolean => {
        return files.findIndex((file) => file.file_id == file_id) !== -1;
    }
    
    const windowClickHandler = useCallback((e: any) => {
        if (e.which !== 1) {
            return false;
        }

        if (e.ctrlKey) {
            return false;
        }
        
        if (!e.target.closest('#file_overlay_close') && e.target.closest(`#file_overlay`)) {
            return false
        }

        if (e.target.closest(`.${styles.fileWrapper}`)) {
            return false
        }

        if (files.length === 0) {
            return
        }
        
        removeAllFiles();
    }, [files]);

    useEffect(() => {
        window.addEventListener('mouseup', windowClickHandler);
        return () => {
            window.removeEventListener("mouseup", windowClickHandler);
        };
    }, [files])

    const newChildren = Children.map(children, child => {
        if (isValidElement(child)) {
            const props: any = child.props;
            const file_id: number = props.data?.file_id;
            return cloneElement(child as React.ReactElement<any>, { selected: isSelect(file_id) });
        }
        return child;
    });

    return (
        <div className={styles.files}>
            <FilesFunctionsContext.Provider value={ [addFile, removeFile, removeAllFiles, isSelect] }>
            {
                Children.map(newChildren, child =>
                    <div className={styles.fileWrapper}>{child}</div>
                )
            }
            </FilesFunctionsContext.Provider>
            <FilesOverlay files={files} isActive={files.length !== 0}/>
        </div>
    )
}

export { FilesContainer };