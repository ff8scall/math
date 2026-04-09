import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './NumberDecomposer.module.css';
import confetti from 'canvas-confetti';

const NumberDecomposer = () => {
    const [mode, setMode] = useState('split'); // 'split' (가르기), 'gather' (모으기)
    const [targetNumber, setTargetNumber] = useState(7);
    const [counts, setCounts] = useState({ left: 0, right: 0 });
    const [remaining, setRemaining] = useState(7);

    useEffect(() => {
        reset();
    }, [targetNumber, mode]);

    const reset = () => {
        if (mode === 'split') {
            setRemaining(targetNumber);
            setCounts({ left: 0, right: 0 });
        } else {
            // Randomly split for gather mode
            const left = Math.floor(Math.random() * (targetNumber - 1)) + 1;
            setCounts({ left, right: targetNumber - left });
            setRemaining(0);
        }
    };

    const moveBall = (from, to) => {
        if (from === 'top' && remaining > 0) {
            setRemaining(prev => prev - 1);
            setCounts(prev => ({ ...prev, [to]: prev[to] + 1 }));
        } else if (to === 'top' && counts[from] > 0) {
            setCounts(prev => ({ ...prev, [from]: prev[from] - 1 }));
            setRemaining(prev => prev + 1);
        }

        // Check success
        if (mode === 'split' && remaining === 1 && (from === 'top')) {
            // The last ball being moved
            if (counts.left + counts.right + 1 === targetNumber) {
                setTimeout(() => confetti(), 500);
            }
        } else if (mode === 'gather' && counts[from] === 1 && to === 'top') {
             if (remaining + 1 === targetNumber) {
                setTimeout(() => confetti(), 500);
            }
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="숫자 친구들 가르기와 모으기" grade="1" />
            
            <div className={styles.card}>
                <div className={styles.modeToggle}>
                    <Button onClick={() => setMode('split')} variant={mode === 'split' ? 'primary' : 'secondary'}>🍌 가르기 (나누기)</Button>
                    <Button onClick={() => setMode('gather')} variant={mode === 'gather' ? 'primary' : 'secondary'}>🍎 모으기 (합치기)</Button>
                </div>

                <div className={styles.stats}>
                    <div className={styles.formula}>
                        {mode === 'split' ? (
                            <>
                                <div className={`${styles.numberCircle} ${styles.targetCircle}`}>{targetNumber}</div>
                                <span>→</span>
                                <div className={styles.numberCircle}>{counts.left}</div>
                                <span>와</span>
                                <div className={styles.numberCircle}>{counts.right}</div>
                            </>
                        ) : (
                            <>
                                <div className={styles.numberCircle}>{counts.left}</div>
                                <span>와</span>
                                <div className={styles.numberCircle}>{counts.right}</div>
                                <span>→</span>
                                <div className={`${styles.numberCircle} ${styles.targetCircle}`}>{remaining}</div>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Visual Zone */}
                <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '24px', marginTop: '2rem' }}>
                    {/* Top Box (Parent) */}
                    <div className={styles.box} onClick={() => mode === 'gather' && (counts.left > 0 ? moveBall('left', 'top') : moveBall('right', 'top'))}>
                        <div className={styles.boxLabel}>전체 구슬 (사과)</div>
                        <AnimatePresence>
                            {Array.from({ length: remaining }).map((_, i) => (
                                <motion.div 
                                    key={`rem-${i}`} 
                                    className={styles.ball}
                                    layoutId={`ball-${i}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className={styles.playZone} style={{ marginTop: '2rem' }}>
                        <div className={styles.box} onClick={() => mode === 'split' && moveBall('top', 'left')}>
                            <div className={styles.boxLabel}>왼쪽 친구</div>
                            {Array.from({ length: counts.left }).map((_, i) => (
                                <motion.div key={`l-${i}`} className={styles.ball} layoutId={`l-ball-${i}`} />
                            ))}
                        </div>
                        <div className={styles.box} onClick={() => mode === 'split' && moveBall('top', 'right')}>
                            <div className={styles.boxLabel}>오른쪽 친구</div>
                            {Array.from({ length: counts.right }).map((_, i) => (
                                <motion.div key={`r-${i}`} className={styles.ball} layoutId={`r-ball-${i}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.explanation}>
                    {mode === 'split' 
                        ? `💡 전체 ${targetNumber}개를 두 친구에게 클릭해서 나누어 주세요! 어떻게 나눌 수 있을까요?`
                        : `💡 두 친구의 사과를 클릭해서 전체 주머니로 모아보세요! 모두 몇 개가 될까요?`
                    }
                </div>

                <div className={styles.controls}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>연습할 숫자 선택</label>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {[5, 6, 7, 8, 9, 10].map(n => (
                            <Button 
                                key={n} 
                                onClick={() => setTargetNumber(n)} 
                                variant={targetNumber === n ? 'accent' : 'outline'}
                                size="small"
                            >
                                {n}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <JsonLd data={generateCourseSchema("초등 1학년 수 가르기와 모으기", "덧셈과 뺄셈의 기초인 수의 분해와 합성을 구체물을 통해 직관적으로 학습합니다.")} />
        </div>
    );
};

export default NumberDecomposer;
