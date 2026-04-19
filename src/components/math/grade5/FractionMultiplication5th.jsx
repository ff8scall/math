import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './FractionMultiplication5th.module.css';

const FractionMultiplication5th = () => {
    const [mode, setMode] = useState('learn');
    const [quizData, setQuizData] = useState(null);
    const [userNum, setUserNum] = useState('');
    const [userDen, setUserDen] = useState('');
    const [feedback, setFeedback] = useState(null);

    const getGCD = (a, b) => b ? getGCD(b, a % b) : a;

    const generateQuiz = () => {
        const d1 = Math.floor(Math.random() * 5) + 2;
        const d2 = Math.floor(Math.random() * 5) + 2;
        const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
        const n2 = Math.floor(Math.random() * (d2 - 1)) + 1;

        const resNum = n1 * n2;
        const resDen = d1 * d2;
        const gcd = getGCD(resNum, resDen);

        setQuizData({ n1, d1, n2, d2, ansNum: resNum / gcd, ansDen: resDen / gcd });
        setUserNum('');
        setUserDen('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (parseInt(userNum) === quizData.ansNum && parseInt(userDen) === quizData.ansDen) {
            setFeedback('correct'); confetti(); updateCoins(4); setTimeout(generateQuiz, 2000);
        } else { setFeedback('incorrect'); }
    }

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('learn')} variant={mode === 'learn' ? 'primary' : 'secondary'}>📖 학습하기</Button>
                <Button onClick={() => { setMode('quiz'); generateQuiz(); }} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 계산하기</Button>
            </div>

            {mode === 'learn' ? (
                <div className={styles.content}>
                    <h2>분수 곱셈의 원리</h2>
                    <div className={styles.guide}>
                        <p>분수의 곱셈은 아주 쉬워요!</p>
                        <p>1. <strong>분모는 분모끼리</strong> 곱해요.</p>
                        <p>2. <strong>분자는 분자끼리</strong> 곱해요.</p>
                        <div className={styles.formula}>{"(n1/d1) × (n2/d2) = (n1×n2) / (d1×d2)"}</div>
                    </div>
                </div>
            ) : (
                <div className={styles.quizArea}>
                    {quizData && (
                        <div className={styles.quizCard}>
                            <div className={styles.problem}>
                                <span>{quizData.n1}/{quizData.d1} × {quizData.n2}/{quizData.d2} = </span>
                                <input type="number" value={userNum} onChange={e => setUserNum(e.target.value)} placeholder="분자" className={styles.qIn} />
                                <span className={styles.div}>/</span>
                                <input type="number" value={userDen} onChange={e => setUserDen(e.target.value)} placeholder="분모" className={styles.qIn} />
                            </div>
                            <Button onClick={checkAnswer} style={{ marginTop: '20px' }}>확인</Button>
                            {feedback && <p className={feedback === 'correct' ? styles.correct : styles.incorrect}>{feedback === 'correct' ? '정답!' : '약분까지 했는지 확인해보세요!'}</p>}
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("분수의 곱셈", "분수와 분수의 곱셈 원리를 배우고 연습합니다.")} />
        </div>
    );
};
export default FractionMultiplication5th;
