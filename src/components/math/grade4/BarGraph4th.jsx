import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './BarGraph4th.module.css';

const BarGraph4th = () => {
    const [mode, setMode] = useState('explore');
    const [data, setData] = useState([
        { label: '사과', value: 5, color: '#ff6b6b' },
        { label: '포도', value: 8, color: '#9c88ff' },
        { label: '바나나', value: 3, color: '#feca57' },
        { label: '수박', value: 6, color: '#1dd1a1' }
    ]);

    // Quiz state
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateQuiz = () => {
        const items = ['축구', '농구', '야구', '배구'];
        const values = items.map(() => Math.floor(Math.random() * 9) + 1);
        const quizItems = items.map((label, i) => ({ label, value: values[i], color: '#48dbfb' }));

        const types = ['read', 'compare', 'total'];
        const type = types[Math.floor(Math.random() * types.length)];

        let question = "";
        let answer = "";
        let explanation = "";

        if (type === 'read') {
            const target = quizItems[Math.floor(Math.random() * 4)];
            question = `그래프에서 [${target.label}]를 좋아하는 학생은 몇 명인가요?`;
            answer = target.value.toString();
            explanation = `막대의 높이를 눈금과 비교해보면 ${target.value}명인 것을 알 수 있어요.`;
        } else if (type === 'compare') {
            const maxVal = Math.max(...values);
            const targetItem = quizItems.find(i => i.value === maxVal);
            question = `가장 많은 학생이 좋아하는 운동은 무엇인가요?`;
            answer = targetItem.label;
            explanation = `가장 높게 솟아 있는 막대를 찾으면 [${targetItem.label}]이에요.`;
        } else {
            const sum = values.reduce((a, b) => a + b, 0);
            question = `운동을 선택한 전체 학생 수는 모두 몇 명인가요?`;
            answer = sum.toString();
            explanation = `모든 막대의 값을 더하면 돼요: ${values.join(' + ')} = ${sum}명`;
        }

        setQuizData({
            type,
            items: quizItems,
            question,
            answer,
            explanation
        });
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (userAnswer.trim() === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const GraphView = ({ items, height = 300 }) => (
        <div className={styles.graphContainer} style={{ height }}>
            <div className={styles.yAxis}>
                {[10, 8, 6, 4, 2, 0].map(val => (
                    <div key={val} className={styles.yTick}>
                        <span>{val}</span>
                        <div className={styles.gridLine} />
                    </div>
                ))}
            </div>
            <div className={styles.barsArea}>
                {items.map((item, i) => (
                    <div key={i} className={styles.barWrapper}>
                        <motion.div
                            className={styles.bar}
                            style={{ backgroundColor: item.color }}
                            initial={{ height: 0 }}
                            animate={{ height: `${item.value * 10}%` }}
                            transition={{ type: 'spring', damping: 15 }}
                        >
                            <span className={styles.barValue}>{item.value}</span>
                        </motion.div>
                        <span className={styles.barLabel}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 그래프 그리기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>막대그래프를 직접 그려요 📊</h2>
                    <p className={styles.subtitle}>수치를 입력해서 막대가 어떻게 변하는지 확인해보세요.</p>

                    <GraphView items={data} />

                    <div className={styles.editor}>
                        {data.map((item, i) => (
                            <div key={i} className={styles.editRow}>
                                <label>{item.label}</label>
                                <input
                                    type="number"
                                    min="0" max="10"
                                    value={item.value}
                                    onChange={(e) => {
                                        const newData = [...data];
                                        newData[i].value = Math.min(10, Math.max(0, parseInt(e.target.value) || 0));
                                        setData(newData);
                                    }}
                                />
                                <div className={styles.sliderBox}>
                                    <input
                                        type="range" min="0" max="10"
                                        value={item.value}
                                        onChange={(e) => {
                                            const newData = [...data];
                                            newData[i].value = parseInt(e.target.value);
                                            setData(newData);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.infoBox}>
                        <p>💡 막대그래프는 여러 가지 항목의 수량을 <strong>막대 모양</strong>으로 나타낸 그래프예요.</p>
                        <p>💡 눈금 한 칸이 얼마를 나타내는지 확인하는 것이 중요해요!</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>그래프 해석 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <GraphView items={quizData.items} height={250} />

                            <h3 className={styles.question}>{quizData.question}</h3>
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className={styles.input}
                                placeholder="정답 입력"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                            />

                            <div className={styles.buttons}>
                                <Button onClick={checkAnswer} disabled={!userAnswer || feedback === 'correct'} fullWidth size="large" variant="primary">제출하기</Button>
                                {!showAnswer && feedback !== 'correct' && (
                                    <Button onClick={() => { setShowAnswer(true); setFeedback('skipped'); }} variant="ghost" fullWidth size="medium">💡 잘 모르겠어요</Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답입니다! (+15 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 그래프를 다시 한 번 꼼꼼히 살펴보세요!</motion.div>}
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
            <JsonLd data={generateCourseSchema("막대그래프", "자료를 수집하여 막대그래프로 나타내고 해석하는 방법을 배웁니다.")} />
        </div>
    );
};

export default BarGraph4th;
