import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './TwoDigitArithmetic.module.css';

const TwoDigitArithmetic = () => {
    const [mode, setMode] = useState('explore');
    const [operation, setOperation] = useState('addition');
    const [num1, setNum1] = useState(23);
    const [num2, setNum2] = useState(15);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const calculate = () => operation === 'addition' ? num1 + num2 : num1 - num2;

    const generateQuiz = () => {
        if (operation === 'addition') {
            const a = Math.floor(Math.random() * 40) + 10;
            const b = Math.floor(Math.random() * 40) + 10;
            setQuizData({
                num1: a, num2: b, op: '+', answer: a + b,
                explanation: `${a} + ${b} = ${a + b}`
            });
        } else {
            const a = Math.floor(Math.random() * 40) + 30;
            const b = Math.floor(Math.random() * 20) + 10;
            setQuizData({
                num1: a, num2: b, op: '-', answer: a - b,
                explanation: `${a} - ${b} = ${a - b}`
            });
        }
        setUserAnswer(''); setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => { if (mode === 'practice' && !quizData) generateQuiz(); }, [mode, operation]);

    const checkAnswer = () => {
        if (parseInt(userAnswer) === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제</Button>
            </div>
            <div className={styles.opToggle}>
                <Button onClick={() => setOperation('addition')} variant={operation === 'addition' ? 'primary' : 'secondary'}>➕ 덧셈</Button>
                <Button onClick={() => setOperation('subtraction')} variant={operation === 'subtraction' ? 'primary' : 'secondary'}>➖ 뺄셈</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>{operation === 'addition' ? '두 자리 수 덧셈' : '두 자리 수 뺄셈'}</h2>
                    <div className={styles.calculation}>
                        <div className={styles.number}>{num1}</div>
                        <div className={styles.operator}>{operation === 'addition' ? '+' : '-'}</div>
                        <div className={styles.number}>{num2}</div>
                        <div className={styles.equals}>=</div>
                        <div className={styles.result}>{calculate()}</div>
                    </div>
                    <div className={styles.controls}>
                        <div><label>첫 번째 수:</label><input type="number" value={num1} onChange={(e) => setNum1(parseInt(e.target.value) || 0)} min="10" max="99" /></div>
                        <div><label>두 번째 수:</label><input type="number" value={num2} onChange={(e) => setNum2(parseInt(e.target.value) || 0)} min="10" max="99" /></div>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <div className={styles.problem}>{quizData.num1} {quizData.op} {quizData.num2} = ?</div>
                            <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="답 입력" disabled={feedback === 'correct' || showAnswer} className={styles.input} />
                            <div className={styles.buttons}>
                                <div className={styles.buttons}>
                                    <Button
                                        onClick={checkAnswer}
                                        disabled={!userAnswer || feedback === 'correct' || showAnswer}
                                        fullWidth
                                        size="large"
                                        variant="primary"
                                    >
                                        제출하기
                                    </Button>
                                    {!showAnswer && feedback !== 'correct' && (
                                        <Button
                                            onClick={() => { setShowAnswer(true); setFeedback('skipped'); }}
                                            variant="ghost"
                                            fullWidth
                                            size="medium"
                                        >
                                            💡 잘 모르겠어요
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답! (+10 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시!</motion.div>}
                                {showAnswer && <motion.div className={styles.feedbackAnswer}><div className={styles.answerBox}><p><strong>정답:</strong> {quizData.answer}</p><p>{quizData.explanation}</p></div><Button onClick={generateQuiz} size="large">다음</Button></motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("두 자리 수 덧셈과 뺄셈", "두 자리 수의 덧셈과 뺄셈을 연습합니다.")} />
        </div>
    );
};

export default TwoDigitArithmetic;
