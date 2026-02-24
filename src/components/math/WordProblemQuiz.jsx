import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css'; // Reuse quiz styles

const WordProblemQuiz = () => {
    const { gradeId } = useParams();
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateProblem = () => {
        const grade = parseInt(gradeId);
        let q = '', ans = '', exp = '';

        if (grade === 1) {
            const types = ['addition', 'subtraction', 'comparison'];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['철수', '영희', '민수', '지수', '수지'];
            const items = ['사과', '포도', '구슬', '장난감', '딱지'];
            const name1 = names[Math.floor(Math.random() * names.length)];
            const name2 = names[(names.indexOf(name1) + 1) % names.length];
            const item = items[Math.floor(Math.random() * items.length)];

            if (type === 'addition') {
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `${name1}는 ${item}를 ${n1}개 가지고 있고, ${name2}는 ${n1 + n2 > 10 ? '더 많이' : ''} ${item}를 ${n2}개 가지고 있습니다. 두 사람이 가진 ${item}는 모두 몇 개인가요?`;
                ans = (n1 + n2).toString();
                exp = `${n1} + ${n2} = ${ans}입니다.`;
            } else if (type === 'subtraction') {
                const n1 = Math.floor(Math.random() * 8) + 10;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `나무 위에 새가 ${n1}마리 앉아 있었습니다. 그중에서 ${n2}마리가 하늘로 날아갔습니다. 남은 새는 몇 마리인가요?`;
                ans = (n1 - n2).toString();
                exp = `${n1} - ${n2} = ${ans}입니다.`;
            } else {
                const n1 = Math.floor(Math.random() * 5) + 10;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `바구니에 ${item}가 ${n1}개 있습니다. 그중에서 ${n2}개를 먹었습니다. 바구니에 남은 ${item}는 몇 개인가요?`;
                ans = (n1 - n2).toString();
                exp = `${n1} - ${n2} = ${ans}입니다.`;
            }
        } else if (grade === 2) {
            const types = ['length', 'multiplication', 'complex-arithmetic'];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['민호', '유진', '서준', '하은', '도윤'];
            const name1 = names[Math.floor(Math.random() * names.length)];

            if (type === 'length') {
                const m = Math.floor(Math.random() * 3) + 1;
                const cm = Math.floor(Math.random() * 80) + 10;
                const addCm = Math.floor(Math.random() * 50) + 20;
                q = `${name1}의 키는 ${m}m ${cm}cm입니다. 작년보다 ${addCm}cm가 더 컸다면, 작년 ${name1}의 키는 몇 cm였나요?`;
                ans = (m * 100 + cm - addCm).toString();
                exp = `${m}m ${cm}cm는 ${m * 100 + cm}cm입니다. 여기서 ${addCm}cm를 빼면 ${ans}cm가 됩니다.`;
            } else if (type === 'multiplication') {
                const bags = Math.floor(Math.random() * 7) + 3;
                const perBag = Math.floor(Math.random() * 8) + 2;
                q = `사과가 한 봉지에 ${perBag}개씩 들어있습니다. 이런 봉지가 ${bags}봉지 있다면, 사과는 모두 몇 개인가요?`;
                ans = (bags * perBag).toString();
                exp = `${perBag}개씩 ${bags}번 더하는 것은 ${perBag} × ${bags}와 같습니다. 정답은 ${ans}개입니다.`;
            } else {
                const n1 = Math.floor(Math.random() * 40) + 30;
                const n2 = Math.floor(Math.random() * 20) + 10;
                const n3 = Math.floor(Math.random() * 15) + 5;
                q = `버스에 사람이 ${n1}명 타고 있었습니다. 정류장에서 ${n2}명이 내리고 ${n3}명이 새로 탔습니다. 지금 버스에 타고 있는 사람은 몇 명인가요?`;
                ans = (n1 - n2 + n3).toString();
                exp = `${n1}명에서 ${n2}명이 내리면 ${n1 - n2}명이고, 다시 ${n3}명이 타면 ${n1 - n2} + ${n3} = ${ans}명이 됩니다.`;
            }
        } else if (grade === 3) {
            const types = ['multi-div', 'fraction-basic', 'measurement'];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['지아', '우진', '소윤', '준우', '예은'];
            const name1 = names[Math.floor(Math.random() * names.length)];

            if (type === 'multi-div') {
                const isDiv = Math.random() > 0.5;
                if (isDiv) {
                    const total = [24, 30, 36, 42, 48, 56, 64][Math.floor(Math.random() * 7)];
                    const split = [3, 4, 6, 8][Math.floor(Math.random() * 4)];
                    q = `사탕 ${total}개를 친구 ${split}명에게 똑같이 나누어 주려고 합니다. 한 명에게 몇 개씩 줄 수 있을까요?`;
                    ans = (total / split).toString();
                    exp = `${total} ÷ ${split} = ${ans}입니다.`;
                } else {
                    const price = Math.floor(Math.random() * 5) * 50 + 250; // 250, 300, 350...
                    const count = Math.floor(Math.random() * 6) + 3;
                    q = `색종이 한 묶음의 가격은 ${price}원입니다. ${name1}가 이 색종이를 ${count}묶음 샀다면, 모두 얼마를 내야 할까요?`;
                    ans = (price * count).toString();
                    exp = `${price} × ${count} = ${ans}원입니다.`;
                }
            } else if (type === 'fraction-basic') {
                const total = 12;
                const part = [2, 3, 4, 6][Math.floor(Math.random() * 4)];
                q = `전체 ${total}개의 빵 중에서 ${part / total === 0.5 ? '절반' : (12 / part) + '분의 1'}을 먹었습니다. 남은 빵은 몇 개인가요?`;
                ans = (total - part).toString();
                exp = `${total}개의 1/${total / part}은 ${part}개입니다. 따라서 남은 빵은 ${total} - ${part} = ${ans}개입니다.`;
            } else {
                const h = Math.floor(Math.random() * 2) + 1;
                const m = Math.floor(Math.random() * 30) + 10;
                q = `영화가 시작된 지 ${h}시간 ${m}분이 지났습니다. ${h}시간 ${m}분은 모두 몇 분인가요?`;
                ans = (h * 60 + m).toString();
                exp = `1시간은 60분이므로, ${h}시간은 ${h * 60}분입니다. 여기에 ${m}분을 더하면 ${ans}분이 됩니다.`;
            }
        } else {
            // Default for other grades or placeholder
            q = "문장제 문제 준비 중입니다.";
            ans = "0";
            exp = "준비 중입니다.";
        }

        setProblem({ q, ans, exp });
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
                <Link to={`/grade/${gradeId}`} className={styles.backLink}>← 목차로 돌아가기</Link>
                <h2 className={styles.title}>{gradeId}학년 심화 문장제 🧠</h2>
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
