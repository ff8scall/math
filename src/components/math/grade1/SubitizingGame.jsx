import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './SubitizingGame.module.css';

// Dice-style dot patterns (up to 9)
const DOT_GRIDS = {
    1: [{ r: 0, c: 0 }],
    2: [{ r: 0, c: 0 }, { r: 1, c: 1 }],
    3: [{ r: 0, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 2 }],
    4: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }],
    5: [{ r: 0, c: 0 }, { r: 0, c: 2 }, { r: 1, c: 1 }, { r: 2, c: 0 }, { r: 2, c: 2 }],
    6: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 0 }, { r: 2, c: 1 }],
    7: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 1, c: 2 }],
    8: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 1, c: 0 }, { r: 1, c: 2 }, { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }],
    9: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }],
};

const FLASH_DURATION = 1200; // ms the dots show before hiding

const SubitizingGame = () => {
    const [phase, setPhase] = useState('start'); // 'start' | 'flash' | 'answer' | 'feedback'
    const [currentNum, setCurrentNum] = useState(null);
    const [answered, setAnswered] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
    const [maxNum, setMaxNum] = useState(5);
    const timerRef = useRef(null);

    const TOTAL_ROUNDS = 8;

    const nextRound = useCallback(() => {
        const num = Math.floor(Math.random() * maxNum) + 1;
        setCurrentNum(num);
        setAnswered(null);
        setFeedback(null);
        setPhase('flash');

        timerRef.current = setTimeout(() => {
            setPhase('answer');
        }, FLASH_DURATION);
    }, [maxNum]);

    const startGame = () => {
        setScore(0);
        setRound(0);
        nextRound();
    };

    useEffect(() => {
        if (phase === 'flash') {
            // nothing extra — timer in nextRound handles it
        }
        return () => clearTimeout(timerRef.current);
    }, [phase]);

    const handleAnswer = (num) => {
        if (phase !== 'answer') return;
        setAnswered(num);
        const correct = num === currentNum;
        setFeedback(correct ? 'correct' : 'wrong');
        if (correct) {
            confetti({ particleCount: 30, spread: 50 });
            setScore(s => s + 1);
            updateCoins(5);
        }
        setPhase('feedback');

        setTimeout(() => {
            const nextRoundNum = round + 1;
            setRound(nextRoundNum);
            if (nextRoundNum >= TOTAL_ROUNDS) {
                setPhase('result');
            } else {
                nextRound();
            }
        }, 1500);
    };

    const dots = currentNum ? DOT_GRIDS[currentNum] : [];
    const gridLayout = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '10px', width: '120px', height: '120px' };

    return (
        <div className={styles.container}>
            <PageHeader title="주사위 패턴 찰칵! (순간 수 인식)" grade="1" />

            <div className={styles.card}>
                <p className={styles.intro}>
                    반짝! 보이는 동안 개수를 세지 말고 <strong>순간적으로 느껴봐요!</strong><br />
                    빠른 눈 훈련이 수학 실력의 기초가 됩니다. 🧠
                </p>

                {phase === 'start' && (
                    <>
                        <div className={styles.startMsg}>
                            동그라미들이 {FLASH_DURATION / 1000}초 동안 반짝 보였다 사라져요!<br />
                            몇 개였는지 바로 맞혀보세요.
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {[3, 5, 7, 9].map(n => (
                                <button
                                    key={n}
                                    className={`${styles.ansBtn} ${maxNum === n ? styles.ansBtnCorrect : ''}`}
                                    onClick={() => setMaxNum(n)}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#a0aec0', marginBottom: '2rem' }}>최대 개수 선택 (3 = 쉬움, 9 = 어려움)</p>
                        <Button onClick={startGame} size="large" variant="primary">🎮 게임 시작!</Button>
                    </>
                )}

                {(phase === 'flash' || phase === 'answer' || phase === 'feedback') && (
                    <>
                        <div className={styles.scoreBoard}>
                            <div className={styles.scoreItem}>
                                <div className={styles.scoreNum} style={{ color: '#48bb78' }}>{score}</div>
                                <div className={styles.scoreLabel}>맞힌 수</div>
                            </div>
                            <div className={styles.scoreItem}>
                                <div className={styles.scoreNum}>{round + 1}</div>
                                <div className={styles.scoreLabel}>/ {TOTAL_ROUNDS} 라운드</div>
                            </div>
                        </div>

                        {/* Flash Box */}
                        <div className={styles.flashBox} onClick={() => phase === 'start' && startGame()}>
                            <AnimatePresence>
                                {phase === 'flash' && (
                                    <motion.div
                                        key="dotsVisible"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={gridLayout}
                                    >
                                        {dots.map((d, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    gridColumn: d.c + 1,
                                                    gridRow: d.r + 1,
                                                }}
                                            >
                                                <div className={styles.dot} />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                                {(phase === 'answer' || phase === 'feedback') && (
                                    <motion.div
                                        key="cover"
                                        className={styles.cover}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        ?
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {phase === 'answer' && (
                            <>
                                <p className={styles.promptText}>몇 개였나요?</p>
                                <div className={styles.answerRow}>
                                    {Array.from({ length: maxNum }, (_, i) => i + 1).map(n => (
                                        <button key={n} className={styles.ansBtn} onClick={() => handleAnswer(n)}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {phase === 'feedback' && (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <div className={styles.feedback}>
                                        {feedback === 'correct' ? '🎉 정답!' : `😅 아쉬워요! 정답은 ${currentNum}개였어요.`}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </>
                )}

                {phase === 'result' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {score >= TOTAL_ROUNDS * 0.7 ? '🏆' : '📚'}
                        </div>
                        <div className={styles.scoreBoard}>
                            <div className={styles.scoreItem}>
                                <div className={styles.scoreNum} style={{ color: '#48bb78' }}>{score}</div>
                                <div className={styles.scoreLabel}>최종 점수</div>
                            </div>
                            <div className={styles.scoreItem}>
                                <div className={styles.scoreNum}>{TOTAL_ROUNDS - score}</div>
                                <div className={styles.scoreLabel}>틀린 수</div>
                            </div>
                        </div>
                        <p style={{ color: '#718096', marginBottom: '2rem' }}>
                            {score >= TOTAL_ROUNDS ? '완벽해요! 수 감각이 최고예요! 🌟'
                                : score >= TOTAL_ROUNDS * 0.7 ? '잘했어요! 꾸준히 연습하면 더 빨라져요!'
                                : '조금 더 연습하면 빨라질 수 있어요. 다시 도전해요!'}
                        </p>
                        <Button onClick={() => setPhase('start')} size="large">다시 도전하기 🔄</Button>
                    </motion.div>
                )}
            </div>

            <JsonLd data={generateCourseSchema(
                "초등 1학년 수 감각 게임 (수비타이징)",
                "구체물의 배치를 1~2초 안에 직관적으로 파악하는 수비타이징 훈련으로 빠른 연산의 기초 뇌 신경망을 형성합니다."
            )} />
        </div>
    );
};

export default SubitizingGame;
