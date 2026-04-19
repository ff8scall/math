import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './NumbersRange5th.module.css';

const NumbersRange5th = () => {
    const [mode, setMode] = useState('range'); // range, rounding, quiz

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const types = ['range', 'round'];
        const type = types[Math.floor(Math.random() * types.length)];
        let q, ans;

        if (type === 'range') {
            const n = Math.floor(Math.random() * 20) + 10;
            const rType = ['이상', '이하', '초과', '미만'][Math.floor(Math.random() * 4)];
            q = `${n} ${rType}인 수에 ${n}이 포함될까요? (O/X)`;
            ans = (rType === '이상' || rType === '이하') ? 'O' : 'X';
        } else {
            const n = Math.floor(Math.random() * 900) + 100;
            const place = Math.random() > 0.5 ? '십' : '백';
            q = `${n}을 ${place}의 자리까지 반올림하면 얼마일까요?`;
            if (place === '십') ans = Math.round(n / 10) * 10;
            else ans = Math.round(n / 100) * 100;
            ans = ans.toString();
        }

        setQuizData({ q, ans });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (userAnswer.toUpperCase() === quizData.ans) {
            setFeedback('correct');
            confetti();
            updateCoins(3);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('range')} variant={mode === 'range' ? 'primary' : 'secondary'}>📏 수의 범위</Button>
                <Button onClick={() => setMode('rounding')} variant={mode === 'rounding' ? 'primary' : 'secondary'}>🎯 어림하기</Button>
                <Button onClick={() => { setMode('quiz'); generateQuiz(); }} variant={mode === 'quiz' ? 'primary' : 'secondary'}>👑 퀴즈왕</Button>
            </div>

            {mode === 'range' && (
                <div className={styles.content}>
                    <h2>이상, 이하, 초과, 미만 정리</h2>
                    <div className={styles.rangeGrid}>
                        <div className={styles.rangeCard}><strong>이상</strong>: 같거나 큰 수 (● 포함)</div>
                        <div className={styles.rangeCard}><strong>이하</strong>: 같거나 작은 수 (● 포함)</div>
                        <div className={styles.rangeCard}><strong>초과</strong>: 큰 수 (○ 미포함)</div>
                        <div className={styles.rangeCard}><strong>미만</strong>: 작은 수 (○ 미포함)</div>
                    </div>
                </div>
            )}

            {mode === 'rounding' && (
                <div className={styles.content}>
                    <h2>올림, 버림, 반올림 원리</h2>
                    <div className={styles.roundBox}>
                        <p>• <strong>올림</strong>: 구하려는 자리 미만의 수를 1로 보고 올림</p>
                        <p>• <strong>버림</strong>: 구하려는 자리 미만의 수를 0으로 보고 버림</p>
                        <p>• <strong>반올림</strong>: 0~4는 버리고, 5~9는 올림</p>
                    </div>
                </div>
            )}

            {mode === 'quiz' && quizData && (
                <div className={styles.quizCard}>
                    <p className={styles.question}>{quizData.q}</p>
                    <div className={styles.qInput}>
                        <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
                        <Button onClick={checkAnswer}>확인</Button>
                    </div>
                    {feedback && <p className={feedback === 'correct' ? styles.correct : styles.incorrect}>{feedback === 'correct' ? '정답!' : '다시 생각해보세요!'}</p>}
                </div>
            )}

            <JsonLd data={generateCourseSchema("수의 범위와 어림하기", "수의 범위를 나타내는 용어와 어림잡기 방법을 배웁니다.")} />
        </div>
    );
};

export default NumbersRange5th;
