import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import PageHeader from '../common/PageHeader';
import styles from './RatioVisualizer.module.css';

const RatioVisualizer = () => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(5);
    const [mode, setMode] = useState('ratio'); // 'ratio', 'percent', 'game'
    
    // Percentage state
    const [percent, setPercent] = useState(60);
    
    // Game state
    const [targetRatio, setTargetRatio] = useState({ a: 1, b: 2 });
    const [gameFeedback, setGameFeedback] = useState(null);

    const ratioValue = (a / b).toFixed(2);
    const ratioPercent = ((a / b) * 100).toFixed(0);

    const startNewGame = () => {
        const ra = Math.floor(Math.random() * 5) + 1;
        const rb = Math.floor(Math.random() * 5) + 1;
        setTargetRatio({ a: ra, b: rb });
        setMode('game');
        setA(1);
        setB(1);
        setGameFeedback(null);
    };

    const checkGame = () => {
        const currentVal = a / b;
        const targetVal = targetRatio.a / targetRatio.b;
        if (Math.abs(currentVal - targetVal) < 0.01) {
            confetti();
            updateCoins(25);
            setGameFeedback('correct');
        } else {
            setGameFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="비와 비율 탐험대" grade="6" />
            
            <div className={styles.intro}>
                <h3 className={styles.subtitle}>세상의 모든 관계를 숫자로 표현하는 마법, 비율을 배워보세요.</h3>
            </div>

            <nav className={styles.nav}>
                <button className={mode === 'ratio' ? styles.active : ''} onClick={() => setMode('ratio')}>비와 비율 (Ratio)</button>
                <button className={mode === 'percent' ? styles.active : ''} onClick={() => setMode('percent')}>백분율 (Percentage)</button>
                <button className={mode === 'game' ? styles.active : ''} onClick={() => { if (mode !== 'game') startNewGame(); }}>비율 맞추기 게임</button>
            </nav>

            <main className={styles.main}>
                <AnimatePresence mode="wait">
                    {mode === 'ratio' && (
                        <motion.div key="ratio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={styles.card}>
                            <div className={styles.ratioDisplay}>
                                <div className={styles.ratioTitle}>기준량에 대한 비교하는 양의 크기</div>
                                <div className={styles.ratioNumbers}>
                                    <span className={styles.valA}>{a}</span> : <span className={styles.valB}>{b}</span>
                                </div>
                                <div className={styles.ratioText}>
                                    비율: <strong>{a}/{b}</strong> 또는 <strong>{ratioValue}</strong>
                                </div>
                            </div>

                            <div className={styles.visualComparison}>
                                <div className={styles.barContainer}>
                                    <div className={styles.barLabel}>비교하는 양 (A)</div>
                                    <motion.div className={styles.barA} animate={{ width: `${(a / Math.max(a, b)) * 100}%` }}></motion.div>
                                    <div className={styles.barValue}>{a}</div>
                                </div>
                                <div className={styles.barContainer}>
                                    <div className={styles.barLabel}>기준량 (B)</div>
                                    <motion.div className={styles.barB} animate={{ width: `${(b / Math.max(a, b)) * 100}%` }}></motion.div>
                                    <div className={styles.barValue}>{b}</div>
                                </div>
                            </div>

                            <div className={styles.inputs}>
                                <div className={styles.inputGroup}>
                                    <label>A 조절: {a}</label>
                                    <input type="range" min="1" max="20" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>B 조절: {b}</label>
                                    <input type="range" min="1" max="20" value={b} onChange={(e) => setB(parseInt(e.target.value))} />
                                </div>
                            </div>

                            <div className={styles.exampleTip}>
                                🍹 <strong>주스 만들기:</strong> 원액 {a}컵에 물 {b}컵을 섞으면, 전체에 대한 원액의 비율은 {a}/{a+b} 이에요!
                            </div>
                        </motion.div>
                    )}

                    {mode === 'percent' && (
                        <motion.div key="percent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={styles.card}>
                            <div className={styles.percentHeader}>
                                <h2>기준량을 100으로 할 때의 비율: 백분율 (%)</h2>
                                <div className={styles.percentValue}>{percent}%</div>
                            </div>

                            <div className={styles.grid100}>
                                {Array.from({ length: 100 }).map((_, i) => (
                                    <div key={i} className={`${styles.gridCell} ${i < percent ? styles.filled : ''}`}></div>
                                ))}
                            </div>

                            <div className={styles.sliderBox}>
                                <input type="range" min="0" max="100" value={percent} onChange={(e) => setPercent(parseInt(e.target.value))} className={styles.percentSlider} />
                            </div>

                            <div className={styles.realWorld}>
                                <div className={styles.rwItem}>
                                    <span>🏷️ 할인율</span>
                                    <p>10,000원 물건을 {percent}% 할인하면 <strong>{10000 * (percent/100)}원</strong> 깎아줘요!</p>
                                </div>
                                <div className={styles.rwItem}>
                                    <span>🔋 배터리</span>
                                    <p>내 폰 배터리가 <strong>{percent}%</strong> 남았어요.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'game' && (
                        <motion.div key="game" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={styles.card}>
                            <div className={styles.gameTarget}>
                                🎯 목표 비율: <strong>{targetRatio.a} : {targetRatio.b}</strong>
                                <p>슬라이더를 조절해서 약분했을 때 목표 비율과 같게 만들어보세요!</p>
                            </div>

                            <div className={styles.gamePlay}>
                                <div className={styles.currentRatioDisplay}>
                                    {a} : {b}
                                </div>
                                <div className={styles.inputs}>
                                    <input type="range" min="1" max="30" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
                                    <input type="range" min="1" max="30" value={b} onChange={(e) => setB(parseInt(e.target.value))} />
                                </div>
                                <Button onClick={checkGame} size="large" variant="accent" fullWidth>비율 확인하기!</Button>
                            </div>

                            <AnimatePresence>
                                {gameFeedback === 'correct' && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.fbCorrect}>
                                        ✨ 정답입니다! 정확한 비율이에요! ✨
                                        <Button onClick={startNewGame} style={{ marginTop: '10px' }}>다음 문제 👉</Button>
                                    </motion.div>
                                )}
                                {gameFeedback === 'incorrect' && (
                                    <motion.div initial={{ x: -10 }} animate={{ x: [0, -10, 10, 0] }} className={styles.fbIncorrect}>
                                        아직 비율이 맞지 않아요. 조금 더 조절해볼까요?
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default RatioVisualizer;
