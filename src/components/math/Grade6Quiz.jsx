import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import PageHeader from '../common/PageHeader';
import styles from './MathQuiz.module.css';

const Grade6Quiz = () => {
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const inputRef = useRef(null);

    const generateProblem = () => {
        const topics = ['fraction-div', 'geometry', 'ratio', 'circle-area', 'volume'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        let q, ans, exp;

        switch (topic) {
            case 'fraction-div':
                q = `1/3 ÷ 1/2 은 얼마인가요? (기약분수로)`;
                ans = "2/3";
                exp = `1/3 × 2/1 = 2/3 입니다.`;
                break;
            case 'geometry':
                q = `사각기둥의 밑면은 몇 개인가요?`;
                ans = "2";
                exp = `모든 각기둥은 위와 아래에 2개의 밑면을 가지고 있습니다.`;
                break;
            case 'ratio':
                q = `3 : 5 의 비율을 분수로 나타내면?`;
                ans = "3/5";
                exp = `비교하는 양(3) ÷ 기준량(5) = 3/5 입니다.`;
                break;
            case 'circle-area':
                q = `반지름이 10cm인 원의 넓이는? (원주율=3.14)`;
                ans = "314";
                exp = `10 × 10 × 3.14 = 314cm² 입니다.`;
                break;
            case 'volume':
                q = `한 모서리가 3cm인 정육면체의 부피는?`;
                ans = "27";
                exp = `3 × 3 × 3 = 27cm³ 입니다.`;
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
            updateCoins(20);
            confetti();
            setTimeout(generateProblem, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="6학년 종합 퀴즈왕" grade="6" />
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
                        {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+20 코인)</motion.div>}
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

export default Grade6Quiz;
