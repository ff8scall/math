import React from 'react';
import NavigationBar from './NavigationBar';
import SEOHead from '../seo/SEOHead';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <SEOHead />
            <NavigationBar />
            <main className={styles.mainContent}>
                {children}
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerLinks}>
                    {[1, 2, 3, 4, 5, 6].map(grade => (
                        <a key={grade} href={`/grade/${grade}`}>{grade}학년 수학</a>
                    ))}
                </div>
                <p>© 2026 매쓰 펫토리. 부모님과 함께 재미있게 배워요!</p>
            </footer>
        </div>
    );
};


export default MainLayout;
