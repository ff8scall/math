import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './CircleArea6th.module.css';

const CircleArea6th = () => {
    const [mode, setMode] = useState('explore'); // 'explore' | 'practice'
    const [qData, setQData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateProblem = () => {
        const type = Math.floor(Math.random() * 4); // 0: r->area, 1: d->area, 2: r->circum, 3: d->circum
        const r = (Math.floor(Math.random() * 9) + 1) * 2; // Even numbers 2, 4, ..., 18
        const d = r * 2;
        const pi = 3.14;
        let q, ans, unit;

        switch (type) {
            case 0:
                q = `반지름이 ${r}cm인 원의 넓이는 얼마인가요? (원주율=3.14)`;
                ans = (r * r * pi).toFixed(2);
                unit = "cm²";
                break;
            case 1:
                q = `지름이 ${d}cm인 원의 넓이는 얼마인가요? (원주율=3.14)`;
                ans = ((d / 2) * (d / 2) * pi).toFixed(2);
                unit = "cm²";
                break;
            case 2:
                q = `반지름이 ${r}cm인 원의 원주(둘레)는 얼마인가요? (원주율=3.14)`;
                ans = (2 * r * pi).toFixed(2);
                unit = "cm";
                break;
            case 3:
                q = `지름이 ${d}cm인 원의 원주(둘레)는 얼마인가요? (원주율=3.14)`;
                ans = (d * pi).toFixed(2);
                unit = "cm";
                break;
        }

        // Clean up .00 if integer
        if (ans.endsWith('.00')) ans = ans.slice(0, -3);
        else if (ans.endsWith('0')) ans = ans.slice(0, -1);

        setQData({ q, ans, unit, r, d, type });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!qData) return;
        if (parseFloat(userAnswer) === parseFloat(qData.ans)) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(generateProblem, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    useEffect(() => {
        if (mode === 'practice' && !qData) generateProblem();
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
                    <motion.div
                        key="explore"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={styles.content}
                    >
                        <h2 className={styles.title}>원의 넓이 구하기 🟣</h2>
                        <div className={styles.sec}>
                            <h3>원주와 원주율</h3>
                            <p>원주: 원의 둘레</p>
                            <p>원주율: 원주 ÷ 지름 (약 3.14)</p>
                        </div>
                        <div className={styles.sec}>
                            <h3>원주 구하기</h3>
                            <p className={styles.f}>원주 = 지름 × 원주율</p>
                        </div>
                        <div className={styles.sec}>
                            <h3>원의 넓이 구하기: "마법 같은 변신" ✨</h3>
                            <p>원을 피자 조각처럼 아주 잘게 잘려서 서로 엇갈려 붙여볼까요?</p>
                            <div className={styles.vizBox}>
                                <div className={styles.vizText}>
                                    원 ➡️ ✂️ ➡️ 직사각형!
                                </div>
                                <ul className={styles.theoryList}>
                                    <li>가로: 원주(둘레)의 딱 <strong>절반</strong></li>
                                    <li>세로: 원의 <strong>반지름</strong></li>
                                </ul>
                                <div className={styles.formulaEmph}>
                                    (반지름 × 원주율) × 반지름 = <strong>반지름 × 반지름 × 3.14</strong>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="practice"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.practiceArea}
                    >
                        <div className={styles.quizCard}>
                            <h2>원의 넓이와 원주 퀴즈 🎯</h2>
                            {qData && (
                                <div className={styles.problemBox}>
                                    <div className={styles.viz}>
                                        <div className={styles.circle} style={{ width: 100, height: 100 }}>
                                            <div className={styles.radiusLine}></div>
                                            <span className={styles.radiusText}>{qData.r}</span>
                                        </div>
                                    </div>
                                    <p className={styles.question}>{qData.q}</p>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                            placeholder="답을 입력하세요"
                                            className={styles.quizInput}
                                        />
                                        <span className={styles.unit}>{qData.unit}</span>
                                    </div>

                                    <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                                    <AnimatePresence>
                                        {feedback === 'correct' && (
                                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={styles.correct}>
                                                참 잘했어요! 👏 (+15 코인)
                                            </motion.p>
                                        )}
                                        {feedback === 'incorrect' && (
                                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={styles.incorrect}>
                                                다시 한번 계산해볼까? 🧐
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <JsonLd data={generateCourseSchema("원의 넓이", "원주율의 개념과 원의 넓이 구하는 방법을 배웁니다.")} />
        </div>
    );
};

export default CircleArea6th;
