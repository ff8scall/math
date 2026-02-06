import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './Angles4th.module.css';

const Angles4th = () => {
    const [mode, setMode] = useState('explore');
    const [angle, setAngle] = useState(45);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const getAngleType = (deg) => {
        if (deg < 90) return '예각';
        if (deg === 90) return '직각';
        if (deg <= 180) return '둔각';
        return '';
    };

    const generateQuiz = () => {
        const types = ['identify', 'triangle-sum', 'quad-sum'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'identify') {
            const deg = [30, 45, 60, 90, 120, 150][Math.floor(Math.random() * 6)];
            const correctType = getAngleType(deg);
            setQuizData({
                type,
                deg,
                question: `${deg}도는 무슨 각인가요?`,
                answer: correctType,
                options: ['예각', '직각', '둔각'],
                explanation: `0도~90도 미만은 예각, 90도는 직각, 90도~180도는 둔각이에요.`
            });
        } else if (type === 'triangle-sum') {
            const a1 = Math.floor(Math.random() * 80) + 30;
            const a2 = Math.floor(Math.random() * (180 - a1 - 40)) + 20;
            const a3 = 180 - a1 - a2;
            setQuizData({
                type,
                question: `삼각형의 두 각이 ${a1}도, ${a2}도일 때, 나머지 한 각은 몇 도일까요?`,
                answer: a3.toString(),
                explanation: `삼각형의 세 각의 합은 항상 180도예요. 180 - ${a1} - ${a2} = ${a3}`
            });
        } else {
            const a1 = 100, a2 = 80, a3 = 90;
            const a4 = 360 - a1 - a2 - a3;
            setQuizData({
                type,
                question: `사각형의 세 각이 ${a1}도, ${a2}도, ${a3}도일 때, 나머지 한 각은 몇 도일까요?`,
                answer: a4.toString(),
                explanation: `사각형의 네 각의 합은 항상 360도예요. 360 - ${a1} - ${a2} - ${a3} = ${a4}`
            });
        }

        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (userAnswer === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 각도 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>각도를 만들어봐요 📐</h2>
                    <p className={styles.subtitle}>각도기를 보고 각의 크기를 확인해보세요.</p>

                    <div className={styles.visualBoard}>
                        <div className={styles.protractorContainer}>
                            {/* Protractor SVG Component */}
                            <svg viewBox="0 0 400 200" className={styles.protractorSvg}>
                                <path d="M 20 180 A 180 180 0 0 1 380 180 L 20 180" fill="none" stroke="#ddd" strokeWidth="2" />
                                {[0, 30, 60, 90, 120, 150, 180].map(d => (
                                    <g key={d} transform={`rotate(${-d}, 200, 180)`}>
                                        <line x1="20" y1="180" x2="35" y2="180" stroke="#999" strokeWidth="2" />
                                        <text x="45" y="185" fontSize="12" fill="#666" transform={`rotate(${d}, 45, 185)`}>{d}</text>
                                    </g>
                                ))}
                                {/* Angle Lines */}
                                <line x1="200" y1="180" x2="380" y2="180" stroke="#333" strokeWidth="4" />
                                <motion.line
                                    x1="200" y1="180"
                                    x2={200 + 180 * Math.cos((180 - angle) * Math.PI / 180)}
                                    y2={180 - 180 * Math.sin((180 - angle) * Math.PI / 180)}
                                    stroke="var(--primary-color)"
                                    strokeWidth="4"
                                />
                                {/* Arc for current angle */}
                                <path
                                    d={`M 250 180 A 50 50 0 0 0 ${200 + 50 * Math.cos((180 - angle) * Math.PI / 180)} ${180 - 50 * Math.sin((180 - angle) * Math.PI / 180)}`}
                                    fill="none" stroke="var(--primary-color)" strokeWidth="2"
                                />
                            </svg>
                        </div>

                        <div className={styles.angleStats}>
                            <div className={styles.currentDeg}>{angle}°</div>
                            <div className={styles.angleType}>{getAngleType(angle)}</div>
                        </div>

                        <div className={styles.sliderContainer}>
                            <input
                                type="range" min="0" max="180" step="1"
                                value={angle} onChange={(e) => setAngle(parseInt(e.target.value))}
                                className={styles.slider}
                            />
                        </div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <strong>예각</strong>
                            <p>0도보다 크고 90도보다 작은 각</p>
                        </div>
                        <div className={styles.infoItem}>
                            <strong>직각</strong>
                            <p>정확히 90도인 각</p>
                        </div>
                        <div className={styles.infoItem}>
                            <strong>둔각</strong>
                            <p>90도보다 크고 180도보다 작은 각</p>
                        </div>
                    </div>

                    <div className={styles.deepInsight}>
                        <h3>🧐 왜 한 바퀴는 360도일까요?</h3>
                        <p>고대 사람들은 태양이 지구를 한 바퀴 도는 데 약 <strong>360일</strong>이 걸린다고 생각했어요(지금은 365일인 걸 알지만요!).</p>
                        <p>또한, 360은 2, 3, 4, 5, 6, 8, 9, 10, 12 등 아주 많은 숫자로 <strong>똑같이 나누기 매우 편한 숫자</strong>이기 때문이기도 하답니다.</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>각도 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.type === 'identify' ? (
                                <div className={styles.options}>
                                    {quizData.options.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setUserAnswer(opt)}
                                            className={`${styles.optionBtn} ${userAnswer === opt ? styles.selected : ''}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className={styles.input}
                                    placeholder="정답 숫자만 입력"
                                />
                            )}

                            <div className={styles.buttons}>
                                <Button onClick={checkAnswer} disabled={!userAnswer || feedback === 'correct'} fullWidth size="large" variant="primary">제출하기</Button>
                                {!showAnswer && feedback !== 'correct' && (
                                    <Button onClick={() => { setShowAnswer(true); setFeedback('skipped'); }} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+15 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한 번 생각해보세요!</motion.div>}
                                {showAnswer && (
                                    <motion.div className={styles.feedbackAnswer}>
                                        <div className={styles.answerBox}>
                                            <p><strong>정답:</strong> {quizData.answer}</p>
                                            <p>{quizData.explanation}</p>
                                        </div>
                                        <Button onClick={generateQuiz} size="large">다음 문제</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("각도", "각의 크기를 재고 예각, 직각, 둔각의 개념을 배웁니다.")} />
        </div>
    );
};

export default Angles4th;
