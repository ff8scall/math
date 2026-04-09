import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './CommonDenomVisualizer.module.css';
import confetti from 'canvas-confetti';

const CommonDenomVisualizer = () => {
    const [left, setLeft] = useState({ n: 1, d: 2 });
    const [right, setRight] = useState({ n: 1, d: 3 });
    const [isUnified, setIsUnified] = useState(false);

    const commonDenom = left.d * right.d;
    const leftNewN = left.n * right.d;
    const rightNewN = right.n * left.d;

    const FractionIcon = ({ n, d, colorClass }) => (
        <div className={styles.fraction}>
            <span style={{ color: colorClass === styles.filled ? 'var(--primary)' : '#ed64a6' }}>{n}</span>
            <div className={styles.line} />
            <span>{d}</span>
        </div>
    );

    return (
        <div className={styles.container}>
            <PageHeader title="분수의 통분: 크기를 같게 만들어요" grade="5" />

            <div className={styles.workspace}>
                <header className={styles.intro}>
                    <p>분모가 다른 분수는 그냥 더할 수 없어요! 조각의 크기를 똑같이 맞춰볼까요? (통분)</p>
                </header>

                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>첫 번째 분수</span>
                        <div className={styles.btnRow}>
                            <Button size="small" variant="outline" onClick={() => setLeft(p => ({ ...p, d: Math.max(2, p.d - 1), n: Math.min(p.n, Math.max(2, p.d - 1)-1) }))}>-</Button>
                            <FractionIcon n={left.n} d={left.d} colorClass={styles.filled} />
                            <Button size="small" variant="outline" onClick={() => setLeft(p => ({ ...p, d: Math.min(6, p.d + 1) }))}>+</Button>
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>두 번째 분수</span>
                        <div className={styles.btnRow}>
                            <Button size="small" variant="outline" onClick={() => setRight(p => ({ ...p, d: Math.max(2, p.d - 1), n: Math.min(p.n, Math.max(2, p.d - 1)-1) }))}>-</Button>
                            <FractionIcon n={right.n} d={right.d} colorClass={styles.filledSecondary} />
                            <Button size="small" variant="outline" onClick={() => setRight(p => ({ ...p, d: Math.min(6, p.d + 1) }))}>+</Button>
                        </div>
                    </div>
                </div>

                <div className={styles.visualArea}>
                    {/* Left Grid */}
                    <div className={styles.gridCard}>
                        <div 
                            className={styles.gridContainer}
                            style={{ 
                                gridTemplateColumns: `repeat(${left.d}, 1fr)`,
                                gridTemplateRows: isUnified ? `repeat(${right.d}, 1fr)` : '1fr'
                            }}
                        >
                            {Array.from({ length: isUnified ? commonDenom : left.d }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`${styles.cell} ${(isUnified ? (i % left.d < left.n) : (i < left.n)) ? styles.filled : ''}`} 
                                />
                            ))}
                        </div>
                        <div className={styles.mathDisplay}>
                            <FractionIcon n={isUnified ? leftNewN : left.n} d={isUnified ? commonDenom : left.d} colorClass={styles.filled} />
                        </div>
                    </div>

                    {/* Right Grid */}
                    <div className={styles.gridCard}>
                        <div 
                            className={styles.gridContainer}
                            style={{ 
                                gridTemplateRows: `repeat(${right.d}, 1fr)`,
                                gridTemplateColumns: isUnified ? `repeat(${left.d}, 1fr)` : '1fr'
                            }}
                        >
                            {Array.from({ length: isUnified ? commonDenom : right.d }).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`${styles.cell} ${(isUnified ? (Math.floor(i / left.d) < right.n) : (i < right.n)) ? styles.filledSecondary : ''}`} 
                                />
                            ))}
                        </div>
                        <div className={styles.mathDisplay}>
                            <FractionIcon n={isUnified ? rightNewN : right.n} d={isUnified ? commonDenom : right.d} colorClass={styles.filledSecondary} />
                        </div>
                    </div>
                </div>

                <div className={styles.resultBox}>
                    {!isUnified ? (
                        <Button 
                            onClick={() => { setIsUnified(true); confetti(); }} 
                            variant="primary" 
                            size="large"
                            fullWidth
                        >
                            조각 크기 똑같이 맞추기 (통분 클릭! ✨)
                        </Button>
                    ) : (
                        <div>
                            <h2 style={{ color: '#2b6cb0' }}>통분 완성! 🎉</h2>
                            <p>두 분수 모두 분모가 <strong>{commonDenom}</strong>인 조각들로 변했어요!</p>
                            <div className={styles.mathDisplay} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                <FractionIcon n={leftNewN} d={commonDenom} colorClass={styles.filled} />
                                <span>+</span>
                                <FractionIcon n={rightNewN} d={commonDenom} colorClass={styles.filledSecondary} />
                                <span>=</span>
                                <FractionIcon n={leftNewN + rightNewN} d={commonDenom} colorClass={styles.filled} />
                            </div>
                            <Button onClick={() => setIsUnified(false)} variant="ghost" style={{ marginTop: '1rem' }}>다시 탐구하기</Button>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fef3c7', borderRadius: '16px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    💡 <strong>통분의 원리:</strong> 상대방 분모만큼 내 조각을 더 잘게 나누는 거예요. 왼쪽 분수는 오른쪽 분모인 <strong>{right.d}</strong>배만큼 잘게 나누고, 오른쪽 분수는 왼쪽 분모인 <strong>{left.d}</strong>배만큼 잘게 나누면 부모(분모)가 똑같아져요!
                </div>
            </div>

            <JsonLd data={generateCourseSchema("초등 5학년 분수의 통분 원리", "분모가 다른 분수를 더하기 위해 조각의 크기를 일치시키는 통분의 과정을 시각적 면적 모델을 통해 학습합니다.")} />
        </div>
    );
};

export default CommonDenomVisualizer;
