import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './CongruenceSymmetry5th.module.css';

const CongruenceSymmetry5th = () => {
    const [mode, setMode] = useState('explore');
    const [subMode, setSubMode] = useState('congruence'); // 'congruence' | 'symmetry'
    const [quiz, setQuiz] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const questions = [
            { q: "모양과 크기가 똑같아서 포개었을 때 완전히 겹쳐지는 두 도형의 관계는?", a: "합동" },
            { q: "한 직선을 따라 접었을 때 완전히 겹쳐지는 도형은?", a: "선대칭도형" },
            { q: "한 점을 중심으로 180도 돌렸을 때 처음 도형과 완전히 겹치는 도형은?", a: "점대칭도형" },
            { q: "대칭의 중심에서 대응점까지의 거리는 서로 어떤가요?", a: "같다" },
            { q: "합동인 두 도형에서 대응변의 길이는 서로 어떤가요?", a: "같다" }
        ];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        setQuiz(randomQ);
        setFeedback(null);
    };

    const checkAnswer = (ans) => {
        if (ans === quiz.a) {
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
                        <div className={styles.modeTabs}>
                            <Button onClick={() => setSubMode('congruence')} variant={subMode === 'congruence' ? 'primary' : 'secondary'}>🤝 합동</Button>
                            <Button onClick={() => setSubMode('symmetry')} variant={subMode === 'symmetry' ? 'primary' : 'secondary'}>🪞 대칭</Button>
                        </div>

                        <div className={styles.innerContent}>
                            {subMode === 'congruence' ? (
                                <div className={styles.sec}>
                                    <h1>도형의 합동 🤝</h1>
                                    <p>모양과 크기가 똑같아서 포개었을 때 완전히 겹쳐지는 두 도형을 **합동**이라고 합니다.</p>
                                    <div className={styles.visualBoard}>
                                        <motion.div className={styles.rect} animate={{ x: [0, 60, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                                        <div className={styles.rect} />
                                    </div>
                                    <p className={styles.hint}>포개어지는 대응변의 길이와 대응각의 크기가 같아요!</p>
                                </div>
                            ) : (
                                <div className={styles.sec}>
                                    <h1>선대칭과 점대칭 🪞</h1>
                                    <div className={styles.symmetryBox}>
                                        <h3>• 선대칭도형</h3>
                                        <p>한 직선(대칭축)을 따라 접었을 때 완전히 겹쳐지는 도형입니다.</p>
                                    </div>
                                    <div className={styles.symmetryBox}>
                                        <h3>• 점대칭도형</h3>
                                        <p>한 점(대칭의 중심)을 중심으로 180도 돌렸을 때 완전히 겹쳐지는 도형입니다.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.quizCard}>
                        <h2>합동과 대칭 퀴즈 💯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.q}</p>
                                <div className={styles.optionsGrid}>
                                    {["합동", "선대칭도형", "점대칭도형", "같다", "다르다"].map(opt => (
                                        <Button key={opt} onClick={() => checkAnswer(opt)} variant="outline">{opt}</Button>
                                    ))}
                                </div>
                                <AnimatePresence>
                                    {feedback === 'correct' && <p className={styles.correct}>대단해요! 도형 박사님이시네요 🎉</p>}
                                    {feedback === 'incorrect' && <p className={styles.incorrect}>아쉬워요! 다시 한번 읽어볼까요? 🧐</p>}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("합동과 대칭", "합동인 도형의 성질과 선대칭, 점대칭 도형을 배웁니다.")} />
        </div>
    );
};

export default CongruenceSymmetry5th;
