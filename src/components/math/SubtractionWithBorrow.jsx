import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './SubtractionWithBorrow.module.css';
import confetti from 'canvas-confetti';

import { updateCoins } from '../../utils/storage/storageManager';

const SubtractionWithBorrow = () => {
    // Mode
    const [mode, setMode] = useState('explore');

    // Explore Data
    const [minuend, setMinuend] = useState(32);
    const [subtrahend, setSubtrahend] = useState(15);
    const [step, setStep] = useState(0);

    // Practice Data
    const [choiceData, setChoiceData] = useState(null);
    const [userResponse, setUserResponse] = useState('');
    const [feedback, setFeedback] = useState(null);

    // --- Explore Logic ---
    const reset = () => { setStep(0); };
    const nextStep = () => { if (step < 3) setStep(step + 1); if (step === 2) confetti(); };
    const prevStep = () => { if (step > 0) setStep(step - 1); };

    // Helper values
    const topTens = Math.floor(minuend / 10);
    const topOnes = minuend % 10;
    const botTens = Math.floor(subtrahend / 10);
    const botOnes = subtrahend % 10;
    const needBorrow = topOnes < botOnes;
    const finalResult = minuend - subtrahend;

    // --- Practice Logic ---
    const startPractice = () => {
        // Generate problem with borrow
        const t = Math.floor(Math.random() * 8) + 2; // Tens: 2~9
        const o = Math.floor(Math.random() * 5); // Ones: 0~4

        let m = t * 10 + o; // e.g. 32

        // Random subtrahend ensuring borrow
        // s_ones > o. 5~9
        const s_o = Math.floor(Math.random() * 5) + 5;
        const s_t = Math.floor(Math.random() * (t - 1)) + 1; // 1 ~ t-1

        let s = s_t * 10 + s_o;
        if (s >= m) s = m - 1; // Fallback

        setChoiceData({ m, s });
        setUserResponse('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !choiceData) startPractice();
    }, [mode]);

    const checkAnswer = () => {
        if (!choiceData) return;
        const correct = choiceData.m - choiceData.s;
        if (parseInt(userResponse) === correct) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(startPractice, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>뺄셈 탐험: 받아내림이 있어요! ➖</h2>

                    <div className={styles.stage}>
                        <div className={styles.grid}>
                            {/* Headers */}
                            <div className={styles.columnHeader}>십의 자리</div>
                            <div className={styles.columnHeader}>일의 자리</div>
                            <div className={styles.operatorHeader}></div>

                            {/* Row 1: Borrow/Regrouping Markers */}
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 1 && needBorrow && (
                                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.borrowMark}>
                                            {topTens - 1}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {step >= 1 && needBorrow && <div className={styles.strikeThrough} />}
                            </div>
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 1 && needBorrow && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={styles.borrowValue}>
                                            10
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className={styles.operator}></div>

                            {/* Row 2: Minuend */}
                            <div className={`${styles.cell} ${step >= 1 && needBorrow ? styles.dimmed : ''}`}>
                                <div className={styles.numberBlock}>{topTens}</div>
                            </div>
                            <div className={styles.cell}>
                                <div className={styles.numberBlock}>{topOnes}</div>
                            </div>
                            <div className={styles.operator}></div>

                            {/* Row 3: Subtrahend */}
                            <div className={styles.cell}>
                                <div className={styles.numberBlock}>{botTens}</div>
                            </div>
                            <div className={styles.cell}>
                                <div className={styles.numberBlock}>{botOnes}</div>
                            </div>
                            <div className={styles.operator}>-</div>

                            {/* Divider */}
                            <div className={styles.divider}></div>
                            <div className={styles.divider}></div>
                            <div className={styles.divider}></div>

                            {/* Row 4: Result */}
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 3 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.resultBlock}>
                                            {Math.floor(finalResult / 10)}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 2 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.resultBlock}>
                                            {finalResult % 10}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className={styles.operator}></div>
                        </div>
                    </div>

                    <div className={styles.explanation}>
                        {step === 0 && "자, 뺄셈을 시작해볼까요? 일의 자리부터 봐주세요."}
                        {step === 1 && needBorrow && `${topOnes}에서 ${botOnes}을 뺄 수 없어요! 십의 자리에서 10을 빌려와요.`}
                        {step === 1 && !needBorrow && `일의 자리끼리 뺄 수 있네요! 그대로 진행해요.`}
                        {step === 2 && `이제 일의 자리 뺄셈을 해요. ${needBorrow ? `10 + ${topOnes} - ${botOnes}` : `${topOnes} - ${botOnes}`} = ${finalResult % 10}`}
                        {step === 3 && `십의 자리를 마저 빼주면 끝! 정답은 ${finalResult}입니다.`}
                    </div>

                    <div className={styles.controls}>
                        <Button onClick={() => { setMinuend(32); setSubtrahend(15); reset(); }} variant="secondary" size="small">문제 1 (32-15)</Button>
                        <Button onClick={() => { setMinuend(40); setSubtrahend(18); reset(); }} variant="secondary" size="small">문제 2 (40-18)</Button>
                        <Button onClick={() => { setMinuend(55); setSubtrahend(27); reset(); }} variant="secondary" size="small">문제 3 (55-27)</Button>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <Button onClick={prevStep} disabled={step === 0}>이전 단계</Button>
                        <Button onClick={nextStep} disabled={step === 3}>다음 단계</Button>
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h2>뺄셈 연습: 받아내림 주의! 🔥</h2>
                    {choiceData && (
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div>{choiceData.m}</div>
                                    <div>- {choiceData.s}</div>
                                    <div style={{ borderTop: '3px solid #333', marginTop: '10px', width: '100%' }}></div>
                                </div>
                            </div>

                            <input
                                type="number"
                                value={userResponse}
                                onChange={(e) => setUserResponse(e.target.value)}
                                placeholder="정답"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                style={{ width: '100%', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '20px', textAlign: 'center' }}
                            />

                            <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                            {feedback === 'correct' && <div style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>정답입니다! 🎉 (+10 코인)</div>}
                            {feedback === 'incorrect' && <div style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>다시 계산해보세요! 🤔</div>}
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("받아내림이 있는 뺄셈", "십의 자리에서 10을 빌려와서 계산하는 받아내림 뺄셈의 원리를 시각적으로 학습합니다.")} />
        </div>
    );
};

export default SubtractionWithBorrow;
