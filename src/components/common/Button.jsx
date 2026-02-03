import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', fullWidth, ...props }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
