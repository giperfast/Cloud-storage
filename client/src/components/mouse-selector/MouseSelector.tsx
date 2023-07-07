'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './MouseSelector.module.css';
import file_styles from '@/components/files/file/File.module.css';
import { useAppDispatch } from '@/redux/hooks';
import { removeFiles, removeUnknownFiles, setUnknownFiles } from '@/redux/slices/files';

const MouseSelector = () => {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState(false);
    const [anchor, setAnchor] = useState({x: 0, y: 0});
    const [coordinates, setCoordinates] = useState({x: 0, y: 0, width: 0, height: 0});
    const [files, setFiles] = useState([]);
    const [indexes, setIndexes] = useState([]);

    const selector = useRef(null);

    const mousedownHandler = useCallback((e) => {
        if (e.which !== 1) {
            return false;
        }

        if (!e.target.closest(`#files`)) {
            return false;
        }

        document.body.classList.add('no-user-select');
        setAnchor({x: e.pageX, y: e.pageY});
        setActive(true);
    }, [])

    const mouseupHandler = useCallback((e) => {
        if (e.which !== 1) {
            return false;
        }
        
        dispatch(setUnknownFiles(indexes));
        document.body.classList.remove('no-user-select');
        setIndexes([]);
        setFiles([]);
        setAnchor({x: 0, y: 0});
        setCoordinates({x: 0, y: 0, width: 0, height: 0});
        setActive(false);
    }, [indexes])

    const mousemoveHandler = useCallback((e) => {
        if (active !== true) {
            return false;
        }

        if (e.which !== 1) {
            return false;
        }

        if (Math.abs(anchor.x - e.clientX) < 4 && Math.abs(anchor.y - e.clientY) < 4) {
            return false;
        }

        if (files.length === 0) {
            const files_elements = document.querySelectorAll('.file-wrapper');
            setFiles(files_elements);
            dispatch(removeFiles());
            dispatch(removeUnknownFiles());
        }

        let cords = {...coordinates};

        cords.x = e.clientX < anchor.x ? e.clientX : anchor.x;
        cords.y = e.clientY < anchor.y ? e.clientY : anchor.y;
        cords.width = Math.abs(e.clientX - anchor.x);
        cords.height = Math.abs(e.clientY - anchor.y);

        let selector_rect = selector.current.getBoundingClientRect();
        let temp_indexes: Array<Number> = [];
        Array.from(files).map((file:Element) => {
            const index = Number(file.firstElementChild?.getAttribute('index'));
            let file_rect = file.getBoundingClientRect();
            if (Math.max(file_rect.x, selector_rect.x) <= Math.min(file_rect.x + file_rect.width, selector_rect.x + selector_rect.width) && 
                Math.max(file_rect.y, selector_rect.y) <= Math.min(file_rect.y + file_rect.height, selector_rect.y + selector_rect.height)) {
                
                if (temp_indexes.includes(index)) {
                    return;
                }

                temp_indexes.push(index);
                file.firstElementChild?.classList.add(file_styles.selected);
                return true;
            }
            temp_indexes = temp_indexes.filter((array_index) => array_index != index);
            file.firstElementChild?.classList.remove(file_styles.selected);
        })

        setIndexes(temp_indexes);
        setCoordinates(cords);
    }, [active, coordinates])

    useEffect(() => {
        window.addEventListener('mousedown', mousedownHandler)
        window.addEventListener('mouseup', mouseupHandler)
        window.addEventListener('mousemove', mousemoveHandler)

        return () => {
            window.removeEventListener('mousedown', mousedownHandler)
            window.removeEventListener('mouseup', mouseupHandler)
            window.removeEventListener('mousemove', mousemoveHandler)
        };
    }, [active, coordinates, indexes])

    const is_active = active ? styles.active : '';

    return (
        <div className={styles.mouse_selector + ' ' + is_active} ref={selector} style={
        {
            top: coordinates.y,
            left: coordinates.x,
            width: coordinates.width,
            height: coordinates.height,
        }
        }>
        </div>
    )
}

export { MouseSelector } 