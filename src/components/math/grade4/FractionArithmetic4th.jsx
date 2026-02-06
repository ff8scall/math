import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './FractionArithmetic4th.module.css';

const FractionArithmetic4th = () => {
    const [mode, setMode] = useState('explore');
    const [op, setOp] = useState('add'); // 'add', 'sub'
    const [denom, setDenom] = useState(4);
    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(2);

    // Quiz state
    const [quizData, setQuizData] = useState(null);
    const [userAnsWhole, setUserAnsWhole] = useState('');
    const [userAnsNum, setUserAnsNum] = useState('');
    const [userAnsDenom, setUserAnsDenom] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateQuiz = () => {
        const type = Math.random() > 0.5 ? 'add' : 'sub';
        const d = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
        let n1, n2, q, ans;

        if (type === 'add') {
            n1 = Math.floor(Math.random() * (d - 1)) + 1;
            n2 = Math.floor(Math.random() * (d - n1)) + 1;
            q = `\\frac{${n1}}{${d}} + \\frac{${n2}}{${d}} = ?`;
            ans = { w: 0, n: n1 + n2, d: d };
        } else {
            // Subtraction: Whole - Proper or Mixed
            n1 = 1;
            n2 = Math.floor(Math.random() * (d - 1)) + 1;
            q = `1 - \\frac{${n2}}{${d}} = ?`;
            ans = { w: 0, n: d - n2, d: d };
        }

        setQuizData({ type, d, n1, n2, q, ans });
        setUserAnsWhole(''); setUserAnsNum(''); setUserAnsDenom('');
        setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
        // 뺄셈 모드에서 음수 방지: num2가 num1보다 크면 num1으로 맞춤
        if (mode === 'explore' && op === 'sub' && num2 > num1) {
            setNum2(num1);
        }
    }, [mode, op, num1]);

    const checkAnswer = () => {
        const isCorrect =
            (parseInt(userAnsWhole) || 0) === quizData.ans.w &&
            (parseInt(userAnsNum) || 0) === quizData.ans.n &&
            (parseInt(userAnsDenom) || quizData.d) === quizData.ans.d;

        if (isCorrect) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const PizzaVisual = ({ n, d, color = "#ff6b6b" }) => {
        const radius = 80;
        const center = 100;
        return (
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx={center} cy={center} r={radius} fill="#f1f3f4" stroke="#ddd" strokeWidth="2" />
                {Array.from({ length: d }).map((_, i) => {
                    const startAngle = (i * 360) / d;
                    const endAngle = ((i + 1) * 360) / d;
                    const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
                    const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
                    const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
                    const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);
                    const largeArcFlag = 0;
                    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                    return (
                        <motion.path
                            key={i} d={pathData}
                            fill={i < n ? color : "transparent"}
                            stroke="#fff" strokeWidth="2"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        />
                    );
                })}
            </svg>
        );
    };

    const FractionUI = ({ n, d, w = 0 }) => (
        <div className={styles.mixedNumber}>
            {w > 0 && <span className={styles.wholeNum}>{w}</span>}
            <div className={styles.fractionBlock}>
                <span className={styles.numerator}>{n}</span>
                <span className={styles.denominator}>{d}</span>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 원리 탐구</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h1 className={styles.title}>분수의 덧셈과 뺄셈 🍕</h1>
                    <p className={styles.subtitle}>피자 조각을 모으고 나누며 계산 원리를 알아봐요.</p>

                    <div className={styles.exploreCard}>
                        <div className={styles.visualArea}>
                            <PizzaVisual n={num1} d={denom} color="#4285F4" />
                            <span className={styles.operator}>{op === 'add' ? '+' : '-'}</span>
                            <PizzaVisual n={num2} d={denom} color="#FBBC05" />
                            <span className={styles.operator}>=</span>
                            <PizzaVisual n={op === 'add' ? num1 + num2 : num1 - num2} d={denom} color="#34A853" />
                        </div>

                        <div className={styles.formulaDisplay}>
                            <FractionUI n={num1} d={denom} />
                            <span>{op === 'add' ? '+' : '-'}</span>
                            <FractionUI n={num2} d={denom} />
                            <span>=</span>
                            <FractionUI n={op === 'add' ? num1 + num2 : num1 - num2} d={denom} />
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.sliderRow}>
                                <label className={styles.sliderLabel}>조각 나누기 (분모: {denom})</label>
                                <input type="range" min="2" max="10" value={denom} onChange={(e) => {
                                    const d = parseInt(e.target.value);
                                    setDenom(d); setNum1(1); setNum2(1);
                                }} className={styles.slider} />
                            </div>
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                <Button onClick={() => setOp('add')} variant={op === 'add' ? 'primary' : 'secondary'}>덧셈 모드</Button>
                                <Button onClick={() => setOp('sub')} variant={op === 'sub' ? 'primary' : 'secondary'}>뺄셈 모드</Button>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <input type="range" min="1" max={denom - 1} value={num1} onChange={(e) => setNum1(parseInt(e.target.value))} className={styles.slider} />
                                <p>첫 번째 분수 조각: {num1}</p>
                                <input type="range" min="1" max={op === 'add' ? denom - num1 : num1} value={num2} onChange={(e) => setNum2(parseInt(e.target.value))} className={styles.slider} />
                                <p>두 번째 분수 조각: {num2}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 분수 계산 박사님의 꿀팁</h3>
                        <ul>
                            <li>• <strong>분모가 같을 때</strong>는 밑에 숫자는 그대로 두고 위에 숫자(분자)끼리만 더하거나 빼요!</li>
                            <li>• <strong>자연수 1</strong>은 분모와 분자가 같은 분수(예: 4/4, 5/5)로 바꿀 수 있어요.</li>
                            <li>• 피자 한 판(1)에서 1/4을 먹으면, 4/4에서 1/4을 뺀 3/4이 남는 것과 같답니다!</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>분수 계산 마스터 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <div className={styles.formulaDisplay}>
                                {quizData.type === 'sub' && quizData.n1 === 1 ? (
                                    <span>1</span>
                                ) : (
                                    <FractionUI n={quizData.n1} d={quizData.d} />
                                )}
                                <span>{quizData.type === 'add' ? '+' : '-'}</span>
                                <FractionUI n={quizData.n2} d={quizData.d} />
                                <span>= ?</span>
                            </div>

                            <div className={styles.inputArea}>
                                <div className={styles.fractionInput}>
                                    <input type="number" value={userAnsNum} onChange={(e) => setUserAnsNum(e.target.value)} className={styles.smallInput} placeholder="분자" />
                                    <div style={{ height: '3px', background: '#333' }} />
                                    <input type="number" value={userAnsDenom} onChange={(e) => setUserAnsDenom(e.target.value)} className={styles.smallInput} placeholder="분모" />
                                </div>
                            </div>

                            <Button onClick={checkAnswer} fullWidth size="large">정답 확인</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! 분수 계산 천재!</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 분자끼리 계산했는지 다시 확인해 볼까요?</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("분수의 덧셈과 뺄셈", "분모가 같은 진분수와 대분수의 덧셈, 뺄셈 원리를 시뮬레이션으로 배웁니다.")} />
        </div>
    );
};

export default FractionArithmetic4th;
