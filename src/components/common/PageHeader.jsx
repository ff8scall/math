import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { seoData } from '../../data/seoData';
import styles from './PageHeader.module.css';

const PageHeader = ({ title: propTitle, grade: propGrade }) => {
    const location = useLocation();
    const { gradeId } = useParams();
    const currentPath = location.pathname;

    // Find centralized data
    const routeData = seoData.find(item => item.path === currentPath) || {};

    // Determine Grade Label
    const gradeLabel = propGrade || (gradeId ? `${gradeId}학년` : null) || (routeData.title ? routeData.title.split(' ')[0] : null);

    // Determine Title
    // If routeData.title is "4학년 수학: 수조 단위 큰 수", let's clean it up to just topic
    const rawTitle = propTitle || routeData.title || "매쓰 펫토리";
    const cleanedTitle = rawTitle.includes(': ') ? rawTitle.split(': ')[1] : rawTitle;

    return (
        <div className={styles.header}>
            <div className={styles.topRow}>
                <Link to={gradeId ? `/grade/${gradeId}` : "/"} className={styles.backLink}>
                    <ChevronLeft size={20} />
                    <span>돌아가기</span>
                </Link>
                {gradeLabel && <span className={styles.gradeBadge}>{gradeLabel}</span>}
            </div>
            <h1 className={styles.title}>{cleanedTitle}</h1>
            <div className={styles.divider}></div>
        </div>
    );
};

export default PageHeader;
