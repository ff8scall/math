import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import PageHeader from '../common/PageHeader';
import styles from './MathQuiz.module.css';

const Grade4Quiz = () => {
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const inputRef = useRef(null);

    const generateProblem = () => {
        const topics = ['large-number', 'angle', 'fraction', 'decimal', 'multi-div'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        let q, ans, exp;

        switch (topic) {
            case 'large-number':
                const units = ['만', '억', '조'];
                const unit = units[Math.floor(Math.random() * 3)];
                const val = Math.floor(Math.random() * 9000) + 1000;
                q = `${val}${unit}은 1${unit}이 몇 개인 수인가요?`;
                ans = val.toString();
                exp = `${val}${unit}은 1${unit}이 ${val}개 모인 수입니다.`;
                break;
            case 'angle':
                const a1 = Math.floor(Math.random() * 80) + 10;
                const a2 = Math.floor(Math.random() * (170 - a1)) + 10;
                const isSum = Math.random() > 0.5;
                if (isSum) {
                    q = `${a1}° 와 ${a2}° 의 합은 몇 도인가요?`;
                    ans = (a1 + a2).toString();
                    exp = `${a1} + ${a2} = ${ans}° 입니다.`;
                } else {
                    const bigger = Math.max(a1, a2);
                    const smaller = Math.min(a1, a2);
                    q = `${bigger}° 와 ${smaller}° 의 차는 몇 도인가요?`;
                    ans = (bigger - smaller).toString();
                    exp = `${bigger} - ${smaller} = ${ans}° 입니다.`;
                }
                break;
            case 'fraction':
                const d = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
                const n1 = Math.floor(Math.random() * (d - 1)) + 1;
                const n2 = Math.floor(Math.random() * (d - n1)) + 1;
                q = `${n1}/${d} + ${n2}/${d} 의 분자는 얼마인가요?`;
                ans = (n1 + n2).toString();
                exp = `분모가 같을 때는 분자끼리 더해요. ${n1} + ${n2} = ${ans}`;
                break;
            case 'decimal':
                const v1 = (Math.floor(Math.random() * 50) + 10) / 100;
                const v2 = (Math.floor(Math.random() * 40) + 10) / 100;
                q = `${v1.toFixed(2)} + ${v2.toFixed(2)} 은 얼마인가요?`;
                ans = (v1 + v2).toFixed(2);
                exp = `소수점을 맞추어 더하면 ${(v1 + v2).toFixed(2)} 가 됩니다.`;
                break;
            case 'multi-div':
                if (Math.random() > 0.5) {
                    const m1 = Math.floor(Math.random() * 200) + 100;
                    const m2 = Math.floor(Math.random() * 8) + 2;
                    q = `${m1} × ${m2} 는 얼마인가요?`;
                    ans = (m1 * m2).toString();
                    exp = `세로셈으로 계산하면 ${ans} 가 나옵니다.`;
                } else {
                    const d2 = Math.floor(Math.random() * 8) + 2;
                    const res = Math.floor(Math.random() * 20) + 10;
                    const d1 = d2 * res;
                    q = `${d1} ÷ ${d2} 의 몫은 얼마인가요?`;
                    ans = res.toString();
                    exp = `${d1} 안에는 ${d2} 가 ${res}번 들어갑니다.`;
                }
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
        if (parseFloat(userAnswer) === parseFloat(problem.ans)) {
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
            <PageHeader title="4학년 종합 퀴즈왕" grade="4" />
            <div className={styles.header}>
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
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className={`${styles.input} ${feedback === 'incorrect' ? styles.error : ''}`}
                            placeholder="정답 입력"
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
                        {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+15 코인)</motion.div>}
                        {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한번 확인해 볼까요?</motion.div>}
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

export default Grade4Quiz;
