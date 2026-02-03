import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './NumberCounting.module.css';

const NumberCounting = () => {
    const [mode, setMode] = useState('explore');

    // 탐험 모드 상태
    const [count, setCount] = useState(5);
    const [selectedItem, setSelectedItem] = useState('🍎'); // 사과, 공, 별 등

    // 연습 모드 상태
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const items = ['🍎', '⚽', '⭐', '🎈', '🍌', '🚗', '🐶', '🌸'];

    const generateQuiz = () => {
        const problemTypes = ['counting', 'comparison', 'sequence'];
        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        if (type === 'counting') {
            const count = Math.floor(Math.random() * 9) + 1;
            const item = items[Math.floor(Math.random() * items.length)];
            setQuizData({
                type,
                question: `${item}가 몇 개인가요?`,
                answer: count,
                items: Array(count).fill(item),
                explanation: `하나씩 세어보면 ${count}개예요.`
            });
        } else if (type === 'comparison') {
            const num1 = Math.floor(Math.random() * 8) + 1;
            const num2 = Math.floor(Math.random() * 8) + 1;
            const bigger = Math.max(num1, num2);
            setQuizData({
                type,
                question: `${num1}과 ${num2} 중에서 더 큰 수는?`,
                answer: bigger,
                explanation: `${num1}과 ${num2}를 비교하면 ${bigger}가 더 커요.`
            });
        } else {
            const start = Math.floor(Math.random() * 5) + 1;
            const missing = start + 2;
            setQuizData({
                type,
                question: `빈칸에 들어갈 수는? ${start}, ${start + 1}, ?, ${start + 3}`,
                answer: missing,
                explanation: `순서대로 세면 ${start}, ${start + 1}, ${missing}, ${start + 3}이에요.`
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
        if (parseInt(userAnswer) === quizData.answer) {
            setFeedback('correct');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
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
            {/* 모드 전환 탭 */}
            <div className={styles.modeTabs}>
                <Button
                    onClick={() => setMode('explore')}
                    variant={mode === 'explore' ? 'primary' : 'secondary'}
                    size="large"
                >
                    🔍 수 탐험하기
                </Button>
                <Button
                    onClick={() => setMode('practice')}
                    variant={mode === 'practice' ? 'primary' : 'secondary'}
                    size="large"
                >
                    ✏️ 문제 풀기
                </Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>9까지의 수 세기 🔢</h2>
                    <p className={styles.subtitle}>물건을 추가하거나 빼면서 수를 세어봐요!</p>

                    {/* 아이템 선택 */}
                    <div className={styles.itemSelector}>
                        {items.map(item => (
                            <button
                                key={item}
                                className={`${styles.itemBtn} ${selectedItem === item ? styles.selected : ''}`}
                                onClick={() => setSelectedItem(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* 숫자 표시 */}
                    <div className={styles.countDisplay}>
                        <span className={styles.bigNumber}>{count}</span>
                    </div>

                    {/* 시각적 요소 - 아이템 그리드 */}
                    <div className={styles.itemGrid}>
                        <AnimatePresence>
                            {Array(count).fill(null).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className={styles.item}
                                >
                                    {selectedItem}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* 컨트롤 버튼 */}
                    <div className={styles.controls}>
                        <Button
                            onClick={() => setCount(Math.max(0, count - 1))}
                            size="large"
                            disabled={count === 0}
                        >
                            ➖ 하나 빼기
                        </Button>
                        <Button
                            onClick={() => setCount(Math.min(9, count + 1))}
                            size="large"
                            disabled={count === 9}
                        >
                            ➕ 하나 추가
                        </Button>
                    </div>

                    {/* 수직선 */}
                    <div className={styles.numberLine}>
                        <div className={styles.lineContainer}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                <div key={num} className={styles.numberPoint}>
                                    <div
                                        className={`${styles.dot} ${num === count ? styles.active : ''}`}
                                        onClick={() => setCount(num)}
                                    />
                                    <span className={styles.numberLabel}>{num}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <ul>
                            <li>숫자는 <strong>0부터 9까지</strong> 있어요.</li>
                            <li>하나씩 세면서 <strong>순서</strong>를 익혀요.</li>
                            <li>큰 수는 작은 수보다 <strong>오른쪽</strong>에 있어요.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>수 세기 문제 풀기 ✏️</h2>

                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {/* 시각적 요소 (counting 타입만) */}
                            {quizData.type === 'counting' && (
                                <div className={styles.quizItemGrid}>
                                    {quizData.items.map((item, i) => (
                                        <span key={i} className={styles.quizItem}>{item}</span>
                                    ))}
                                </div>
                            )}

                            {/* 답 입력 */}
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="숫자를 입력하세요"
                                onKeyDown={(e) => e.key === 'Enter' && !showAnswer && !feedback && checkAnswer()}
                                disabled={feedback === 'correct' || showAnswer}
                                className={styles.input}
                                min="0"
                                max="9"
                            />

                            {/* 버튼 */}
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

                            {/* 피드백 */}
                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div
                                        className={styles.feedbackCorrect}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        🎉 정답입니다! 잘했어요! (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div
                                        className={styles.feedbackIncorrect}
                                        initial={{ x: -10 }}
                                        animate={{ x: [0, -10, 10, -10, 10, 0] }}
                                    >
                                        😅 다시 생각해보세요!
                                    </motion.div>
                                )}
                                {showAnswer && (
                                    <motion.div
                                        className={styles.feedbackAnswer}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
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

            <JsonLd data={generateCourseSchema("9까지의 수", "1부터 9까지의 수를 세고 비교하며 순서를 익힙니다.")} />
        </div>
    );
};

export default NumberCounting;
