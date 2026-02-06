import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css';

const Grade5Quiz = () => {
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const inputRef = useRef(null);

    const generateProblem = () => {
        const topics = ['arithmetic', 'factor-multiple', 'fraction', 'area', 'decimal', 'average'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        let q, ans, exp;

        switch (topic) {
            case 'arithmetic':
                q = `(20 + 4) × 2 - 10 은 얼마인가요?`;
                ans = "38";
                exp = `괄호 안을 먼저 계산하면 24, 곱하기 2를 하면 48, 마지막으로 10을 빼면 38입니다.`;
                break;
            case 'factor-multiple':
                const n = 12;
                q = `${n}의 모든 약수는 몇 개인가요?`;
                ans = "6";
                exp = `12의 약수는 1, 2, 3, 4, 6, 12로 총 6개입니다.`;
                break;
            case 'fraction':
                q = `1/2 + 1/3 을 통분하면 분모는 얼마가 되나요?`;
                ans = "6";
                exp = `2와 3의 공통분모인 6으로 통분합니다.`;
                break;
            case 'area':
                q = `밑변 6cm, 높이 5cm인 삼각형의 넓이는 몇 cm² 인가요?`;
                ans = "15";
                exp = `6 × 5 ÷ 2 = 15cm² 입니다.`;
                break;
            case 'decimal':
                q = `0.4 × 8 은 얼마인가요?`;
                ans = "3.2";
                exp = `4 × 8 = 32이고 소수점을 한 자리 옮기면 3.2입니다.`;
                break;
            case 'average':
                q = `80, 90, 70 세 수의 평균은 얼마인가요?`;
                ans = "80";
                exp = `(80+90+70) ÷ 3 = 240 ÷ 3 = 80입니다.`;
                break;
            default: break;
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
        if (userAnswer === problem.ans) {
            setFeedback('correct');
            setScore(score + 10);
            updateCoins(15);
            confetti();
            setTimeout(generateProblem, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>5학년 종합 퀴즈왕 👑</h2>
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
                        {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+15 코인)</motion.div>}
                        {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한번 생각해보자!</motion.div>}
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

export default Grade5Quiz;
