import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './RatioProportion6th.module.css';

const Proportion6th = () => {
    const [mode, setMode] = useState('explore');
    const [quiz, setQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const type = Math.floor(Math.random() * 2); // 0: simple property, 1: find unknown
        let question, answer, placeholder;

        if (type === 0) {
            const options = ["외항", "내항", "더한", "뺀"];
            question = "비례식에서 '□의 곱과 □의 곱은 같다'의 □에 들어갈 말은?";
            answer = "외항,내항"; // logic: check if both present or generic
            setQuiz({ question, answer: "외항", type: 'text', placeholder: "예: 외항" });
        } else {
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 5) + a + 1;
            const multiplier = Math.floor(Math.random() * 3) + 2;
            const c = a * multiplier;
            const d = b * multiplier;

            const blank = Math.floor(Math.random() * 4); // 0:a, 1:b, 2:c, 3:d
            if (blank === 0) { question = `□ : ${b} = ${c} : ${d} 에서 □는?`; answer = a.toString(); }
            else if (blank === 1) { question = `${a} : □ = ${c} : ${d} 에서 □는?`; answer = b.toString(); }
            else if (blank === 2) { question = `${a} : ${b} = □ : ${d} 에서 □는?`; answer = c.toString(); }
            else { question = `${a} : ${b} = ${c} : □ 에서 □는?`; answer = d.toString(); }

            setQuiz({ question, answer, type: 'number', placeholder: "숫자만 입력" });
        }
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
            <PageHeader />
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.content}>
                        <h2 className={styles.title}>비례식과 비례배분 원리 ⚖️</h2>
                        <p>비의 값이 같은 두 비를 = 를 사용하여 나타낸 식을 비례식이라고 합니다.</p>
                        <div className={styles.sec}>
                            <h3>비례식의 성질</h3>
                            <p><strong>외항의 곱</strong>과 <strong>내항의 곱</strong>은 같습니다.</p>
                            <div className={styles.formula}>3 : 4 = 6 : 8 ➡️ 3×8 = 4×6</div>
                        </div>
                        <div className={styles.sec}>
                            <h3>비례배분</h3>
                            <p>전체를 주어진 비로 나누는 것을 말합니다.</p>
                            <p>예: 10개를 2 : 3으로 나누면? (각각 4개, 6개)</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.quizCard}>
                        <h2>비례식 퀴즈 💯</h2>
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
                                    {feedback === 'correct' && <p className={styles.correct}>정답! 비례식의 성질을 잘 이해했군요 🎉</p>}
                                    {feedback === 'incorrect' && <p className={styles.incorrect}>오답입니다! '외항의 곱 = 내항의 곱'을 활용해 보세요 🤔</p>}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("비례식과 비례배분", "비례식의 성질과 비례배분의 원리를 배웁니다.")} />
        </div>
    );
};

export default Proportion6th;
