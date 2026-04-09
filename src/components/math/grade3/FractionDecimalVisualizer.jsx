import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './FractionDecimalVisualizer.module.css';

const FractionDecimalVisualizer = () => {
    const [divisions, setDivisions] = useState(10);
    const [currentValue, setCurrentValue] = useState(3);
    const [showLabels, setShowLabels] = useState(true);

    const ratio = currentValue / divisions;
    const decimal = ratio.toFixed(2).replace(/\.?0+$/, ''); // Clean zeros

    const handleLineClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newValue = Math.round(percentage * divisions);
        setCurrentValue(newValue);
    };

    return (
        <div className={styles.container}>
            <PageHeader title="분수와 소수의 만남" grade="3" />
            
            <div className={styles.titleArea}>
                <p className={styles.subtitle}>수직선 위에서 분수와 소수가 같은 곳에 살고 있다는 것을 발견해봐요!</p>
            </div>

            <main className={styles.visualizerBox}>
                <div className={styles.numberLineContainer} onClick={handleLineClick}>
                    {/* Main Background Line */}
                    <div className={styles.mainLine}></div>
                    
                    {/* Progress Highlight */}
                    <div 
                        className={styles.progressLine} 
                        style={{ width: `${(currentValue / divisions) * 100}%` }}
                    ></div>

                    {/* Ticks */}
                    {Array.from({ length: divisions + 1 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`${styles.tick} ${i % 5 === 0 ? styles.tickMain : ''}`}
                            style={{ left: `${(i / divisions) * 100}%` }}
                        >
                            {showLabels && (i === 0 || i === divisions || divisions <= 10) && (
                                <>
                                    <div className={`${styles.tickLabel} ${styles.fractionLabel}`}>
                                        {i === 0 ? '0' : i === divisions ? '1' : `${i}/${divisions}`}
                                    </div>
                                    {divisions === 10 && i !== 0 && i !== divisions && (
                                        <div className={`${styles.tickLabel} ${styles.decimalLabel}`}>
                                            {(i / 10).toFixed(1)}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}

                    {/* Draggable/Snapping Pointer */}
                    <motion.div 
                        className={styles.pointer}
                        animate={{ left: `${(currentValue / divisions) * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Tooltip can be added here if needed */}
                    </motion.div>
                </div>
            </main>

            <section className={styles.controls}>
                <div className={styles.controlCard}>
                    <span className={styles.cardTitle}>📏 전체를 몇 칸으로 나눌까요? (분모)</span>
                    <input 
                        type="range" 
                        min="2" 
                        max="20" 
                        value={divisions} 
                        onChange={(e) => {
                            const newDiv = parseInt(e.target.value);
                            setDivisions(newDiv);
                            if (currentValue > newDiv) setCurrentValue(newDiv);
                        }}
                        className={styles.slider}
                    />
                    <div className={styles.buttonGroup}>
                        <Button onClick={() => setDivisions(10)} variant={divisions === 10 ? 'primary' : 'outline'}>10칸 (소수 학습 최적)</Button>
                    </div>
                </div>

                <div className={styles.controlCard}>
                    <span className={styles.cardTitle}>📍 어느 위치를 볼까요? (분자)</span>
                    <div className={styles.buttonGroup}>
                        <Button onClick={() => setCurrentValue(Math.max(0, currentValue - 1))}>-1</Button>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 1rem' }}>{currentValue}</span>
                        <Button onClick={() => setCurrentValue(Math.min(divisions, currentValue + 1))}>+1</Button>
                    </div>
                </div>
            </section>

            <section className={styles.resultArea}>
                <div className={styles.resultFlex}>
                    <div className={styles.valBox}>
                        <span className={styles.valLabel}>분수로 표현하면?</span>
                        <div className={styles.fractionBig}>
                            <div>{currentValue}</div>
                            <div className={styles.line}></div>
                            <div>{divisions}</div>
                        </div>
                    </div>
                    
                    <div className={styles.equals}>=</div>

                    <div className={styles.valBox}>
                        <span className={styles.valLabel}>소수로 표현하면?</span>
                        <div className={styles.decimalBig}>
                            {divisions === 10 ? (currentValue / 10).toFixed(1) : (currentValue / divisions).toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className={styles.explanation}>
                    {divisions === 10 ? (
                        <p>
                            전체 1을 똑같이 <strong>10칸</strong>으로 나눈 것 중의 <strong>{currentValue}칸</strong>은 
                            분수로 <strong>{currentValue}/10</strong>이라 쓰고, 소수로는 <strong>{(currentValue/10).toFixed(1)}</strong>이라고 읽어요. 
                            둘은 이름만 다를 뿐 수직선 위에서 같은 크기를 가리킨답니다!
                        </p>
                    ) : (
                        <p>
                            전체를 {divisions}칸으로 나누었을 때의 {currentValue}칸입니다. 
                            보통 소수는 전체를 <strong>10칸, 100칸</strong>으로 나누었을 때 사용하기 편리한 숫지예요.
                        </p>
                    )}
                </div>
            </section>

            <JsonLd data={generateCourseSchema("3학년 분수와 소수 통합 지각", "수직선을 통해 분수와 소수의 상관관계를 시각적으로 이해하고 개념적 혼동을 방지합니다.")} />
        </div>
    );
};

export default FractionDecimalVisualizer;
