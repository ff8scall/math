import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './DecimalDivision6th.module.css';

const DecimalDivision6th = () => {
    const [mode, setMode] = useState('learn');
    const [quizData, setQuizData] = useState(null);
    const [userAns, setUserAns] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const d = Math.floor(Math.random() * 8) + 2;
        const res = (Math.floor(Math.random() * 40) + 10) / 10;
        const n = parseFloat((d * res).toFixed(1));
        setQuizData({ n, d, ans: res.toFixed(1) });
        setUserAns('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (parseFloat(userAns).toFixed(1) === quizData.ans) {
            setFeedback('correct'); confetti(); updateCoins(5); setTimeout(generateQuiz, 2000);
        } else { setFeedback('incorrect'); }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('learn')} variant={mode === 'learn' ? 'primary' : 'secondary'}>📖 학습하기</Button>
                <Button onClick={() => { setMode('quiz'); generateQuiz(); }} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 퀴즈왕</Button>
            </div>

            {mode === 'learn' ? (
                <div className={styles.content}>
                    <h1>소수의 나눗셈 📖</h1>
                    <p>소수점의 위치를 옮겨서 자연수의 나눗셈처럼 계산해요.</p>
                    <div className={styles.expBox}>
                        <p>1.2 ÷ 0.3 = ?</p>
                        <p>똑같이 10배를 하면 12 ÷ 3 과 같아요.</p>
                        <p>정답은 4 입니다!</p>
                    </div>
                </div>
            ) : (
                <div className={styles.quizCard}>
                    {quizData && (
                        <>
                            <p className={styles.qText}>{quizData.n} ÷ {quizData.d} = ?</p>
                            <div className={styles.in}>
                                <input type="number" step="0.1" value={userAns} onChange={e => setUserAns(e.target.value)} />
                                <Button onClick={checkAnswer}>확인</Button>
                            </div>
                            {feedback && <p className={feedback === 'correct' ? styles.correct : styles.incorrect}>
                                {feedback === 'correct' ? '정답입니다!' : '다시 계산해볼까요?'}
                            </p>}
                        </>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("소수의 나눗셈", "소수의 나눗셈 원리와 소수점 옮기기를 배웁니다.")} />
        </div>
    );
};

export default DecimalDivision6th;
