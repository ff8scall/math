import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import styles from './GradeSelection.module.css';

const GradeSelection = () => {
    const navigate = useNavigate();
    const grades = [1, 2, 3, 4, 5, 6];

    const handleGradeClick = (grade) => {
        navigate(`/grade/${grade}`);
    };

    return (
        <div className={styles.container}>
            <SEOHead title="학년 선택" description="공부할 학년을 선택해주세요." />
            <h1 className={styles.title}>몇 학년인가요? 🏫</h1>
            <p className={styles.subtitle}>자신의 학년을 선택하고 수학 여행을 떠나요!</p>

            <div className={styles.grid}>
                {grades.map((grade) => (
                    <button
                        key={grade}
                        className={`${styles.card} ${styles.active}`}
                        onClick={() => handleGradeClick(grade)}
                    >
                        <span className={styles.gradeNumber}>{grade}</span>
                        <span className={styles.gradeText}>학년</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GradeSelection;
