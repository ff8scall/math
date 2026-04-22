// 곱셈구구
import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import PageHeader from '../../common/PageHeader';
import styles from './MultiplicationTable.module.css';

const MultiplicationTable = () => {
    const [dan, setDan] = useState(2);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const d = [2, 3, 5, 6, 7, 8, 9][Math.floor(Math.random() * 7)];
        const n = Math.floor(Math.random() * 9) + 1;
        setQuizData({ dan: d, num: n, answer: d * n });
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
            <PageHeader title="곱셈구구" grade="2" />
            <div className={styles.tabs}>
                {[2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                    <button key={d} onClick={() => setDan(d)} className={dan === d ? styles.active : ''}>{d}단</button>
                ))}
            </div>
            <div className={styles.table}>
                {[...Array(9)].map((_, i) => (
                    <div key={i} className={styles.row}>{dan} × {i + 1} = {dan * (i + 1)}</div>
                ))}
            </div>
            {quizData && (
                <div className={styles.quiz}>
                    <h3>{quizData.dan} × {quizData.num} = ?</h3>
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

export default MultiplicationTable;
