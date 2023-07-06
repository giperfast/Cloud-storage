'use client'
import { useState, useEffect, useCallback } from 'react';
import styles from './MouseSelector.module.css';

const MouseSelector = () => {
    const [active, setActive] = useState(false);
    const [anchor, setAnchor] = useState({x: 0, y: 0});
    const [coordinates, setCoordinates] = useState({x: 0, y: 0, width: 0, height: 0});

    const mousedownHandler = useCallback((e) => {
        if (e.which !== 1) {
            return false;
        }

        if (!e.target.closest(`#files`)) {
            return false;
        }

        setAnchor({x: e.pageX, y: e.pageY});
        setActive(true);
    }, [])

    const mouseupHandler = useCallback((e) => {
        if (e.which !== 1) {
            return false;
        }

        document.body.classList.remove('pointer-events-none');
        setAnchor({x: 0, y: 0});
        setCoordinates({x: 0, y: 0, width: 0, height: 0});
        setActive(false);
    }, [])

    const mousemoveHandler = useCallback((e) => {
        if (active !== true) {
            return false;
        }
        document.body.classList.add('pointer-events-none');
        let cords = {...coordinates};

        cords.x = e.clientX < anchor.x ? e.clientX : anchor.x;
        cords.y = e.clientY < anchor.y ? e.clientY : anchor.y;
        cords.width = Math.abs(e.clientX - anchor.x);
        cords.height = Math.abs(e.clientY - anchor.y);
        //console.log(e.target);
        
        setCoordinates(cords);
    }, [active, coordinates])

    useEffect(() => {
        window.addEventListener('mousedown', mousedownHandler)
        window.addEventListener('mouseup', mouseupHandler)
        window.addEventListener('mousemove', mousemoveHandler)

        return () => {
            window.removeEventListener('mousedown', mousedownHandler)
            window.addEventListener('mouseup', mouseupHandler)
            window.removeEventListener('mousemove', mousemoveHandler)
        };
    }, [active, coordinates])

    const is_active = active ? styles.active : '';

    return (
        <div className={styles.mouse_selector + ' ' + is_active} style={
        {
            top: coordinates.y,
            left: coordinates.x,
            width: coordinates.width,
            height: coordinates.height,
        }
        }></div>
    )
}

export { MouseSelector } 