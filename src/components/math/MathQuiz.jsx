import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins, getStorageData } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css';

const MathQuiz = () => {
    const [topic, setTopic] = useState(null); // 'addition', 'subtraction', 'multiplication', 'division'
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
    const [score, setScore] = useState(0);
    const inputRef = useRef(null);

    // Coin animation state
    const [coinsEarned, setCoinsEarned] = useState(0);

    useEffect(() => {
        if (topic) {
            generateProblem();
        }
    }, [topic]);

    useEffect(() => {
        if (problem && inputRef.current) {
            inputRef.current.focus();
        }
    }, [problem]);

    const generateProblem = () => {
        let n1, n2, operator, ans;

        switch (topic) {
            case 'addition':
                // Two or Three digit addition
                n1 = Math.floor(Math.random() * 90) + 10;
                n2 = Math.floor(Math.random() * 90) + 10;
                operator = '+';
                ans = n1 + n2;
                break;
            case 'subtraction':
                // Ensure positive result
                n1 = Math.floor(Math.random() * 90) + 10;
                n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
                operator = '-';
                ans = n1 - n2;
                break;
            case 'multiplication':
                // Googudan (2~9)
                n1 = Math.floor(Math.random() * 8) + 2;
                n2 = Math.floor(Math.random() * 9) + 1;
                operator = '×';
                ans = n1 * n2;
                break;
            case 'division':
                // Simple division with no remainder for quiz
                n2 = Math.floor(Math.random() * 8) + 2; // divisor
                ans = Math.floor(Math.random() * 9) + 1; // quotient
                n1 = n2 * ans; // dividend
                operator = '÷';
                break;
            default:
                return;
        }

        setProblem({ n1, n2, operator, ans });
        setUserAnswer('');
        setFeedback(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer) return;

        if (parseInt(userAnswer) === problem.ans) {
            handleCorrect();
        } else {
            handleIncorrect();
        }
    };

    const handleCorrect = () => {
        setFeedback('correct');
        setScore(score + 10);
        updateCoins(10); // +10 Coins!
        setCoinsEarned(prev => prev + 10);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            generateProblem();
        }, 1500);
    };

    const handleIncorrect = () => {
        setFeedback('incorrect');
        // Shake animation handled by framer motion layout in UI
        inputRef.current.focus();
    };

    if (!topic) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>도전! 수학 퀴즈왕 👑</h2>
                <p className={styles.subtitle}>문제를 풀고 코인을 모아보세요!</p>
                <div className={styles.topicGrid}>
                    <button className={styles.topicBtn} onClick={() => setTopic('addition')}>
                        <span className={styles.icon}>➕</span> 덧셈
                    </button>
                    <button className={styles.topicBtn} onClick={() => setTopic('subtraction')}>
                        <span className={styles.icon}>➖</span> 뺄셈
                    </button>
                    <button className={styles.topicBtn} onClick={() => setTopic('multiplication')}>
                        <span className={styles.icon}>✖️</span> 곱셈
                    </button>
                    <button className={styles.topicBtn} onClick={() => setTopic('division')}>
                        <span className={styles.icon}>➗</span> 나눗셈
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button onClick={() => setTopic(null)} variant="secondary" size="small">나가기</Button>
                <div className={styles.scoreBadge}>점수: {score}</div>
            </div>

            <div className={styles.quizCard}>
                <div className={styles.problemDisplay}>
                    <span className={styles.number}>{problem?.n1}</span>
                    <span className={styles.operator}>{problem?.operator}</span>
                    <span className={styles.number}>{problem?.n2}</span>
                    <span className={styles.operator}>=</span>
                    <span className={styles.questionMark}>?</span>
                </div>

                <form onSubmit={handleSubmit} className={styles.answerForm}>
                    <input
                        ref={inputRef}
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className={`${styles.input} ${feedback === 'incorrect' ? styles.error : ''}`}
                        placeholder="정답"
                        disabled={feedback === 'correct'}
                    />
                    <Button type="submit" disabled={feedback === 'correct'}>제출하기</Button>
                </form>

                <AnimatePresence>
                    {feedback === 'correct' && (
                        <motion.div
                            className={styles.feedbackCorrect}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            정답! +10 코인 🪙
                        </motion.div>
                    )}
                    {feedback === 'incorrect' && (
                        <motion.div
                            className={styles.feedbackIncorrect}
                            initial={{ x: -10 }}
                            animate={{ x: [0, -10, 10, -10, 10, 0] }}
                        >
                            다시 한번 생각해보세요! 🤔
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MathQuiz;
