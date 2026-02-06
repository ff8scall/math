import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './PerimeterArea5th.module.css';

const PerimeterArea5th = () => {
    const [mode, setMode] = useState('rectangle'); // rectangle, parallelogram, triangle, trapezoid, rhombus, quiz

    const shapes = {
        rectangle: {
            title: "직사각형/정사각형",
            formula: "넓이 = 가로 × 세로",
            perimeter: "둘레 = (가로 + 세로) × 2",
            description: "단위 넓이(1cm²)가 가로, 세로만큼 몇 개 있는지 세어보는 것과 같아요.",
            color: "#3f51b5"
        },
        parallelogram: {
            title: "평행사변형",
            formula: "넓이 = 밑변 × 높이",
            description: "튀어나온 삼각형 부분을 잘라 반대편에 붙이면 직사각형이 돼요!",
            color: "#4caf50"
        },
        triangle: {
            title: "삼각형",
            formula: "넓이 = 밑변 × 높이 ÷ 2",
            description: "똑같은 삼각형 두 개를 합치면 평행사변형이 돼요. 그래서 2로 나눠줍니다.",
            color: "#ff9800"
        },
        trapezoid: {
            title: "사다리꼴",
            formula: "넓이 = (윗변 + 아랫변) × 높이 ÷ 2",
            description: "사다리꼴 두 개를 거꾸로 붙이면 커다란 평행사변형이 생겨요.",
            color: "#e91e63"
        },
        rhombus: {
            title: "마름모",
            formula: "넓이 = 한 대각선 × 다른 대각선 ÷ 2",
            description: "마름모를 둘러싼 직사각형 넓이의 딱 절반이에요.",
            color: "#9c27b0"
        }
    };

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const keys = Object.keys(shapes);
        const shapeKey = keys[Math.floor(Math.random() * keys.length)];
        const shape = shapes[shapeKey];

        const w = Math.floor(Math.random() * 8) + 4;
        const h = Math.floor(Math.random() * 6) + 3;

        let question, answer;

        switch (shapeKey) {
            case 'rectangle':
                question = `가로 ${w}cm, 세로 ${h}cm인 직사각형의 넓이는 몇 cm² 인가요?`;
                answer = (w * h).toString();
                break;
            case 'parallelogram':
                question = `밑변 ${w}cm, 높이 ${h}cm인 평행사변형의 넓이는 몇 cm² 인가요?`;
                answer = (w * h).toString();
                break;
            case 'triangle':
                const tw = w * 2; // to keep it integer
                question = `밑변 ${tw}cm, 높이 ${h}cm인 삼각형의 넓이는 몇 cm² 인가요?`;
                answer = (tw * h / 2).toString();
                break;
            case 'trapezoid':
                const top = 4, bottom = 6;
                question = `윗변 ${top}cm, 아랫변 ${bottom}cm, 높이 ${h}cm인 사다리꼴의 넓이는 몇 cm² 인가요?`;
                answer = ((top + bottom) * h / 2).toString();
                break;
            case 'rhombus':
                const d1 = 8, d2 = 6;
                question = `두 대각선의 길이가 각각 ${d1}cm, ${d2}cm인 마름모의 넓이는 몇 cm² 인가요?`;
                answer = (d1 * d2 / 2).toString();
                break;
            default: break;
        }

        setQuizData({ question, answer, shape });
        setUserAnswer('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'quiz' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (userAnswer === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(5);
            setTimeout(generateQuiz, 2500);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                {Object.keys(shapes).map(s => (
                    <Button key={s} onClick={() => setMode(s)} variant={mode === s ? 'primary' : 'secondary'} size="small">{shapes[s].title}</Button>
                ))}
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'} size="small">🏆 넓이 퀴즈왕</Button>
            </div>

            {mode !== 'quiz' ? (
                <div className={styles.contentArea}>
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.infoCard}
                        style={{ borderTop: `8px solid ${shapes[mode].color}` }}
                    >
                        <h1 className={styles.title}>{shapes[mode].title} 탐험 📐</h1>
                        <p className={styles.description}>{shapes[mode].description}</p>

                        <div className={styles.formulaBox}>
                            <div className={styles.formula}>{shapes[mode].formula}</div>
                            {shapes[mode].perimeter && <div className={styles.perimeter}>{shapes[mode].perimeter}</div>}
                        </div>

                        <div className={styles.visualizer}>
                            {/* Simple Visual Animation placeholders */}
                            <div className={styles.shapePreview} style={{ backgroundColor: `${shapes[mode].color}22`, borderColor: shapes[mode].color }}>
                                {mode === 'rectangle' && <div className={styles.rect} style={{ borderColor: shapes[mode].color }}></div>}
                                {mode === 'parallelogram' && <div className={styles.para} style={{ borderColor: shapes[mode].color }}></div>}
                                {mode === 'triangle' && <div className={styles.tri} style={{ borderBottomColor: shapes[mode].color }}></div>}
                                {mode === 'trapezoid' && <div className={styles.trap} style={{ borderBottomColor: shapes[mode].color }}></div>}
                                {mode === 'rhombus' && <div className={styles.rhom} style={{ backgroundColor: shapes[mode].color }}></div>}
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className={styles.quizArea}>
                    <h2 className={styles.title}>도전! 넓이의 달인 👑</h2>
                    {quizData && (
                        <div className={styles.quizCard}>
                            <p className={styles.question}>{quizData.question}</p>
                            <div className={styles.inputGroup}>
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={e => setUserAnswer(e.target.value)}
                                    placeholder="정답"
                                    onKeyDown={e => e.key === 'Enter' && checkAnswer()}
                                />
                                <span className={styles.unit}>cm²</span>
                                <Button onClick={checkAnswer} variant="primary">확인</Button>
                            </div>
                            <AnimatePresence>
                                {feedback === 'correct' && <motion.p className={styles.correct}>완벽해요! 당신은 넓이의 달인입니다. ✨</motion.p>}
                                {feedback === 'incorrect' && <motion.p className={styles.incorrect}>힌트: 공식을 다시 한번 생각해보세요!</motion.p>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.tipBox}>
                <h3>💡 꼭 기억해요!</h3>
                <p>• 넓이의 단위는 <strong>cm²</strong>(제곱센티미터) 또는 <strong>m²</strong>(제곱미터)를 사용해요.</p>
                <p>• 1m²는 가로, 세로가 각각 100cm이므로 <strong>10,000cm²</strong>와 같아요!</p>
            </div>

            <JsonLd data={generateCourseSchema("다각형의 둘레와 넓이", "사각형, 삼각형, 평행사변형, 사다리꼴, 마름모의 둘레와 넓이 구하는 법을 배웁니다.")} />
        </div>
    );
};

export default PerimeterArea5th;
