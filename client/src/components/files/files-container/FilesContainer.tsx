'use client'
import { Children, useEffect, isValidElement, cloneElement, useCallback } from 'react';
import styles from './FilesContainer.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeFiles, selectContextFile, selectFiles } from '@/redux/slices/files';

function FilesContainer({children}: any) {
    const files = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();

    const isSelect = (file_id: string): boolean => {
        return files.findIndex((file) => file.file_id == file_id) !== -1;
    }
    
    const windowClickHandler = useCallback((e: any) => {
        if (e.ctrlKey) {
            return false;
        }
        
        if (!e.target.closest('#file_overlay_close') && e.target.closest(`#file_overlay`)) {
            return false
        }

        if (e.target.closest(`.fileWrapper`)) {
            return false
        }

        if (e.target.closest(`#context_menu`)) {
            return false
        }

        if (files.length === 0) {
            return
        }

        dispatch(removeFiles());
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
            const file_id: string = props.data?.file_id;
            return cloneElement(child as React.ReactElement<any>, { selected: isSelect(file_id) });
        }
        return child;
    });

    return (
        <div className={styles.files}>
        {
            Children.map(newChildren, child =>
                <div className="fileWrapper">{child}</div>
            )
        }
        </div>
    )
}

export { FilesContainer };