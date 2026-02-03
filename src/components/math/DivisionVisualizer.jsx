import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import { updateCoins } from '../../utils/storage/storageManager';
import styles from './DivisionVisualizer.module.css';
import confetti from 'canvas-confetti';

const DivisionVisualizer = () => {
    // Mode State
    const [mode, setMode] = useState('explore'); // 'explore', 'practice'

    // Explore Mode State
    const [dividend, setDividend] = useState(12); // Total items
    const [divisor, setDivisor] = useState(3);    // Groups
    const [distributed, setDistributed] = useState([]);
    const [remaining, setRemaining] = useState(12);
    const [isDistributing, setIsDistributing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Practice Mode State
    const [quizData, setQuizData] = useState(null);
    const [userQuotient, setUserQuotient] = useState('');
    const [userRemainder, setUserRemainder] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'

    // --- Explore Logic ---
    useEffect(() => {
        if (mode === 'explore') resetExplore();
    }, [dividend, divisor, mode]);

    const resetExplore = () => {
        setDistributed(Array.from({ length: divisor }, () => []));
        setRemaining(dividend);
        setIsDistributing(false);
        setShowSuccess(false);
    };

    const distributeOneRound = () => {
        if (remaining < divisor) {
            if (remaining > 0) {
                alert(`더 이상 똑같이 나눌 수 없어요! ${remaining}개가 남았네요.`);
            } else {
                confetti();
                if (!showSuccess) {
                    updateCoins(5);
                    setShowSuccess(true);
                }
            }
            setIsDistributing(false);
            return;
        }

        setIsDistributing(true);
        setTimeout(() => {
            setDistributed(prev => {
                const next = prev.map(group => [...group, '🍬']);
                return next;
            });
            setRemaining(prev => prev - divisor);
            setIsDistributing(false);
        }, 500);
    };

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;

    // --- Practice Logic ---
    useEffect(() => {
        if (mode === 'practice' && !quizData) {
            generateQuiz();
        }
    }, [mode]);

    const generateQuiz = () => {
        // Random division problem
        const qDivisor = Math.floor(Math.random() * 8) + 2; // 2~9
        const qQuotient = Math.floor(Math.random() * 9) + 1; // 1~9
        const qRemainder = Math.floor(Math.random() * qDivisor); // 0 ~ divisor-1
        const qDividend = qDivisor * qQuotient + qRemainder;

        setQuizData({ dividend: qDividend, divisor: qDivisor, quotient: qQuotient, remainder: qRemainder });
        setUserQuotient('');
        setUserRemainder('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!quizData) return;
        const uQ = parseInt(userQuotient);
        const uR = parseInt(userRemainder || '0'); // treat empty remainder as 0

        if (uQ === quizData.quotient && uR === quizData.remainder) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000); // Next problem
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerTabs}>
                <Button
                    onClick={() => setMode('explore')}
                    variant={mode === 'explore' ? 'primary' : 'secondary'}
                >
                    🔍 원리 탐험
                </Button>
                <Button
                    onClick={() => setMode('practice')}
                    variant={mode === 'practice' ? 'primary' : 'secondary'}
                >
                    ✏️ 실전 연습
                </Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>나눗셈 탐험: 똑같이 나눠요 🍬</h2>
                    <div className={styles.equationArea}>
                        <span className={styles.number}>{dividend}</span>
                        <span className={styles.operator}>÷</span>
                        <span className={styles.number}>{divisor}</span>
                        <span className={styles.operator}>=</span>
                        <span className={styles.result}>{distributed[0]?.length || 0}</span>
                        {remaining > 0 && remaining < divisor && (
                            <span className={styles.remainder}>... {remaining}</span>
                        )}
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.controlGroup}>
                            <label>사탕 개수</label>
                            <div className={styles.buttonGroup}>
                                <Button onClick={() => setDividend(Math.max(divisor, dividend - 1))} size="small" variant="secondary">-</Button>
                                <span className={styles.valueDisplay}>{dividend}</span>
                                <Button onClick={() => setDividend(Math.min(30, dividend + 1))} size="small" variant="secondary">+</Button>
                            </div>
                        </div>
                        <div className={styles.controlGroup}>
                            <label>친구 수</label>
                            <div className={styles.buttonGroup}>
                                <Button onClick={() => setDivisor(Math.max(2, divisor - 1))} size="small" variant="secondary">-</Button>
                                <span className={styles.valueDisplay}>{divisor}</span>
                                <Button onClick={() => setDivisor(Math.min(9, divisor + 1))} size="small" variant="secondary">+</Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.visualizerArea}>
                        <div className={styles.pileSection}>
                            <h3>남은 사탕: {remaining}개</h3>
                            <div className={styles.pile}>
                                <AnimatePresence>
                                    {Array.from({ length: remaining }).map((_, i) => (
                                        <motion.div
                                            key={`rem-${i}`}
                                            className={styles.candy}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                        >
                                            🍬
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {showSuccess ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.successMessage}>
                                    🎉 참 잘했어요! (+5 코인)
                                </motion.div>
                            ) : (
                                <Button
                                    onClick={distributeOneRound}
                                    disabled={isDistributing || (remaining < divisor && remaining > 0)}
                                    variant="accent"
                                >
                                    {remaining < divisor ? (remaining === 0 ? "나누기 완료!" : "나머지 발견!") : "한 개씩 나눠주기 👇"}
                                </Button>
                            )}
                        </div>

                        <div className={styles.platesSection}>
                            {distributed.map((group, index) => (
                                <div key={index} className={styles.plateWrapper}>
                                    <div className={styles.plate}>
                                        <AnimatePresence>
                                            {group.map((item, i) => (
                                                <motion.div
                                                    key={`plate-${index}-${i}`}
                                                    className={styles.candyOnPlate}
                                                    initial={{ y: -50, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                >
                                                    {item}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <div className={styles.friendLabel}>친구 {index + 1}</div>
                                    <div className={styles.countLabel}>{group.length}개</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                    <h2 className={styles.title}>나눗셈 연습: 몫과 나머지 구하기 ✍️</h2>

                    {quizData && (
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                            <div className={styles.equationArea} style={{ marginBottom: '30px' }}>
                                <span className={styles.number}>{quizData.dividend}</span>
                                <span className={styles.operator}>÷</span>
                                <span className={styles.number}>{quizData.divisor}</span>
                                <span className={styles.operator}>=</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="number"
                                        value={userQuotient}
                                        onChange={(e) => setUserQuotient(e.target.value)}
                                        placeholder="몫"
                                        style={{ fontSize: '2rem', width: '80px', textAlign: 'center', padding: '10px', borderRadius: '10px', border: '2px solid #ddd' }}
                                    />
                                    <span className={styles.remainder}>...</span>
                                    <input
                                        type="number"
                                        value={userRemainder}
                                        onChange={(e) => setUserRemainder(e.target.value)}
                                        placeholder="나머지"
                                        style={{ fontSize: '2rem', width: '80px', textAlign: 'center', padding: '10px', borderRadius: '10px', border: '2px solid #ddd' }}
                                    />
                                </div>
                            </div>

                            <Button onClick={checkAnswer} size="large">정답 확인하기</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        정답입니다! 훌륭해요! 👏 (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        다시 계산해보세요! 힌트: {quizData.divisor}단 곱셈구구를 떠올려보세요.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("나눗셈 심화 학습", "나눗셈의 원리를 이해하고 직접 몫과 나머지를 구하는 연습을 합니다.")} />
        </div>
    );
};

export default DivisionVisualizer;
