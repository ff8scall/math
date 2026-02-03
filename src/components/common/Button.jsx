import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', ...props }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
