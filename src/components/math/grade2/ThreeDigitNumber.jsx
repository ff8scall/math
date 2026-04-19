import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './ThreeDigitNumber.module.css';

const ThreeDigitNumber = () => {
    const [mode, setMode] = useState('explore');
    const [hundreds, setHundreds] = useState(2);
    const [tens, setTens] = useState(3);
    const [ones, setOnes] = useState(5);

    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentNumber = hundreds * 100 + tens * 10 + ones;

    const generateQuiz = () => {
        const types = ['read', 'place-value', 'compare', 'compose'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'read') {
            const num = Math.floor(Math.random() * 900) + 100;
            setQuizData({
                type,
                question: `${num}을 읽으면?`,
                number: num,
                choices: [
                    (Math.floor(num / 100) * 100 + Math.floor((num % 100) / 10) * 10 + num % 10).toString(),
                    '이백삼십오', '삼백사십이', '사백오십육'
                ].filter((_, i) => i === 0 || Math.random() > 0.3).slice(0, 4),
                answer: num.toString(),
                explanation: `${num}은 백의 자리가 ${Math.floor(num / 100)}, 십의 자리가 ${Math.floor((num % 100) / 10)}, 일의 자리가 ${num % 10}이에요.`
            });
        } else if (type === 'place-value') {
            const num = Math.floor(Math.random() * 900) + 100;
            const digit = ['hundreds', 'tens', 'ones'][Math.floor(Math.random() * 3)];
            let answer, digitName;
            if (digit === 'hundreds') {
                answer = Math.floor(num / 100);
                digitName = '백의 자리';
            } else if (digit === 'tens') {
                answer = Math.floor((num % 100) / 10);
                digitName = '십의 자리';
            } else {
                answer = num % 10;
                digitName = '일의 자리';
            }
            setQuizData({
                type,
                question: `${num}에서 ${digitName} 숫자는?`,
                number: num,
                answer,
                explanation: `${num}의 ${digitName}는 ${answer}예요.`
            });
        } else if (type === 'compare') {
            const num1 = Math.floor(Math.random() * 900) + 100;
            const num2 = Math.floor(Math.random() * 900) + 100;
            setQuizData({
                type,
                question: `${num1}과 ${num2} 중 더 큰 수는?`,
                num1, num2,
                choices: [num1, num2],
                answer: Math.max(num1, num2),
                explanation: `${Math.max(num1, num2)}가 더 커요.`
            });
        } else {
            const h = Math.floor(Math.random() * 9) + 1;
            const t = Math.floor(Math.random() * 10);
            const o = Math.floor(Math.random() * 10);
            setQuizData({
                type,
                question: `백 ${h}개, 십 ${t}개, 일 ${o}개는?`,
                answer: h * 100 + t * 10 + o,
                explanation: `백 ${h}개 = ${h * 100}, 십 ${t}개 = ${t * 10}, 일 ${o}개 = ${o}이므로 ${h * 100 + t * 10 + o}예요.`
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
        const isCorrect = quizData.type === 'compare'
            ? parseInt(userAnswer) === quizData.answer
            : parseInt(userAnswer) === quizData.answer;

        if (isCorrect) {
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
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">
                    🔍 탐험하기
                </Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">
                    ✏️ 문제 풀기
                </Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>세 자리 수의 원리</h2>
                    <p className={styles.subtitle}>백, 십, 일을 배워봐요!</p>

                    <div className={styles.numberDisplay}>
                        <span className={styles.bigNumber}>{currentNumber}</span>
                    </div>

                    <div className={styles.placeValues}>
                        <div className={styles.placeValue}>
                            <div className={styles.placeLabel}>백</div>
                            <div className={styles.blocks}>
                                {Array(hundreds).fill(null).map((_, i) => (
                                    <motion.div key={i} className={styles.hundredBlock} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        <div className={styles.grid10x10}>
                                            {Array(100).fill('·').map((dot, j) => <span key={j}>{dot}</span>)}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className={styles.controls}>
                                <button onClick={() => setHundreds(Math.max(0, hundreds - 1))}>-</button>
                                <span>{hundreds}</span>
                                <button onClick={() => setHundreds(Math.min(9, hundreds + 1))}>+</button>
                            </div>
                        </div>

                        <div className={styles.placeValue}>
                            <div className={styles.placeLabel}>십</div>
                            <div className={styles.blocks}>
                                {Array(tens).fill(null).map((_, i) => (
                                    <motion.div key={i} className={styles.tenBlock} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        {Array(10).fill('·').map((dot, j) => <span key={j}>{dot}</span>)}
                                    </motion.div>
                                ))}
                            </div>
                            <div className={styles.controls}>
                                <button onClick={() => setTens(Math.max(0, tens - 1))}>-</button>
                                <span>{tens}</span>
                                <button onClick={() => setTens(Math.min(9, tens + 1))}>+</button>
                            </div>
                        </div>

                        <div className={styles.placeValue}>
                            <div className={styles.placeLabel}>일</div>
                            <div className={styles.blocks}>
                                {Array(ones).fill(null).map((_, i) => (
                                    <motion.span key={i} className={styles.oneBlock} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        ●
                                    </motion.span>
                                ))}
                            </div>
                            <div className={styles.controls}>
                                <button onClick={() => setOnes(Math.max(0, ones - 1))}>-</button>
                                <span>{ones}</span>
                                <button onClick={() => setOnes(Math.min(9, ones + 1))}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 자릿값 알기</h3>
                        <p>• <strong>백의 자리</strong>: 100이 몇 개</p>
                        <p>• <strong>십의 자리</strong>: 10이 몇 개</p>
                        <p>• <strong>일의 자리</strong>: 1이 몇 개</p>
                        <p>예) 235 = 백 2개 + 십 3개 + 일 5개</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>세 자리 수 문제 풀기</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.choices ? (
                                <div className={styles.choiceButtons}>
                                    {quizData.choices.map(choice => (
                                        <button
                                            key={choice}
                                            className={`${styles.choiceBtn} ${userAnswer == choice ? styles.selected : ''}`}
                                            onClick={() => setUserAnswer(choice.toString())}
                                            disabled={feedback === 'correct' || showAnswer}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="답 입력"
                                    disabled={feedback === 'correct' || showAnswer}
                                    className={styles.input}
                                />
                            )}

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

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>🎉 정답! (+10 코인)</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 시도!</motion.div>}
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

            <JsonLd data={generateCourseSchema("세 자리 수", "백, 십, 일의 자릿값을 배우고 세 자리 수를 읽고 씁니다.")} />
        </div>
    );
};

export default ThreeDigitNumber;
