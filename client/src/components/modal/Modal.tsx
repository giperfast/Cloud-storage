'use client';
import styles from './Modal.module.css';
import { Icon } from '../UI/icon/Icon';
import { CloseContext } from '@/utils/contexts/ModalContext';

interface IModalProps {
    children: any,
    close: Function|null
}

const Modal = ({children, close}: IModalProps) => {
    return (
        <CloseContext.Provider value={close}>
            <div className={styles.container} id="modal">
                <div className={styles.background} onClick={close}></div>
                <div className={styles.block}>
                    <div className={styles.header}>
                        <span className={styles.title}>Enter a folder name</span>
                        <span className={styles.close} onClick={close}><Icon name="times"></Icon></span>
                    </div>
                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>
        </CloseContext.Provider>
    )
}

export { Modal } 