import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './BlockBuilder3D.module.css';

const BlockBuilder3D = () => {
    // 3x3 grid representing heights of blocks (max 3)
    const initialGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    const [grid, setGrid] = useState(initialGrid);
    const [mode, setMode] = useState('explore'); // 'explore' or 'challenge'
    const [targetViews, setTargetViews] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const handleGridClick = (r, c) => {
        const newGrid = [...grid.map(row => [...row])];
        newGrid[r][c] = (newGrid[r][c] + 1) % 4; // Max height 3, then reset to 0
        setGrid(newGrid);
    };

    const getViews = (currentGrid) => {
        const topView = currentGrid.map(row => row.map(val => val > 0 ? 1 : 0));
        
        const frontView = [0, 0, 0];
        for (let col = 0; col < 3; col++) {
            let maxInCol = 0;
            for (let row = 0; row < 3; row++) {
                if (currentGrid[row][col] > maxInCol) maxInCol = currentGrid[row][col];
            }
            frontView[col] = maxInCol;
        }

        const sideView = [0, 0, 0];
        for (let row = 0; row < 3; row++) {
            let maxInRow = 0;
            for (let col = 0; col < 3; col++) {
                if (currentGrid[row][col] > maxInRow) maxInRow = currentGrid[row][col];
            }
            sideView[2 - row] = maxInRow; // Right side view mapping
        }

        return { top: topView, front: frontView, side: sideView };
    };

    const generateChallenge = () => {
        const challengeGrid = [
            [Math.floor(Math.random()*3), Math.floor(Math.random()*3), Math.floor(Math.random()*3)],
            [Math.floor(Math.random()*3), Math.floor(Math.random()*3), Math.floor(Math.random()*3)],
            [Math.floor(Math.random()*3), Math.floor(Math.random()*3), Math.floor(Math.random()*3)]
        ];
        // Ensure at least one block exists
        challengeGrid[1][1] = Math.max(1, challengeGrid[1][1]);

        setTargetViews(getViews(challengeGrid));
        setGrid(initialGrid);
        setMode('challenge');
        setFeedback(null);
    };

    const checkAnswer = () => {
        const currentViews = getViews(grid);
        const isCorrect = 
            JSON.stringify(currentViews.top) === JSON.stringify(targetViews.top) &&
            JSON.stringify(currentViews.front) === JSON.stringify(targetViews.front) &&
            JSON.stringify(currentViews.side) === JSON.stringify(targetViews.side);
        
        if (isCorrect) {
            confetti();
            updateCoins(30);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    const views = getViews(grid);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>🧱 6학년: 쌓기나무 3D 시뮬레이터</h1>
                <p className={styles.subtitle}>위, 앞, 옆에서 본 모양을 통해 입체도형의 구조를 완벽하게 파악해봐요!</p>
                <div className={styles.nav}>
                    <Button onClick={() => { setMode('explore'); setTargetViews(null); setGrid(initialGrid); }} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 자유 조립</Button>
                    <Button onClick={generateChallenge} variant={mode === 'challenge' ? 'primary' : 'secondary'}>🎯 모양 맞추기 챌린지</Button>
                </div>
            </header>

            <main className={styles.mainContent}>
                <div className={styles.builderArea}>
                    <h3>클릭하여 쌓기나무 쌓기 (최대 3층)</h3>
                    <div className={styles.isometricGrid}>
                        {grid.map((row, r) => (
                            <div key={`row-${r}`} className={styles.gridRow}>
                                {row.map((val, c) => (
                                    <div 
                                        key={`cell-${r}-${c}`} 
                                        className={styles.gridCell}
                                        onClick={() => handleGridClick(r, c)}
                                    >
                                        <div className={styles.baseCell}>{val === 0 && <span className={styles.plusIcon}>+</span>}</div>
                                        {Array.from({ length: val }).map((_, h) => (
                                            <motion.div 
                                                key={`block-${r}-${c}-${h}`} 
                                                className={styles.block}
                                                style={{ bottom: `${h * 100}%` }}
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                            >
                                                <div className={styles.blockTop}></div>
                                                <div className={styles.blockLeft}></div>
                                                <div className={styles.blockRight}></div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {mode === 'explore' && (
                        <Button onClick={() => setGrid(initialGrid)} variant="ghost" className={styles.clearBtn}>전체 지우기 🗑️</Button>
                    )}
                </div>

                <div className={styles.viewsArea}>
                    <h3>{mode === 'challenge' ? '🎯 목표 모양' : '👀 실시간 투영 모양'}</h3>
                    <div className={styles.viewsContainer}>
                        <div className={styles.viewBox}>
                            <h4>위치(바닥면)</h4>
                            <div className={styles.viewGridTop}>
                                {(mode === 'challenge' ? targetViews.top : views.top).map((row, r) => (
                                    row.map((val, c) => (
                                        <div key={`top-${r}-${c}`} className={`${styles.vCell} ${val ? styles.vFilled : ''}`}></div>
                                    ))
                                ))}
                            </div>
                        </div>

                        <div className={styles.viewBox}>
                            <h4>앞</h4>
                            <div className={styles.viewGridFront}>
                                {[2, 1, 0].map((h) => (
                                    [0, 1, 2].map((col) => {
                                        const tViews = mode === 'challenge' ? targetViews.front : views.front;
                                        return <div key={`front-${h}-${col}`} className={`${styles.vCell} ${tViews[col] > h ? styles.vFilledFront : ''}`}></div>
                                    })
                                ))}
                            </div>
                        </div>

                        <div className={styles.viewBox}>
                            <h4>옆 (오른쪽)</h4>
                            <div className={styles.viewGridFront}>
                                {[2, 1, 0].map((h) => (
                                    [0, 1, 2].map((col) => {
                                        const tViews = mode === 'challenge' ? targetViews.side : views.side;
                                        return <div key={`side-${h}-${col}`} className={`${styles.vCell} ${tViews[col] > h ? styles.vFilledSide : ''}`}></div>
                                    })
                                ))}
                            </div>
                        </div>
                    </div>

                    {mode === 'challenge' && (
                        <div className={styles.challengeControls}>
                            <Button onClick={checkAnswer} size="large" fullWidth variant="accent">정답 제출하기</Button>
                            
                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.success}>
                                        🎉 완벽해요! 투영도가 일치합니다! (+30 코인)
                                        <Button onClick={generateChallenge} variant="primary" style={{ marginTop: '10px' }}>다음 챌린지 👉</Button>
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div initial={{ x: -10 }} animate={{ x: [0, -10, 10, 0] }} className={styles.error}>
                                        모양이 다릅니다. 목표 모양을 다시 확인하고 블록을 수정해보세요!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>
            <JsonLd data={generateCourseSchema("공간과 입체", "쌓기나무를 활용하여 공간 지각력과 입체도형의 개념을 배웁니다.")} />
        </div>
    );
};

export default BlockBuilder3D;
