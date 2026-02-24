import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './RatioProportion6th.module.css';

const RatioProportion6th = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'practice'
    const [quiz, setQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const types = ['to-fraction', 'to-percent', 'find-compare', 'find-base', 'decimal-to-percent'];
        const type = types[Math.floor(Math.random() * types.length)];
        let question, answer, placeholder;

        if (type === 'to-fraction') {
            const a = Math.floor(Math.random() * 8) + 2;
            const b = Math.floor(Math.random() * 8) + a + 1;
            question = `${a} : ${b} 의 비율을 분수로 나타내면?`;
            answer = `${a}/${b}`;
            placeholder = "예: 1/2";
        } else if (type === 'to-percent') {
            const rates = [0.1, 0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 1];
            const r = rates[Math.floor(Math.random() * rates.length)];
            question = `비율 ${r}을 백분율(%)로 나타내면?`;
            answer = (r * 100).toString();
            placeholder = "숫자만 입력";
        } else if (type === 'find-compare') {
            // 비교하는 양 = 기준량 * 비율
            const base = [10, 20, 50, 100, 200][Math.floor(Math.random() * 5)];
            const rate = [0.1, 0.2, 0.25, 0.5][Math.floor(Math.random() * 4)];
            question = `기준량이 ${base}이고 비율이 ${rate}일 때, 비교하는 양은 얼마인가요?`;
            answer = (base * rate).toString();
            placeholder = "숫자 입력";
        } else if (type === 'find-base') {
            // 기준량 = 비교하는 양 / 비율
            const compare = [5, 10, 20, 25, 50][Math.floor(Math.random() * 5)];
            const rate = [0.1, 0.2, 0.25, 0.5][Math.floor(Math.random() * 4)];
            question = `비교하는 양이 ${compare}이고 비율이 ${rate}일 때, 기준량은 얼마인가요?`;
            answer = (compare / rate).toString();
            placeholder = "숫자 입력";
        } else {
            const val = (Math.floor(Math.random() * 99) + 1);
            question = `${val}%를 소수로 나타내면?`;
            answer = (val / 100).toString();
            placeholder = "예: 0.25";
        }

        setQuiz({ question, answer, placeholder });
        setUserAnswer('');
        setFeedback(null);
    };


    const checkAnswer = () => {
        if (!quiz) return;
        if (userAnswer.trim() === quiz.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
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
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={styles.content}
                    >
                        <h1>비와 비율 ⚖️</h1>
                        <div className={styles.sec}>
                            <h3>비 (Ratio): "양의 비교"</h3>
                            <p>두 양을 비교하기 위해 기호 : 을 써서 나타낸 것입니다.</p>
                            <p>예: 사과가 3개, 배가 4개일 때 사과와 배의 비는 <strong>3 : 4</strong></p>
                        </div>
                        <div className={styles.sec}>
                            <h3>비율 (Ratio): "기준에 대한 크기"</h3>
                            <p>기준량에 대한 비교하는 양의 크기를 말합니다.</p>
                            <div className={styles.formula}>비율 = (비교하는 양) ÷ (기준량)</div>
                            <p>3 : 4 를 비율로 나타내면 <strong>3/4</strong> 또는 <strong>0.75</strong>가 돼요.</p>
                        </div>
                        <div className={styles.sec}>
                            <h3>백분율 (Percentage): "기준을 100으로!"</h3>
                            <p>기준량을 100으로 할 때의 비율을 말하며 기호 %를 사용해요.</p>
                            <div className={styles.perc}>비율 0.5 ➡️ 50%</div>
                            <p>마트의 할인율, 시험 성적 등 우리 생활에서 가장 많이 쓰여요!</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="practice"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.quizCard}
                    >
                        <h2>비와 비율 퀴즈 💯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.question}</p>
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                    placeholder={quiz.placeholder}
                                    className={styles.quizInput}
                                />
                                <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                                <AnimatePresence>
                                    {feedback === 'correct' && (
                                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={styles.correct}>
                                            정답입니다! 비율 마스터네요! 👏 (+15 코인)
                                        </motion.p>
                                    )}
                                    {feedback === 'incorrect' && (
                                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={styles.incorrect}>
                                            다시 한번 생각해보세요! 🧐
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("비와 비율", "비의 뜻과 비율, 백분율의 개념을 배웁니다.")} />
        </div>
    );
};

export default RatioProportion6th;
