import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './Geometry6th.module.css'; // Reusing Geometry styles

const RoundGeometry6th = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'quiz'
    const [quiz, setQuiz] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const questions = [
            { q: "밑면이 2개이고 서로 평행하며 합동인 원으로 된 입체도형은?", a: "원기둥" },
            { q: "밑면이 원이고 옆면이 굽은 면이며 뾰족한 꼭짓점이 있는 입체도형은?", a: "원뿔" },
            { q: "공 모양처럼 어느 방향에서 보아도 원으로 보이는 입체도형은?", a: "구" },
            { q: "원기둥의 전개도를 펼치면 옆면의 모양은?", a: "직사각형" },
            { q: "원뿔에서 가장 뾰족한 부분의 점을 무엇이라 하나요?", a: "원뿔의 꼭짓점" }
        ];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setQuiz(randomQ);
        setFeedback(null);
    };

    const checkAnswer = (answer) => {
        if (answer === quiz.a) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        if (mode === 'quiz' && !quiz) generateQuiz();
    }, [mode]);

    return (
        <div className={styles.container}>
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 모양 탐험</Button>
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 퀴즈 도전</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.content}
                    >
                        <h1>원기둥, 원뿔, 구 🗼</h1>
                        <p>굽은 면을 가진 입체도형들의 특징을 알아볼까요?</p>
                        <div className={styles.parts}>
                            <div className={styles.pCard}>
                                <h3>원기둥</h3>
                                <p>밑면 2개, 옆면 1개</p>
                            </div>
                            <div className={styles.pCard}>
                                <h3>원뿔</h3>
                                <p>밑면 1개, 꼭짓점 1개</p>
                            </div>
                            <div className={styles.pCard}>
                                <h3>구</h3>
                                <p>어디서 봐도 원 모양</p>
                            </div>
                        </div>
                        <div className={styles.formulaBox}>
                            <p>💡 원기둥의 옆면을 펼치면 직사각형이 돼요!</p>
                            <p>💡 구에는 밑면도 꼭짓점도 없어요.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.quizCard}
                    >
                        <h2>도형 이름 맞히기 🎯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.q}</p>
                                <div className={styles.optionsGrid}>
                                    {["원기둥", "원뿔", "구", "직사각형", "원뿔의 꼭짓점"].map(opt => (
                                        <Button
                                            key={opt}
                                            onClick={() => checkAnswer(opt)}
                                            variant="outline"
                                        >
                                            {opt}
                                        </Button>
                                    ))}
                                </div>

                                <AnimatePresence>
                                    {feedback === 'correct' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.correct}>
                                            딩동댕! 정답입니다. 🎉
                                        </motion.p>
                                    )}
                                    {feedback === 'incorrect' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.incorrect}>
                                            다시 한번 생각해보세요. 🤔
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RoundGeometry6th;
