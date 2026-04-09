import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './GeometryMaster4.module.css';

const GeometryMaster4 = () => {
    // x, y are in grid units (50px)
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [flipX, setFlipX] = useState(1);
    const [flipY, setFlipY] = useState(1);
    
    const [showGhost, setShowGhost] = useState(true);
    const [lastAction, setLastAction] = useState('시작');

    const reset = () => {
        setPos({ x: 0, y: 0 });
        setRotation(0);
        setFlipX(1);
        setFlipY(1);
        setLastAction('초기화');
    };

    const handleFlip = (axis) => {
        if (axis === 'X') setFlipX(prev => prev * -1);
        else setFlipY(prev => prev * -1);
        setLastAction(`${axis === 'X' ? '좌우' : '위아래'} 뒤집기`);
    };

    const handleRotate = (deg) => {
        setRotation(prev => prev + deg);
        setLastAction(`시계 방향으로 ${deg}도 돌리기`);
    };

    const handlePush = (dx, dy) => {
        setPos(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setLastAction(`밀기`);
    };

    // Shape definition: relative to center
    // We'll draw a "ㄱ" shape (L-shape) with vertex labels
    const blocks = [
        { dx: 0, dy: 0, label: 'A' },
        { dx: 0, dy: 1, label: 'B' },
        { dx: 1, dy: 1, label: 'C' }
    ];

    return (
        <div className={styles.container}>
            <PageHeader title="평면도형 이동 마스터" grade="4" />

            <div className={styles.workspace}>
                {/* Canvas Area */}
                <div className={styles.canvas}>
                    <div className={`${styles.axis} ${styles.vAxis}`} />
                    <div className={`${styles.axis} ${styles.hAxis}`} />

                    {/* Original Ghost (Tracing Paper) */}
                    {showGhost && (
                        <div className={`${styles.shape} ${styles.ghost}`}>
                            {blocks.map((b, i) => (
                                <div 
                                    key={`ghost-${i}`} 
                                    className={styles.block} 
                                    style={{ position: 'absolute', left: b.dx * 50, top: b.dy * 50 }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Active Shape */}
                    <motion.div 
                        className={styles.shape}
                        animate={{
                            x: pos.x * 50,
                            y: pos.y * 50,
                            rotate: rotation,
                            scaleX: flipX,
                            scaleY: flipY
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    >
                        {blocks.map((b, i) => (
                            <div 
                                key={`real-${i}`} 
                                className={styles.block} 
                                style={{ 
                                    position: 'absolute', 
                                    left: b.dx * 50, 
                                    top: b.dy * 50,
                                    background: i === 0 ? '#48bb78' : i === 1 ? '#4299e1' : '#ed64a6' // Colorful vertices
                                }}
                            >
                                <span className={styles.vertexLabel} style={{ transform: `scaleX(${1/flipX}) scaleY(${1/flipY}) rotate(${-rotation}deg)` }}>
                                    {b.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Controls Area */}
                <div className={styles.sidePanel}>
                    <div className={styles.controlCard}>
                        <h3>💨 밀기 (Translation)</h3>
                        <div className={styles.btnGrid}>
                            <Button onClick={() => handlePush(0, -1)} size="small">위로</Button>
                            <Button onClick={() => handlePush(0, 1)} size="small">아래로</Button>
                            <Button onClick={() => handlePush(-1, 0)} size="small">왼쪽</Button>
                            <Button onClick={() => handlePush(1, 0)} size="small">오른쪽</Button>
                        </div>
                    </div>

                    <div className={styles.controlCard}>
                        <h3>↔️ 뒤집기 (Flip)</h3>
                        <div className={styles.btnGrid}>
                            <Button onClick={() => handleFlip('Y')} variant="accent">위아래</Button>
                            <Button onClick={() => handleFlip('X')} variant="accent">좌우</Button>
                        </div>
                    </div>

                    <div className={styles.controlCard}>
                        <h3>↪️ 돌리기 (Rotate)</h3>
                        <div className={styles.btnGrid}>
                            <Button onClick={() => handleRotate(90)}>90°</Button>
                            <Button onClick={() => handleRotate(180)}>180°</Button>
                            <Button onClick={() => handleRotate(270)}>270°</Button>
                            <Button onClick={() => handleRotate(360)}>360°</Button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Button onClick={() => setShowGhost(!showGhost)} variant="secondary">
                            {showGhost ? '투명종이(잔상) 숨기기' : '투명종이(잔상) 보이기'}
                        </Button>
                        <Button onClick={reset} variant="outline">처음 상태로</Button>
                    </div>
                </div>
            </div>

            <div className={styles.explanation}>
                <p>
                    <strong>방금 한 동작:</strong> {lastAction}<br />
                    💡 <strong>교사 팁:</strong> 점 A(초록색)가 어떻게 이동했는지 관찰해 보세요. 
                    뒤집기를 하면 왼쪽과 오른쪽이 바뀌고, 돌리기를 하면 시계 바늘이 움직이듯 위치가 변합니다.
                </p>
            </div>

            <JsonLd data={generateCourseSchema("초등 4학년 평면도형의 이동 마스터", "밀기, 뒤집기, 돌리기의 원리를 잔상 효과와 꼭짓점 추적 기능을 통해 직관적으로 이해합니다.")} />
        </div>
    );
};

export default GeometryMaster4;
