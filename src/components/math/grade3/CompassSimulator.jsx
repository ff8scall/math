import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './CompassSimulator.module.css';

const CompassSimulator = () => {
    const [radius, setRadius] = useState(100);
    const [isDrawing, setIsDrawing] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 1
    const [showRadius, setShowRadius] = useState(true);

    const canvasSize = 500;
    const center = { x: canvasSize / 2, y: canvasSize / 2 };

    const drawCircle = async () => {
        setIsDrawing(true);
        setProgress(0);
        
        let start = null;
        const duration = 2000;

        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const p = Math.min(1, elapsed / duration);
            setProgress(p);

            if (p < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsDrawing(false);
            }
        };

        requestAnimationFrame(animate);
    };

    const currentAngle = progress * 360;
    const rad = (currentAngle - 90) * (Math.PI / 180);
    const pencilX = center.x + radius * Math.cos(rad);
    const pencilY = center.y + radius * Math.sin(rad);

    // Path for the traced circle
    const pathData = Array.from({ length: Math.floor(progress * 100) + 1 }).map((_, i) => {
        const a = (i / 100) * 360 * progress;
        const r = (a - 90) * (Math.PI / 180);
        const x = center.x + radius * Math.cos(r);
        const y = center.y + radius * Math.sin(r);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <div className={styles.container}>
            <PageHeader title="마법의 컴퍼스 나라" grade="3" />

            <div className={styles.card}>
                <div className={styles.overlay}>
                    <h4>📏 컴퍼스의 비밀</h4>
                    <p>컴퍼스의 침(중심)을 고정하고 다리를 벌려 빙글 돌리면, 모든 곳의 거리가 똑같은 <strong>원</strong>이 그려져요!</p>
                </div>

                <div className={styles.canvasArea}>
                    <svg width={canvasSize} height={canvasSize}>
                        {/* The traced circle path */}
                        <path 
                            d={progress === 1 ? `M ${center.x} ${center.y - radius} A ${radius} ${radius} 0 1 1 ${center.x - 0.01} ${center.y - radius} Z` : pathData} 
                            className={styles.pencilPath} 
                        />
                        
                        {/* Center Point (Pin) */}
                        <circle cx={center.x} cy={center.y} r="4" className={styles.centerPoint} />
                        
                        {/* Radius Preview Line */}
                        {showRadius && (
                            <line 
                                x1={center.x} y1={center.y} 
                                x2={pencilX} y2={pencilY} 
                                className={styles.radiusLine}
                            />
                        )}

                        {/* Compass Visual Representation */}
                        <g transform={`rotate(${currentAngle} ${center.x} ${center.y})`}>
                            {/* Arm from Center to Pivot (Conceptual) */}
                            <line 
                                x1={center.x} y1={center.y} 
                                x2={center.x} y2={center.y - radius} 
                                stroke="#4a5568" strokeWidth="4" 
                            />
                            {/* Compass Head/Handle (Conceptual) */}
                            <circle cx={center.x} cy={center.y - radius} r="6" fill="#718096" />
                            <circle cx={pencilX} cy={pencilY} r="4" fill={styles.primary} />
                        </g>
                    </svg>

                    {/* Better Compass Tool (Manual UI overlay) */}
                    <div 
                        className={styles.compass} 
                        style={{ 
                            left: center.x, 
                            top: center.y, 
                            transform: `rotate(${currentAngle}deg)`
                        }}
                    >
                        {/* This is a simplified 2D compass arm handle */}
                        <div className={styles.arm} style={{ height: radius, transform: 'translateY(-100%)' }}>
                            <div className={styles.joint}></div>
                            <div className={styles.pin}></div>
                            <div className={styles.pencil}></div>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>반지름 (컴퍼스 벌린 너비)</span>
                            <span className={styles.statValue}>{(radius / 20).toFixed(1)} cm</span>
                        </div>
                    </div>

                    <div className={styles.sliderGroup} style={{ flex: 1, margin: '0 3rem' }}>
                        <input 
                            type="range" min="40" max="200" value={radius} 
                            onChange={(e) => {
                                setRadius(parseInt(e.target.value));
                                setProgress(0); // Reset drawing when radius changes
                            }}
                            className={styles.slider}
                            disabled={isDrawing}
                        />
                    </div>

                    <div className={styles.btnGroup}>
                        <Button 
                            onClick={drawCircle} 
                            disabled={isDrawing}
                            variant="primary"
                            size="large"
                        >
                            {progress === 1 ? '다시 그리기' : '원 그리기 ✨'}
                        </Button>
                    </div>
                </div>
            </div>

            <JsonLd data={generateCourseSchema("초등 3학년 원과 컴퍼스", "컴퍼스를 이용해 원을 그리는 과정을 시뮬레이션하며 원의 중심과 반지름의 정의를 이해합니다.")} />
        </div>
    );
};

export default CompassSimulator;
