import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './GeometryMove4th.module.css';

const GeometryMove4th = () => {
    const [mode, setMode] = useState('explore');
    const [shapePos, setShapePos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [flipX, setFlipX] = useState(1); // 1 or -1
    const [flipY, setFlipY] = useState(1); // 1 or -1

    // Quiz state
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // L-shape definition on a 3x3 local grid for visualization
    const shapeDots = [
        { r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }, { r: 2, c: 1 }
    ];

    const resetExplore = () => {
        setShapePos({ x: 0, y: 0 });
        setRotation(0);
        setFlipX(1);
        setFlipY(1);
    };

    const generateQuiz = () => {
        const transforms = ['밀기', '뒤집기', '돌리기'];
        const type = transforms[Math.floor(Math.random() * transforms.length)];

        // Target state to find
        let targetRotation = 0;
        let targetFlipX = 1;
        let targetFlipY = 1;
        let question = "";

        if (type === '밀기') {
            const dir = ['오른쪽', '왼쪽', '위쪽', '아래쪽'][Math.floor(Math.random() * 4)];
            question = `도형을 ${dir}으로 밀었을 때의 모양을 고르세요.`;
            // Sliding doesn't change shape appearance, just position, but for quiz we often ask about shape change
            // Actually sliding is simple, but let's stick to appearance for now.
        } else if (type === '뒤집기') {
            const dir = Math.random() > 0.5 ? '오른쪽' : '아래쪽';
            if (dir === '오른쪽') targetFlipX = -1;
            else targetFlipY = -1;
            question = `도형을 ${dir}으로 뒤집었을 때의 모양을 고르세요.`;
        } else {
            const deg = [90, 180, 270][Math.floor(Math.random() * 3)];
            targetRotation = deg;
            question = `도형을 시계 방향으로 ${deg}도 돌렸을 때의 모양을 고르세요.`;
        }

        // Generate options (simplified: just visual rotation/flip states)
        const options = [
            { rot: 0, fx: 1, fy: 1, label: '가' },
            { rot: 90, fx: 1, fy: 1, label: '나' },
            { rot: 180, fx: 1, fy: 1, label: '다' },
            { rot: 0, fx: -1, fy: 1, label: '라' }
        ];

        // Ensure correct answer is in options
        const correctIdx = options.findIndex(o => o.rot === targetRotation && o.fx === targetFlipX && o.fy === targetFlipY);
        if (correctIdx === -1) {
            options[0] = { rot: targetRotation, fx: targetFlipX, fy: targetFlipY, label: '가' };
        }

        setQuizData({
            question,
            answer: targetRotation === 0 && targetFlipX === 1 && targetFlipY === 1 ? '가' : options.find(o => o.rot === targetRotation && o.fx === targetFlipX && o.fy === targetFlipY).label,
            options: options.sort(() => Math.random() - 0.5),
            explanation: `도형의 각 부분이 이동하는 방향을 잘 관찰해보세요.`
        });

        setUserAnswer(null);
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice') generateQuiz();
    }, [mode]);

    const checkAnswer = (ans) => {
        setUserAnswer(ans);
        if (ans === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const ShapeView = ({ rot, fx, fy, size = 100 }) => (
        <div style={{
            width: size, height: size,
            position: 'relative',
            transform: `rotate(${rot}deg) scaleX(${fx}) scaleY(${fy})`,
            transition: 'transform 0.5s ease'
        }}>
            <div className={styles.lShape}>
                <div className={styles.lVertical} />
                <div className={styles.lHorizontal} />
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 도형 이동 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>도형을 움직여봐요! 🔄</h2>
                    <p className={styles.subtitle}>밀기, 뒤집기, 돌리기를 클릭해서 도형의 변화를 관찰하세요.</p>

                    <div className={styles.gridCanvas}>
                        <div className={styles.gridLines}>
                            {Array.from({ length: 11 }).map((_, i) => <div key={`v-${i}`} className={styles.vLine} style={{ left: `${i * 10}%` }} />)}
                            {Array.from({ length: 11 }).map((_, i) => <div key={`h-${i}`} className={styles.hLine} style={{ top: `${i * 10}%` }} />)}
                        </div>

                        <motion.div
                            className={styles.shapeContainer}
                            animate={{
                                x: shapePos.x * 40,
                                y: shapePos.y * 40,
                                rotate: rotation,
                                scaleX: flipX,
                                scaleY: flipY
                            }}
                        >
                            <div className={styles.lShape}>
                                <div className={styles.lVertical} />
                                <div className={styles.lHorizontal} />
                            </div>
                        </motion.div>
                    </div>

                    <div className={styles.controlsGrid}>
                        <div className={styles.controlGroup}>
                            <h3>📏 밀기</h3>
                            <div className={styles.btnRow}>
                                <Button onClick={() => setShapePos(p => ({ ...p, y: p.y - 1 }))} size="small">위</Button>
                                <Button onClick={() => setShapePos(p => ({ ...p, y: p.y + 1 }))} size="small">아래</Button>
                                <Button onClick={() => setShapePos(p => ({ ...p, x: p.x - 1 }))} size="small">왼쪽</Button>
                                <Button onClick={() => setShapePos(p => ({ ...p, x: p.x + 1 }))} size="small">오른쪽</Button>
                            </div>
                        </div>
                        <div className={styles.controlGroup}>
                            <h3>↔️ 뒤집기</h3>
                            <div className={styles.btnRow}>
                                <Button onClick={() => setFlipY(f => f * -1)}>위아래</Button>
                                <Button onClick={() => setFlipX(f => f * -1)}>좌우</Button>
                            </div>
                        </div>
                        <div className={styles.controlGroup}>
                            <h3>↪️ 돌리기</h3>
                            <div className={styles.btnRow}>
                                <Button onClick={() => setRotation(r => r + 90)}>90°</Button>
                                <Button onClick={() => setRotation(r => r + 180)}>180°</Button>
                                <Button onClick={() => setRotation(r => r + 270)}>270°</Button>
                            </div>
                        </div>
                    </div>
                    <Button onClick={resetExplore} variant="secondary" style={{ marginTop: '20px' }}>처음 상태로</Button>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>도형 이동 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            <div className={styles.quizVisual}>
                                <div className={styles.originalBox}>
                                    <span>처음 모양</span>
                                    <ShapeView rot={0} fx={1} fy={1} size={80} />
                                </div>
                            </div>

                            <div className={styles.optionsGrid}>
                                {quizData.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.optionCard} ${userAnswer === opt.label ? styles.selected : ''}`}
                                        onClick={() => checkAnswer(opt.label)}
                                        disabled={feedback === 'correct'}
                                    >
                                        <div className={styles.optLabel}>{opt.label}</div>
                                        <ShapeView rot={opt.rot} fx={opt.fx} fy={opt.fy} size={60} />
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+15 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 모양이 어떻게 변할지 다시 생각해보세요!</motion.div>}
                            </AnimatePresence>

                            {!showAnswer && feedback !== 'correct' && (
                                <Button onClick={() => setShowAnswer(true)} variant="ghost" style={{ marginTop: '20px' }}>💡 도움말 보기</Button>
                            )}

                            {showAnswer && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.helpBox}>
                                    <p>{quizData.explanation}</p>
                                    <p>정답: <strong>{quizData.answer}</strong></p>
                                    <Button onClick={generateQuiz}>다음 문제</Button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("평면도형의 이동", "도형을 밀기, 뒤집기, 돌렸을 때 생기는 모양의 변화를 학습합니다.")} />
        </div>
    );
};

export default GeometryMove4th;
