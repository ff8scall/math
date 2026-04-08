import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './RatioProportion6th.module.css';

const RatioProportion6th = () => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(5);
    const [mode, setMode] = useState('ratio'); // 'ratio', 'percent', 'game'
    const [percent, setPercent] = useState(60);
    const [targetRatio, setTargetRatio] = useState({ a: 1, b: 2 });
    const [gameFeedback, setGameFeedback] = useState(null);

    const ratioValue = (a / b).toFixed(2);

    const startNewGame = () => {
        const ra = Math.floor(Math.random() * 5) + 1;
        const rb = Math.floor(Math.random() * 5) + 1;
        setTargetRatio({ a: ra, rb: rb });
        setMode('game');
        setA(1); setB(1);
        setGameFeedback(null);
    };

    const checkGame = () => {
        if (Math.abs((a / b) - (targetRatio.a / targetRatio.rb)) < 0.01) {
            confetti();
            updateCoins(25);
            setGameFeedback('correct');
        } else {
            setGameFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>📊 6학년 수학: 비와 비율 탐험대</h1>
                <nav className={styles.nav}>
                    <Button onClick={() => setMode('ratio')} variant={mode === 'ratio' ? 'primary' : 'secondary'}>비와 비율</Button>
                    <Button onClick={() => setMode('percent')} variant={mode === 'percent' ? 'primary' : 'secondary'}>백분율</Button>
                    <Button onClick={() => { if (mode !== 'game') startNewGame(); }} variant={mode === 'game' ? 'primary' : 'secondary'}>도전 게임!</Button>
                </nav>
            </header>

            <AnimatePresence mode="wait">
                {mode === 'ratio' && (
                    <motion.div key="ratio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.card}>
                        <div className={styles.ratioMain}>
                            <div className={styles.numbers}><strong>{a}</strong> : <strong>{b}</strong></div>
                            <p>비율: {a}/{b} ({ratioValue})</p>
                            <div className={styles.bars}>
                                <div className={styles.barBox}><div className={styles.barA} style={{ height: `${(a / Math.max(a, b)) * 100}%` }}></div><span>비교하는 양 ({a})</span></div>
                                <div className={styles.barBox}><div className={styles.barB} style={{ height: `${(b / Math.max(a, b)) * 100}%` }}></div><span>기준량 ({b})</span></div>
                            </div>
                            <div className={styles.sliders}>
                                <input type="range" min="1" max="20" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
                                <input type="range" min="1" max="20" value={b} onChange={(e) => setB(parseInt(e.target.value))} />
                            </div>
                        </div>
                    </motion.div>
                )}

                {mode === 'percent' && (
                    <motion.div key="percent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.card}>
                        <div className={styles.percentMain}>
                            <h2>기준량을 100으로! 백분율 <strong>{percent}%</strong></h2>
                            <div className={styles.grid100}>
                                {Array.from({ length: 100 }).map((_, i) => (
                                    <div key={i} className={`${styles.gridCell} ${i < percent ? styles.filled : ''}`}></div>
                                ))}
                            </div>
                            <input type="range" min="0" max="100" value={percent} onChange={(e) => setPercent(parseInt(e.target.value))} className={styles.fullWidthSlider} />
                        </div>
                    </motion.div>
                )}

                {mode === 'game' && (
                    <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.card}>
                        <div className={styles.gameMain}>
                            <h3>목표 비율: <strong>{targetRatio.a} : {targetRatio.rb}</strong></h3>
                            <div className={styles.gameInputs}>
                                <div className={styles.current}>{a} : {b}</div>
                                <input type="range" min="1" max="30" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
                                <input type="range" min="1" max="30" value={b} onChange={(e) => setB(parseInt(e.target.value))} />
                                <Button onClick={checkGame} size="large" fullWidth>정답 확인!</Button>
                            </div>
                            {gameFeedback === 'correct' && <div className={styles.success}>정답입니다! (+25 코인) <Button onClick={startNewGame}>다음 문제</Button></div>}
                            {gameFeedback === 'incorrect' && <div className={styles.error}>조금 더 맞춰보세요!</div>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <JsonLd data={generateCourseSchema("비와 비율", "비의 뜻과 비율, 백분율의 개념을 배웁니다.")} />
        </div>
    );
};

export default RatioProportion6th;
