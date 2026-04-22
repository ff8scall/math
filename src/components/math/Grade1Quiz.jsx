import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import PageHeader from '../common/PageHeader';
import styles from './MathQuiz.module.css';

const Grade1Quiz = () => {
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const inputRef = useRef(null);

    const generateProblem = () => {
        const topics = ['counting', 'addition', 'subtraction', 'numbers-50', 'clock', 'regrouping'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        let q, ans, exp;

        switch (topic) {
            case 'counting':
                const count = Math.floor(Math.random() * 9) + 1;
                q = `🍎 사과가 ${count}개 있어요. 숫자로 얼마인가요?`;
                ans = count.toString();
                exp = `개수를 하나씩 세어보면 ${count}입니다.`;
                break;
            case 'addition':
                // Sums within 20
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `${n1} + ${n2} 는 얼마인가요?`;
                ans = (n1 + n2).toString();
                exp = n1 + n2 > 10
                    ? `${n1}에 몇을 더하면 10이 될까요? 10을 먼저 만들고 나머지를 더하면 ${ans}가 돼요.`
                    : `${n1}에서 ${n2}만큼 더 가면 ${ans}가 돼요.`;
                break;
            case 'subtraction':
                // Subtraction from up to 18
                const s_ans = Math.floor(Math.random() * 9) + 1;
                const s2 = Math.floor(Math.random() * 9) + 1;
                const s1 = s_ans + s2;
                q = `${s1} - ${s2} 는 얼마인가요?`;
                ans = s_ans.toString();
                exp = `${s1}에서 ${s2}만큼 빼면 ${ans}가 남아요.`;
                break;
            case 'numbers-50':
                const base = Math.floor(Math.random() * 4) * 10 + 10;
                const plus = Math.floor(Math.random() * 9);
                q = `10개씩 ${base / 10}묶음과 낱개 ${plus}개는 몇 개인가요?`;
                ans = (base + plus).toString();
                exp = `${base / 10}묶음은 ${base}이고, 낱개 ${plus}개를 더하면 ${ans}입니다.`;
                break;
            case 'clock':
                const hour = Math.floor(Math.random() * 12) + 1;
                const isHalf = Math.random() > 0.5;
                if (isHalf) {
                    q = `긴바늘이 6을 가리키고 짧은바늘이 ${hour}와 ${hour === 12 ? 1 : hour + 1} 사이에 있으면 몇 시 몇 분인가요?`;
                    ans = `${hour}시 30분`; // Note: User input might be slightly complex here, but usually digit based
                    // Let's adjust for digit only input if possible, or just skip half for now if it's too hard for simple input
                    q = `긴바늘이 6을 가리키고 짧은바늘이 ${hour}와 ${hour === 12 ? 1 : hour + 1} 사이에 있으면 ${hour}시 몇 분인가요?`;
                    ans = "30";
                    exp = `긴바늘이 6을 가리키면 30분이에요. ${hour}시 30분입니다.`;
                } else {
                    q = `긴바늘이 12를 가리키고 짧은바늘이 ${hour}를 가리키면 몇 시인가요?`;
                    ans = hour.toString();
                    exp = `짧은바늘이 가리키는 숫자가 바로 '시'예요. ${hour}시입니다.`;
                }
                break;
            case 'regrouping':
                const target = 10;
                const part1 = Math.floor(Math.random() * 8) + 1;
                q = `${part1}과 몇을 모으면 10이 될까요?`;
                ans = (10 - part1).toString();
                exp = `${part1} + ${ans} = 10 이 됩니다.`;
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
            <PageHeader title="1학년 종합 퀴즈왕" grade="1" />
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
                        {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한번 세어보세요!</motion.div>}
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

export default Grade1Quiz;
