import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, Shapes, Trophy, ShoppingBag } from 'lucide-react';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: '홈', icon: <Home size={24} /> },
        { path: '/myroom', label: '내 방', icon: <Trophy size={24} /> },
        { path: '/shop', label: '상점', icon: <ShoppingBag size={24} /> },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">수학 탐험대 🚀</Link>
            </div>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.path} className={location.pathname === item.path ? styles.active : ''}>
                        <Link to={item.path}>
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationBar;
