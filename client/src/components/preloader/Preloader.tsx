import React from 'react';
import styles from './Preloader.module.css';

function Preloader() {
    return (
        <div className={styles.preloader}>
            <div className={styles.bounce + ' ' + styles.bounceFirst}></div>
            <div className={styles.bounce + ' ' + styles.bounceSecond}></div>
            <div className={styles.bounce}></div>
        </div>
    );
}

export { Preloader };