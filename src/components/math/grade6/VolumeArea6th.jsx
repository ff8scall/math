import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import PageHeader from '../../common/PageHeader';
import styles from './VolumeArea6th.module.css';

const VolumeArea6th = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'practice'
    const [quiz, setQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const type = Math.floor(Math.random() * 2); // 0: volume, 1: surface area
        const w = Math.floor(Math.random() * 5) + 2;
        const h = Math.floor(Math.random() * 5) + 2;
        const d = Math.floor(Math.random() * 5) + 2;

        let question, answer, unit;

        if (type === 0) {
            question = `가로 ${w}cm, 세로 ${h}cm, 높이 ${d}cm인 직육면체의 부피는 얼마인가요?`;
            answer = (w * h * d).toString();
            unit = "cm³";
        } else {
            // Surface area: 2*(w*h + h*d + w*d)
            question = `가로 ${w}cm, 세로 ${h}cm, 높이 ${d}cm인 직육면체의 겉넓이는 얼마인가요?`;
            answer = (2 * (w * h + h * d + w * d)).toString();
            unit = "cm²";
        }

        setQuiz({ question, answer, unit });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!quiz) return;
        if (userAnswer.trim() === quiz.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(20);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        if (mode === 'practice' && !quiz) generateQuiz();
    }, [mode]);

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.content}
                    >
                        <h2>직육면체의 부피와 겉넓이 원리 📦</h2>
                        <div className={styles.card}>
                            <h2>부피 (Volume)</h2>
                            <p className={styles.formula}>부피 = 가로 × 세로 × 높이</p>
                            <p>단위: cm³, m³</p>
                        </div>
                        <div className={styles.card}>
                            <h2>겉넓이 (Surface Area)</h2>
                            <p className={styles.formula}>겉넓이 = (밑넓이 × 2) + (옆넓이)</p>
                            <p>6개 면의 넓이를 모두 더한 값이에요.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="practice"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.quizCard}
                    >
                        <h2>부피와 겉넓이 도전! 🎯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.question}</p>
                                <div className={styles.inputArea}>
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                        placeholder="정답"
                                        className={styles.quizInput}
                                    />
                                    <span className={styles.unit}>{quiz.unit}</span>
                                </div>
                                <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                                <AnimatePresence>
                                    {feedback === 'correct' && <motion.p className={styles.correct}>정답입니다! 완벽해요 📦🎉 (+20 코인)</motion.p>}
                                    {feedback === 'incorrect' && <motion.p className={styles.incorrect}>다시 한번 가로x세로x높이 해볼까? 🤔</motion.p>}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("직육면체의 부피와 겉넓이", "직육면체의 부피와 겉넓이 구하는 공식을 배웁니다.")} />
        </div>
    );
};

export default VolumeArea6th;
