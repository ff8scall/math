import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './FactorsMultiples5th.module.css';

const FactorsMultiples5th = () => {
    const [mode, setMode] = useState('factors'); // factors, multiples, quiz
    const [number, setNumber] = useState(12);

    // 계산 로직
    const getFactors = (n) => {
        const factors = [];
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) factors.push(i);
        }
        return factors;
    };

    const getMultiples = (n, count = 10) => {
        const multiples = [];
        for (let i = 1; i <= count; i++) {
            multiples.push(n * i);
        }
        return multiples;
    };

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const generateQuiz = () => {
        const type = Math.random() > 0.5 ? 'factor' : 'multiple';
        const base = Math.floor(Math.random() * 15) + 2;

        if (type === 'factor') {
            const factors = getFactors(base * (Math.floor(Math.random() * 3) + 2));
            const target = base * (Math.floor(Math.random() * 3) + 2);
            const isCorrect = Math.random() > 0.5;
            const choice = isCorrect
                ? factors[Math.floor(Math.random() * factors.length)]
                : factors[factors.length - 1] + 1;

            setQuizData({
                question: `${choice}은(는) ${target}의 약수일까요?`,
                answer: isCorrect ? 'O' : 'X',
                choices: ['O', 'X']
            });
        } else {
            const target = base;
            const isCorrect = Math.random() > 0.5;
            const multiple = isCorrect ? target * (Math.floor(Math.random() * 5) + 1) : target * 5 + 1;

            setQuizData({
                question: `${multiple}은(는) ${target}의 배수일까요?`,
                answer: isCorrect ? 'O' : 'X',
                choices: ['O', 'X']
            });
        }
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'quiz' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = (choice) => {
        if (choice === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(2);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('factors')} variant={mode === 'factors' ? 'primary' : 'secondary'}>🔍 약수 찾기</Button>
                <Button onClick={() => setMode('multiples')} variant={mode === 'multiples' ? 'primary' : 'secondary'}>🚀 배수 찾기</Button>
                <Button onClick={() => setMode('quiz')} variant={mode === 'quiz' ? 'primary' : 'secondary'}>👑 OX 퀴즈</Button>
            </div>

            {mode === 'factors' && (
                <div className={styles.content}>
                    <h1 className={styles.title}>약수 탐험대 🔍</h1>
                    <p className={styles.subtitle}>어떤 수를 나누어 떨어지게 하는 수를 <strong>약수</strong>라고 해요.</p>

                    <div className={styles.inputSection}>
                        <label>숫자를 선택하세요: {number}</label>
                        <input
                            type="range" min="1" max="50" value={number}
                            onChange={(e) => setNumber(parseInt(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.visualArea}>
                        <div className={styles.factorGrid}>
                            {getFactors(number).map(f => (
                                <motion.div
                                    key={f}
                                    className={styles.factorCard}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    {f}
                                </motion.div>
                            ))}
                        </div>
                        <p className={styles.resultText}>{number}의 약수는 총 {getFactors(number).length}개 입니다!</p>
                    </div>
                </div>
            )}

            {mode === 'multiples' && (
                <div className={styles.content}>
                    <h1 className={styles.title}>배수 로켓 🚀</h1>
                    <p className={styles.subtitle}>어떤 수를 1배, 2배, 3배... 한 수를 <strong>배수</strong>라고 해요.</p>

                    <div className={styles.inputSection}>
                        <label>숫자를 선택하세요: {number}</label>
                        <input
                            type="range" min="1" max="20" value={number}
                            onChange={(e) => setNumber(parseInt(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.visualArea}>
                        <div className={styles.multipleList}>
                            {getMultiples(number).map((m, i) => (
                                <motion.div
                                    key={m}
                                    className={styles.multipleItem}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className={styles.multipleIndex}>{i + 1}배</span>
                                    <span className={styles.multipleValue}>{m}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {mode === 'quiz' && (
                <div className={styles.quizContent}>
                    <h2 className={styles.title}>약수와 배수 퀴즈 🏁</h2>
                    {quizData && (
                        <div className={styles.quizCard}>
                            <div className={styles.question}>{quizData.question}</div>
                            <div className={styles.oxButtons}>
                                {quizData.choices.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => checkAnswer(c)}
                                        className={`${styles.oxButton} ${c === 'O' ? styles.oBtn : styles.xBtn}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedbackCorrect}>정답입니다! 🎉</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>다시 생각해보세요! 😅</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.infoBox}>
                <h3>💡 꼭 기억해요!</h3>
                <p>• <strong>1</strong>은 모든 수의 약수예요.</p>
                <p>• 어떤 수의 가장 작은 배수는 <strong>자기 자신</strong>이에요.</p>
                <p>• 약수와 배수는 서로 반대되는 관계가 있어요! (예: 3은 6의 약수, 6은 3의 배수)</p>
            </div>

            <div className={styles.magicNumber}>
                <h3>✨ 우주의 신비: 완전수(Perfect Number)</h3>
                <p>어떤 수의 약수 중에서 자기 자신을 뺀 나머지 약수들을 모두 더했을 때, 다시 자기 자신이 되는 신기한 숫자들이 있어요!</p>
                <div className={styles.magicFormula}>
                    <strong>6</strong>의 약수: 1, 2, 3 ➡️ 1 + 2 + 3 = <strong>6</strong> !
                </div>
                <p>이런 숫자를 '완전수'라고 부르며, 6 다음에는 28이 있답니다. 정말 완벽하죠?</p>
            </div>

            <div className={styles.atomsNumber}>
                <h3>⚛️ 수학의 원자: 소수(Prime Number)</h3>
                <p>수학에도 더 이상 쪼개지지 않는 <strong>'레고 블록'</strong> 같은 숫자들이 있어요. 약수가 1과 자기 자신뿐인 수들이죠!</p>
                <div className={styles.atomList}>
                    2, 3, 5, 7, 11, 13, 17...
                </div>
                <p>우주에 있는 모든 숫자는 이 '소수'들의 곱으로 만들어져 있답니다. 마치 원자가 모여 세상을 만드는 것처럼요!</p>
            </div>

            <JsonLd data={generateCourseSchema("약수와 배수", "약수와 배수의 정의를 배우고 직접 계산해봅니다.")} />
        </div>
    );
};

export default FactorsMultiples5th;
