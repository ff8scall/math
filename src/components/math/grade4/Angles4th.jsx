import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './Angles4th.module.css';

const Angles4th = () => {
    const [angle, setAngle] = useState(45);
    const [targetAngle, setTargetAngle] = useState(null);
    const [mode, setMode] = useState('explore'); // 'explore', 'game'
    const [isDragging, setIsDragging] = useState(false);
    const [showProtractor, setShowProtractor] = useState(true);

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
        setTargetAngle(Math.floor(Math.random() * 17) * 10 + 10);
        setMode('game');
        setAngle(0);
        setShowProtractor(false);
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
            <PageHeader />
            <header className={styles.header}>
                <h2 className={styles.title}>4학년 수학: 각도 마스터! 각도기 탐험</h2>
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
                <div className={styles.origin}></div>
                <div className={styles.baseRay}></div>
                <motion.div className={styles.movingRay} style={{ transform: `rotate(${-angle}deg)` }}>
                    <div className={styles.rayLabel}>{angle}°</div>
                </motion.div>

                <AnimatePresence>
                    {showProtractor && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={styles.protractor}
                            drag
                            dragMomentum={false}
                        >
                            <svg viewBox="0 0 400 200" width="100%" height="100%">
                                <path d="M 0 200 A 200 200 0 0 1 400 200 Z" fill="none" stroke="#333" strokeWidth="2" />
                                {Array.from({ length: 19 }, (_, i) => i * 10).map(deg => {
                                    const rad = (deg * Math.PI) / 180;
                                    const tx = 200 + 160 * Math.cos(rad);
                                    const ty = 200 - 160 * Math.sin(rad);
                                    return (
                                        <g key={deg}>
                                            <line x1={200 + 180 * Math.cos(rad)} y1={200 - 180 * Math.sin(rad)} x2={200 + 200 * Math.cos(rad)} y2={200 - 200 * Math.sin(rad)} stroke="#333" strokeWidth="2" />
                                            <text x={tx} y={ty} textAnchor="middle" fontSize="12" fill="#333" transform={`rotate(${90-deg}, ${tx}, ${ty})`}>{deg}</text>
                                        </g>
                                    );
                                })}
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
            <JsonLd data={generateCourseSchema("각도", "각의 크기를 재고 예각, 직각, 둔각의 개념을 배웁니다.")} />
        </div>
    );
};

export default Angles4th;
