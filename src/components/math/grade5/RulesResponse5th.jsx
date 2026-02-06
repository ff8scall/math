import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './RulesResponse5th.module.css';

const RulesResponse5th = () => {
    const [mode, setMode] = useState('explore'); // explore, quiz
    const [scenario, setScenario] = useState(0);

    const scenarios = [
        {
            title: "🚲 자전거와 바퀴",
            itemA: "자전거 수",
            itemB: "바퀴 수",
            rule: (a) => a * 2,
            unitA: "대",
            unitB: "개",
            description: "자전거 1대마다 바퀴가 2개씩 있어요.",
            formula: "바퀴 수 = 자전거 수 × 2"
        },
        {
            title: "🪑 의자와 다리",
            itemA: "의자 수",
            itemB: "다리 수",
            rule: (a) => a * 4,
            unitA: "개",
            unitB: "개",
            description: "의자 1개마다 다리가 4개씩 있어요.",
            formula: "다리 수 = 의자 수 × 4"
        },
        {
            title: "🍬 사탕 봉지",
            itemA: "봉지 수",
            itemB: "사탕 수",
            rule: (a) => a * 5,
            unitA: "봉지",
            unitB: "개",
            description: "한 봉지에 사탕이 5개씩 들어있어요.",
            formula: "사탕 수 = 봉지 수 × 5"
        }
    ];

    const currentScenario = scenarios[scenario];

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const s = scenarios[Math.floor(Math.random() * scenarios.length)];
        const inputVal = Math.floor(Math.random() * 9) + 2;
        const target = Math.random() > 0.5 ? 'B' : 'A';

        let question, answer;
        if (target === 'B') {
            question = `${s.itemA}가 ${inputVal}${s.unitA}일 때, ${s.itemB}는 몇 ${s.unitB}일까요?`;
            answer = s.rule(inputVal).toString();
        } else {
            const outputVal = s.rule(inputVal);
            question = `${s.itemB}가 ${outputVal}${s.unitB}일 때, ${s.itemA}는 몇 ${s.unitA}일까요?`;
            answer = inputVal.toString();
        }

        setQuizData({ question, answer, s });
        setUserAnswer('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'quiz' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (userAnswer === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(3);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 대응 관계 찾기</Button>
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'}>✏️ 규칙 퀴즈</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.exploreContent}>
                    <h1 className={styles.title}>규칙과 대응 ↔️</h1>
                    <div className={styles.scenarioSelector}>
                        {scenarios.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setScenario(i)}
                                className={`${styles.scenarioBtn} ${scenario === i ? styles.active : ''}`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>

                    <div className={styles.visualizer}>
                        <div className={styles.tableArea}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>{currentScenario.itemA}({currentScenario.unitA})</th>
                                        {[1, 2, 3, 4, 5].map(v => <td key={v}>{v}</td>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>{currentScenario.itemB}({currentScenario.unitB})</th>
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <motion.td
                                                key={v}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: v * 0.1 }}
                                            >
                                                {currentScenario.rule(v)}
                                            </motion.td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.formulaCard}>
                            <h3>💡 발견한 규칙</h3>
                            <p className={styles.description}>{currentScenario.description}</p>
                            <div className={styles.formulaHighlight}>{currentScenario.formula}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.quizContent}>
                    <h2 className={styles.title}>규칙을 맞춰봐요! 🏁</h2>
                    {quizData && (
                        <div className={styles.quizCard}>
                            <div className={styles.quizIcon}>{quizData.s.title.split(' ')[0]}</div>
                            <h3 className={styles.question}>{quizData.question}</h3>
                            <div className={styles.inputGroup}>
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="정답"
                                    className={styles.input}
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                />
                                <Button onClick={checkAnswer} variant="primary">확인</Button>
                            </div>
                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackC}>🎉 정답입니다!</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackI}>😅 다시 계산해 볼까요?</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.infoBox}>
                <h3>📝 대응 관계란?</h3>
                <p>한 양이 변할 때 다른 양이 그에 따라 일정하게 변하는 관계를 말해요.</p>
                <p>대응 관계를 알면 기호(□, △ 등)를 사용하여 식을 만들 수 있어요!</p>
            </div>

            <div className={styles.deepInsight}>
                <h3>🧐 마법의 규칙 기계 (Function Machine)</h3>
                <p>수학은 사실 <strong>'규칙 기계'</strong>와 같아요. 어떤 숫자를 집어넣었을 때, 기계 안의 규칙에 따라 결과가 튀어나오죠!</p>
                <div className={styles.machineViz}>
                    <div className={styles.mPart}>입력 (X) ➡️ [ × 바퀴 수 ] ➡️ 출력 (Y)</div>
                    <p className={styles.mDesc}>내가 1을 넣으면 2가 나오고, 10을 넣으면 20이 나와요. <br />이 마법 같은 규칙이 바로 수학의 힘이랍니다!</p>
                </div>
            </div>

            <JsonLd data={generateCourseSchema("규칙과 대응", "두 양 사이의 관계를 파악하고 식으로 나타내는 방법을 배웁니다.")} />
        </div>
    );
};

export default RulesResponse5th;
