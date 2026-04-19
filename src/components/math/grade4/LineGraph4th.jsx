import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './LineGraph4th.module.css';

const SvgGraph = ({ items, width = 800, height = 250 }) => {
    const padding = 40;
    const chartW = width - padding * 2;
    const chartH = height - padding;
    const maxVal = 30;

    const getX = (i) => padding + (i * chartW) / (items.length - 1);
    const getY = (val) => chartH - (val * chartH) / maxVal;

    const points = items.map((item, i) => `${getX(i)},${getY(item.value)}`).join(' ');

    return (
        <div className={styles.graphArea}>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                {/* Y Axis Grid */}
                {[0, 10, 20, 30].map(v => (
                    <g key={v}>
                        <line x1={padding} y1={getY(v)} x2={width - padding} y2={getY(v)} stroke="#eee" />
                        <text x={padding - 10} y={getY(v) + 5} textAnchor="end" fontSize="12" fill="#888">{v}</text>
                    </g>
                ))}

                {/* X Axis Labels */}
                {items.map((item, i) => (
                    <text key={i} x={getX(i)} y={height - 10} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#555">{item.time}</text>
                ))}

                {/* Data Line */}
                <motion.polyline
                    points={points}
                    fill="none"
                    stroke="#e91e63"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Data Points */}
                {items.map((item, i) => (
                    <circle
                        key={i} cx={getX(i)} cy={getY(item.value)} r="6"
                        fill="#e91e63" stroke="#fff" strokeWidth="2"
                    />
                ))}
            </svg>
        </div>
    );
};

const LineGraph4th = () => {
    const [mode, setMode] = useState('explore');
    const [data, setData] = useState([
        { time: '월', value: 15 },
        { time: '화', value: 20 },
        { time: '수', value: 18 },
        { time: '목', value: 25 },
        { time: '금', value: 22 }
    ]);

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateQuiz = () => {
        const items = ['1시', '2시', '3시', '4시', '5시'];
        const values = [];
        const uniqueValues = new Set();
        while (uniqueValues.size < items.length) {
            uniqueValues.add(Math.floor(Math.random() * 25) + 5);
        }
        const valuesArray = Array.from(uniqueValues);
        const quizItems = items.map((time, i) => ({ time, value: valuesArray[i] }));

        const types = ['max', 'min', 'increase', 'decrease'];
        const type = types[Math.floor(Math.random() * types.length)];

        let question = "";
        let answer = "";
        let explanation = "";

        if (type === 'max') {
            const maxVal = Math.max(...valuesArray);
            const target = quizItems.find(i => i.value === maxVal);
            question = "기온이 가장 높았던 때는 언제인가요?";
            answer = target.time;
            explanation = `그래프 선이 가장 높이 올라간 지점은 ${target.time} (${target.value}도) 예요.`;
        } else if (type === 'min') {
            const minVal = Math.min(...valuesArray);
            const target = quizItems.find(i => i.value === minVal);
            question = "기온이 가장 낮았던 때는 언제인가요?";
            answer = target.time;
            explanation = `그래프 선이 가장 아래에 위치한 지점은 ${target.time} (${target.value}도) 예요.`;
        } else if (type === 'increase') {
            let maxDiff = -100;
            let targetTime = "";
            for (let i = 1; i < quizItems.length; i++) {
                const diff = quizItems[i].value - quizItems[i - 1].value;
                if (diff > maxDiff) {
                    maxDiff = diff;
                    targetTime = `${quizItems[i - 1].time}에서 ${quizItems[i].time}`;
                }
            }
            question = "기온이 가장 많이 올라간 구간은 어디인가요?";
            answer = targetTime;
            explanation = "기울기가 가장 가파르게 올라가는 구간을 찾으면 돼요.";
        } else {
            question = `3시의 기온은 몇 도인가요?`;
            answer = quizItems[2].value.toString();
            explanation = `그래프의 '3시' 눈금을 따라 위로 올라가면 ${answer}인 것을 알 수 있어요.`;
        }

        setQuizData({ items: quizItems, question, answer, explanation, type });
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = (choice) => {
        const finalAns = choice || userAnswer;
        if (finalAns.trim() === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 그래프 그리기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>꺾은선그래프 탐험 📉</h2>
                    <p className={styles.subtitle}>시간에 따른 변화를 선으로 연결해 봐요.</p>

                    <div className={styles.exploreCard}>
                        <SvgGraph items={data} />

                        <div className={styles.controls}>
                            {data.map((item, i) => (
                                <div key={i} className={styles.controlItem}>
                                    <label>{item.time}요일</label>
                                    <input
                                        type="range" min="0" max="30" value={item.value}
                                        onChange={(e) => {
                                            const newData = [...data];
                                            newData[i].value = parseInt(e.target.value);
                                            setData(newData);
                                        }}
                                        className={styles.slider}
                                    />
                                    <span>{item.value}도</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 꺾은선그래프 박사님의 팁</h3>
                        <ul>
                            <li>• <strong>변화 관찰</strong>: 선이 올라가면 늘어난 것이고, 내려가면 줄어든 것이에요.</li>
                            <li>• <strong>기울기</strong>: 선이 가파를수록 변화가 크다는 뜻이에요!</li>
                            <li>• 막대그래프는 각각의 양을 비교할 때 좋고, 꺾은선그래프는 변화를 볼 때 아주 좋아요.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>그래프 해석 마스터 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <SvgGraph items={quizData.items} />
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {(quizData.type === 'max' || quizData.type === 'min' || quizData.type === 'increase') ? (
                                <div className={styles.choices}>
                                    {(quizData.type === 'increase' ? [
                                        '1시에서 2시', '2시에서 3시', '3시에서 4시', '4시에서 5시'
                                    ] : quizData.items.map(i => i.time)).map(c => (
                                        <button
                                            key={c} onClick={() => checkAnswer(c)}
                                            className={styles.choiceBtn}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
                                    <input
                                        type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                                        className={styles.inputField} placeholder="정답 입력"
                                        style={{ padding: '15px', fontSize: '1.5rem', borderRadius: '15px', border: '2px solid #ddd', textAlign: 'center' }}
                                    />
                                    <Button onClick={() => checkAnswer()} variant="primary" size="large">확인</Button>
                                </div>
                            )}

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! 그래프 박사님!</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 다시 한번 그래프의 지점을 확인해 보세요!</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("꺾은선그래프", "시간에 따른 변화를 꺾은선으로 나타내고 이를 해석하는 방법을 배웁니다.")} />
        </div>
    );
};

export default LineGraph4th;
