import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './MixedArithmetic5th.module.css';

const MixedArithmetic5th = () => {
    const [mode, setMode] = useState('learn');
    const [quizData, setQuizData] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [userSteps, setUserSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    // 혼합 계산 규칙: () 안 -> ×, ÷ -> +, -
    const generateProblem = () => {
        const types = ['plus_minus_multi', 'plus_minus_div', 'all_mixed', 'with_brackets'];
        const type = types[Math.floor(Math.random() * types.length)];

        let expression = '';
        let answer = 0;
        let explanation = [];

        const n1 = Math.floor(Math.random() * 20) + 10;
        const n2 = Math.floor(Math.random() * 10) + 2;
        const n3 = Math.floor(Math.random() * 5) + 2;

        if (type === 'plus_minus_multi') {
            // n1 + n2 * n3
            expression = `${n1} + ${n2} × ${n3}`;
            answer = n1 + n2 * n3;
            explanation = [
                { step: 1, text: `먼저 곱셈(${n2} × ${n3})을 계산해요.`, result: n2 * n3 },
                { step: 2, text: `그 다음 덧셈(${n1} + ${n2 * n3})을 계산해요.`, result: answer }
            ];
        } else if (type === 'plus_minus_div') {
            // n1 - (n2 * n3) / n3 -> n1 - n2
            const multi = n2 * n3;
            expression = `${n1} - ${multi} ÷ ${n3}`;
            answer = n1 - n2;
            explanation = [
                { step: 1, text: `먼저 나눗셈(${multi} ÷ ${n3})을 계산해요.`, result: n2 },
                { step: 2, text: `그 다음 뺄셈(${n1} - ${n2})을 계산해요.`, result: answer }
            ];
        } else if (type === 'with_brackets') {
            // (n1 + n2) * n3
            expression = `(${n1} + ${n2}) × ${n3}`;
            answer = (n1 + n2) * n3;
            explanation = [
                { step: 1, text: `괄호 안(${n1} + ${n2})을 먼저 계산해요.`, result: n1 + n2 },
                { step: 2, text: `그 다음 곱셈(${n1 + n2} × ${n3})을 계산해요.`, result: answer }
            ];
        } else {
            // n1 * n2 - n3
            expression = `${n1} × ${n2} - ${n3}`;
            answer = n1 * n2 - n3;
            explanation = [
                { step: 1, text: `곱셈(${n1} × ${n2})을 먼저 계산해요.`, result: n1 * n2 },
                { step: 2, text: `그 다음 뺄셈(${n1 * n2} - ${n3})을 계산해요.`, result: answer }
            ];
        }

        setQuizData({ expression, answer, explanation });
        setFeedback(null);
        setUserSteps([]);
        setCurrentStep(0);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateProblem();
    }, [mode]);

    const checkAnswer = (val) => {
        if (parseInt(val) === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(5);
            setTimeout(generateProblem, 3000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('learn')} variant={mode === 'learn' ? 'primary' : 'secondary'} size="large">📖 계산 순서 배우기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 실전 연습</Button>
            </div>

            {mode === 'learn' ? (
                <div className={styles.learnContent}>
                    <h1 className={styles.title}>계산의 순서 약속 🤝</h1>
                    <div className={styles.ruleCard}>
                        <div className={styles.ruleItem}>
                            <span className={styles.ruleNumber}>1</span>
                            <div className={styles.ruleText}>
                                <h3>괄호 ( )가 있으면?</h3>
                                <p>괄호 안을 가장 먼저 계산해요!</p>
                            </div>
                        </div>
                        <div className={styles.ruleItem}>
                            <span className={styles.ruleNumber}>2</span>
                            <div className={styles.ruleText}>
                                <h3>곱셈(×)과 나눗셈(÷)이 있으면?</h3>
                                <p>덧셈이나 뺄셈보다 먼저, <br />그리고 <strong>왼쪽에서부터</strong> 차례대로 계산해요.</p>
                            </div>
                        </div>
                        <div className={styles.ruleItem}>
                            <span className={styles.ruleNumber}>3</span>
                            <div className={styles.ruleText}>
                                <h3>덧셈(+)과 뺄셈(-)은?</h3>
                                <p>가장 나중에, <strong>왼쪽에서부터</strong> 차례대로 계산해요.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.exampleSection}>
                        <h3>예시로 알아보기</h3>
                        <div className={styles.exampleBox}>
                            <div className={styles.exampleExpr}>20 - (5 + 3) × 2</div>
                            <div className={styles.exampleSteps}>
                                <p>① 괄호 안: 5 + 3 = 8</p>
                                <p>② 곱셈: 8 × 2 = 16</p>
                                <p>③ 뺄셈: 20 - 16 = 4</p>
                            </div>
                            <div className={styles.finalAnswer}>정답: 4</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.practiceContent}>
                    <h2 className={styles.title}>계산 순서를 지켜라! ⚖️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <div className={styles.expressionDisplay}>{quizData.expression} = ?</div>

                            <div className={styles.inputArea}>
                                <input
                                    type="number"
                                    className={styles.answerInput}
                                    placeholder="정답 입력"
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer(e.target.value)}
                                />
                                <Button onClick={(e) => checkAnswer(e.currentTarget.previousSibling.value)} variant="primary" size="large">제출</Button>
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={styles.feedbackCorrect}
                                    >
                                        🎉 정답입니다! 계산 순서를 아주 잘 지켰어요!
                                        <div className={styles.explanationBox}>
                                            {quizData.explanation.map((s, i) => (
                                                <p key={i}>Step {s.step}: {s.text} → {s.result}</p>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={styles.feedbackIncorrect}
                                    >
                                        😅 아쉬워요! 계산 순서를 다시 한번 생각해보세요.<br />
                                        (괄호 ➡️ 곱셈/나눗셈 ➡️ 덧셈/뺄셈)
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button onClick={generateProblem} variant="secondary" style={{ marginTop: '20px' }}>다른 문제 풀기</Button>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("자연수의 혼합 계산", "괄호와 사칙연산이 섞인 식의 계산 순서를 배우고 연습합니다.")} />
        </div>
    );
};

export default MixedArithmetic5th;
