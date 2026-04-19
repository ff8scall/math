import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './FractionArithmetic5th.module.css';

const FractionArithmetic5th = () => {
    const [mode, setMode] = useState('plus'); // plus, minus, quiz

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userNum, setUserNum] = useState('');
    const [userDen, setUserDen] = useState('');
    const [feedback, setFeedback] = useState(null);

    const getGCD = (a, b) => b ? getGCD(b, a % b) : a;
    const getLCM = (a, b) => (a * b) / getGCD(a, b);

    const generateQuiz = () => {
        const type = Math.random() > 0.5 ? 'plus' : 'minus';
        const d1 = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const d2 = [2, 3, 4, 5].filter(d => d !== d1)[Math.floor(Math.random() * 3)];

        let n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
        let n2 = Math.floor(Math.random() * (d2 - 1)) + 1;

        if (type === 'minus') {
            // Ensure positive result (n1/d1 > n2/d2)
            if (n1 / d1 < n2 / d2) {
                [n1, n2] = [n2, n1];
                // if still equal, adjust
                if (n1 / d1 === n2 / d2) n1 = d1 - 1;
            }
        }

        const commonDen = getLCM(d1, d2);
        const targetNum = type === 'plus'
            ? (n1 * (commonDen / d1)) + (n2 * (commonDen / d2))
            : (n1 * (commonDen / d1)) - (n2 * (commonDen / d2));

        const gcd = getGCD(targetNum, commonDen);

        setQuizData({
            type,
            n1, d1, n2, d2,
            ansNum: targetNum / gcd,
            ansDen: commonDen / gcd,
            commonDen
        });
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
            setTimeout(generateQuiz, 2500);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('plus')} variant={mode === 'plus' ? 'primary' : 'secondary'}>➕ 분수의 덧셈</Button>
                <Button onClick={() => setMode('minus')} variant={mode === 'minus' ? 'primary' : 'secondary'}>➖ 분수의 뺄셈</Button>
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'}>🎯 도전 퀴즈</Button>
            </div>

            {mode !== 'quiz' ? (
                <div className={styles.learningArea}>
                    <h2 className={styles.title}>{mode === 'plus' ? '분모가 다른 분수의 덧셈 원리' : '분모가 다른 분수의 뺄셈 원리'}</h2>
                    <div className={styles.stepCard}>
                        <h3>💡 계산 방법 (통분하기)</h3>
                        <div className={styles.steps}>
                            <p>1. 두 분모의 <strong>최소공배수</strong>를 공통분모로 하여 통분해요.</p>
                            <p>2. 분자끼리 더하거나 빼서 계산해요.</p>
                            <p>3. 계산 결과가 약분되면 <strong>기약분수</strong>로 나타내요.</p>
                        </div>
                        <div className={styles.exampleBox}>
                            <p>예시: </p>
                            {mode === 'plus' ? (
                                <div className={styles.expr}>
                                    <span>1/2 + 1/3</span>
                                    <span>= 3/6 + 2/6</span>
                                    <span>= 5/6</span>
                                </div>
                            ) : (
                                <div className={styles.expr}>
                                    <span>1/2 - 1/3</span>
                                    <span>= 3/6 - 2/6</span>
                                    <span>= 1/6</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.quizArea}>
                    <h2 className={styles.title}>분수 계산 퀴즈! 🎯</h2>
                    {quizData && (
                        <div className={styles.quizCard}>
                            <div className={styles.problem}>
                                <div className={styles.f}>
                                    <span>{quizData.n1}</span>
                                    <div className={styles.line}></div>
                                    <span>{quizData.d1}</span>
                                </div>
                                <span className={styles.op}>{quizData.type === 'plus' ? '+' : '-'}</span>
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
                            <Button onClick={checkAnswer} variant="primary" size="large" style={{ marginTop: '20px' }}>정답 확인</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.p className={styles.correct}>정답입니다! 결과는 {quizData.ansNum}/{quizData.ansDen} 이에요! ✨</motion.p>}
                                {feedback === 'incorrect' && <motion.p className={styles.incorrect}>다시 한 번 통분해 볼까요? (공통분모: {quizData.commonDen})</motion.p>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.tipBox}>
                <h3>💡 꿀팁</h3>
                <p>계산 결과가 <strong>가분수</strong>일 때는 <strong>대분수</strong>로 바꾸어 나타내면 더 멋져요!</p>
            </div>

            <JsonLd data={generateCourseSchema("분수의 덧셈과 뺄셈", "분모가 다른 분수의 덧셈과 뺄셈 원리를 배우고 통분을 활용해 계산합니다.")} />
        </div>
    );
};

export default FractionArithmetic5th;
