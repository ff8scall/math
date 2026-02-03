import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './MultiplicationVisualizer.module.css';

import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';

const MultiplicationVisualizer = () => {
    // Mode
    const [mode, setMode] = useState('explore');

    // Explore Data
    const [dan, setDan] = useState(2);
    const [step, setStep] = useState(1);

    // Practice Data
    const [qData, setQData] = useState(null);
    const [userAns, setUserAns] = useState('');
    const [feedback, setFeedback] = useState(null);

    // --- Explore Logic ---
    const handleNext = () => {
        if (step < 9) setStep(step + 1);
        else if (dan < 9) { setDan(dan + 1); setStep(1); }
    };
    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
        else if (dan > 2) { setDan(dan - 1); setStep(9); }
    };

    // --- Practice Logic ---
    const startPractice = () => {
        // Random multiplication
        const d = Math.floor(Math.random() * 8) + 2; // 2~9
        const s = Math.floor(Math.random() * 9) + 1; // 1~9
        setQData({ d, s });
        setUserAns('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !qData) startPractice();
    }, [mode]);

    const checkAnswer = () => {
        if (!qData) return;
        const correct = qData.d * qData.s;
        if (parseInt(userAns) === correct) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(startPractice, 1500);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>⚡ 구구단 퀴즈</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>구구단 탐험: {dan}단 🚀</h2>

                    <div className={styles.equationArea}>
                        <span className={styles.number}>{dan}</span>
                        <span className={styles.operator}>×</span>
                        <span className={styles.number}>{step}</span>
                        <span className={styles.operator}>=</span>
                        <motion.span
                            key={`${dan}-${step}`}
                            initial={{ scale: 1.5, opacity: 0, color: '#FFD93D' }}
                            animate={{ scale: 1, opacity: 1, color: '#333' }}
                            className={styles.result}
                        >
                            {dan * step}
                        </motion.span>
                    </div>

                    <div className={styles.visualizerArea}>
                        <div className={styles.gridDisplay}>
                            {Array.from({ length: step }).map((_, groupIndex) => (
                                <motion.div
                                    key={`group-${groupIndex}`}
                                    className={styles.group}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: groupIndex * 0.1 }}
                                >
                                    <div className={styles.groupLabel}>{groupIndex + 1}묶음</div>
                                    <div className={styles.items}>
                                        {Array.from({ length: dan }).map((_, itemIndex) => (
                                            <motion.div
                                                key={`item-${groupIndex}-${itemIndex}`}
                                                className={styles.item}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: groupIndex * 0.1 + itemIndex * 0.05 }}
                                            >
                                                🍎
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className={styles.explanation}>
                            사과가 <strong>{dan}</strong>개씩 <strong>{step}</strong>묶음이면 모두 <strong>{dan * step}</strong>개예요!
                        </p>
                    </div>

                    <div className={styles.controls}>
                        <Button onClick={handlePrev} disabled={dan === 2 && step === 1} variant="secondary">이전</Button>

                        <div className={styles.danSelector}>
                            {[2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                                <button
                                    key={d}
                                    onClick={() => { setDan(d); setStep(1); }}
                                    className={`${styles.danButton} ${dan === d ? styles.activeDan : ''}`}
                                >
                                    {d}단
                                </button>
                            ))}
                        </div>

                        <Button onClick={handleNext} disabled={dan === 9 && step === 9}>다음</Button>
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h2>구구단 번개 퀴즈 ⚡</h2>
                    {qData && (
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '30px' }}>
                                {qData.d} × {qData.s} = ?
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                {/* 4 Choices? Or user input? User input is better for practice. */}
                            </div>
                            <input
                                type="number"
                                value={userAns}
                                onChange={(e) => setUserAns(e.target.value)}
                                placeholder="정답을 입력하세요"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                style={{ width: '100%', padding: '15px', fontSize: '1.5rem', borderRadius: '15px', border: '2px solid #ddd', marginBottom: '20px', textAlign: 'center' }}
                            />

                            <Button onClick={checkAnswer} size="large" fullWidth>정답!</Button>

                            {feedback === 'correct' && <div style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>정답! 참 잘했어요! (+10 코인)</div>}
                            {feedback === 'incorrect' && <div style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>다시 한번 생각해볼까요?</div>}
                        </div>
                    )}
                </div>
            )}

            {/* SEO Content */}
            <article className={styles.seoContent}>
                <h3>🧮 곱셈, 덧셈의 지름길!</h3>
                <p>
                    곱셈은 같은 수를 여러 번 더하는 것을 빠르게 계산하기 위해 만들어졌어요.<br />
                    <strong>"{dan} × {step}"</strong>은 <strong>"{dan}을 {step}번 더한다"</strong>는 뜻입니다.
                </p>
            </article>

            <JsonLd data={generateCourseSchema(`구구단 ${dan}단 학습`, `${dan}단을 시각적 모델과 함께 배우는 인터랙티브 콘텐츠입니다.`)} />
        </div>
    );
};

export default MultiplicationVisualizer;
