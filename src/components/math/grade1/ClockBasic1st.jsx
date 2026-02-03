import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './ClockBasic1st.module.css';

const ClockBasic1st = () => {
    const [mode, setMode] = useState('explore');
    const [hour, setHour] = useState(3);
    const [minute, setMinute] = useState(0);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    const minuteAngle = minute * 6;

    const generateQuiz = () => {
        const h = Math.floor(Math.random() * 12) + 1;
        // 1학년 과정에 맞춰 0분, 30분을 주로 내되, 가끔 5분 단위도 섞어줌 (선택 사항)
        const mOptions = [0, 30, 0, 30, 15, 45]; // 빈도 조절
        const m = mOptions[Math.floor(Math.random() * mOptions.length)];

        const timeText = m === 0 ? `${h}시` : `${h}시 ${m}분`;
        setQuizData({
            hour: h, minute: m, question: `이 시계는 몇 시인가요?`,
            choices: [`${h}시`, `${h}시 30분`, `${h}시 15분`, `${h}시 45분`, `${(h + 1) % 12 || 12}시`].filter(v => v !== timeText).sort(() => 0.5 - Math.random()).slice(0, 2).concat(timeText).sort(),
            answer: timeText,
            explanation: m === 0 ? `짧은 바늘은 ${h}, 긴 바늘은 12를 가리켜요.` :
                m === 30 ? `짧은 바늘은 ${h}와 다음 숫자 사이, 긴 바늘은 6을 가리켜요.` :
                    `긴 바늘이 ${m / 5}를 가리키면 ${m}분이에요.`
        });
        setUserAnswer(''); setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => { if (mode === 'practice' && !quizData) generateQuiz(); }, [mode]);

    const checkAnswer = () => {
        if (userAnswer === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 탐험하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>시계 보기 ⏰</h2>
                    <p className={styles.subtitle}>시계 바늘을 움직여보세요!</p>

                    <div className={styles.clockContainer}>
                        <div className={styles.clock}>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={styles.number} style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-120px) rotate(${-i * 30}deg)` }}>
                                    {i === 0 ? 12 : i}
                                </div>
                            ))}
                            <div className={styles.hand} style={{ transform: `rotate(${hourAngle}deg)`, height: '80px', width: '8px', background: '#333' }} />
                            <div className={styles.hand} style={{ transform: `rotate(${minuteAngle}deg)`, height: '110px', width: '4px', background: '#2196F3' }} />
                            <div className={styles.center} />
                        </div>
                    </div>

                    <div className={styles.timeDisplay}>
                        <span className={styles.timeText}>{minute === 0 ? `${hour}시` : `${hour}시 ${minute}분`}</span>
                    </div>

                    <div className={styles.controls}>
                        <div>
                            <label>시간:</label>
                            <button onClick={() => setHour(hour === 1 ? 12 : hour - 1)}>-</button>
                            <span>{hour}</span>
                            <button onClick={() => setHour(hour === 12 ? 1 : hour + 1)}>+</button>
                        </div>
                        <div>
                            <label>분:</label>
                            <button onClick={() => setMinute((minute - 5 + 60) % 60)}>-</button>
                            <span className={styles.controlVal}>{minute}분</span>
                            <button onClick={() => setMinute((minute + 5) % 60)}>+</button>
                        </div>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <p>• <strong>짧은 바늘</strong>: 시간</p>
                        <p>• <strong>긴 바늘</strong>: 분</p>
                        <p>• 30분 = 긴 바늘이 6</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>시계 읽기 문제</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            <div className={styles.quizClock}>
                                <div className={styles.clock}>
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className={styles.number} style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-85px) rotate(${-i * 30}deg)` }}>
                                            {i === 0 ? 12 : i}
                                        </div>
                                    ))}
                                    <div className={styles.hand} style={{ transform: `rotate(${((quizData.hour % 12) * 30)}deg)`, height: '60px', width: '6px', background: '#333' }} />
                                    <div className={styles.hand} style={{ transform: `rotate(${quizData.minute * 6}deg)`, height: '80px', width: '3px', background: '#2196F3' }} />
                                    <div className={styles.center} />
                                </div>
                            </div>

                            <div className={styles.choiceButtons}>
                                {quizData.choices.map(c => (
                                    <button key={c} className={`${styles.choiceBtn} ${userAnswer === c ? styles.selected : ''}`}
                                        onClick={() => setUserAnswer(c)} disabled={feedback === 'correct' || showAnswer}>
                                        {c}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.buttons}>
                                <Button onClick={checkAnswer} disabled={!userAnswer || feedback === 'correct' || showAnswer} fullWidth size="large" variant="primary">제출하기</Button>
                                {!showAnswer && feedback !== 'correct' && (
                                    <Button onClick={() => { setShowAnswer(true); setFeedback('skipped'); }} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답! (+10 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시!</motion.div>}
                                {showAnswer && (
                                    <motion.div className={styles.feedbackAnswer}>
                                        <div className={styles.answerBox}><p><strong>정답:</strong> {quizData.answer}</p><p>{quizData.explanation}</p></div>
                                        <Button onClick={generateQuiz} size="large">다음 문제</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("시계 보기", "몇 시, 몇 시 30분을 읽는 방법을 배웁니다.")} />
        </div>
    );
};

export default ClockBasic1st;
