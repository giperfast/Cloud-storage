'use client'
import { createContext, useState, Children, useEffect, isValidElement, cloneElement } from 'react';
import styles from './FilesContainer.module.css';
import { Context } from '@/utils/context/files.context';
import { IFileData, IFileProps } from '../file/File';

function FilesContainer({children}: any) {
    const [files, setFiles] = useState<Array<IFileData>>([]);
    console.log(files);
    
    const addFile = (file: IFileData): void => {
        setFiles(files => [...files, file])
    }

    const removeFile = (id: number): void => {
        setFiles(files.filter((file) => file.id != id));
    }

    const removeAllFiles = (): void => {
        setFiles([]);
    }

    const isSelect = (id: number): boolean => {
        return files.findIndex((file) => file.id == id) !== -1;
    }
    
    useEffect(() => {
        const windowClickHandler = (e: any) => {
            if (e.which !== 1) {
                return false;
            }

            if (e.ctrlKey) {
                return false;
            }

            if (e.target.closest(`.${styles.fileWrapper}`)) {
                return false
            }
            
            removeAllFiles();
        }
        window.addEventListener('mouseup', windowClickHandler);
    }, [])

    //console.log(files);

    const newChildren = Children.map(children, child => {
        if (isValidElement(child)) {
            const props: any = child.props;
            const id: number = props.data?.id;
            return cloneElement(child as React.ReactElement<any>, { selected: isSelect(id) });
        }
        return child;
    });

    
    return (
        <div className={styles.files}>
            <Context.Provider value={ [addFile, removeFile, removeAllFiles, isSelect] }>
            {
                Children.map(newChildren, child =>
                    <div className={styles.fileWrapper}>{child}</div>
                )
            }
            </Context.Provider>
            { 
                files.length !== 0 ? 
                    <div className={styles.filesOverlay}>
                        <div>
                            {
                                files.length === 1 ?
                                <>Выбран {files[0].name + files[0].extension}</>
                                :
                                <>Выбрано { files.length } файлов</>
                            }

                            
                        </div>
                    </div>
                : '' 
            }
        </div>
    )
}

export { FilesContainer };