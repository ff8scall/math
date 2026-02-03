import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import styles from './Curriculum.module.css';

const Curriculum = () => {
    const { gradeId } = useParams();

    // Mock Data (나중에 파일로 분리 가능)
    const curriculumData = {
        3: [
            {
                semester: 1,
                topics: [
                    { id: 'addition-subtraction', title: '덧셈과 뺄셈', description: '원리 탐험부터 실전 연습까지!', link: '/grade/3/arithmetic', status: 'available' },
                    { id: 'subtraction-borrow', title: '받아내림 뺄셈', description: '빌려오는 뺄셈, 원리를 보고 풀어요.', link: '/grade/3/subtraction', status: 'available' },
                    { id: 'multiplication', title: '곱셈 (구구단)', description: '구구단 원리를 보고 퀴즈로 마스터!', link: '/grade/3/multiplication', status: 'available' },
                    { id: 'division', title: '나눗셈', description: '사탕 나누기로 원리를 익히고 연습해요.', link: '/grade/3/division', status: 'available' },
                    { id: 'fractions', title: '분수와 소수', description: '피자 나누기로 배우는 분수의 세계.', link: '/grade/3/fraction', status: 'available' },
                    { id: 'plane-figures', title: '평면도형', description: '직각삼각형, 직사각형을 그려봐요.', link: '/grade/3/geometry', status: 'available' },
                    { id: 'length-time', title: '길이와 시간', description: '시계 보기와 길이 변환하기.', link: '/grade/3/length', status: 'available' },
                    { id: 'quiz', title: '종합 퀴즈왕', description: '모든 단원의 문제를 풀어보세요!', link: '/grade/3/quiz', status: 'available' },
                    { id: 'worksheet', title: '학습지 출력', description: '종이로 뽑아서 풀어볼까요?', link: '/grade/3/worksheet', status: 'available' },
                ]
            },
            {
                semester: 2,
                topics: [
                    { id: 'multiplication-2', title: '곱셈 (심화)', description: '더 큰 수의 곱셈을 도전해요.', link: '#', status: 'coming-soon' },
                    { id: 'circle', title: '원', description: '동그라미, 원의 성질을 배워요.', link: '#', status: 'coming-soon' },
                    { id: 'division-2', title: '나눗셈 (심화)', description: '나머지가 있는 나눗셈!', link: '#', status: 'coming-soon' },
                ]
            }
        ]
    };

    const currentCurriculum = curriculumData[gradeId] || [];

    return (
        <div className={styles.container}>
            <SEOHead title={`${gradeId}학년 수학 목차`} />
            <div className={styles.header}>
                <Link to="/" className={styles.backButton}>← 학년 선택으로</Link>
                <h1 className={styles.pageTitle}>{gradeId}학년 수학 탐험 지도 🗺️</h1>
            </div>

            {currentCurriculum.map((sem, index) => (
                <section key={index} className={styles.semesterSection}>
                    <h2 className={styles.semesterTitle}>{sem.semester}학기</h2>
                    <div className={styles.topicGrid}>
                        {sem.topics.map((topic) => (
                            <Link
                                key={topic.id}
                                to={topic.link}
                                className={`${styles.topicCard} ${topic.status === 'coming-soon' ? styles.disabled : ''}`}
                                onClick={(e) => topic.status === 'coming-soon' && e.preventDefault()}
                            >
                                <h3 className={styles.topicTitle}>{topic.title}</h3>
                                <p className={styles.topicDesc}>{topic.description}</p>
                                {topic.status === 'available' ? (
                                    <span className={styles.playButton}>탐험하기 ▶</span>
                                ) : (
                                    <span className={styles.soonBadge}>준비 중</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Curriculum;
