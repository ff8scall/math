import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import PageHeader from '../common/PageHeader';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './SubtractionWithBorrow.module.css';
import confetti from 'canvas-confetti';

import { updateCoins } from '../../utils/storage/storageManager';

const SubtractionWithBorrow = () => {
    // Mode
    const [mode, setMode] = useState('explore');

    // Explore Data
    const [minuend, setMinuend] = useState(425);
    const [subtrahend, setSubtrahend] = useState(158);
    const [step, setStep] = useState(0);

    // Practice Data
    const [choiceData, setChoiceData] = useState(null);
    const [userResponse, setUserResponse] = useState('');
    const [feedback, setFeedback] = useState(null);

    // --- Explore Logic ---
    const reset = () => { setStep(0); };
    const nextStep = () => { if (step < 4) setStep(step + 1); if (step === 3) confetti(); };
    const prevStep = () => { if (step > 0) setStep(step - 1); };

    // Breakdown
    const m_h = Math.floor(minuend / 100);
    const m_t = Math.floor((minuend % 100) / 10);
    const m_o = minuend % 10;

    const s_h = Math.floor(subtrahend / 100);
    const s_t = Math.floor((subtrahend % 100) / 10);
    const s_o = subtrahend % 10;

    const needBorrow1 = m_o < s_o;
    const needBorrow2 = (needBorrow1 ? m_t - 1 : m_t) < s_t;

    const finalResult = minuend - subtrahend;

    const [difficulty, setDifficulty] = useState('random');

    // --- Practice Logic ---
    const startPractice = () => {
        let m, s;
        if (difficulty === 'zero-middle') {
            m = (Math.floor(Math.random() * 8) + 1) * 100 + (Math.floor(Math.random() * 9) + 1); // e.g. 405
            s = Math.floor(Math.random() * (m - 50)) + 50;
            if (s % 10 < m % 10) s += 5; // Force borrow if possible
        } else if (difficulty === 'full-hundreds') {
            m = (Math.floor(Math.random() * 8) + 2) * 100; // 200, 300...
            s = Math.floor(Math.random() * (m - 100)) + 55;
        } else {
            m = Math.floor(Math.random() * 800) + 200; // 200~999
            s = Math.floor(Math.random() * (m - 50)) + 50;
        }

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
            updateCoins(15);
            setTimeout(startPractice, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="세 자리 수 뺄셈: 받아내림" grade="3" />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            {mode === 'explore' ? (
                <>

                    <div className={styles.stage}>
                        <div className={styles.grid}>
                            {/* Headers */}
                            <div className={styles.operatorHeader}></div>
                            <div className={styles.columnHeader}>백의 자리</div>
                            <div className={styles.columnHeader}>십의 자리</div>
                            <div className={styles.columnHeader}>일의 자리</div>

                            {/* Row 1: Borrow Markers */}
                            <div className={styles.operator}></div>
                            {/* Hundreds Borrow Marker */}
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 2 && needBorrow2 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.borrowMark}>{m_h - 1}</motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Tens Borrow Marker */}
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 1 && needBorrow1 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.borrowMark}>
                                            {needBorrow2 ? 10 + (m_t - 1) : m_t - 1}
                                        </motion.div>
                                    )}
                                    {step >= 2 && needBorrow2 && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.borrowValue}>10</motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Ones Borrow Marker */}
                            <div className={styles.cell}>
                                <AnimatePresence>
                                    {step >= 1 && needBorrow1 && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.borrowValue}>10</motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Row 2: Minuend */}
                            <div className={styles.operator}></div>
                            <div className={`${styles.cell} ${step >= 2 && needBorrow2 ? styles.dimmed : ''}`}>
                                <div className={styles.numberBlock}>{m_h}</div>
                                {step >= 2 && needBorrow2 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={styles.strikeThrough} />}
                            </div>
                            <div className={`${styles.cell} ${step >= 1 && needBorrow1 ? styles.dimmed : ''}`}>
                                <div className={styles.numberBlock}>{m_t}</div>
                                {step >= 1 && needBorrow1 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={styles.strikeThrough} />}
                            </div>
                            <div className={styles.cell}>
                                <div className={styles.numberBlock}>{m_o}</div>
                            </div>

                            {/* Row 3: Subtrahend */}
                            <div className={styles.operator}>-</div>
                            <div className={styles.cell}><div className={styles.numberBlock}>{s_h}</div></div>
                            <div className={styles.cell}><div className={styles.numberBlock}>{s_t}</div></div>
                            <div className={styles.cell}><div className={styles.numberBlock}>{s_o}</div></div>

                            {/* Divider */}
                            <div className={styles.divider}></div>
                            <div className={styles.divider}></div>
                            <div className={styles.divider}></div>
                            <div className={styles.divider}></div>

                            {/* Row 4: Result */}
                            <div className={styles.operator}></div>
                            <div className={styles.cell}>
                                {step >= 4 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.resultBlock}>{Math.floor(finalResult / 100)}</motion.div>}
                            </div>
                            <div className={styles.cell}>
                                {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.resultBlock}>{Math.floor((finalResult % 100) / 10)}</motion.div>}
                            </div>
                            <div className={styles.cell}>
                                {step >= 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.resultBlock}>{finalResult % 10}</motion.div>}
                            </div>
                        </div>
                    </div>

                    <div className={styles.tutorialBox}>
                        <div className={styles.explanation}>
                            <div className={styles.stepBadge}>단계 {step + 1} / 5</div>
                            <p>
                                {step === 0 && "일의 자리부터 확인해요. 빌려와야 할까요?"}
                                {step === 1 && (needBorrow1 ? `일의 자리가 부족해요! 십의 자리에서 10을 빌려와요.` : `일의 자리는 그대로 뺄 수 있어요!`)}
                                {step === 2 && (needBorrow1 ? `일의 자리를 빼고 나서(${10 + m_o} - ${s_o} = ${finalResult % 10}), 이제 십의 자리를 봐요.` : `일의 자리를 빼고(${m_o} - ${s_o}), 십의 자리를 봐요.`)}
                                {step === 3 && (needBorrow2 ? `십의 자리가 부족해서 백의 자리에서 빌려왔어요! 십의 자리를 계산해요.` : `십의 자리도 차례대로 빼주세요.`)}
                                {step === 4 && `마지막 백의 자리까지 계산하면 끝! 정답은 ${finalResult}입니다.`}
                            </p>
                        </div>

                        <div className={styles.navControls}>
                            <Button onClick={prevStep} disabled={step === 0} variant="ghost" size="large">이전 단계</Button>
                            <Button onClick={nextStep} disabled={step === 4} variant="primary" size="large" className={styles.nextPulse}>
                                {step === 4 ? "탐험 완료! 🎉" : "다음 단계로 ▶"}
                            </Button>
                        </div>
                    </div>

                    <div className={styles.problemPresets}>
                        <span>추천 문제:</span>
                        <div className={styles.controls}>
                            <Button onClick={() => { setMinuend(425); setSubtrahend(158); reset(); }} variant="secondary" size="small">425 - 158</Button>
                            <Button onClick={() => { setMinuend(512); setSubtrahend(235); reset(); }} variant="secondary" size="small">512 - 235</Button>
                            <Button onClick={() => { setMinuend(300); setSubtrahend(123); reset(); }} variant="secondary" size="small">300 - 123</Button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                        <Button onClick={() => { setDifficulty('random'); startPractice(); }} size="small" variant={difficulty === 'random' ? 'primary' : 'outline'}>랜덤</Button>
                        <Button onClick={() => { setDifficulty('zero-middle'); startPractice(); }} size="small" variant={difficulty === 'zero-middle' ? 'primary' : 'outline'}>0 포함</Button>
                        <Button onClick={() => { setDifficulty('full-hundreds'); startPractice(); }} size="small" variant={difficulty === 'full-hundreds' ? 'primary' : 'outline'}>100 단위</Button>
                    </div>

                    {choiceData && (

                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '30px', textAlign: 'right', paddingRight: '40px' }}>
                                <div>{choiceData.m}</div>
                                <div>- {choiceData.s}</div>
                                <div style={{ borderTop: '4px solid #333', marginTop: '10px' }}></div>
                            </div>

                            <input
                                type="number"
                                value={userResponse}
                                onChange={(e) => setUserResponse(e.target.value)}
                                placeholder="정답"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                style={{ width: '100%', padding: '15px', fontSize: '2rem', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '20px', textAlign: 'center' }}
                            />

                            <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                            {feedback === 'correct' && <div style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>정답입니다! 🎉 (+15 코인)</div>}
                            {feedback === 'incorrect' && <div style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>다시 계산해보세요! 🤔</div>}
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("세 자리 수 뺄셈", "백의 자리, 십의 자리에서 빌려오는 받아내림 뺄셈의 전 과정을 시각적으로 학습합니다.")} />
        </div>
    );
};

export default SubtractionWithBorrow;
