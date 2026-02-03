import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import styles from './FractionVisualizer.module.css';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';

const FractionVisualizer = () => {
    const [mode, setMode] = useState('explore'); // 'explore', 'challenge'
    const [denominator, setDenominator] = useState(4); // Explore Mode Denom
    const [numerator, setNumerator] = useState(1);     // Explore Mode Num

    // Challenge Mode State
    const [qData, setQData] = useState(null);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'

    const handleSliceClick = (index) => {
        setNumerator(index + 1);
        if (index + 1 === denominator) {
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.6 }
            });
        }
    };

    // --- Challenge Logic ---
    const startChallenge = () => {
        const denom = Math.floor(Math.random() * 8) + 2; // 2~9
        const n1 = Math.floor(Math.random() * denom) + 1; // 1~denom
        let n2 = Math.floor(Math.random() * denom) + 1;
        while (n1 === n2) {
            n2 = Math.floor(Math.random() * denom) + 1;
        }

        setQData({ d: denom, n1, n2 });
        setFeedback(null);
    };

    const checkAnswer = (operator) => { // '<', '>', '='
        if (!qData) return;
        const { n1, n2 } = qData;
        let isCorrect = false;

        if (operator === '>') isCorrect = n1 > n2;
        else if (operator === '<') isCorrect = n1 < n2;
        else isCorrect = n1 === n2;

        if (isCorrect) {
            setFeedback('correct');
            confetti();
            setTimeout(startChallenge, 1500);
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        if (mode === 'challenge' && !qData) {
            startChallenge();
        }
    }, [mode]);

    // SVG Helper
    const renderPizza = (d, n, size = 200, interactive = false, onClickSlice = null) => {
        const center = size / 2;
        const radius = size * 0.4;
        const slices = [];
        for (let i = 0; i < d; i++) {
            const startAngle = (i * 360) / d;
            const endAngle = ((i + 1) * 360) / d;
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            const x1 = center + radius * Math.cos(startRad);
            const y1 = center + radius * Math.sin(startRad);
            const x2 = center + radius * Math.cos(endRad);
            const y2 = center + radius * Math.sin(endRad);
            const largeArcFlag = 360 / d > 180 ? 1 : 0;
            const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            slices.push({ path: pathData, isActive: i < n, index: i });
        }
        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={center} cy={center} r={radius} fill="#eee" />
                {slices.map((slice) => (
                    <motion.path
                        key={`slice-${d}-${slice.index}`}
                        d={slice.path}
                        fill={slice.isActive ? '#FF9F43' : '#FFF'}
                        stroke="#fff"
                        strokeWidth="3"
                        onClick={() => interactive && onClickSlice && onClickSlice(slice.index)}
                        whileHover={interactive ? { scale: 1.05, fill: slice.isActive ? '#FF9F43' : '#FFF9C4', cursor: 'pointer' } : {}}
                    />
                ))}
            </svg>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerTabs}>
                <Button
                    onClick={() => setMode('explore')}
                    variant={mode === 'explore' ? 'primary' : 'secondary'}
                >
                    🔍 원리 탐험
                </Button>
                <Button
                    onClick={() => setMode('challenge')}
                    variant={mode === 'challenge' ? 'primary' : 'secondary'}
                >
                    ⚔️ 분수 대결
                </Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>맛있는 분수 피자 🍕</h2>
                    <p className={styles.description}>
                        피자를 <strong>{denominator}</strong>조각으로 나눈 것 중 <strong>{numerator}</strong>조각을 먹어요!
                    </p>
                    <div className={styles.visualizerArea}>
                        {renderPizza(denominator, numerator, 300, true, handleSliceClick)}
                        <div className={styles.controls}>
                            {/* Existing Controls */}
                            <div className={styles.controlGroup}>
                                <label>몇 조각으로 나눌까요? (분모)</label>
                                <div className={styles.buttonGroup}>
                                    <Button onClick={() => setDenominator(Math.max(2, denominator - 1))} size="small" variant="secondary">-</Button>
                                    <span className={styles.valueDisplay}>{denominator}</span>
                                    <Button onClick={() => setDenominator(Math.min(12, denominator + 1))} size="small" variant="secondary">+</Button>
                                </div>
                            </div>
                            <div className={styles.fractionDisplay}>
                                <div className={styles.numerator}>{numerator}</div>
                                <div className={styles.fractionBar}></div>
                                <div className={styles.denominator}>{denominator}</div>
                            </div>
                            <div className={styles.koreanRead}>"{denominator}분의 {numerator}"</div>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ padding: '20px' }}>
                    <h2 className={styles.title}>어느 쪽 피자가 더 많을까요? 🤔</h2>
                    {qData && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    {renderPizza(qData.d, qData.n1, 200)}
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{qData.n1}/{qData.d}</div>
                                </div>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#666' }}>VS</div>
                                <div style={{ textAlign: 'center' }}>
                                    {renderPizza(qData.d, qData.n2, 200)}
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{qData.n2}/{qData.d}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <Button onClick={() => checkAnswer('>')} variant="outline" size="large">왼쪽이 커요 (&gt;)</Button>
                                <Button onClick={() => checkAnswer('<')} variant="outline" size="large">오른쪽이 커요 (&lt;)</Button>
                            </div>

                            {feedback === 'correct' && <div style={{ color: 'green', fontSize: '2rem', fontWeight: 'bold' }}>정답입니다! 🎉</div>}
                            {feedback === 'incorrect' && <div style={{ color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>다시 잘 보세요! 🧐</div>}
                        </div>
                    )}
                </div>
            )}

            {/* SEO Content Section (Visible in Explore Mode mainly, or always at bottom) */}
            {mode === 'explore' && (
                <article style={{ marginTop: '60px', textAlign: 'left', lineHeight: '1.8', maxWidth: '800px', margin: '60px auto 0' }}>
                    <h3>🍰 분수, 피자 한 판으로 완벽 이해하기!</h3>
                    <p>
                        "1보다 작은 수는 어떻게 표현할까요?"<br />
                        분수(Fraction)는 <strong>전체(Whole)</strong>를 똑같이 나눈 것 중의 <strong>부분(Part)</strong>을 나타내는 수입니다.
                    </p>
                    <div style={{ backgroundColor: '#E3F2FD', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                        <h4>꼭 기억하세요!</h4>
                        <ul style={{ margin: '10px 0 0 20px' }}>
                            <li><strong>분모 (엄마):</strong> 아래에 있는 수. 전체를 몇 조각으로 나누었는지 알려줘요.</li>
                            <li><strong>분자 (아들):</strong> 위에 있는 수. 그 중에서 내가 가진 조각의 수예요.</li>
                        </ul>
                    </div>
                </article>
            )}

            <JsonLd data={generateCourseSchema("초등 3학년 분수 기초", "피자 모형을 이용해 분모와 분자의 개념을 직관적으로 이해하고 크기를 비교합니다.")} />
        </div>
    );
};

export default FractionVisualizer;
