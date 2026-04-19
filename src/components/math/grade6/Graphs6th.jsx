import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import PageHeader from '../../common/PageHeader';
import confetti from 'canvas-confetti';
import styles from './Graphs6th.module.css';

const Graphs6th = () => {
    const [mode, setMode] = useState('explore');
    const [quiz, setQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const items = [
            { name: "축구", val: 40 },
            { name: "농구", val: 25 },
            { name: "배구", val: 20 },
            { name: "야구", val: 15 }
        ];
        const type = Math.floor(Math.random() * 2); // 0: most, 1: specific val
        let question, answer;

        if (type === 0) {
            question = "운동 중 가장 인기가 많은(백분율이 가장 높은) 종목은 무엇인가요?";
            answer = "축구";
        } else {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            question = `${randomItem.name} 종목의 백분율은 몇 %인가요?`;
            answer = randomItem.val.toString();
        }

        setQuiz({ question, answer, items });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = (ans) => {
        const finalAns = typeof ans === 'string' ? ans : userAnswer;
        if (finalAns.trim() === quiz.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        if (mode === 'practice' && !quiz) generateQuiz();
    }, [mode]);

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 그래프 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.content}>
                        <h2>띠그래프와 원그래프 탐구</h2>
                        <p>전체에 대한 각 부분의 비율을 한눈에 알아보기 쉬운 그래프들을 배워요.</p>

                        <div className={styles.sec}>
                            <h3>1. 띠그래프</h3>
                            <p>전체에 대한 각 부분의 비율을 띠 모양으로 나타낸 그래프입니다.</p>
                            <div className={styles.stripChart}>
                                <div style={{ width: '40%', background: '#ff6b6b' }}>40%</div>
                                <div style={{ width: '30%', background: '#4dabf7' }}>30%</div>
                                <div style={{ width: '20%', background: '#51cf66' }}>20%</div>
                                <div style={{ width: '10%', background: '#fab005' }}>10%</div>
                            </div>
                        </div>

                        <div className={styles.sec}>
                            <h3>2. 원그래프</h3>
                            <p>전체에 대한 각 부분의 비율을 원 모양으로 나타낸 그래프입니다.</p>
                            <div className={styles.circleChartViz}>
                                <div className={styles.piePlaceholder}>○ (원그래프 예시)</div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.quizCard}>
                        <h2>그래프 해석 퀴즈 💯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <div className={styles.stripChart}>
                                    {quiz.items.map((it, idx) => (
                                        <div key={idx} style={{ width: `${it.val}%`, background: ['#ff6b6b', '#4dabf7', '#51cf66', '#fab005'][idx] }}>
                                            {it.name}({it.val}%)
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.question}>{quiz.question}</p>

                                {quiz.answer === "축구" ? (
                                    <div className={styles.options}>
                                        {quiz.items.map(it => (
                                            <Button key={it.name} onClick={() => checkAnswer(it.name)} variant="outline">{it.name}</Button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.inputArea}>
                                        <input
                                            type="number"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                            placeholder="숫자 입력"
                                            className={styles.quizInput}
                                        />
                                        <span className={styles.unit}>%</span>
                                        <Button onClick={() => checkAnswer()}>정답 확인</Button>
                                    </div>
                                )}

                                <AnimatePresence>
                                    {feedback === 'correct' && <p className={styles.correct}>빙고! 정보를 잘 읽어내시네요 👏</p>}
                                    {feedback === 'incorrect' && <p className={styles.incorrect}>다시 한번 그래프를 살펴보세요! 🧐</p>}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Graphs6th;
