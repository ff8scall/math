import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css';

const Grade2Quiz = () => {
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const inputRef = useRef(null);

    const generateProblem = () => {
        const topics = ['three-digit', 'arithmetic', 'multiplication', 'length', 'time'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        let q, ans, exp;

        switch (topic) {
            case 'three-digit':
                const h = Math.floor(Math.random() * 8) + 1;
                const t = Math.floor(Math.random() * 9);
                const o = Math.floor(Math.random() * 9);
                q = `백이 ${h}, 십이 ${t}, 일이 ${o}인 세 자리 수는 무엇인가요?`;
                ans = (h * 100 + t * 10 + o).toString();
                exp = `각 자리의 숫자를 합치면 ${ans}입니다.`;
                break;
            case 'arithmetic':
                const n1 = Math.floor(Math.random() * 50) + 10;
                const n2 = Math.floor(Math.random() * 40) + 10;
                const isAdd = Math.random() > 0.5;
                if (isAdd) {
                    q = `${n1} + ${n2} 는 얼마인가요?`;
                    ans = (n1 + n2).toString();
                    exp = `두 수를 더하면 ${ans}가 됩니다.`;
                } else {
                    const bigger = Math.max(n1, n2);
                    const smaller = Math.min(n1, n2);
                    q = `${bigger} - ${smaller} 는 얼마인가요?`;
                    ans = (bigger - smaller).toString();
                    exp = `큰 수에서 작은 수를 빼면 ${ans}가 남아요.`;
                }
                break;
            case 'multiplication':
                const m1 = Math.floor(Math.random() * 8) + 2;
                const m2 = Math.floor(Math.random() * 9) + 1;
                q = `${m1} × ${m2} 는 얼마인가요?`;
                ans = (m1 * m2).toString();
                exp = `곱셈구구 ${m1}단을 떠올려보세요! ${m1} × ${m2} = ${ans}입니다.`;
                break;
            case 'length':
                const meter = Math.floor(Math.random() * 3) + 1;
                const cm = Math.floor(Math.random() * 90) + 10;
                q = `${meter}m ${cm}cm 는 모두 몇 cm인가요?`;
                ans = (meter * 100 + cm).toString();
                exp = `1m는 100cm이므로 ${meter}m는 ${meter * 100}cm입니다. 따라서 ${ans}cm입니다.`;
                break;
            case 'time':
                const startHour = Math.floor(Math.random() * 10) + 1;
                const elapsed = Math.floor(Math.random() * 2) + 1;
                q = `${startHour}시에서 ${elapsed}시간이 지나면 몇 시인가요?`;
                ans = (startHour + elapsed).toString();
                exp = `${startHour} + ${elapsed} = ${ans}입니다.`;
                break;
            default:
                break;
        }

        setProblem({ q, ans, exp });
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer) return;
        if (parseInt(userAnswer) === parseInt(problem.ans)) {
            setFeedback('correct');
            setScore(score + 10);
            updateCoins(10);
            confetti();
            setTimeout(generateProblem, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>2학년 종합 퀴즈왕 👑</h2>
                <div className={styles.scoreBadge}>점수: {score}</div>
            </div>

            {problem && (
                <div className={styles.quizCard}>
                    <div className={styles.problemDisplay}>
                        <span className={styles.questionText}>{problem.q}</span>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.answerForm}>
                        <input
                            ref={inputRef}
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className={`${styles.input} ${feedback === 'incorrect' ? styles.error : ''}`}
                            placeholder="정답"
                            autoFocus
                        />
                        <div className={styles.buttons}>
                            <Button type="submit" fullWidth size="large" variant="primary">제출하기</Button>
                            {!showAnswer && feedback !== 'correct' && (
                                <Button type="button" onClick={() => setShowAnswer(true)} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                            )}
                        </div>
                    </form>

                    <AnimatePresence>
                        {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+10 코인)</motion.div>}
                        {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한번 생각해보세요!</motion.div>}
                        {showAnswer && (
                            <motion.div className={styles.feedbackSkipped}>
                                <div className={styles.answerBox}>
                                    <p><strong>정답:</strong> {problem.ans}</p>
                                    <p>{problem.exp}</p>
                                </div>
                                <Button onClick={generateProblem}>다음 문제</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Grade2Quiz;
