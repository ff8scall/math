// 시각과 시간 (2학년 버전)
import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './TimeCalculation.module.css';

const TimeCalculation = () => {
    const [startHour, setStartHour] = useState(2);
    const [duration, setDuration] = useState(3);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const endHour = (startHour + duration) % 12 || 12;

    const generateQuiz = () => {
        const s = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 5) + 1;
        setQuizData({
            start: s, duration: d, answer: (s + d) % 12 || 12,
            question: `${s}시부터 ${d}시간 후는 몇 시인가요?`
        });
        setUserAnswer(''); setFeedback(null);
    };

    useEffect(() => { generateQuiz(); }, []);

    const checkAnswer = () => {
        if (parseInt(userAnswer) === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>시각과 시간 ⏰</h2>
            <div className={styles.visual}>
                <div className={styles.timeBox}><div className={styles.label}>시작</div><div className={styles.time}>{startHour}시</div></div>
                <div className={styles.arrow}>+ {duration}시간 →</div>
                <div className={styles.timeBox}><div className={styles.label}>끝</div><div className={styles.time}>{endHour}시</div></div>
            </div>
            <div className={styles.controls}>
                <div><label>시작 시각:</label><input type="number" value={startHour} onChange={(e) => setStartHour(parseInt(e.target.value) || 1)} min="1" max="12" /></div>
                <div><label>시간:</label><input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value) || 1)} min="1" max="10" /></div>
            </div>
            {quizData && (
                <div className={styles.quiz}>
                    <h3>{quizData.question}</h3>
                    <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={styles.input} />
                    <div className={styles.buttons}>
                        <Button onClick={checkAnswer} disabled={!userAnswer || feedback === 'correct'} fullWidth size="large" variant="primary">제출하기</Button>
                        {feedback === 'incorrect' && (
                            <Button onClick={() => generateQuiz()} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                        )}
                    </div>
                    {feedback === 'correct' && <div className={styles.correct}>🎉 정답!</div>}
                    {feedback === 'incorrect' && <div className={styles.incorrect}>😅 다시!</div>}
                </div>
            )}
        </div>
    );
};

export default TimeCalculation;
