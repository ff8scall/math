import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css'; // Reuse quiz styles
import { generateProblemData } from '../../utils/math/wordProblemGenerator';

const WordProblemQuiz = () => {
    const { gradeId } = useParams();
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateProblem = () => {
        const effectiveGrade = parseInt(gradeId) || 1;
        const newProblem = generateProblemData(effectiveGrade);

        setProblem(newProblem);
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        generateProblem();
    }, [gradeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer) return;
        if (parseInt(userAnswer) === parseInt(problem.ans)) {
            setFeedback('correct');
            setScore(score + 15);
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
                <Link to={`/grade/${gradeId || '1'}`} className={styles.backLink}>← 목차로 돌아가기</Link>
                <h2 className={styles.title}>{gradeId || '1'}학년 심화 문장제 🧠</h2>
                <div className={styles.scoreBadge}>점수: {score}</div>
            </div>

            {problem && (
                <div className={styles.quizCard}>
                    <div className={styles.problemDisplay}>
                        <p className={styles.wordProblemText}>{problem.q}</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.answerForm}>
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className={`${styles.input} ${feedback === 'incorrect' ? styles.error : ''}`}
                            placeholder="정답 입력"
                            autoFocus
                        />
                        <div className={styles.buttons}>
                            <Button type="submit" fullWidth size="large" variant="primary">정답 제출</Button>
                            {!showAnswer && feedback !== 'correct' && (
                                <Button type="button" onClick={() => setShowAnswer(true)} variant="ghost" fullWidth size="medium">💡 힌트 보기</Button>
                            )}
                        </div>
                    </form>

                    <AnimatePresence>
                        {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 대단해요! 정확한 계산이에요. (+15 코인)</motion.div>}
                        {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 문장을 다시 한번 천천히 읽어보세요!</motion.div>}
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

export default WordProblemQuiz;
