import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './TwoDigitArithmetic.module.css';

const TwoDigitArithmetic = () => {
    const [mode, setMode] = useState('explore');
    const [operation, setOperation] = useState('addition');

    // Explore Data
    const [num1, setNum1] = useState(25);
    const [num2, setNum2] = useState(18);
    const [step, setStep] = useState(0);

    // Practice Data
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // Logic for Explore
    const reset = () => { setStep(0); };
    const nextStep = () => {
        if (step < 2) setStep(step + 1);
        else if (step === 2) confetti();
    };

    const t1 = Math.floor(num1 / 10);
    const o1 = num1 % 10;
    const t2 = Math.floor(num2 / 10);
    const o2 = num2 % 10;

    const opResult = operation === 'addition' ? num1 + num2 : num1 - num2;
    const finalOnes = operation === 'addition' ? (o1 + o2) % 10 : (o1 < o2 ? 10 + o1 - o2 : o1 - o2);
    const finalTens = operation === 'addition' ? Math.floor(opResult / 10) : Math.floor(opResult / 10);

    const needCarry = operation === 'addition' && (o1 + o2 >= 10);
    const needBorrow = operation === 'subtraction' && (o1 < o2);

    const generateQuiz = () => {
        let a, b;
        if (operation === 'addition') {
            a = Math.floor(Math.random() * 80) + 10;
            b = Math.floor(Math.random() * (99 - a)) + 1;
        } else {
            a = Math.floor(Math.random() * 80) + 20;
            b = Math.floor(Math.random() * (a - 1)) + 1;
        }
        setQuizData({
            num1: a, num2: b, op: operation === 'addition' ? '+' : '-',
            answer: operation === 'addition' ? a + b : a - b
        });
        setUserAnswer(''); setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => { if (mode === 'practice' && !quizData) generateQuiz(); }, [mode, operation]);

    const checkAnswer = () => {
        if (parseInt(userAnswer) === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => { setMode('explore'); reset(); }} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 실전 연습</Button>
            </div>

            <div className={styles.opToggle}>
                <Button onClick={() => { setOperation('addition'); reset(); }} variant={operation === 'addition' ? 'primary' : 'secondary'}>➕ 덧셈</Button>
                <Button onClick={() => { setOperation('subtraction'); reset(); }} variant={operation === 'subtraction' ? 'primary' : 'secondary'}>➖ 뺄셈</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.exploreSection}>
                    <h2 className={styles.title}>{operation === 'addition' ? '자릿수 맞춰 더하기' : '자릿수 맞춰 빼기'}</h2>

                    <div className={styles.verticalGrid}>
                        {/* Carry/Borrow row */}
                        <div className={styles.opCell}></div>
                        <div className={styles.digitCell}>
                            <AnimatePresence>
                                {operation === 'addition' && step >= 1 && needCarry && (
                                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={styles.carryMark}>1</motion.div>
                                )}
                                {operation === 'subtraction' && step >= 1 && needBorrow && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.borrowTens}>{t1 - 1}</motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className={styles.digitCell}>
                            <AnimatePresence>
                                {operation === 'subtraction' && step >= 1 && needBorrow && (
                                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={styles.borrowOnes}>10</motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Num 1 */}
                        <div className={styles.opCell}></div>
                        <div className={`${styles.digitCell} ${operation === 'subtraction' && step >= 1 && needBorrow ? styles.dimmed : ''}`}>
                            {t1}
                            {operation === 'subtraction' && step >= 1 && needBorrow && <div className={styles.strike} />}
                        </div>
                        <div className={styles.digitCell}>{o1}</div>

                        {/* Num 2 */}
                        <div className={styles.opCell}>{operation === 'addition' ? '+' : '-'}</div>
                        <div className={styles.digitCell}>{t2}</div>
                        <div className={styles.digitCell}>{o2}</div>

                        {/* Line */}
                        <div className={styles.line} />

                        {/* Result */}
                        <div className={styles.opCell}></div>
                        <div className={styles.digitCell}>
                            {step >= 2 ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{finalTens}</motion.span> : "?"}
                        </div>
                        <div className={styles.digitCell}>
                            {step >= 1 ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{finalOnes}</motion.span> : "?"}
                        </div>
                    </div>

                    <div className={styles.explanation}>
                        <p>
                            {step === 0 && "일의 자리부터 계산을 시작해볼까요?"}
                            {step === 1 && (operation === 'addition'
                                ? `${o1} + ${o2} = ${o1 + o2}. ${needCarry ? "10이 넘어서 십의 자리로 1을 보내요!" : "일의 자리에 써주세요."}`
                                : `${o1}에서 ${o2}를 ${needBorrow ? "뺄 수 없어서 십의 자리에서 10을 빌려와요!" : "빼주세요."}`)}
                            {step === 2 && "이제 십의 자리를 계산하면 끝! 정말 잘했어요!"}
                        </p>
                        <Button onClick={nextStep} size="large">
                            {step === 2 ? "새로고침" : "다음 단계 👉"}
                        </Button>
                    </div>

                    <div className={styles.inputArea}>
                        <span>직접 숫자 넣기:</span>
                        <input type="number" value={num1} onChange={(e) => { setNum1(parseInt(e.target.value) || 0); reset(); }} min="10" max="99" />
                        <input type="number" value={num2} onChange={(e) => { setNum2(parseInt(e.target.value) || 0); reset(); }} min="1" max="99" />
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>세로셈 실전 연습 🔥</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <div className={styles.verticalProblem}>
                                <div style={{ textAlign: 'right', fontSize: '4rem', fontFamily: 'monospace', paddingRight: '20px' }}>
                                    <div>{quizData.num1}</div>
                                    <div>{quizData.op} {quizData.num2}</div>
                                    <div style={{ borderTop: '3px solid #333', marginTop: '5px' }}></div>
                                </div>
                            </div>
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="정답"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                className={styles.input}
                            />
                            <Button onClick={checkAnswer} fullWidth size="large" variant="primary">정답 확인</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+10 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 계산해볼까요?</motion.div>}
                                {showAnswer && <div className={styles.answerBox}>정답: {quizData.answer}</div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("두 자리 수 덧셈과 뺄셈", "받아올림과 받아내림이 있는 두 자리 수 계산을 시각적으로 학습합니다.")} />
        </div>
    );
};

export default TwoDigitArithmetic;
