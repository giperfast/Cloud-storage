'use client';
import { Children, useEffect, isValidElement, cloneElement, useCallback, useState } from 'react';
import styles from './FilesContainer.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFiles, selectFiles, selectUnknownFiles, setFiles } from '@/redux/slices/files';
import { IFile } from '@/types/file';

function FilesContainer({children}: any) {
    const dispatch = useAppDispatch();
    const files = useAppSelector(selectFiles);
    const files_indexes = useAppSelector(selectUnknownFiles);
    const [isShift, setIsShift] = useState(false);

    const isSelect = (file_id: string): boolean => {
        return files.findIndex((file: IFile) => file.file_id == file_id) !== -1;
    };
    
    const windowClickHandler = useCallback((e: any) => {

        if (e.shiftKey) {
            if (!e.target.closest('.file-wrapper')) {
                return false;
            }

            setIsShift(true);

            if (files.length === 0) {
                return;
            }

            dispatch(setFiles(files.at(0)));
            return;
        }

        setIsShift(false);

        if (e.ctrlKey) {
            return false;
        }
        
        if (!e.target.closest('#file_overlay_close') && e.target.closest('#file_overlay')) {
            return false;
        }

        if (e.target.closest('.file-wrapper')) {
            return false;
        }

        if (e.target.closest('#context_menu')) {
            return false;
        }

        if (files.length === 0) {
            return;
        }
        
        dispatch(removeFiles());
    }, [files]);

    useEffect(() => {
        window.addEventListener('mouseup', windowClickHandler);
        return () => {
            window.removeEventListener('mouseup', windowClickHandler);
        };
    }, [files]);

    const newChildren = Children.map(children, child => {
        if (isValidElement(child)) {
            const props: any = child.props;
            const index: number = props.data?.index;
            const file_id: string = props.data?.file_id;
            
            let selected = isSelect(file_id);

            if (files_indexes.includes(index)) {
                selected = true;
            }

            if (isShift === true && selected === false) {
                if (index > files.at(0)?.index && index < files.at(-1)?.index) {
                    selected = true;
                }

                if (index < files.at(0)?.index && index > files.at(-1)?.index) {
                    selected = true;
                }
            }
            
            return cloneElement(child as React.ReactElement<any>, { selected: selected });
        }
        return child;
    });

    return (
        <div className={styles.files}>
        {
            Children.map(newChildren, child =>
                <>{child}</>
            )
        }

        {
            [...Array(8)].map((index) =>
                <div className="empty-file-wrapper" key={Math.floor(Math.random() * 80000)}></div>
            )
        }
        </div>
    );
}

export { FilesContainer };