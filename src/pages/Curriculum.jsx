import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
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
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 문제를 풀어보세요!', link: '/grade/1/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '생각하며 푸는 문장형 수학 문제!', link: '/grade/1/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 문장제 학습지', description: '심화 문제를 종이로 출력해서 풀어요.', link: '/grade/1/word-problem-worksheet', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/1/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '집에서 종이로 직접 풀어보세요!', link: '/grade/1/worksheet', status: 'available' },
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
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 문제를 풀어보세요!', link: '/grade/2/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '상황을 이해하고 식으로 풀어봐요!', link: '/grade/2/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 문장제 학습지', description: '두 자리 수 문장제를 종이로 출력해요.', link: '/grade/2/word-problem-worksheet', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/2/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '오늘 배운 내용을 종이로 풀어보세요!', link: '/grade/2/worksheet', status: 'available' },
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
                { id: 'word-problem', title: '🧠 심화 문장제', description: '나눗셈, 분수, 시간 계산 등 어려운 문제 도전!', link: '/grade/3/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 문장제 학습지', description: '3학년 심화 문제를 종이로 출력해요.', link: '/grade/3/word-problem-worksheet', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/3/game', status: 'available' },
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
                        { id: 'fraction-calc', title: '분수의 덧셈과 뺄셈', description: '대분수의 계산을 배워요.', link: '/grade/4/fraction', status: 'available' },
                        { id: 'triangles', title: '삼각형', description: '삼각형의 성질과 종류를 배워요.', link: '/grade/4/triangle', status: 'available' },
                        { id: 'decimal-calc', title: '소수의 덧셈과 뺄셈', description: '소수의 자릿값을 알고 더하고 빼요.', link: '/grade/4/decimal', status: 'available' },
                        { id: 'quadrilaterals', title: '사각형', description: '평행사변형과 마름모를 배워요.', link: '/grade/4/quadrilateral', status: 'available' },
                        { id: 'line-graph', title: '꺾은선그래프', description: '변화하는 모습을 그래프로 그려요.', link: '/grade/4/line-graph', status: 'available' },
                        { id: 'polygons', title: '다각형', description: '변이 여러 개인 도형과 정다각형을 배워요.', link: '/grade/4/polygons', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '4학년 모든 문제를 풀어보세요!', link: '/grade/4/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '논리와 사고력을 키우는 4학년 문장제 문제!', link: '/grade/4/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 문장제 학습지', description: '4학년 심화 문제를 종이로 출력해요.', link: '/grade/4/word-problem-worksheet', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/4/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '단원평가 준비! 종이 학습지로 해봐요.', link: '/grade/4/worksheet', status: 'available' },
            ]
        },
        5: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'mixed-arithmetic', title: '자연수의 혼합 계산', description: '덧셈, 뺄셈, 곱셈, 나눗셈이 섞여 있는 식을 계산해요.', link: '/grade/5/mixed-arithmetic', status: 'available' },
                        { id: 'factors-multiples', title: '약수와 배수', description: '약수와 배수, 공약수와 공배수를 배워요.', link: '/grade/5/factors-multiples', status: 'available' },
                        { id: 'rules-response', title: '규칙과 대응', description: '두 양 사이의 관계를 찾아봐요.', link: '/grade/5/rules', status: 'available' },
                        { id: 'reduction-common-denom', title: '약분과 통분', description: '분수를 간단하게 만들고 분모를 같게 해요.', link: '/grade/5/reduction', status: 'available' },
                        { id: 'fraction-addition-subtraction', title: '분수의 덧셈과 뺄셈', description: '분모가 다른 분수의 계산을 배워요.', link: '/grade/5/fraction-arithmetic', status: 'available' },
                        { id: 'perimeters-areas', title: '다각형의 둘레와 넓이', description: '다각형의 둘레와 넓이 구하는 방법을 배워요.', link: '/grade/5/area', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'numbers-range', title: '수의 범위와 어림하기', description: '이상, 이하, 초과, 미만과 반올림을 배워요.', link: '/grade/5/range', status: 'available' },
                        { id: 'fraction-multiplication', title: '분수의 곱셈', description: '분수와 자연수, 분수와 분수의 곱셈을 해요.', link: '/grade/5/fraction-multiplication', status: 'available' },
                        { id: 'congruence-symmetry', title: '합동과 대칭', description: '모양이 같은 도형과 대칭을 배워요.', link: '/grade/5/congruence', status: 'available' },
                        { id: 'decimal-multiplication', title: '소수의 곱셈', description: '소수의 곱셈 원리를 배워요.', link: '/grade/5/decimal-multiplication', status: 'available' },
                        { id: 'cuboids', title: '직육면체', description: '직육면체와 정육면체의 성질을 배워요.', link: '/grade/5/cuboid', status: 'available' },
                        { id: 'average-possibility', title: '평균과 가능성', description: '평균을 구하고 일어날 가능성을 알아보아요.', link: '/grade/5/average', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '5학년 모든 문제를 풀어보세요!', link: '/grade/5/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '복합 연산과 원리를 활용한 5학년 문장제!', link: '/grade/5/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 문장제 학습지', description: '5학년 심화 문제를 종이로 출력해요.', link: '/grade/5/word-problem-worksheet', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/5/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '5학년 실력을 종이로 확인해봐요!', link: '/grade/5/worksheet', status: 'available' },
            ]
        },
        6: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'fraction-division', title: '분수의 나눗셈', description: '분수의 나눗셈 원리를 배워요.', link: '/grade/6/fraction-division', status: 'available' },
                        { id: 'prism-pyramid', title: '각기둥과 각뿔', description: '입체도형의 특징을 탐구해요.', link: '/grade/6/geometry', status: 'available' },
                        { id: 'decimal-division', title: '소수의 나눗셈', description: '소수의 나눗셈을 소수점 맞춰 계산해요.', link: '/grade/6/decimal-division', status: 'available' },
                        { id: 'ratio-proportion', title: '비와 비율', description: '비의 뜻과 백분율을 배워요.', link: '/grade/6/ratio', status: 'available' },
                        { id: 'graphs', title: '여러 가지 그래프', description: '띠그래프와 원그래프를 그려요.', link: '/grade/6/graphs', status: 'available' },
                        { id: 'volume-area', title: '직육면체의 부피와 겉넓이', description: '부피와 겉넓이 구하는 법을 배워요.', link: '/grade/6/volume', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'ratio-expression', title: '비례식과 비례배분', description: '비례식의 성질을 이용해 문제를 풀어요.', link: '/grade/6/proportion', status: 'available' },
                        { id: 'circle-area', title: '원의 넓이', description: '원주와 원의 넓이를 구해요.', link: '/grade/6/circle-area', status: 'available' },
                        { id: 'cylinder-cone-sphere', title: '원기둥, 원뿔, 구', description: '회전체의 성질을 배워요.', link: '/grade/6/round-geometry', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '6학년 모든 문제를 풀어보세요!', link: '/grade/6/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '6학년 사고력 쑥쑥 문장제 도전!', link: '/grade/6/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 문장제 학습지', description: '6학년 심화 문제를 종이로 출력해요.', link: '/grade/6/word-problem-worksheet', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/6/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '중학교 가기 전, 종이로 최종 점검!', link: '/grade/6/worksheet', status: 'available' },
            ]
        }
    };

    const currentCurriculum = curriculumData[gradeId] || { smesters: [], tools: [] };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <PageHeader title={`${gradeId}학년 수학 탐험 지도 🗺️`} />
            </div>

            <div className={styles.content}>
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
        </div>
    );
};

export default Curriculum;
