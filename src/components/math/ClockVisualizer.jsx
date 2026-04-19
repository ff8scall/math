import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import PageHeader from '../common/PageHeader';
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
    const [userSecond, setUserSecond] = useState('');
    const [feedback, setFeedback] = useState(null);

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
            'readClock',      // 시각 읽기
            'addTime',        // 시간의 덧셈
            'subTime',        // 시간의 뺄셈
            'secConvert'      // 분-초 변환
        ];

        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        if (type === 'readClock') {
            const h = Math.floor(Math.random() * 12) + 1;
            const m = Math.floor(Math.random() * 59);
            const s = [0, 10, 20, 30, 40, 50][Math.floor(Math.random() * 6)];
            setQuizData({
                type,
                questionHour: h, questionMinute: m, questionSecond: s,
                question: `시계가 가리키는 시각은 몇 시 몇 분 몇 초일까요?`,
                answerHour: h, answerMinute: m, answerSecond: s
            });
        } else if (type === 'addTime') {
            const h1 = Math.floor(Math.random() * 3) + 1;
            const m1 = Math.floor(Math.random() * 40) + 10;
            const h2 = Math.floor(Math.random() * 2) + 1;
            const m2 = Math.floor(Math.random() * 40) + 25;

            let totalM = m1 + m2;
            let totalH = h1 + h2 + Math.floor(totalM / 60);
            totalM %= 60;

            setQuizData({
                type: 'timeCalc',
                question: `${h1}시간 ${m1}분 + ${h2}시간 ${m2}분 = ?`,
                answerHour: totalH, answerMinute: totalM
            });
        } else if (type === 'subTime') {
            const h1 = Math.floor(Math.random() * 3) + 4;
            const m1 = Math.floor(Math.random() * 20) + 5;
            const h2 = Math.floor(Math.random() * 2) + 1;
            const m2 = Math.floor(Math.random() * 30) + 25;

            let dm = m1 - m2;
            let dh = h1 - h2;
            if (dm < 0) { dm += 60; dh -= 1; }

            setQuizData({
                type: 'timeCalc',
                question: `${h1}시간 ${m1}분 - ${h2}시간 ${m2}분 = ?`,
                answerHour: dh, answerMinute: dm
            });
        } else {
            const m = Math.floor(Math.random() * 3) + 1;
            const s = Math.floor(Math.random() * 50) + 5;
            const totalS = m * 60 + s;
            setQuizData({
                type: 'convert',
                question: `${m}분 ${s}초는 모두 몇 초인가요?`,
                answerSecond: totalS
            });
        }

        setUserHour('');
        setUserMinute('');
        setUserSecond('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (!quizData) return;

        const userH = parseInt(userHour || '0');
        const userM = parseInt(userMinute || '0');
        const userS = parseInt(userSecond || '0');

        let isCorrect = false;
        if (quizData.type === 'readClock') {
            isCorrect = userH === quizData.answerHour && userM === quizData.answerMinute && userS === quizData.answerSecond;
        } else if (quizData.type === 'timeCalc') {
            isCorrect = userH === quizData.answerHour && userM === quizData.answerMinute;
        } else if (quizData.type === 'convert') {
            isCorrect = userS === quizData.answerSecond;
        }

        if (isCorrect) {
            setFeedback('correct'); confetti(); updateCoins(15); setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const ClockDisplay = ({ h, m, s = 0, size = 'large' }) => {
        const minDeg = m * 6;
        const hrDeg = (h % 12) * 30 + m * 0.5;
        const sDeg = s * 6;
        const isSmall = size === 'small';

        return (
            <div className={styles.clockBody} style={isSmall ? { transform: 'scale(0.7)' } : {}}>
                <div className={styles.clockFace}>
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={styles.marker} style={{ transform: `rotate(${(i + 1) * 30}deg) translateY(-130px)` }}>
                            <span style={{ transform: `rotate(-${(i + 1) * 30}deg)`, display: 'inline-block' }}>{i + 1}</span>
                        </div>
                    ))}
                    <motion.div className={styles.hourHand} animate={{ rotate: hrDeg }} />
                    <motion.div className={styles.minuteHand} animate={{ rotate: minDeg }} />
                    {s !== undefined && <motion.div className={styles.secondHand} animate={{ rotate: sDeg }} style={{ width: '2px', height: '140px', backgroundColor: 'red', position: 'absolute', bottom: '50%', transformOrigin: 'bottom' }} />}
                    <div className={styles.centerDot} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 시계 조작하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>시계 탐험대 ⏰</h2>
                    <ClockDisplay h={hour} m={minute} />
                    <div className={styles.digitalDisplay}>{hour % 12 || 12}시 {minute}분</div>
                    <div className={styles.controls}>
                        <div className={styles.controlGroup}>
                            <p>분침 조절</p>
                            <div className={styles.btnRow}>
                                <Button onClick={() => handleAddMinute(5)} size="small" variant="secondary">+5분</Button>
                                <Button onClick={() => handleAddMinute(10)} size="small" variant="secondary">+10분</Button>
                                <Button onClick={() => handleAddMinute(30)} size="small" variant="secondary">+30분</Button>
                            </div>
                        </div>
                        <div className={styles.controlGroup}>
                            <p>시침 조절</p>
                            <Button onClick={() => setHour(hour + 1)} size="small" variant="accent">+1시간</Button>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 className={styles.title}>시계 문제 풀기 ⏰</h2>
                    {quizData && (
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '25px' }}>{quizData.question}</h3>
                            {quizData.type === 'readClock' && <ClockDisplay h={quizData.questionHour} m={quizData.questionMinute} s={quizData.questionSecond} size="small" />}

                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                                {quizData.type !== 'convert' && (
                                    <>
                                        <input type="number" value={userHour} onChange={(e) => setUserHour(e.target.value)} style={{ width: '70px', padding: '10px', fontSize: '1.2rem', textAlign: 'center' }} />
                                        <span style={{ fontWeight: 'bold' }}>{quizData.type === 'timeCalc' ? '시간' : '시'}</span>
                                        <input type="number" value={userMinute} onChange={(e) => setUserMinute(e.target.value)} style={{ width: '70px', padding: '10px', fontSize: '1.2rem', textAlign: 'center' }} />
                                        <span style={{ fontWeight: 'bold' }}>분</span>
                                    </>
                                )}
                                {(quizData.type === 'readClock' || quizData.type === 'convert') && (
                                    <>
                                        <input type="number" value={userSecond} onChange={(e) => setUserSecond(e.target.value)} style={{ width: '70px', padding: '10px', fontSize: '1.2rem', textAlign: 'center' }} />
                                        <span style={{ fontWeight: 'bold' }}>초</span>
                                    </>
                                )}
                            </div>
                            <Button onClick={checkAnswer} size="large" fullWidth style={{ marginTop: '20px' }}>정답 확인</Button>
                            {feedback && <div style={{ marginTop: '20px', color: feedback === 'correct' ? 'green' : 'red', fontWeight: 'bold' }}>{feedback === 'correct' ? '🎉 정답입니다!' : '🧐 다시 생각해보세요!'}</div>}
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("시계 보기 학습", "3학년 시계 학습: 초 단위 및 시간의 합과 차를 배웁니다.")} />
        </div>
    );
};

export default ClockVisualizer;
