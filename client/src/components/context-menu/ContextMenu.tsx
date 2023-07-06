'use client'
import { useEffect, memo, useCallback, useState, Children } from 'react';
import styles from './ContextMenu.module.css';

const ContextMenu = memo(({children}: {children: React.ReactNode}) => {
    const [active, setActive] = useState(true);
    const [position, setPosition] = useState({x: 0, y: 0});
    
    const contextMenuHandler = useCallback((e) => {
        if (e.target.closest('#modal')) {
            return setActive(false);
        }

        setPosition({x: e.pageX, y: e.pageY});
        setActive(true);
    }, [])

    const windowClickHandler = useCallback((e: any) => {
        if (e.which !== 1) {
            return false;
        }

        const target = e.target;

        if (!target.closest(`.${styles.button}`) && target.closest(`.${styles.menu}`)) {
            return false;
        }

        setActive(false);
    }, []);

    useEffect(() => {
        window.addEventListener('contextmenu', contextMenuHandler);
        window.addEventListener('mouseup', windowClickHandler);
        return () => {
            window.removeEventListener('contextmenu', contextMenuHandler);
            window.removeEventListener('mouseup', windowClickHandler);
        }
    }, [])
    
    const active_class = active === true ? styles.active : '';

    return (
        <div className={styles.menu + ' ' + active_class} style={{left: position.x, top: position.y}} id="context_menu">
            {children}
        </div>
    )
})

export { ContextMenu };