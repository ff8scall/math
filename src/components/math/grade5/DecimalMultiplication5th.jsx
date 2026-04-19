import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './DecimalMultiplication5th.module.css';

const DecimalMultiplication5th = () => {
    const [mode, setMode] = useState('learn');
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const v1 = (Math.floor(Math.random() * 90) + 10) / 10;
        const v2 = (Math.floor(Math.random() * 8) + 2);
        setQuizData({ v1, v2, ans: (v1 * v2).toFixed(1) });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (parseFloat(userAnswer).toFixed(1) === quizData.ans) {
            setFeedback('correct'); confetti(); updateCoins(4); setTimeout(generateQuiz, 2000);
        } else { setFeedback('incorrect'); }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('learn')} variant={mode === 'learn' ? 'primary' : 'secondary'}>📖 학습하기</Button>
                <Button onClick={() => { setMode('quiz'); generateQuiz(); }} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 퀴즈왕</Button>
            </div>

            {mode === 'learn' ? (
                <div className={styles.content}>
                    <h2>소수의 곱셈 원리 학습</h2>
                    <p>자연수의 곱셈처럼 계산한 뒤, 소수점의 위치만 잘 찍어주면 돼요!</p>
                    <div className={styles.exp}>
                        <p>0.3 × 2 = ?</p>
                        <p>3 × 2 = 6 이고, 0.3은 3의 0.1배니까</p>
                        <p>결과는 0.6 입니다!</p>
                    </div>
                </div>
            ) : (
                <div className={styles.quizCard}>
                    {quizData && (
                        <>
                            <p className={styles.qText}>{quizData.v1} × {quizData.v2} = ?</p>
                            <div className={styles.qIn}>
                                <input type="number" step="0.1" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
                                <Button onClick={checkAnswer}>확인</Button>
                            </div>
                            {feedback && <p className={feedback === 'correct' ? styles.correct : styles.incorrect}>
                                {feedback === 'correct' ? '정답입니다!' : '소수점 위치를 확인해보세요!'}
                            </p>}
                        </>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("소수의 곱셈", "소수의 곱셈 원리와 소수점 찍는 요령을 배웁니다.")} />
        </div>
    );
};
export default DecimalMultiplication5th;
