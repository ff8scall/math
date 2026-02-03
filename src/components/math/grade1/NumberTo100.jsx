import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './NumberTo100.module.css';

const NumberTo100 = () => {
    const [mode, setMode] = useState('explore');
    const [tens, setTens] = useState(5);
    const [ones, setOnes] = useState(7);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentNumber = tens * 10 + ones;

    const generateQuiz = () => {
        const types = ['read', 'write', 'compare', 'count-tens'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'read') {
            const num = Math.floor(Math.random() * 90) + 10;
            setQuizData({
                type, question: `${num}을 쓰면?`, number: num,
                answer: num, explanation: `${num}은 ${Math.floor(num / 10)}십 ${num % 10}이에요.`
            });
        } else if (type === 'write') {
            const t = Math.floor(Math.random() * 9) + 1;
            const o = Math.floor(Math.random() * 10);
            setQuizData({
                type, question: `${t}십 ${o}을 쓰면?`,
                answer: t * 10 + o, explanation: `${t}십 ${o} = ${t * 10 + o}예요.`
            });
        } else if (type === 'compare') {
            const n1 = Math.floor(Math.random() * 90) + 10;
            const n2 = Math.floor(Math.random() * 90) + 10;
            setQuizData({
                type, question: `${n1}과 ${n2} 중 더 작은 수는?`,
                choices: [n1, n2], answer: Math.min(n1, n2),
                explanation: `${Math.min(n1, n2)}가 더 작아요.`
            });
        } else {
            const num = Math.floor(Math.random() * 90) + 10;
            setQuizData({
                type, question: `${num}은 10이 몇 개예요?`,
                answer: Math.floor(num / 10),
                explanation: `${num} = 10 × ${Math.floor(num / 10)} + ${num % 10}이므로 10이 ${Math.floor(num / 10)}개예요.`
            });
        }
        setUserAnswer(''); setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => { if (mode === 'practice' && !quizData) generateQuiz(); }, [mode]);

    const checkAnswer = () => {
        const isCorrect = quizData.choices
            ? parseInt(userAnswer) === quizData.answer
            : parseInt(userAnswer) === quizData.answer;
        if (isCorrect) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 탐험하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>100까지의 수 🎯</h2>
                    <p className={styles.subtitle}>100까지 세고 쓰기를 배워요!</p>

                    <div className={styles.numberDisplay}><span className={styles.bigNumber}>{currentNumber}</span></div>

                    <div className={styles.gridContainer}>
                        <div className={styles.grid100}>
                            {[...Array(100)].map((_, i) => {
                                const num = i + 1;
                                return (
                                    <div key={i} className={`${styles.cell} ${num === currentNumber ? styles.active : ''} ${num < currentNumber ? styles.passed : ''}`}
                                        onClick={() => { setTens(Math.floor(num / 10)); setOnes(num % 10); }}>
                                        {num}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <Button onClick={() => setTens(Math.max(0, tens - 1))} disabled={tens === 0}>십 -10</Button>
                        <Button onClick={() => setOnes(Math.max(0, ones - 1))} disabled={ones === 0}>일 -1</Button>
                        <Button onClick={() => setOnes(Math.min(9, ones + 1))} disabled={ones === 9}>일 +1</Button>
                        <Button onClick={() => setTens(Math.min(10, tens + 1))} disabled={tens === 10}>십 +10</Button>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <p>• 100 = 십이 10개 = 백 1개</p>
                        <p>• 57 = 5십 7 (50 + 7)</p>
                        <p>• 10씩 뛰어 세기: 10, 20, 30...</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>100까지의 수 문제</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.number && <div className={styles.largeNumber}>{quizData.number}</div>}

                            {quizData.choices ? (
                                <div className={styles.choiceButtons}>
                                    {quizData.choices.map(c => (
                                        <button key={c} className={`${styles.choiceBtn} ${userAnswer == c ? styles.selected : ''}`}
                                            onClick={() => setUserAnswer(c.toString())} disabled={feedback === 'correct' || showAnswer}>
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="답 입력" disabled={feedback === 'correct' || showAnswer} className={styles.input} />
                            )}

                            <div className={styles.buttons}>
                                <Button
                                    onClick={checkAnswer}
                                    disabled={!userAnswer || feedback === 'correct' || showAnswer}
                                    fullWidth
                                    size="large"
                                    variant="primary"
                                >
                                    제출하기
                                </Button>
                                {!showAnswer && feedback !== 'correct' && (
                                    <Button
                                        onClick={() => { setShowAnswer(true); setFeedback('skipped'); }}
                                        variant="ghost"
                                        fullWidth
                                        size="medium"
                                    >
                                        💡 잘 모르겠어요
                                    </Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답! (+10 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시!</motion.div>}
                                {showAnswer && (
                                    <motion.div className={styles.feedbackAnswer}>
                                        <div className={styles.answerBox}><p><strong>정답:</strong> {quizData.answer}</p><p>{quizData.explanation}</p></div>
                                        <Button onClick={generateQuiz} size="large">다음 문제</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("100까지의 수", "100까지 수를 세고 읽고 쓰는 방법을 배웁니다.")} />
        </div>
    );
};

export default NumberTo100;
