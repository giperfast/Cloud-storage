import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input({...attrs}, ref) {
    return (
        <input type='text' ref={ref} className={styles.input} {...attrs}/>
    );
})

export { Input };