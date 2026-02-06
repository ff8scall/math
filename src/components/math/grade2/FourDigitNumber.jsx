import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './FourDigitNumber.module.css';

const FourDigitNumber = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'quiz'

    // Explore State
    const [thousands, setThousands] = useState(3);
    const [hundreds, setHundreds] = useState(5);
    const [tens, setTens] = useState(2);
    const [ones, setOnes] = useState(7);
    const num = thousands * 1000 + hundreds * 100 + tens * 10 + ones;

    // Quiz State
    const [quiz, setQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const type = Math.floor(Math.random() * 2); // 0: build number, 1: find place value
        const q_th = Math.floor(Math.random() * 9) + 1;
        const q_h = Math.floor(Math.random() * 10);
        const q_t = Math.floor(Math.random() * 10);
        const q_o = Math.floor(Math.random() * 10);
        const q_num = q_th * 1000 + q_h * 100 + q_t * 10 + q_o;

        let question, answer;

        if (type === 0) {
            question = `천 ${q_th}개, 백 ${q_h}개, 십 ${q_t}개, 일 ${q_o}개인 수는 무엇일까요?`;
            answer = q_num.toString();
        } else {
            const places = ['천', '백', '십', '일'];
            const placeIdx = Math.floor(Math.random() * 4);
            const targetPlace = places[placeIdx];
            question = `${q_num}에서 ${targetPlace}의 자리 숫자는 무엇인가요?`;
            answer = [q_th, q_h, q_t, q_o][placeIdx].toString();
        }

        setQuiz({ question, answer });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!quiz) return;
        if (userAnswer === quiz.answer) {
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
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 네 자리 수 탐험</Button>
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 퀴즈 도전</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h2 className={styles.title}>네 자리 수 🔢</h2>
                        <div className={styles.numberDisplay}>
                            <span className={styles.bigNumber}>{num}</span>
                        </div>
                        <div className={styles.placeValues}>
                            <div className={styles.place}>
                                <div className={styles.label}>천</div>
                                <div className={styles.controls}>
                                    <button onClick={() => setThousands(Math.max(1, thousands - 1))}>-</button>
                                    <span>{thousands}</span>
                                    <button onClick={() => setThousands(Math.min(9, thousands + 1))}>+</button>
                                </div>
                            </div>
                            <div className={styles.place}>
                                <div className={styles.label}>백</div>
                                <div className={styles.controls}>
                                    <button onClick={() => setHundreds(Math.max(0, hundreds - 1))}>-</button>
                                    <span>{hundreds}</span>
                                    <button onClick={() => setHundreds(Math.min(9, hundreds + 1))}>+</button>
                                </div>
                            </div>
                            <div className={styles.place}>
                                <div className={styles.label}>십</div>
                                <div className={styles.controls}>
                                    <button onClick={() => setTens(Math.max(0, tens - 1))}>-</button>
                                    <span>{tens}</span>
                                    <button onClick={() => setTens(Math.min(9, tens + 1))}>+</button>
                                </div>
                            </div>
                            <div className={styles.place}>
                                <div className={styles.label}>일</div>
                                <div className={styles.controls}>
                                    <button onClick={() => setOnes(Math.max(0, ones - 1))}>-</button>
                                    <span>{ones}</span>
                                    <button onClick={() => setOnes(Math.min(9, ones + 1))}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.helpBox}>
                            <p>1000 = 천 1개 = 백 10개</p>
                            <p>{num} = {thousands}천 {hundreds}백 {tens}십 {ones}</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles.quizCard}
                    >
                        <h2>자릿수 퀴즈 🎯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.question}</p>
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                    placeholder="정답"
                                    className={styles.quizInput}
                                />
                                <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                                <AnimatePresence>
                                    {feedback === 'correct' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.correct}>
                                            정답입니다! 🎉 (+10 코인)
                                        </motion.p>
                                    )}
                                    {feedback === 'incorrect' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.incorrect}>
                                            다시 한번 풀어볼까요? 🤔
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

export default FourDigitNumber;
