import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './DecimalArithmetic4th.module.css';

const DecimalArithmetic4th = () => {
    const [mode, setMode] = useState('explore');
    const [val1, setVal1] = useState(0.35);
    const [val2, setVal2] = useState(0.24);
    const [op, setOp] = useState('add');

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const type = Math.random() > 0.5 ? 'add' : 'sub';
        let v1, v2, ans;

        if (type === 'add') {
            v1 = (Math.floor(Math.random() * 80) + 10) / 100;
            v2 = (Math.floor(Math.random() * (99 - v1 * 100)) + 1) / 100;
            ans = (v1 + v2).toFixed(2);
        } else {
            v1 = (Math.floor(Math.random() * 80) + 20) / 100;
            v2 = (Math.floor(Math.random() * (v1 * 100 - 1)) + 1) / 100;
            ans = (v1 - v2).toFixed(2);
        }

        setQuizData({ type, v1: v1.toFixed(2), v2: v2.toFixed(2), ans: parseFloat(ans).toString() });
        setUserAnswer('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (parseFloat(userAnswer) === parseFloat(quizData.ans)) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const DecimalGrid = ({ value, color = "#ab47bc" }) => {
        const filledCells = Math.round(value * 100);
        return (
            <div className={styles.gridContainer}>
                <div className={styles.decimalGrid}>
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.gridCell} ${i < filledCells ? styles.filled : ''}`}
                            style={i < filledCells ? { backgroundColor: color } : {}}
                        />
                    ))}
                </div>
                <div className={styles.gridLabel} style={{ color }}>{value.toFixed(2)}</div>
            </div>
        );
    };

    const currentResult = op === 'add' ? (val1 + val2) : (val1 - val2);

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 소수 탐구</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h1 className={styles.title}>소수의 덧셈과 뺄셈 🔟</h1>
                    <p className={styles.subtitle}>모눈종이를 채워보며 소수의 자릿값 원리를 배워요.</p>

                    <div className={styles.exploreCard}>
                        <div className={styles.gridArea}>
                            <DecimalGrid value={val1} color="#4285F4" />
                            <div className={styles.operator}>{op === 'add' ? '+' : '-'}</div>
                            <DecimalGrid value={val2} color="#FBBC05" />
                            <div className={styles.operator}>=</div>
                            <DecimalGrid value={currentResult} color="#34A853" />
                        </div>

                        <div className={styles.formulaBox}>
                            <span>{val1.toFixed(2)}</span>
                            <span>{op === 'add' ? '+' : '-'}</span>
                            <span>{val2.toFixed(2)}</span>
                            <span>=</span>
                            <span style={{ color: '#34A853' }}>{currentResult.toFixed(2)}</span>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.sliderRow}>
                                <label className={styles.sliderLabel}>첫 번째 소수 (파랑): {val1.toFixed(2)}</label>
                                <input type="range" min="0.01" max="0.99" step="0.01" value={val1} onChange={(e) => setVal1(parseFloat(e.target.value))} className={styles.slider} />
                            </div>
                            <div className={styles.sliderRow}>
                                <label className={styles.sliderLabel}>두 번째 소수 (노랑): {val2.toFixed(2)}</label>
                                <input type="range" min="0.01" max={op === 'add' ? (1 - val1).toFixed(2) : val1.toFixed(2)} step="0.01" value={val2} onChange={(e) => setVal2(parseFloat(e.target.value))} className={styles.slider} />
                            </div>
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                                <Button onClick={() => { setOp('add'); setVal2(0.1); }} variant={op === 'add' ? 'primary' : 'secondary'} size="small">덧셈 모드</Button>
                                <Button onClick={() => { setOp('sub'); setVal2(0.1); }} variant={op === 'sub' ? 'primary' : 'secondary'} size="small">뺄셈 모드</Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 소수 계산 박사님의 노트</h3>
                        <ul>
                            <li>• <strong>자릿수 맞추기</strong>: 소수점의 위치를 똑바르게 맞추어 세로로 써서 계산해요.</li>
                            <li>• <strong>백분단위</strong>: 모눈 한 칸은 0.01이에요. 100칸이 다 차면 1.00(자연수 1)이 된답니다.</li>
                            <li>• 덧셈과 뺄셈 방식은 자연수와 똑같아요! 소수점만 잊지 마세요.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>소수 계산 마스터 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <div className={styles.vertCalc}>
                                <div>&nbsp;&nbsp;{quizData.v1}</div>
                                <div>{quizData.type === 'add' ? '+' : '-'}&nbsp;{quizData.v2}</div>
                                <div className={styles.calcLine}>?</div>
                            </div>

                            <div style={{ display: 'block' }}>
                                <input
                                    className={styles.inputField}
                                    type="number" step="0.01"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="정답 입력"
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                />
                                <Button onClick={checkAnswer} fullWidth size="large" variant="primary">정답 확인</Button>
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! (+15 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 소수점 자릿값을 확인해 보세요!</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("소수의 덧셈과 뺄셈", "소수 두 자릿수의 자릿값 원리를 이해하고 덧셈과 뺄셈을 연습합니다.")} />
        </div>
    );
};

export default DecimalArithmetic4th;
