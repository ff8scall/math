import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './SimpleArithmetic1st.module.css';

const SimpleArithmetic1st = () => {
    const [mode, setMode] = useState('explore');
    const [operation, setOperation] = useState('addition'); // 'addition' or 'subtraction'

    // 탐험 모드
    const [beads, setBeads] = useState(5);

    // 연습 모드
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(null);

    const generateQuiz = () => {
        if (operation === 'addition') {
            // Grade 1 covers up to sums of 18 (9+9)
            const num1 = Math.floor(Math.random() * 9) + 1;
            const num2 = Math.floor(Math.random() * 9) + 1;
            const answer = num1 + num2;

            let explanation = `${num1} + ${num2} = ${answer}`;
            if (answer > 10) {
                explanation += ` (10을 먼저 만들고 남은 ${answer - 10}을 더해요!)`;
            }

            setQuizData({
                num1,
                num2,
                operator: '+',
                answer: answer,
                explanation: explanation
            });
        } else {
            // Subtraction starting from up to 18
            const answer = Math.floor(Math.random() * 9) + 1;
            const num2 = Math.floor(Math.random() * 9) + 1;
            const num1 = answer + num2;

            setQuizData({
                num1,
                num2,
                operator: '-',
                answer: answer,
                explanation: `${num1} - ${num2} = ${answer} (${num1}개에서 ${num2}개를 빼면 ${answer}개!)`
            });
        }

        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode, operation]);

    const checkAnswer = () => {
        if (parseInt(userAnswer) === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setFeedback('skipped');
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button
                    onClick={() => setMode('explore')}
                    variant={mode === 'explore' ? 'primary' : 'secondary'}
                    size="large"
                >
                    🔍 탐험하기
                </Button>
                <Button
                    onClick={() => setMode('practice')}
                    variant={mode === 'practice' ? 'primary' : 'secondary'}
                    size="large"
                >
                    ✏️ 문제 풀기
                </Button>
            </div>

            <div className={styles.operationToggle}>
                <Button
                    onClick={() => setOperation('addition')}
                    variant={operation === 'addition' ? 'primary' : 'secondary'}
                >
                    ➕ 덧셈
                </Button>
                <Button
                    onClick={() => setOperation('subtraction')}
                    variant={operation === 'subtraction' ? 'primary' : 'secondary'}
                >
                    ➖ 뺄셈
                </Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>
                        {operation === 'addition' ? '덧셈 배우기 ➕' : '뺄셈 배우기 ➖'}
                    </h2>
                    <p className={styles.subtitle}>
                        {operation === 'addition' ? '구슬을 더해보세요!' : '구슬을 빼보세요!'}
                    </p>

                    <div className={styles.beadDisplay}>
                        <AnimatePresence>
                            {Array(beads).fill(null).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.bead}
                                    initial={{ scale: 0, y: -50 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0, y: 50 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    🔵
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className={styles.countDisplay}>
                        <span className={styles.bigNumber}>{beads}</span>
                    </div>

                    <div className={styles.controls}>
                        <Button
                            onClick={() => setBeads(Math.max(0, beads - 1))}
                            size="large"
                            disabled={beads === 0}
                        >
                            ➖ 1개 빼기
                        </Button>
                        <Button
                            onClick={() => setBeads(Math.min(9, beads + 1))}
                            size="large"
                            disabled={beads === 9}
                        >
                            ➕ 1개 추가
                        </Button>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <ul>
                            {operation === 'addition' ? (
                                <>
                                    <li><strong>덧셈</strong>은 수를 합치는 거예요.</li>
                                    <li>2 + 3 = 5 (2개에 3개를 더하면 5개)</li>
                                    <li>더하면 수가 <strong>커져요</strong>.</li>
                                </>
                            ) : (
                                <>
                                    <li><strong>뺄셈</strong>은 수를 빼는 거예요.</li>
                                    <li>5 - 2 = 3 (5개에서 2개를 빼면 3개)</li>
                                    <li>빼면 수가 <strong>작아져요</strong>.</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>
                        {operation === 'addition' ? '덧셈 문제 ➕' : '뺄셈 문제 ➖'}
                    </h2>

                    {quizData && (
                        <div className={styles.problemCard}>
                            <div className={styles.visualProblem}>
                                <div className={styles.beadRow}>
                                    {Array(quizData.num1).fill(null).map((_, i) => (
                                        <span key={i} className={styles.smallBead}>🔵</span>
                                    ))}
                                </div>
                                <div className={styles.operator}>{quizData.operator}</div>
                                <div className={styles.beadRow}>
                                    {Array(quizData.num2).fill(null).map((_, i) => (
                                        <span key={i} className={styles.smallBead}>🔴</span>
                                    ))}
                                </div>
                                <div className={styles.equals}>=</div>
                                <div className={styles.questionMark}>?</div>
                            </div>

                            <div className={styles.problemText}>
                                {quizData.num1} {quizData.operator} {quizData.num2} = ?
                            </div>

                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="답 입력"
                                onKeyDown={(e) => e.key === 'Enter' && !showAnswer && !feedback && checkAnswer()}
                                disabled={feedback === 'correct' || showAnswer}
                                className={styles.input}
                                min="0"
                                max="9"
                            />

                            <div className={styles.buttons}>
                                <Button
                                    onClick={checkAnswer}
                                    disabled={feedback === 'correct' || showAnswer || !userAnswer}
                                    fullWidth
                                    size="large"
                                    variant="primary"
                                >
                                    제출하기
                                </Button>
                                {!showAnswer && feedback !== 'correct' && (
                                    <Button
                                        onClick={handleShowAnswer}
                                        variant="ghost"
                                        fullWidth
                                        size="medium"
                                    >
                                        💡 잘 모르겠어요
                                    </Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div className={styles.feedbackCorrect}>
                                        🎉 정답입니다! (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div className={styles.feedbackIncorrect}>
                                        😅 다시 해보세요!
                                    </motion.div>
                                )}
                                {showAnswer && (
                                    <motion.div className={styles.feedbackAnswer}>
                                        <div className={styles.answerBox}>
                                            <p className={styles.answerText}>
                                                <strong>정답:</strong> {quizData.answer}
                                            </p>
                                            <p className={styles.explanation}>{quizData.explanation}</p>
                                        </div>
                                        <Button onClick={generateQuiz} size="large">다음 문제</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("덧셈과 뺄셈", "한 자리 수의 덧셈과 뺄셈을 배웁니다.")} />
        </div>
    );
};

export default SimpleArithmetic1st;
