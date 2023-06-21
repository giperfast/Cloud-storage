import React from 'react';
import classes from './Preloader.module.css';

function Preloader() {
    return (
        <div className={classes.preloader}>
            <div className={classes.bounce + ' ' + classes.bounceFirst}></div>
            <div className={classes.bounce + ' ' + classes.bounceSecond}></div>
            <div className={classes.bounce}></div>
        </div>
    );
}

export { Preloader };