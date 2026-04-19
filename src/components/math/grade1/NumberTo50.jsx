import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './NumberTo50.module.css';

const NumberTo50 = () => {
    const [mode, setMode] = useState('explore');
    const [tens, setTens] = useState(2);
    const [ones, setOnes] = useState(5);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentNumber = tens * 10 + ones;

    const generateQuiz = () => {
        const types = ['read', 'tens-ones', 'compare', 'count'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'read') {
            const num = Math.floor(Math.random() * 40) + 10;
            setQuizData({
                type, question: `${num}은 몇십 몇인가요?`,
                answer: num,
                explanation: `${num}은 ${Math.floor(num / 10)}십 ${num % 10}이에요.`
            });
        } else if (type === 'tens-ones') {
            const t = Math.floor(Math.random() * 4) + 1;
            const o = Math.floor(Math.random() * 10);
            setQuizData({
                type, question: `${t}십 ${o}은 몇인가요?`,
                answer: t * 10 + o,
                explanation: `${t}십은 ${t * 10}, ${t * 10} + ${o} = ${t * 10 + o}예요.`
            });
        } else if (type === 'compare') {
            const n1 = Math.floor(Math.random() * 40) + 10;
            const n2 = Math.floor(Math.random() * 40) + 10;
            setQuizData({
                type, question: `${n1}과 ${n2} 중 더 큰 수는?`,
                choices: [n1, n2], answer: Math.max(n1, n2),
                explanation: `${Math.max(n1, n2)}가 더 커요.`
            });
        } else {
            const count = Math.floor(Math.random() * 30) + 10;
            setQuizData({
                type, question: `10개씩 묶음이 몇 개인가요?`,
                count, answer: Math.floor(count / 10),
                explanation: `${count}개는 10개씩 ${Math.floor(count / 10)}묶음과 ${count % 10}개예요.`
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
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 탐험하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>50까지의 수 배우기</h2>
                    <p className={styles.subtitle}>10개씩 묶어서 세어봐요!</p>

                    <div className={styles.numberDisplay}><span className={styles.bigNumber}>{currentNumber}</span></div>

                    <div className={styles.bundles}>
                        <div className={styles.tensSection}>
                            <div className={styles.label}>십 (10개씩 묶음)</div>
                            <div className={styles.bundleGrid}>
                                <AnimatePresence>
                                    {Array(tens).fill(null).map((_, i) => (
                                        <motion.div key={i} className={styles.bundle} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            {Array(10).fill('●').map((dot, j) => <span key={j}>{dot}</span>)}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className={styles.controls}>
                                <button onClick={() => setTens(Math.max(0, tens - 1))}>-</button>
                                <span>{tens}</span>
                                <button onClick={() => setTens(Math.min(5, tens + 1))}>+</button>
                            </div>
                        </div>

                        <div className={styles.onesSection}>
                            <div className={styles.label}>일 (낱개)</div>
                            <div className={styles.onesGrid}>
                                <AnimatePresence>
                                    {Array(ones).fill(null).map((_, i) => (
                                        <motion.span key={i} className={styles.one} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>●</motion.span>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className={styles.controls}>
                                <button onClick={() => setOnes(Math.max(0, ones - 1))}>-</button>
                                <span>{ones}</span>
                                <button onClick={() => setOnes(Math.min(9, ones + 1))}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <p>• 10개씩 모으면 <strong>십</strong>이에요.</p>
                        <p>• 25 = 2십 5 (십 2개 + 일 5개)</p>
                        <p>• 50 = 5십 (십 5개)</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>50까지의 수 문제</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.type === 'count' && (
                                <div className={styles.countGrid}>
                                    {Array(quizData.count).fill('●').map((dot, i) => <span key={i}>{dot}</span>)}
                                </div>
                            )}

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
            <JsonLd data={generateCourseSchema("50까지의 수", "10개씩 묶어서 50까지 세는 방법을 배웁니다.")} />
        </div>
    );
};

export default NumberTo50;
