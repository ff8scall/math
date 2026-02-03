import React from 'react';
import NavigationBar from './NavigationBar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <NavigationBar />
            <main className={styles.mainContent}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>© 2026 수학 탐험대. 부모님과 함께 재미있게 배워요!</p>
            </footer>
        </div>
    );
};

export default MainLayout;
