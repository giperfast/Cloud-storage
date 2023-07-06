'use client'
import { useState, useEffect, useCallback } from 'react';
import styles from './Modal.module.css';
import { Icon } from '../UI/icon/Icon';

const Modal = ({children, onClose}) => {
    return (
        <div className={styles.container} id="modal">
            <div className={styles.background} onClick={onClose}></div>
            <div className={styles.block}>
                <div className={styles.header}>
                    <span className={styles.title}>Enter a folder name</span>
                    <span className={styles.close} onClick={onClose}><Icon name="times"></Icon></span>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Modal } 