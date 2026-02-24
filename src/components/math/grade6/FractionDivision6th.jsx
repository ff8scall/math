import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './FractionDivision6th.module.css';

const FractionDivision6th = () => {
    const [mode, setMode] = useState('learn');
    const [quizData, setQuizData] = useState(null);
    const [userNum, setUserNum] = useState('');
    const [userDen, setUserDen] = useState('');
    const [feedback, setFeedback] = useState(null);

    const getGCD = (a, b) => b ? getGCD(b, a % b) : a;

    const generateQuiz = () => {
        const types = ['fraction_fraction', 'nat_fraction', 'fraction_nat'];
        const type = types[Math.floor(Math.random() * types.length)];

        let n1, d1, n2, d2, resNum, resDen;

        if (type === 'fraction_fraction') {
            d1 = Math.floor(Math.random() * 5) + 2;
            d2 = Math.floor(Math.random() * 5) + 2;
            n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
            n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
            resNum = n1 * d2;
            resDen = d1 * n2;
        } else if (type === 'nat_fraction') {
            n1 = Math.floor(Math.random() * 5) + 2; // Natural number
            d1 = 1;
            d2 = Math.floor(Math.random() * 5) + 2;
            n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
            resNum = n1 * d2;
            resDen = n2;
        } else {
            d1 = Math.floor(Math.random() * 5) + 2;
            n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
            n2 = Math.floor(Math.random() * 5) + 2; // Natural number
            d2 = 1;
            resNum = n1;
            resDen = d1 * n2;
        }

        const gcd = getGCD(resNum, resDen);
        setQuizData({ n1, d1, n2, d2, ansNum: resNum / gcd, ansDen: resDen / gcd });
        setUserNum('');
        setUserDen('');
        setFeedback(null);
    };


    useEffect(() => {
        if (!quizData) generateQuiz();
    }, []);

    const checkAnswer = () => {
        if (parseInt(userNum) === quizData.ansNum && parseInt(userDen) === quizData.ansDen) {
            setFeedback('correct');
            confetti();
            updateCoins(5);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('learn')} variant={mode === 'learn' ? 'primary' : 'secondary'}>📖 학습하기</Button>
                <Button onClick={() => { setMode('quiz'); generateQuiz(); }} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 나눗셈 퀴즈</Button>
            </div>

            {mode === 'learn' ? (
                <div className={styles.content}>
                    <h1>분수 ÷ 분수 📖</h1>
                    <div className={styles.guide}>
                        <p>분수의 나눗셈은 **곱셈**으로 바꿔서 계산해요!</p>
                        <p>1. 나누는 분수의 **분모와 분자를 바꿉니다** (역수).</p>
                        <p>2. 나눗셈 기호를 **곱셈** 기호로 바꿉니다.</p>
                        <p>3. 분수는 분수끼리, 분모는 분모끼리 곱합니다.</p>
                        <div className={styles.formula}>
                            {"(n1/d1) ÷ (n2/d2) = (n1/d1) × (d2/n2)"}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.quizArea}>
                    <h2 className={styles.qTitle}>나눗셈 실력을 뽐내봐요! 🎯</h2>
                    {quizData && (
                        <div className={styles.quizCard}>
                            <div className={styles.problem}>
                                <div className={styles.f}>
                                    <span>{quizData.n1}</span>
                                    <div className={styles.line}></div>
                                    <span>{quizData.d1}</span>
                                </div>
                                <span className={styles.op}>÷</span>
                                <div className={styles.f}>
                                    <span>{quizData.n2}</span>
                                    <div className={styles.line}></div>
                                    <span>{quizData.d2}</span>
                                </div>
                                <span className={styles.op}>=</span>
                                <div className={styles.answerInput}>
                                    <input type="number" value={userNum} onChange={e => setUserNum(e.target.value)} placeholder="분자" />
                                    <div className={styles.line}></div>
                                    <input type="number" value={userDen} onChange={e => setUserDen(e.target.value)} placeholder="분모" />
                                </div>
                            </div>
                            <Button onClick={checkAnswer} variant="primary" style={{ marginTop: '20px' }}>확인</Button>
                            <AnimatePresence>
                                {feedback === 'correct' && <motion.p className={styles.correct}>정답! 결과는 {quizData.ansNum}/{quizData.ansDen} 이에요! ✨</motion.p>}
                                {feedback === 'incorrect' && <motion.p className={styles.incorrect}>역수를 취해 곱해본 뒤 약분했는지 확인해보세요!</motion.p>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("분수의 나눗셈", "분수의 나눗셈 원리와 역수를 활용한 계산법을 배웁니다.")} />
        </div>
    );
};

export default FractionDivision6th;
