import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './Cuboids5th.module.css';

const Cuboids5th = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'practice'
    const [quiz, setQuiz] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const questions = [
            { q: "직육면체의 면은 모두 몇 개인가요?", a: "6" },
            { q: "직육면체의 모서리는 모두 몇 개인가요?", a: "12" },
            { q: "직육면체의 꼭짓점은 모두 몇 개인가요?", a: "8" },
            { q: "정사각형 6개로 둘러싸인 직육면체를 뭐라고 하나요?", a: "정육면체" },
            { q: "직육면체에서 서로 마주보고 있는 면은 서로 어떤가요?", a: "평행하다" }
        ];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setQuiz(randomQ);
        setFeedback(null);
    };

    const checkAnswer = (ans) => {
        if (ans.toString().trim() === quiz.a) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
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
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.content}>
                        <h1>직육면체 🧊</h1>
                        <p>직사각형 6개로 둘러싸인 도형을 **직육면체**라고 합니다.</p>
                        <div className={styles.parts}>
                            <div className={styles.pCard}>면 (6개)</div>
                            <div className={styles.pCard}>모서리 (12개)</div>
                            <div className={styles.pCard}>꼭짓점 (8개)</div>
                        </div>
                        <div className={styles.visual}>
                            <div className={styles.cubeFrame}>
                                <motion.div className={styles.cube} animate={{ rotateY: 360, rotateX: 20 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                                    <div className={styles.front}>앞</div>
                                    <div className={styles.back}>뒤</div>
                                    <div className={styles.top}>위</div>
                                    <div className={styles.bottom}>아래</div>
                                    <div className={styles.left}>왼</div>
                                    <div className={styles.right}>오</div>
                                </motion.div>
                            </div>
                        </div>
                        <p className={styles.infoText}>💡 정육면체는 모든 면이 정사각형인 직육면체예요!</p>
                    </motion.div>
                ) : (
                    <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.quizCard}>
                        <h2>직육면체 퀴즈 💯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.q}</p>
                                <div className={styles.optionsGrid}>
                                    {["4", "6", "8", "12", "정육면체", "평행하다", "수직이다"].map(opt => (
                                        <Button key={opt} onClick={() => checkAnswer(opt)} variant="outline">{opt}</Button>
                                    ))}
                                </div>
                                <AnimatePresence>
                                    {feedback === 'correct' && <p className={styles.correct}>정답입니다! 공간 지각력이 뛰어나시네요 🎉</p>}
                                    {feedback === 'incorrect' && <p className={styles.incorrect}>다시 한번 세어보거나 생각해보세요 🤔</p>}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("직육면체", "직육면체와 정육면체의 구성 요소와 성질을 배웁니다.")} />
        </div>
    );
};

export default Cuboids5th;
