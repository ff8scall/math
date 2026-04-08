import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './ProtractorSimulator.module.css';

const ProtractorSimulator = () => {
    const [angle, setAngle] = useState(45);
    const [targetAngle, setTargetAngle] = useState(null);
    const [mode, setMode] = useState('explore'); // 'explore', 'game'
    const [isDragging, setIsDragging] = useState(false);
    const [showProtractor, setShowProtractor] = useState(true);
    const [protractorRotation, setProtractorRotation] = useState(0);

    const containerRef = useRef(null);

    const getAngleFromEvent = (e) => {
        if (!containerRef.current) return angle;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        
        let deg = Math.atan2(y, x) * (180 / Math.PI);
        deg = -deg; // Invert y for standard math coords
        if (deg < 0) deg += 360;
        
        // Snap to whole degrees
        return Math.round(deg);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setAngle(getAngleFromEvent(e));
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setAngle(getAngleFromEvent(e));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const startNewGame = () => {
        setTargetAngle(Math.floor(Math.random() * 17) * 10 + 10); // 10, 20... 170
        setMode('game');
        setAngle(0);
        setShowProtractor(false); // Hide protractor for game challenge
    };

    const checkGameAnswer = () => {
        const diff = Math.abs(angle - targetAngle);
        if (diff <= 2) {
            confetti();
            updateCoins(20);
            alert(`대단해요! 정답은 ${targetAngle}도였어요! (+20 코인)`);
            startNewGame();
        } else {
            alert(`아쉬워요! 현재 ${angle}도예요. ${targetAngle}도에 더 맞춰보세요!`);
            setShowProtractor(true);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>📐 4학년 수학: 각도 마스터! 각도기 탐험</h1>
                <p className={styles.subtitle}>각도기를 자유자재로 움직이며 여러 가지 각을 만들어보세요.</p>
            </header>

            <div className={styles.toolbar}>
                <Button onClick={() => { setMode('explore'); setTargetAngle(null); setShowProtractor(true); }} variant={mode === 'explore' ? 'primary' : 'secondary'}>자유 탐색</Button>
                <Button onClick={startNewGame} variant={mode === 'game' ? 'primary' : 'secondary'}>내기 모드 (Game)</Button>
                <div className={styles.toggleGroup}>
                    <label>
                        <input type="checkbox" checked={showProtractor} onChange={(e) => setShowProtractor(e.target.checked)} />
                        각도기 보이기
                    </label>
                </div>
            </div>

            <main 
                className={styles.stage} 
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Center Point */}
                <div className={styles.origin}></div>

                {/* Base Ray (0 degrees) */}
                <div className={styles.baseRay}></div>

                {/* Moving Ray */}
                <motion.div 
                    className={styles.movingRay}
                    style={{ transform: `rotate(${-angle}deg)` }}
                >
                    <div className={styles.rayLabel}>{angle}°</div>
                </motion.div>

                {/* Protractor Overlay */}
                <AnimatePresence>
                    {showProtractor && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.6, scale: 1, rotate: protractorRotation }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={styles.protractor}
                            drag
                            dragMomentum={false}
                        >
                            {/* SVG Protractor Body */}
                            <svg viewBox="0 0 400 200" width="100%" height="100%">
                                <path d="M 0 200 A 200 200 0 0 1 400 200 Z" fill="none" stroke="#333" strokeWidth="2" />
                                {Array.from({ length: 19 }, (_, i) => i * 10).map(deg => {
                                    const rad = (deg * Math.PI) / 180;
                                    const x1 = 200 + 180 * Math.cos(rad);
                                    const y1 = 200 - 180 * Math.sin(rad);
                                    const x2 = 200 + 200 * Math.cos(rad);
                                    const y2 = 200 - 200 * Math.sin(rad);
                                    const tx = 200 + 160 * Math.cos(rad);
                                    const ty = 200 - 160 * Math.sin(rad);
                                    return (
                                        <g key={deg}>
                                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth="2" />
                                            <text x={tx} y={ty} textAnchor="middle" fontSize="12" fill="#333" transform={`rotate(${90-deg}, ${tx}, ${ty})`}>{deg}</text>
                                        </g>
                                    );
                                })}
                                {/* Mid markings */}
                                {Array.from({ length: 180 }, (_, i) => i).map(deg => (
                                    (deg % 10 !== 0) && (
                                        <line 
                                            key={deg}
                                            x1={200 + 190 * Math.cos(deg * Math.PI / 180)}
                                            y1={200 - 190 * Math.sin(deg * Math.PI / 180)}
                                            x2={200 + 200 * Math.cos(deg * Math.PI / 180)}
                                            y2={200 - 200 * Math.sin(deg * Math.PI / 180)}
                                            stroke="#666" strokeWidth="1"
                                        />
                                    )
                                ))}
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>

                {mode === 'game' && targetAngle && (
                    <div className={styles.gameGoal}>
                        🎯 목표 각도: <strong>{targetAngle}도</strong>
                    </div>
                )}
            </main>

            <footer className={styles.footer}>
                {mode === 'game' ? (
                    <Button onClick={checkGameAnswer} size="large" fullWidth variant="accent">정답 확인!</Button>
                ) : (
                    <div className={styles.infoBox}>
                        <p>💡 마우스로 빨간 선을 움직여 각도를 조절해보세요. 각도기를 드래그해서 위치를 맞출 수도 있어요!</p>
                        <div className={styles.angleClass}>
                            분류: <strong>{angle === 90 ? '직각 📐' : angle < 90 ? '예각 🔹' : angle === 180 ? '평각 ➖' : '둔각 🔸'}</strong>
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default ProtractorSimulator;
