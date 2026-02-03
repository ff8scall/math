import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import styles from './Curriculum.module.css';

const Curriculum = () => {
    const { gradeId } = useParams();

    // Mock Data (나중에 파일로 분리 가능)
    const curriculumData = {
        1: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'number-counting', title: '9까지의 수', description: '1부터 9까지 수를 세고 비교해요.', link: '/grade/1/number-counting', status: 'available' },
                        { id: 'shapes', title: '여러 가지 모양', description: '동그라미, 세모, 네모를 찾아요.', link: '/grade/1/shapes', status: 'available' },
                        { id: 'addition-subtraction', title: '덧셈과 뺄셈', description: '한 자리 수 덧셈과 뺄셈을 배워요.', link: '/grade/1/arithmetic', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'number-50', title: '50까지의 수', description: '10개씩 묶어서 50까지 세어요.', link: '/grade/1/number-50', status: 'available' },
                        { id: 'clock-basic', title: '시계 보기', description: '몇 시, 몇 시 30분을 읽어요.', link: '/grade/1/clock', status: 'available' },
                        { id: 'number-100', title: '100까지의 수', description: '100까지 수를 세고 쓰기를 해요.', link: '/grade/1/number-100', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 문제를 풀어보세요!', link: '#', status: 'coming-soon' },
            ]
        },
        2: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'three-digit', title: '세 자리 수', description: '백, 십, 일을 배워요.', link: '/grade/2/three-digit', status: 'available' },
                        { id: 'shapes-2nd', title: '여러 가지 도형', description: '삼각형, 사각형 등을 배워요.', link: '/grade/2/shapes', status: 'available' },
                        { id: 'addition-subtraction-2nd', title: '덧셈과 뺄셈', description: '두 자리 수 계산을 배워요.', link: '/grade/2/arithmetic', status: 'available' },
                        { id: 'length', title: '길이 재기', description: 'cm와 m를 배워요.', link: '/grade/2/length', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'four-digit', title: '네 자리 수', description: '천까지 배워요.', link: '/grade/2/four-digit', status: 'available' },
                        { id: 'multiplication-table', title: '곱셈구구', description: '2, 3, 5, 6단을 배워요.', link: '/grade/2/multiplication', status: 'available' },
                        { id: 'time', title: '시각과 시간', description: '시간을 계산해요.', link: '/grade/2/time', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 문제를 풀어보세요!', link: '#', status: 'coming-soon' },
            ]
        },
        3: {
            semesters: [
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
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'multiplication-2', title: '곱셈 (심화)', description: '더 큰 수의 곱셈을 도전해요.', link: '/grade/3/multiplication', status: 'available' },
                        { id: 'division-2', title: '나눗셈 (심화)', description: '나머지가 있는 나눗셈!', link: '/grade/3/division', status: 'available' },
                        { id: 'circle', title: '원', description: '중심, 반지름, 지름을 배워요.', link: '/grade/3/circle', status: 'available' },
                        { id: 'fraction-2', title: '분수 (심화)', description: '분수의 크기를 비교해요.', link: '/grade/3/fraction', status: 'available' },
                        { id: 'weight-volume', title: '들이와 무게', description: 'L, mL, kg, g 단위를 배워요.', link: '/grade/3/weight-volume', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 단원 문제를 풀어보세요!', link: '/grade/3/quiz', status: 'available' },
                { id: 'worksheet', title: '📄 학습지 출력', description: '원하는 단원 문제를 PDF로 뽑아요.', link: '/grade/3/worksheet', status: 'available' },
            ]
        },
        4: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'large-numbers', title: '큰 수', description: '만, 억, 조 단위의 숫자를 배워요.', link: '/grade/4/large-numbers', status: 'available' },
                        { id: 'angles', title: '각도', description: '각의 크기를 재고 어림해봐요.', link: '/grade/4/angles', status: 'available' },
                        { id: 'multi-div', title: '곱셈과 나눗셈', description: '세 자리 수의 곱셈과 나눗셈을 해요.', link: '/grade/4/arithmetic', status: 'available' },
                        { id: 'geometry-move', title: '평면도형의 이동', description: '밀기, 뒤집기, 돌리기를 배워요.', link: '/grade/4/geometry-move', status: 'available' },
                        { id: 'bar-graph', title: '막대그래프', description: '자료를 막대로 나타내봐요.', link: '/grade/4/bar-graph', status: 'available' },
                        { id: 'rules', title: '규칙 찾기', description: '우리 주변의 다양한 규칙을 찾아요.', link: '/grade/4/rules', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'fraction-calc', title: '분수의 덧셈과 뺄셈', description: '대분수의 계산을 배워요.', link: '/grade/4/fraction', status: 'coming-soon' },
                        { id: 'triangles', title: '삼각형', description: '삼각형의 성질과 종류를 배워요.', link: '/grade/4/triangle', status: 'coming-soon' },
                        { id: 'decimal-calc', title: '소수의 덧셈과 뺄셈', description: '소수의 자릿값을 알고 더하고 빼요.', link: '/grade/4/decimal', status: 'coming-soon' },
                        { id: 'quadrilaterals', title: '사각형', description: '평행사변형과 마름모를 배워요.', link: '/grade/4/quadrilateral', status: 'coming-soon' },
                        { id: 'line-graph', title: '꺾은선그래프', description: '변화하는 모습을 그래프로 그려요.', link: '/grade/4/line-graph', status: 'coming-soon' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '4학년 모든 문제를 풀어보세요!', link: '#', status: 'coming-soon' },
            ]
        }
    };

    const currentCurriculum = curriculumData[gradeId] || { smesters: [], tools: [] };

    return (
        <div className={styles.container}>
            <SEOHead title={`${gradeId}학년 수학 목차`} />
            <div className={styles.header}>
                <Link to="/" className={styles.backButton}>← 학년 선택으로</Link>
                <h1 className={styles.pageTitle}>{gradeId}학년 수학 탐험 지도 🗺️</h1>
            </div>

            {/* Semesters */}
            {currentCurriculum.semesters && currentCurriculum.semesters.map((sem, index) => (
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

            {/* Additional Tools */}
            {currentCurriculum.tools && currentCurriculum.tools.length > 0 && (
                <section className={styles.semesterSection}>
                    <h2 className={styles.semesterTitle}>📚 추가 학습 도구</h2>
                    <div className={styles.topicGrid}>
                        {currentCurriculum.tools.map((tool) => (
                            <Link
                                key={tool.id}
                                to={tool.link}
                                className={`${styles.topicCard} ${styles.toolCard}`}
                            >
                                <h3 className={styles.topicTitle}>{tool.title}</h3>
                                <p className={styles.topicDesc}>{tool.description}</p>
                                <span className={styles.playButton}>시작하기 ▶</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Curriculum;
