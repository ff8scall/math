import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './Polygons4th.module.css';

const Polygons4th = () => {
    const [mode, setMode] = useState('explore');
    const [sides, setSides] = useState(3);
    const [isRegular, setIsRegular] = useState(true);

    const polygonNames = {
        3: '삼각형',
        4: '사각형',
        5: '오각형',
        6: '육각형',
        7: '칠각형',
        8: '팔각형',
        9: '구각형',
        10: '십각형'
    };

    const getPoints = (n, regular = true) => {
        const radius = 100;
        const center = 150;
        let points = [];
        for (let i = 0; i < n; i++) {
            const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
            const r = regular ? radius : radius * (0.6 + Math.random() * 0.4);
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    };

    const [currentPoints, setCurrentPoints] = useState(getPoints(3));

    useEffect(() => {
        setCurrentPoints(getPoints(sides, isRegular));
    }, [sides, isRegular]);

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const type = Math.random() > 0.5 ? 'name' : 'diagonal';
        if (type === 'name') {
            const n = Math.floor(Math.random() * 6) + 3; // 3 to 8
            setQuizData({
                type: 'name',
                question: `변이 ${n}개인 다각형의 이름은 무엇일까요?`,
                answer: polygonNames[n],
                choices: [polygonNames[n], polygonNames[n + 1] || '삼각형', polygonNames[n - 1] || '십각형', '원'].sort(() => Math.random() - 0.5)
            });
        } else {
            const n = 4; // Use square for simplicity in 4th grade diagonal basic
            setQuizData({
                type: 'diagonal',
                question: `사각형에서 서로 이웃하지 않는 두 꼭짓점을 이은 선분을 무엇이라고 할까요?`,
                answer: '대각선',
                choices: ['대각선', '직선', '곡선', '변'].sort(() => Math.random() - 0.5)
            });
        }
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = (choice) => {
        if (choice === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(2);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 다각형 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h1 className={styles.title}>다각형 탐험 📐</h1>
                    <p className={styles.subtitle}>변의 개수에 따라 이름이 달라지는 다각형을 만나요!</p>

                    <div className={styles.exploreCard}>
                        <div className={styles.visualizer}>
                            <svg width="300" height="300" viewBox="0 0 300 300" className={styles.svgArea}>
                                <motion.polygon
                                    key={`${sides}-${isRegular}`}
                                    points={currentPoints}
                                    fill="rgba(255, 152, 0, 0.2)"
                                    stroke="#ff9800"
                                    strokeWidth="5"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                />
                                {isRegular && (
                                    <text x="150" y="280" textAnchor="middle" className={styles.shapeLabel}>
                                        정{polygonNames[sides]}
                                    </text>
                                )}
                            </svg>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.controlGroup}>
                                <label>변의 개수: {sides}개</label>
                                <div className={styles.sideButtons}>
                                    {[3, 4, 5, 6, 8, 10].map(n => (
                                        <Button
                                            key={n}
                                            onClick={() => setSides(n)}
                                            variant={sides === n ? 'primary' : 'secondary'}
                                            size="small"
                                        >
                                            {n}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.controlGroup}>
                                <Button
                                    onClick={() => setIsRegular(!isRegular)}
                                    variant={isRegular ? 'primary' : 'secondary'}
                                    size="medium"
                                >
                                    {isRegular ? '✨ 정다각형 모드' : '🎨 일반 다각형 모드'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoCards}>
                        <div className={styles.infoCard}>
                            <h3>📏 다각형이란?</h3>
                            <p>선분으로만 둘러싸인 도형을 말해요. 변이 3개면 삼각형, 4개면 사각형...</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>✨ 정다각형이란?</h3>
                            <p>변의 길이가 모두 같고, 각의 크기가 모두 같은 다각형이에요.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>↗️ 대각선이란?</h3>
                            <p>다각형에서 서로 이웃하지 않는 두 꼭짓점을 이은 선분이에요.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>다각형 퀴즈왕 👑</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>
                            <div className={styles.choiceGrid}>
                                {quizData.choices.map(choice => (
                                    <button
                                        key={choice}
                                        onClick={() => checkAnswer(choice)}
                                        className={styles.choiceItem}
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! 아주 잘했어요!</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 힌트: 변의 숫자를 잘 세어보세요!</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("다각형", "다각형의 정의, 정다각형의 성질, 대각선의 뜻을 배웁니다.")} />
        </div>
    );
};

export default Polygons4th;
