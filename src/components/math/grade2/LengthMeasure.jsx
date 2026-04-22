import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './LengthMeasure.module.css';

const LengthMeasure = () => {
    const [mode, setMode] = useState('explore');
    const [cm, setCm] = useState(25);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const types = ['convert-cm', 'convert-m', 'add'];
        const type = types[Math.floor(Math.random() * types.length)];
        if (type === 'convert-cm') {
            const m = Math.floor(Math.random() * 3) + 1;
            setQuizData({ question: `${m}m는 몇 cm인가요?`, answer: m * 100, explanation: `1m = 100cm이므로 ${m}m = ${m * 100}cm` });
        } else if (type === 'convert-m') {
            const c = [100, 200, 300][Math.floor(Math.random() * 3)];
            setQuizData({ question: `${c}cm는 몇 m인가요?`, answer: c / 100, explanation: `100cm = 1m이므로 ${c}cm = ${c / 100}m` });
        } else {
            const c1 = Math.floor(Math.random() * 50) + 10;
            const c2 = Math.floor(Math.random() * 50) + 10;
            setQuizData({ question: `${c1}cm + ${c2}cm = ?`, answer: c1 + c2, explanation: `${c1} + ${c2} = ${c1 + c2}cm` });
        }
        setUserAnswer(''); setFeedback(null);
    };

    useEffect(() => { if (mode === 'practice' && !quizData) generateQuiz(); }, [mode]);

    const checkAnswer = () => {
        if (parseFloat(userAnswer) === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="길이 재기 (cm, m)" grade="2" />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 문제</Button>
            </div>
            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <div className={styles.ruler}>
                        <div className={styles.rulerLine} style={{ width: `${cm * 8 + 40}px` }}>
                            {[...Array(cm + 1)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`${styles.tick} ${i % 10 === 0 ? styles.major : (i % 5 === 0 ? styles.medium : '')}`}
                                    style={{ left: `${i * 8 + 20}px` }}
                                >
                                    {i % 10 === 0 && <span>{i}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.display}>{cm} cm = {(cm / 100).toFixed(2)} m</div>
                    <input type="range" min="1" max="100" value={cm} onChange={(e) => setCm(parseInt(e.target.value))} className={styles.slider} />
                    <div className={styles.helpBox}><p>• 1m = 100cm</p><p>• 1cm = 10mm</p></div>
                </div>
            ) : (
                <div className={styles.practice}>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>
                            <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className={styles.input} />
                            <div className={styles.buttons}>
                                <Button
                                    onClick={checkAnswer}
                                    disabled={!userAnswer || feedback === 'correct'}
                                    fullWidth
                                    size="large"
                                    variant="primary"
                                >
                                    제출하기
                                </Button>
                                {feedback === 'incorrect' && (
                                    <Button
                                        onClick={() => generateQuiz()}
                                        variant="ghost"
                                        fullWidth
                                        size="medium"
                                    >
                                        💡 잘 모르겠어요
                                    </Button>
                                )}
                            </div>
                            {feedback === 'correct' && <motion.div className={styles.correct}>🎉 정답!</motion.div>}
                            {feedback === 'incorrect' && <motion.div className={styles.incorrect}>😅 다시!</motion.div>}
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("2학년 길이 재기", "m와 cm 단위를 배우고 길이를 측정하고 변환하는 방법을 익힙니다.")} />
        </div>
    );
};

export default LengthMeasure;
