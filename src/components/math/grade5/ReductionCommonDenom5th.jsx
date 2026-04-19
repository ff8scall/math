import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './ReductionCommonDenom5th.module.css';

const ReductionCommonDenom5th = () => {
    const [mode, setMode] = useState('equivalent'); // equivalent, reduction, common
    const [num, setNum] = useState(1);
    const [den, setDen] = useState(2);
    const [multiplier, setMultiplier] = useState(2);

    // GCD function for reduction
    const getGCD = (a, b) => {
        return b ? getGCD(b, a % b) : a;
    };

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const types = ['reduction', 'equivalent_check'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'reduction') {
            const common = Math.floor(Math.random() * 4) + 2;
            const baseNum = Math.floor(Math.random() * 5) + 1;
            const baseDen = baseNum + Math.floor(Math.random() * 5) + 1;
            const n = baseNum * common;
            const d = baseDen * common;
            const gcd = getGCD(n, d);

            setQuizData({
                type: 'reduction',
                question: `${n}/${d} 을 약분하여 기약분수로 만들면 분자는 얼마일까요?`,
                answer: (n / gcd).toString(),
                explanation: `${n}/${d}의 최대공약수는 ${gcd}이므로, ${n}÷${gcd}=${n / gcd} 입니다.`
            });
        } else {
            const n1 = 1, d1 = 2, n2 = 2, d2 = 4; // Simple case
            setQuizData({
                type: 'equivalent_check',
                question: `1/3 과 3/9 는 크기가 같은 분수일까요? (O/X)`,
                answer: 'O',
                explanation: `1/3의 분모와 분자에 3을 곱하면 3/9가 되므로 크기가 같습니다.`
            });
        }
        setUserAnswer('');
        setFeedback(null);
    };

    useEffect(() => {
        if (!quizData) generateQuiz();
    }, []);

    const checkAnswer = () => {
        if (userAnswer.toUpperCase() === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(4);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('equivalent')} variant={mode === 'equivalent' ? 'primary' : 'secondary'}>🍕 크기가 같은 분수</Button>
                <Button onClick={() => setMode('reduction')} variant={mode === 'reduction' ? 'primary' : 'secondary'}>✂️ 약분하기</Button>
                <Button onClick={() => setMode('common')} variant={mode === 'common' ? 'primary' : 'secondary'}>🤝 통분하기</Button>
            </div>

            {mode === 'equivalent' && (
                <div className={styles.content}>
                    <h2 className={styles.title}>크기가 같은 분수 만들기 원리</h2>
                    <p className={styles.subtitle}>분모와 분자에 0이 아닌 같은 수를 곱하거나 나누어도 분수의 크기는 변하지 않아요.</p>

                    <div className={styles.visualizer}>
                        <div className={styles.fractionBox}>
                            <div className={styles.fractionDisplay}>
                                <span className={styles.num}>{num}</span>
                                <div className={styles.bar}></div>
                                <span className={styles.den}>{den}</span>
                            </div>
                            <span className={styles.equal}>=</span>
                            <div className={styles.fractionDisplay}>
                                <span className={styles.num}>{num} × {multiplier} = {num * multiplier}</span>
                                <div className={styles.bar}></div>
                                <span className={styles.den}>{den} × {multiplier} = {den * multiplier}</span>
                            </div>
                        </div>

                        <div className={styles.multiplierControl}>
                            <label>곱할 수 선택: </label>
                            <div className={styles.mBtns}>
                                {[2, 3, 4, 5].map(m => (
                                    <button key={m} onClick={() => setMultiplier(m)} className={multiplier === m ? styles.activeM : ''}>{m}</button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.pizzaContainer}>
                            <div className={styles.pizzaWrap}>
                                <p>기존 ({num}/{den})</p>
                                <svg width="150" height="150" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="#f5f5f5" stroke="#ccc" />
                                    {/* Simplified pizza visual */}
                                    <path d={`M 50 50 L 50 5 A 45 45 0 ${(num / den) > 0.5 ? 1 : 0} 1 ${50 + 45 * Math.sin(2 * Math.PI * (num / den))} ${50 - 45 * Math.cos(2 * Math.PI * (num / den))} Z`} fill="#ff9800" stroke="#e65100" />
                                </svg>
                            </div>
                            <div className={styles.pizzaWrap}>
                                <p>변형 ({num * multiplier}/{den * multiplier})</p>
                                <svg width="150" height="150" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="#f5f5f5" stroke="#ccc" />
                                    <path d={`M 50 50 L 50 5 A 45 45 0 ${(num * multiplier / (den * multiplier)) > 0.5 ? 1 : 0} 1 ${50 + 45 * Math.sin(2 * Math.PI * (num * multiplier / (den * multiplier)))} ${50 - 45 * Math.cos(2 * Math.PI * (num * multiplier / (den * multiplier)))} Z`} fill="#ffc107" stroke="#ffa000" />
                                </svg>
                            </div>
                        </div>
                        <p className={styles.logicText}>보세요! 색칠된 넓이가 똑같죠? 크기가 같은 분수예요.</p>
                    </div>
                </div>
            )}

            {mode === 'reduction' && (
                <div className={styles.content}>
                    <h2 className={styles.title}>분수를 간단하게 만드는 약분</h2>
                    <p className={styles.subtitle}>분모와 분자를 그들의 공약수로 나누는 것을 <strong>약분</strong>이라고 해요.</p>

                    <div className={styles.card}>
                        <div className={styles.expressReduction}>
                            <div className={styles.fBlock}>12/18</div>
                            <span className={styles.arrow}>➡️</span>
                            <div className={styles.fBlock}>6/9 (2로 약분)</div>
                            <span className={styles.arrow}>➡️</span>
                            <div className={styles.fBlockHighlight}>2/3 (3으로 약분, 기약분수)</div>
                        </div>
                        <div className={styles.info}>
                            💡 <strong>기약분수</strong>: 더 이상 약분할 수 없는 분수예요.
                        </div>
                    </div>
                </div>
            )}

            {mode === 'common' && (
                <div className={styles.content}>
                    <h2 className={styles.title}>분모를 같게 만드는 통분</h2>
                    <p className={styles.subtitle}>분모가 다른 분수들의 분모를 같게 하는 것을 <strong>통분</strong>이라고 해요.</p>

                    <div className={styles.card}>
                        <div className={styles.commonStep}>
                            <p>1/2 과 1/3 을 통분해볼까요?</p>
                            <div className={styles.stepBox}>
                                <p>두 분모 2와 3의 공배수인 6을 공통분모로 만들어요.</p>
                                <div className={styles.logic}>
                                    <span>1/2 ➡️ 3/6</span>
                                    <span>1/3 ➡️ 2/6</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.quizSection}>
                <h2 className={styles.qTitle}>실력 확인 퀴즈 ✏️</h2>
                {quizData && (
                    <div className={styles.quizCard}>
                        <p className={styles.question}>{quizData.question}</p>
                        <div className={styles.qInput}>
                            <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkAnswer()} />
                            <Button onClick={checkAnswer}>확인</Button>
                        </div>
                        <AnimatePresence>
                            {feedback === 'correct' && <motion.p className={styles.correct}>정답! 아주 훌륭해요.</motion.p>}
                            {feedback === 'incorrect' && <motion.p className={styles.incorrect}>다시 한 번 계산해볼까요?</motion.p>}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <JsonLd data={generateCourseSchema("약분과 통분", "크기가 같은 분수의 원리를 이해하고 약분과 통분을 배웁니다.")} />
        </div>
    );
};

export default ReductionCommonDenom5th;
