import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './ClockVisualizer.module.css';

const ClockVisualizer = () => {
    // Mode: 'explore' or 'practice'
    const [mode, setMode] = useState('explore');

    // Explore mode states
    const [hour, setHour] = useState(3);
    const [minute, setMinute] = useState(0);

    // Practice mode states
    const [quizData, setQuizData] = useState(null);
    const [userHour, setUserHour] = useState('');
    const [userMinute, setUserMinute] = useState('');
    const [feedback, setFeedback] = useState(null);

    // Calculate rotation angles
    const minuteDegrees = minute * 6;
    const hourDegrees = (hour % 12) * 30 + minute * 0.5;

    const handleAddMinute = (m) => {
        let newMin = minute + m;
        let newHour = hour;

        if (newMin >= 60) {
            newHour += Math.floor(newMin / 60);
            newMin = newMin % 60;
        } else if (newMin < 0) {
            const absMin = Math.abs(newMin);
            const hoursSub = Math.ceil(absMin / 60);
            newHour -= hoursSub;
            newMin = 60 - (absMin % 60);
            if (newMin === 60) newMin = 0;
        }

        setHour(newHour);
        setMinute(newMin);
    };

    const setTime = (h, m) => {
        setHour(h);
        setMinute(m);
    };

    // Practice Mode Logic
    const generateQuiz = () => {
        const problemTypes = [
            'readClock',  // 시각 읽기
            'timeAfter',  // 몇 시간 후
            'timeBefore'  // 몇 시간 전
        ];

        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        if (type === 'readClock') {
            const h = Math.floor(Math.random() * 12) + 1;
            const m = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
            setQuizData({
                type,
                questionHour: h,
                questionMinute: m,
                question: '시계가 가리키는 시각은 몇 시 몇 분일까요?',
                answerHour: h,
                answerMinute: m
            });
        } else if (type === 'timeAfter') {
            const startH = Math.floor(Math.random() * 9) + 1; // 1~9
            const addHours = Math.floor(Math.random() * 3) + 1; // 1~3
            const endH = (startH + addHours) > 12 ? (startH + addHours - 12) : (startH + addHours);
            setQuizData({
                type,
                questionHour: startH,
                questionMinute: 0,
                question: `${startH}시에서 ${addHours}시간 후는 몇 시일까요?`,
                answerHour: endH,
                answerMinute: 0,
                displayClock: false
            });
        } else {
            const endH = Math.floor(Math.random() * 9) + 3; // 3~11
            const subHours = Math.floor(Math.random() * 2) + 1; // 1~2
            const startH = endH - subHours;
            setQuizData({
                type,
                questionHour: endH,
                questionMinute: 0,
                question: `${endH}시에서 ${subHours}시간 전은 몇 시일까요?`,
                answerHour: startH,
                answerMinute: 0,
                displayClock: false
            });
        }

        setUserHour('');
        setUserMinute('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (!quizData) return;

        const userH = parseInt(userHour);
        const userM = parseInt(userMinute || '0');

        if (userH === quizData.answerHour && userM === quizData.answerMinute) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const ClockDisplay = ({ h, m, size = 'large' }) => {
        const minDeg = m * 6;
        const hrDeg = (h % 12) * 30 + m * 0.5;
        const isSmall = size === 'small';

        return (
            <div className={styles.clockBody} style={isSmall ? { transform: 'scale(0.7)' } : {}}>
                <div className={styles.clockFace}>
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={styles.marker}
                            style={{
                                transform: `rotate(${(i + 1) * 30}deg) translateY(-130px)`
                            }}
                        >
                            <span style={{ transform: `rotate(-${(i + 1) * 30}deg)`, display: 'inline-block' }}>
                                {i + 1}
                            </span>
                        </div>
                    ))}

                    <motion.div
                        className={styles.hourHand}
                        animate={{ rotate: hrDeg }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                    <motion.div
                        className={styles.minuteHand}
                        animate={{ rotate: minDeg }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                    <div className={styles.centerDot} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {/* Mode Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 시계 조작하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>시계 탐험대: 몇 시일까요? ⏰</h2>

                    <ClockDisplay h={hour} m={minute} />

                    <div className={styles.digitalDisplay}>
                        {hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour)}시
                        {" "}{minute.toString().padStart(2, '0')}분
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.controlGroup}>
                            <p>분침 돌리기 (긴 바늘)</p>
                            <div className={styles.btnRow}>
                                <Button onClick={() => handleAddMinute(5)} size="small" variant="secondary">+5분</Button>
                                <Button onClick={() => handleAddMinute(10)} size="small" variant="secondary">+10분</Button>
                                <Button onClick={() => handleAddMinute(30)} size="small" variant="secondary">+30분</Button>
                            </div>
                        </div>
                        <div className={styles.controlGroup}>
                            <p>시침 돌리기 (짧은 바늘)</p>
                            <div className={styles.btnRow}>
                                <Button onClick={() => setHour(hour + 1)} size="small" variant="accent">+1시간</Button>
                            </div>
                        </div>
                        <div className={styles.controlGroup}>
                            <p>시간 맞추기 미션</p>
                            <div className={styles.btnRow}>
                                <Button onClick={() => setTime(9, 0)} size="small" variant="outline">학교 갈 시간 (9:00)</Button>
                                <Button onClick={() => setTime(12, 30)} size="small" variant="outline">점심 시간 (12:30)</Button>
                                <Button onClick={() => setTime(15, 15)} size="small" variant="outline">간식 시간 (3:15)</Button>
                            </div>
                        </div>
                    </div>

                    <article className={styles.note}>
                        <h3>💡 시계 박사님 노트</h3>
                        <ul>
                            <li><strong>긴 바늘(분침)</strong>: 한 바퀴 돌면 60분(1시간)이 지나요.</li>
                            <li><strong>짧은 바늘(시침)</strong>: 긴 바늘이 한 바퀴 돌 때 숫자 하나만큼 움직여요.</li>
                        </ul>
                    </article>
                </>
            ) : (
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 className={styles.title}>시계 문제 풀기 ⏰</h2>
                    {quizData && (
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#333' }}>{quizData.question}</h3>

                            {quizData.type === 'readClock' && (
                                <ClockDisplay h={quizData.questionHour} m={quizData.questionMinute} size="small" />
                            )}

                            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                <input
                                    type="number"
                                    value={userHour}
                                    onChange={(e) => setUserHour(e.target.value)}
                                    placeholder="시"
                                    min="1"
                                    max="12"
                                    style={{ width: '80px', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', textAlign: 'center' }}
                                />
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>시</span>
                                <input
                                    type="number"
                                    value={userMinute}
                                    onChange={(e) => setUserMinute(e.target.value)}
                                    placeholder="분"
                                    min="0"
                                    max="59"
                                    style={{ width: '80px', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', textAlign: 'center' }}
                                />
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>분</span>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        정답입니다! 시계를 잘 읽었어요! 👏 (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        다시 생각해보세요! 힌트: {quizData.type === 'readClock' ? '긴 바늘과 짧은 바늘을 잘 보세요' : '차근차근 계산해보세요'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("시계 보기 학습", "아날로그 시계를 직접 조작하며 시각과 시간의 흐름을 배우고 문제를 풉니다.")} />
        </div>
    );
};

export default ClockVisualizer;
