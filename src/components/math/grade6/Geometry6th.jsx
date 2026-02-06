import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './Geometry6th.module.css';

const Geometry6th = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'quiz'
    const [type, setType] = useState('prism');

    // Quiz State
    const [quiz, setQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const shapeTypes = ['prism', 'pyramid'];
        const currentType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const n = Math.floor(Math.random() * 5) + 3; // 3~7 (삼각~칠각)
        const koreanNames = ['삼', '사', '오', '육', '칠'];
        const shapeName = koreanNames[n - 3] + (currentType === 'prism' ? '각기둥' : '각뿔');

        const questionType = Math.floor(Math.random() * 3); // 0: faces, 1: vertices, 2: edges
        let question, answer;

        if (currentType === 'prism') {
            if (questionType === 0) {
                question = `${shapeName}의 면은 모두 몇 개인가요?`;
                answer = (n + 2).toString();
            } else if (questionType === 1) {
                question = `${shapeName}의 꼭짓점은 모두 몇 개인가요?`;
                answer = (2 * n).toString();
            } else {
                question = `${shapeName}의 모서리는 모두 몇 개인가요?`;
                answer = (3 * n).toString();
            }
        } else {
            if (questionType === 0) {
                question = `${shapeName}의 면은 모두 몇 개인가요?`;
                answer = (n + 1).toString();
            } else if (questionType === 1) {
                question = `${shapeName}의 꼭짓점은 모두 몇 개인가요?`;
                answer = (n + 1).toString();
            } else {
                question = `${shapeName}의 모서리는 모두 몇 개인가요?`;
                answer = (2 * n).toString();
            }
        }

        setQuiz({ question, answer });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!quiz) return;
        if (userAnswer === quiz.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        if (mode === 'quiz' && !quiz) generateQuiz();
    }, [mode]);

    return (
        <div className={styles.container}>
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 퀴즈 도전</Button>
            </div>

            <AnimatePresence mode="wait">
                {mode === 'explore' ? (
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className={styles.modeTabs}>
                            <Button onClick={() => setType('prism')} variant={type === 'prism' ? 'primary' : 'secondary'}>🟦 각기둥</Button>
                            <Button onClick={() => setType('pyramid')} variant={type === 'pyramid' ? 'primary' : 'secondary'}>🔺 각뿔</Button>
                        </div>

                        <div className={styles.content}>
                            {type === 'prism' ? (
                                <div className={styles.box}>
                                    <h1>각기둥 (Prism) 🟦</h1>
                                    <p>위와 아래의 면이 서로 평행하고 합동인 다각형으로 이루어진 입체도형이에요.</p>
                                    <div className={styles.parts}>
                                        <div className={styles.pCard}>밑면: 2개</div>
                                        <div className={styles.pCard}>옆면: 직사각형</div>
                                        <div className={styles.pCard}>이름: 밑면의 모양에 따라 (삼각기둥, 사각기둥...)</div>
                                    </div>
                                    <div className={styles.formulaBox}>
                                        <p>💡 n각기둥의 꼭짓점: n × 2</p>
                                        <p>💡 n각기둥의 면: n + 2</p>
                                        <p>💡 n각기둥의 모서리: n × 3</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.box}>
                                    <h1>각뿔 (Pyramid) 🔺</h1>
                                    <p>바닥면은 다각형이고, 옆면은 모두 삼각형이며 한 공통된 꼭짓점에서 만나는 입체도형이에요.</p>
                                    <div className={styles.parts}>
                                        <div className={styles.pCard}>밑면: 1개</div>
                                        <div className={styles.pCard}>옆면: 삼각형</div>
                                        <div className={styles.pCard}>꼭짓점: 각뿔의 꼭짓점이 존재</div>
                                    </div>
                                    <div className={styles.formulaBox}>
                                        <p>💡 n각뿔의 꼭짓점: n + 1</p>
                                        <p>💡 n각뿔의 면: n + 1</p>
                                        <p>💡 n각뿔의 모서리: n × 2</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles.quizCard}
                    >
                        <h2>입체도형 퀴즈 🎯</h2>
                        {quiz && (
                            <div className={styles.problemBox}>
                                <p className={styles.question}>{quiz.question}</p>
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                    placeholder="정답"
                                    className={styles.quizInput}
                                />
                                <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                                <AnimatePresence>
                                    {feedback === 'correct' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.correct}>
                                            참 잘했어요! 🎉 (+15 코인)
                                        </motion.p>
                                    )}
                                    {feedback === 'incorrect' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.incorrect}>
                                            다시 한번 세어볼까요? 🧐
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("각기둥과 각뿔", "여러 가지 입체도형의 구성 요소와 특징을 배웁니다.")} />
        </div>
    );
};

export default Geometry6th;
