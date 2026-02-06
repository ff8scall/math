import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './AveragePossibility5th.module.css';

const AveragePossibility5th = () => {
    const [mode, setMode] = useState('average');
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const count = 4;
        const vals = Array.from({ length: count }, () => Math.floor(Math.random() * 5) * 5 + 70);
        const sum = vals.reduce((a, b) => a + b, 0);
        const avg = sum / count;
        setQuizData({ vals, ans: avg.toString() });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (parseFloat(userAnswer) === parseFloat(quizData.ans)) {
            setFeedback('correct'); confetti(); updateCoins(4); setTimeout(generateQuiz, 2000);
        } else { setFeedback('incorrect'); }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('average')} variant={mode === 'average' ? 'primary' : 'secondary'}>📊 평균</Button>
                <Button onClick={() => setMode('possibility')} variant={mode === 'possibility' ? 'primary' : 'secondary'}>🎲 가능성</Button>
                <Button onClick={() => { setMode('quiz'); generateQuiz(); }} variant={mode === 'quiz' ? 'primary' : 'secondary'}>👑 퀴즈왕</Button>
            </div>

            {mode === 'average' && (
                <div className={styles.content}>
                    <h1>평균 구하기 📊</h1>
                    <p>평균은 자료의 값을 모두 더해서 자료의 수로 나눈 값이에요.</p>
                    <div className={styles.formula}>평균 = (자료의 합) ÷ (자료의 수)</div>
                </div>
            )}

            {mode === 'possibility' && (
                <div className={styles.content}>
                    <h1>일어날 가능성 🎲</h1>
                    <p>어떤 일이 일어날 가능성을 말로 표현해볼까요?</p>
                    <div className={styles.pGrid}>
                        <div className={styles.pItem}>불가능하다 (0)</div>
                        <div className={styles.pItem}>~아닐 것 같다</div>
                        <div className={styles.pItem}>반반이다 (1/2)</div>
                        <div className={styles.pItem}>~일 것 같다</div>
                        <div className={styles.pItem}>확실하다 (1)</div>
                    </div>
                </div>
            )}

            {mode === 'quiz' && quizData && (
                <div className={styles.quizCard}>
                    <p className={styles.msg}>다음 점수들의 평균을 구해보세요!</p>
                    <div className={styles.vList}>
                        {quizData.vals.map((v, i) => <span key={i} className={styles.vBadge}>{v}점</span>)}
                    </div>
                    <div className={styles.qIn}>
                        <input type="number" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
                        <Button onClick={checkAnswer}>확인</Button>
                    </div>
                    {feedback && <p className={feedback === 'correct' ? styles.correct : styles.incorrect}>{feedback === 'correct' ? '정답입니다!' : '다 합해서 개수로 나눠보세요!'}</p>}
                </div>
            )}
            <JsonLd data={generateCourseSchema("평균과 가능성", "평균의 의미와 계산법, 그리고 일어날 가능성의 정도를 배웁니다.")} />
        </div>
    );
};
export default AveragePossibility5th;
