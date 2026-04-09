import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './DivisionMultiLinker.module.css';

const DivisionMultiLinker = () => {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(4);
    const [focus, setFocus] = useState('division'); // 'division', 'multiplication'

    const total = rows * cols;

    return (
        <div className={styles.container}>
            <PageHeader title="나눗셈과 곱셈의 비밀 관계" grade="3" />
            
            <div className={styles.card}>
                <header className={styles.intro}>
                    <p>나눗셈의 정답은 곱셈구구 속에 숨어있어요! 쿠키 상자를 보며 비밀을 찾아볼까요?</p>
                </header>

                <main className={styles.splitView}>
                    {/* Visual Area */}
                    <div className={styles.visualArea}>
                        <div className={styles.grid}>
                            {Array.from({ length: rows }).map((_, r) => (
                                <motion.div 
                                    key={r} 
                                    className={`${styles.row} ${focus === 'multiplication' ? styles.rowActive : ''}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: r * 0.1 }}
                                >
                                    {Array.from({ length: cols }).map((_, c) => (
                                        <div key={c} className={styles.item}>🍪</div>
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ marginTop: '2rem', fontWeight: 'bold', color: '#4a5568' }}>
                            전체 쿠키: {total}개
                        </div>
                    </div>

                    {/* Math Area */}
                    <div className={styles.mathArea}>
                        {/* Multiplication Perspective */}
                        <div 
                            className={`${styles.conceptBox} ${focus === 'multiplication' ? styles.conceptBoxActive : ''}`}
                            onClick={() => setFocus('multiplication')}
                        >
                            <span className={styles.label}>곱셈으로 생각하기: {cols}개씩 {rows}묶음</span>
                            <div className={styles.equation}>
                                <span className={styles.secondaryHighlight}>{cols}</span>
                                <span>×</span>
                                <span className={styles.highlight}>{rows}</span>
                                <span>=</span>
                                <span className={styles.tertiaryHighlight}>{total}</span>
                            </div>
                        </div>

                        {/* Division Perspective */}
                        <div 
                            className={`${styles.conceptBox} ${focus === 'division' ? styles.conceptBoxActive : ''}`}
                            onClick={() => setFocus('division')}
                        >
                            <span className={styles.label}>나눗셈으로 생각하기: {total}개를 {rows}묶음으로 나누기</span>
                            <div className={styles.equation}>
                                <span className={styles.tertiaryHighlight}>{total}</span>
                                <span>÷</span>
                                <span className={styles.highlight}>{rows}</span>
                                <span>=</span>
                                <span className={styles.secondaryHighlight}>{cols}</span>
                            </div>
                        </div>

                        {/* The Connection Explanation */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={focus}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.explanation}
                            >
                                {focus === 'division' ? (
                                    <p>
                                        💡 <strong>{total} ÷ {rows}</strong>의 몫을 구할 때는?<br />
                                        <strong>{rows}단 곱셈구구</strong>에서 <strong>{rows} × {cols} = {total}</strong>이 되는 
                                        친구를 찾으면 돼요! 즉, 몫은 <strong>{cols}</strong>이 됩니다.
                                    </p>
                                ) : (
                                    <p>
                                        💡 한 줄에 <strong>{cols}</strong>개씩 <strong>{rows}</strong>줄이 있으니까,<br />
                                        전체는 <strong>{cols} × {rows} = {total}</strong>개입니다. 
                                        이 식을 거꾸로 하면 나눗셈이 돼요!
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>

                <footer className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <label>한 묶음의 개수 (한 줄)</label>
                        <div className={styles.buttonGroup}>
                            <Button onClick={() => setCols(Math.max(2, cols - 1))} variant="secondary">-</Button>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 1rem' }}>{cols}</span>
                            <Button onClick={() => setCols(Math.min(9, cols + 1))} variant="secondary">+</Button>
                        </div>
                    </div>
                    <div className={styles.controlGroup}>
                        <label>묶음의 수 (줄 수)</label>
                        <div className={styles.buttonGroup}>
                            <Button onClick={() => setRows(Math.max(2, rows - 1))} variant="secondary">-</Button>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 1rem' }}>{rows}</span>
                            <Button onClick={() => setRows(Math.min(9, rows + 1))} variant="secondary">+</Button>
                        </div>
                    </div>
                </footer>
            </div>

            <JsonLd data={generateCourseSchema("초등 3학년 나눗셈과 곱셈 관계", "나눗셈의 몫을 곱셈구구를 활용하여 편리하게 구하는 원리를 시각적 배열을 통해 학습합니다.")} />
        </div>
    );
};

export default DivisionMultiLinker;
