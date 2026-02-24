import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './MultiDiv4th.module.css';

const MultiDiv4th = () => {
    const [mode, setMode] = useState('explore');
    const [operation, setOperation] = useState('multi'); // 'multi', 'div'
    const [n1, setN1] = useState(123);
    const [n2, setN2] = useState(45);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // --- Multiplication Helpers ---
    const getMultiSteps = (a, b) => {
        const ones = b % 10;
        const tens = Math.floor(b / 10) * 10;
        return [
            { label: `${a} × ${ones}`, value: a * ones },
            { label: `${a} × ${tens}`, value: a * tens }
        ];
    };

    // --- Division Helpers ---
    const getDivSteps = (a, b) => {
        const quotient = Math.floor(a / b);
        const remainder = a % b;
        return { quotient, remainder };
    };

    const generateQuiz = () => {
        if (operation === 'multi') {
            const num1 = Math.floor(Math.random() * 800) + 100; // 100~899
            const num2 = Math.floor(Math.random() * 80) + 10;  // 10~89
            setQuizData({
                num1, num2,
                answer: (num1 * num2).toString(),
                question: `${num1} × ${num2} = ?`,
                explanation: `${num1} × ${num2 % 10} = ${num1 * (num2 % 10)}, ${num1} × ${Math.floor(num2 / 10) * 10} = ${num1 * (Math.floor(num2 / 10) * 10)} 이므로 합치면 ${num1 * num2}입니다.`
            });
        } else {
            const types = ['quotient', 'remainder'];
            const type = types[Math.floor(Math.random() * types.length)];
            const num2 = Math.floor(Math.random() * 80) + 10;  // 10~89 (divisor)
            const quotient = Math.floor(Math.random() * 40) + 10; // 10~49 (quotient)
            const remainder = Math.floor(Math.random() * num2);
            const num1 = (num2 * quotient) + remainder; // dividend

            if (type === 'quotient') {
                setQuizData({
                    num1, num2,
                    answer: quotient.toString(),
                    question: `${num1} ÷ ${num2} 의 몫은 얼마인가요?`,
                    explanation: `${num1} 안에 ${num2}가 ${quotient}번 들어가고 ${remainder}가 남습니다.`
                });
            } else {
                setQuizData({
                    num1, num2,
                    answer: remainder.toString(),
                    question: `${num1} ÷ ${num2} 의 나머지는 얼마인가요?`,
                    explanation: `${num1} ÷ ${num2} = ${quotient} ... ${remainder} 이므로 나머지는 ${remainder}입니다.`
                });
            }
        }
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };


    useEffect(() => {
        if (mode === 'practice') generateQuiz();
    }, [mode, operation]);

    const checkAnswer = () => {
        if (userAnswer === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(20);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            <div className={styles.opToggle}>
                <button
                    className={`${styles.opBtn} ${operation === 'multi' ? styles.activeOp : ''}`}
                    onClick={() => setOperation('multi')}
                >
                    곱셈 (세 자리 수 × 두 자리 수)
                </button>
                <button
                    className={`${styles.opBtn} ${operation === 'div' ? styles.activeOp : ''}`}
                    onClick={() => setOperation('div')}
                >
                    나눗셈 (세 자리 수 ÷ 두 자리 수)
                </button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    {operation === 'multi' ? (
                        <div className={styles.multiExplore}>
                            <h2 className={styles.title}>곱셈의 원리 💡</h2>
                            <div className={styles.setup}>
                                <input type="number" value={n1} onChange={(e) => setN1(parseInt(e.target.value) || 0)} />
                                <span>×</span>
                                <input type="number" value={n2} onChange={(e) => setN2(parseInt(e.target.value) || 0)} />
                            </div>

                            <div className={styles.visualStack}>
                                {getMultiSteps(n1, n2).map((step, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.stepRow}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.3 }}
                                    >
                                        <div className={styles.stepLabel}>{step.label} = </div>
                                        <div className={styles.stepValue}>{step.value.toLocaleString()}</div>
                                    </motion.div>
                                ))}
                                <div className={styles.divider} />
                                <div className={styles.finalRow}>
                                    <div className={styles.stepLabel}>합계 = </div>
                                    <div className={styles.finalValue}>{(n1 * n2).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.divExplore}>
                            <h2 className={styles.title}>나눗셈의 원리 💡</h2>
                            <div className={styles.setup}>
                                <input type="number" value={n1} onChange={(e) => setN1(parseInt(e.target.value) || 0)} />
                                <span>÷</span>
                                <input type="number" value={n2} onChange={(e) => setN2(parseInt(e.target.value) || 0)} />
                            </div>

                            <div className={styles.visualTable}>
                                <div className={styles.divResult}>
                                    <div>몫: <strong>{Math.floor(n1 / n2)}</strong></div>
                                    <div>나머지: <strong>{n1 % n2}</strong></div>
                                </div>
                                <div className={styles.divCheck}>
                                    <p>검토: {n2} × {Math.floor(n1 / n2)} + {n1 % n2} = {n1}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>{operation === 'multi' ? '곱셈' : '나눗셈'} 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className={styles.input}
                                placeholder="정답 입력"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                            />

                            <div className={styles.buttons}>
                                <Button onClick={checkAnswer} disabled={!userAnswer || feedback === 'correct'} fullWidth size="large" variant="primary">제출하기</Button>
                                {!showAnswer && feedback !== 'correct' && (
                                    <Button onClick={() => { setShowAnswer(true); setFeedback('skipped'); }} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+20 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한 번 생각해보세요!</motion.div>}
                                {showAnswer && (
                                    <motion.div className={styles.feedbackAnswer}>
                                        <div className={styles.answerBox}>
                                            <p><strong>정답:</strong> {quizData.answer}</p>
                                            <p>{quizData.explanation}</p>
                                        </div>
                                        <Button onClick={generateQuiz} size="large">다음 문제</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("곱셈과 나눗셈 (4학년)", "세 자리 수의 곱셈과 나눗셈 원리를 배우고 연습합니다.")} />
        </div>
    );
};

export default MultiDiv4th;
