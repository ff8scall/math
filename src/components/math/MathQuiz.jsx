import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins, getStorageData } from '../../utils/storage/storageManager';
import PageHeader from '../common/PageHeader';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css';

const MathQuiz = () => {
    const [topic, setTopic] = useState(null);
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', 'skipped'
    const [score, setScore] = useState(0);
    const inputRef = useRef(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [problemsSolved, setProblemsSolved] = useState(0);
    const [showMilestone, setShowMilestone] = useState(false);

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
        let n1, n2, operator, ans, questionText, explanation;

        switch (topic) {
            case 'addition':
                // Three-digit addition for 3rd grade level
                n1 = Math.floor(Math.random() * 800) + 100;
                n2 = Math.floor(Math.random() * 800) + 100;
                operator = '+';
                ans = n1 + n2;
                explanation = `${n1} + ${n2} = ${ans}`;
                break;
            case 'subtraction':
                // Three-digit subtraction
                n1 = Math.floor(Math.random() * 800) + 200;
                n2 = Math.floor(Math.random() * (n1 - 50)) + 50;
                operator = '-';
                ans = n1 - n2;
                explanation = `${n1} - ${n2} = ${ans}`;
                break;
            case 'multiplication':
                // Googudan (2~9)
                n1 = Math.floor(Math.random() * 8) + 2;
                n2 = Math.floor(Math.random() * 9) + 1;
                operator = '×';
                ans = n1 * n2;
                explanation = `${n1} × ${n2} = ${ans} (${n1}을 ${n2}번 더한 값)`;
                break;
            case 'division':
                // Simple division with no remainder for quiz
                n2 = Math.floor(Math.random() * 8) + 2; // divisor
                ans = Math.floor(Math.random() * 9) + 1; // quotient
                n1 = n2 * ans; // dividend
                operator = '÷';
                explanation = `${n1} ÷ ${n2} = ${ans} (${n1}을 ${n2}개씩 나누면 ${ans}개)`;
                break;
            case 'fraction':
                // Simple fraction addition with same denominator
                const denom = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
                const num2 = Math.floor(Math.random() * (denom - num1)) + 1;
                questionText = `${num1}/${denom} + ${num2}/${denom} = ?/${denom}`;
                ans = num1 + num2;
                explanation = `분모가 같으면 분자끼리 더해요: ${num1} + ${num2} = ${ans}`;
                break;
            case 'length':
                // cm to mm or vice versa
                if (Math.random() > 0.5) {
                    const cm = Math.floor(Math.random() * 20) + 1;
                    questionText = `${cm}cm = ? mm`;
                    ans = cm * 10;
                    explanation = `1cm = 10mm이므로, ${cm}cm = ${ans}mm`;
                } else {
                    const m = Math.floor(Math.random() * 3) + 1;
                    const cm = Math.floor(Math.random() * 50);
                    questionText = `${m}m ${cm}cm = ? cm`;
                    ans = m * 100 + cm;
                    explanation = `1m = 100cm이므로, ${m}m = ${m * 100}cm, 따라서 ${m * 100} + ${cm} = ${ans}cm`;
                }
                break;
            case 'time':
                // Hours calculation
                const startH = Math.floor(Math.random() * 9) + 1;
                const addH = Math.floor(Math.random() * 3) + 1;
                questionText = `${startH}시에서 ${addH}시간 후는 몇 시?`;
                ans = (startH + addH) > 12 ? (startH + addH - 12) : (startH + addH);
                explanation = `${startH}시 + ${addH}시간 = ${startH + addH >= 12 ? (startH + addH - 12) + '시 (오후)' : (startH + addH) + '시'}`;
                break;
            case 'circle':
                // Radius to diameter or vice versa
                if (Math.random() > 0.5) {
                    const radius = Math.floor(Math.random() * 8) + 3;
                    questionText = `반지름이 ${radius}cm인 원의 지름은?`;
                    ans = radius * 2;
                    explanation = `지름 = 반지름 × 2 = ${radius} × 2 = ${ans}cm`;
                } else {
                    const diameter = (Math.floor(Math.random() * 8) + 3) * 2;
                    questionText = `지름이 ${diameter}cm인 원의 반지름은?`;
                    ans = diameter / 2;
                    explanation = `반지름 = 지름 ÷ 2 = ${diameter} ÷ 2 = ${ans}cm`;
                }
                break;
            default:
                return;
        }

        setProblem({
            num1: n1,
            num2: n2,
            operator,
            answer: ans,
            questionText: questionText || `${n1} ${operator} ${n2} = ?`,
            explanation: explanation
        });
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer) return;

        if (parseInt(userAnswer) === problem.answer) {
            handleCorrect();
        } else {
            handleIncorrect();
        }
    };

    const handleCorrect = () => {
        setFeedback('correct');
        const newSolved = problemsSolved + 1;
        setProblemsSolved(newSolved);
        
        setScore(score + 5);
        let bonus = (newSolved % 10 === 0) ? 50 : 5;
        updateCoins(bonus); // Standard +5, Bonus +50
        setCoinsEarned(prev => prev + bonus);

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });

        if (newSolved % 10 === 0) {
            setShowMilestone(true);
        } else {
            setTimeout(() => {
                generateProblem();
            }, 1500);
        }
    };

    const handleIncorrect = () => {
        setFeedback('incorrect');
        inputRef.current.focus();
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setFeedback('skipped');
    };

    const handleNextProblem = () => {
        generateProblem();
    };

    if (!topic) {
        return (
            <div className={styles.container}>
                <PageHeader />
                <h2 className={styles.title}>도전! 수학 퀴즈왕</h2>
                <p className={styles.subtitle}>1학기+2학기 전체 문제를 풀고 코인을 모아보세요!</p>
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
                    <button className={styles.topicBtn} onClick={() => setTopic('fraction')}>
                        <span className={styles.icon}>🍕</span> 분수
                    </button>
                    <button className={styles.topicBtn} onClick={() => setTopic('length')}>
                        <span className={styles.icon}>📏</span> 길이
                    </button>
                    <button className={styles.topicBtn} onClick={() => setTopic('time')}>
                        <span className={styles.icon}>⏰</span> 시간
                    </button>
                    <button className={styles.topicBtn} onClick={() => setTopic('circle')}>
                        <span className={styles.icon}>🔵</span> 원
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
                    {problem?.questionText ? (
                        <span className={styles.questionText}>{problem.questionText}</span>
                    ) : (
                        <>
                            <span className={styles.number}>{problem?.num1}</span>
                            <span className={styles.operator}>{problem?.operator}</span>
                            <span className={styles.number}>{problem?.num2}</span>
                            <span className={styles.operator}>=</span>
                            <span className={styles.questionMark}>?</span>
                        </>
                    )}
                </div>

                <form onSubmit={handleSubmit} className={styles.answerForm}>
                    <input
                        ref={inputRef}
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className={`${styles.input} ${feedback === 'incorrect' ? styles.error : ''}`}
                        placeholder="정답"
                        disabled={feedback === 'correct' || showAnswer}
                    />
                    <div className={styles.buttons}>
                        <Button type="submit" disabled={feedback === 'correct' || showAnswer} fullWidth size="large" variant="primary">제출하기</Button>
                        {!showAnswer && feedback !== 'correct' && (
                            <Button type="button" onClick={handleShowAnswer} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                        )}
                    </div>
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
                    {showAnswer && (
                        <motion.div
                            className={styles.feedbackSkipped}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.answerBox}>
                                <p style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#2196F3' }}>
                                    <strong>정답:</strong> {problem.answer}
                                </p>
                                <p className={styles.explanation} style={{ color: '#666', fontSize: '1.1rem' }}>
                                    {problem.explanation}
                                </p>
                            </div>
                            <Button onClick={handleNextProblem} style={{ marginTop: '15px' }}>다음 문제</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {showMilestone && (
                <div className={styles.modalOverlay}>
                    <motion.div 
                        className={styles.milestoneModal}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className={styles.milestoneIcon}>🏆</div>
                        <h2>대단해요! 10문제를 풀었어요!</h2>
                        <p>꾸준히 노력하는 모습이 정말 멋져요!</p>
                        <div className={styles.rewardBanner}>
                            <span className={styles.rewardCoin}>🪙 +50 보너스 코인!</span>
                        </div>
                        <Button 
                            onClick={() => {
                                setShowMilestone(false);
                                generateProblem();
                            }}
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            계속해서 공부하기 👉
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MathQuiz;
