import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../common/PageHeader';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './WeightVolumeConverter.module.css';

const WeightVolumeConverter = () => {
    const [mode, setMode] = useState('explore');
    const [category, setCategory] = useState('volume'); // 'volume', 'weight'
    const [ml, setMl] = useState(500);
    const [g, setG] = useState(500);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [userAnswerSmall, setUserAnswerSmall] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateQuiz = () => {
        const isVolume = Math.random() > 0.5;
        const type = ['convert', 'compare', 'add'][Math.floor(Math.random() * 3)];

        let q = {};
        if (type === 'convert') {
            const val = (Math.floor(Math.random() * 2) + 1) * 1000 + Math.floor(Math.random() * 9) * 100;
            if (isVolume) {
                q = {
                    category: 'volume', type: 'two_parts',
                    question: `${val}mL는 몇 L 몇 mL인가요?`,
                    ans: Math.floor(val / 1000).toString(),
                    ansSmall: (val % 1000).toString(),
                    unit: 'L', smallUnit: 'mL', hint: '1000mL = 1L'
                };
            } else {
                q = {
                    category: 'weight', type: 'two_parts',
                    question: `${val}g은 몇 kg 몇 g인가요?`,
                    ans: Math.floor(val / 1000).toString(),
                    ansSmall: (val % 1000).toString(),
                    unit: 'kg', smallUnit: 'g', hint: '1000g = 1kg'
                };
            }
        } else if (type === 'compare') {
            const v1 = Math.floor(Math.random() * 2000) + 500;
            const v2 = Math.floor(Math.random() * 2000) + 500;
            const unit = isVolume ? 'mL' : 'g';
            q = {
                category: isVolume ? 'volume' : 'weight', type: 'choice',
                question: `${v1}${unit}와 ${v2}${unit} 중 어느 것이 더 큰가요?`,
                choices: [`${v1}${unit}`, `${v2}${unit}`, '같음'],
                ans: v1 > v2 ? `${v1}${unit}` : (v1 < v2 ? `${v2}${unit}` : '같음'),
                hint: '수치를 비교해보세요.'
            };
        } else {
            const a = Math.floor(Math.random() * 800) + 100;
            const b = Math.floor(Math.random() * 800) + 100;
            const unit = isVolume ? 'mL' : 'g';
            q = {
                category: isVolume ? 'volume' : 'weight', type: 'single',
                question: `${a}${unit} + ${b}${unit} = ?`,
                ans: (a + b).toString(),
                unit, hint: '두 수를 더해보세요.'
            };
        }

        setQuizData(q);
        setUserAnswer('');
        setUserAnswerSmall('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        let correct = false;
        if (quizData.type === 'two_parts') {
            correct = userAnswer === quizData.ans && userAnswerSmall === quizData.ansSmall;
        } else if (quizData.type === 'choice') {
            correct = userAnswer === quizData.ans;
        } else {
            correct = userAnswer === quizData.ans;
        }

        if (correct) {
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
            <PageHeader />
            <div className={styles.tabHeader}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 원리 탐구</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                        <h2 className={styles.title}>들이와 무게 측정의 원리 ⚖️</h2>
                    <p className={styles.subtitle}>비커와 저울을 사용해서 양을 측정해보세요.</p>

                    <div className={styles.categoryTabs}>
                        <Button onClick={() => setCategory('volume')} variant={category === 'volume' ? 'primary' : 'secondary'}>💧 들이 (mL, L)</Button>
                        <Button onClick={() => setCategory('weight')} variant={category === 'weight' ? 'primary' : 'secondary'}>⚖️ 무게 (g, kg)</Button>
                    </div>

                    <div className={styles.exploreCard}>
                        {category === 'volume' ? (
                            <div className={styles.volumeArea}>
                                <div className={styles.beakerContainer}>
                                    <motion.div
                                        className={styles.water}
                                        animate={{ height: `${(ml / 2000) * 100}%` }}
                                    />
                                    <div className={styles.beakerMarks}>
                                        {[2000, 1500, 1000, 500].map(val => (
                                            <div key={val} className={`${styles.mark} ${styles.majorMark}`} style={{ bottom: `${(val / 2000) * 100}%` }}>
                                                <span className={styles.markLabel}>{val === 1000 ? '1 L' : (val === 2000 ? '2 L' : `${val} mL`)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <input type="range" min="100" max="2000" step="50" value={ml} onChange={(e) => setMl(Number(e.target.value))} className={styles.slider} />
                                <div className={styles.resultBox}>
                                    <div>현재 양: <span className={styles.resultValue}>{ml} mL</span></div>
                                    <div style={{ fontSize: '1.2rem', color: '#666' }}>변환: {Math.floor(ml / 1000)} L {ml % 1000} mL</div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.weightArea}>
                                <div className={styles.scaleContainer}>
                                    <div className={styles.scalePlate} />
                                    <div className={styles.scaleBody}>
                                        <div className={styles.scaleFace}>
                                            <motion.div
                                                className={styles.scaleNeedle}
                                                animate={{ rotate: (g / 2000) * 360 }}
                                            />
                                        </div>
                                        <div className={styles.scaleValue}>{g} g</div>
                                    </div>
                                </div>
                                <input type="range" min="100" max="2000" step="50" value={g} onChange={(e) => setG(Number(e.target.value))} className={styles.slider} />
                                <div className={styles.resultBox}>
                                    <div>현재 무게: <span className={styles.resultValue}>{g} g</span></div>
                                    <div style={{ fontSize: '1.2rem', color: '#666' }}>변환: {Math.floor(g / 1000)} kg {g % 1000} g</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 들이와 무게 핵심 정리</h3>
                        <p>• <strong>1 L (리터)</strong>는 1000 mL (밀리리터)와 같아요.</p>
                        <p>• <strong>1 kg (킬로그램)</strong>은 1000 g (그램)과 같아요.</p>
                        <p>• 단위가 다를 때는 1000 단위로 묶어서 생각하면 쉬워요!</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>측정 마스터 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.questionText}>{quizData.question}</h3>

                            {quizData.type === 'choice' ? (
                                <div className={styles.choiceGrid}>
                                    {quizData.choices.map(c => (
                                        <button
                                            key={c}
                                            className={`${styles.choiceItem} ${userAnswer === c ? styles.choiceActive : ''}`}
                                            onClick={() => setUserAnswer(c)}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            ) : quizData.type === 'two_parts' ? (
                                <div className={styles.inputGroup}>
                                    <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={styles.inputBox} />
                                    <span>{quizData.unit}</span>
                                    <input type="number" value={userAnswerSmall} onChange={(e) => setUserAnswerSmall(e.target.value)} className={styles.inputBox} />
                                    <span>{quizData.smallUnit}</span>
                                </div>
                            ) : (
                                <div className={styles.inputGroup}>
                                    <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={styles.inputBox} />
                                    <span>{quizData.unit}</span>
                                </div>
                            )}

                            <Button onClick={checkAnswer} fullWidth size="large" variant="primary" disabled={feedback === 'correct'}>제출하기</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! (+15 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 다시 생각해보세요. 힌트: {quizData.hint}</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("들이와 무게", "L, mL, kg, g 단위의 관계를 시각적으로 확인하고 문제를 풉니다.")} />
        </div>
    );
};

export default WeightVolumeConverter;
