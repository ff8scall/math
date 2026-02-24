import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './LargeNumbers4th.module.css';

const LargeNumbers4th = () => {
    const [mode, setMode] = useState('explore');
    const [number, setNumber] = useState(10000);
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const units = [
        { label: '일', value: 1, color: '#e3f2fd' },
        { label: '만', value: 10000, color: '#e8f5e9' },
        { label: '억', value: 100000000, color: '#fff3e0' },
        { label: '조', value: 1000000000000, color: '#f3e5f5' }
    ];

    const formatWithCommas = (num) => num.toLocaleString();

    const formatKorean = (num) => {
        if (num === 0) return '0';
        let result = '';
        const units = ['', '만', '억', '조'];
        let unitIdx = 0;
        let temp = num;

        while (temp > 0) {
            let part = temp % 10000;
            if (part > 0) {
                result = part + units[unitIdx] + ' ' + result;
            }
            temp = Math.floor(temp / 10000);
            unitIdx++;
        }
        return result.trim();
    };

    const generateQuiz = () => {
        const types = ['read', 'place-value', 'compare', 'structure'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'read') {
            // 조, 억, 만 단위를 섞어서 생성
            const jo = Math.floor(Math.random() * 5);
            const eok = Math.floor(Math.random() * 900) + 100;
            const man = Math.floor(Math.random() * 9000) + 1000;
            const num = (jo * 1000000000000) + (eok * 100000000) + (man * 10000);

            setQuizData({
                type,
                num,
                question: `${formatWithCommas(num)}을 읽으면 무엇인가요?`,
                answer: formatKorean(num).replace(/ /g, ''),
                explanation: `${formatWithCommas(num)}은 ${formatKorean(num)}입니다.`
            });
        } else if (type === 'place-value') {
            // 특정 자릿수의 숫자가 나타내는 값 찾기
            const baseUnits = [10000, 100000, 1000000, 10000000, 100000000];
            const unit = baseUnits[Math.floor(Math.random() * baseUnits.length)];
            const digit = Math.floor(Math.random() * 9) + 1;
            const num = digit * unit + (Math.floor(Math.random() * (unit / 10)));

            const unitNames = {
                10000: '만', 100000: '십만', 1000000: '백만', 10000000: '천만', 100000000: '억'
            };

            setQuizData({
                type,
                num,
                question: `${formatWithCommas(num)}에서 '${unitNames[unit]}'의 자리 숫자는 무엇인가요?`,
                answer: digit.toString(),
                explanation: `${unitNames[unit]}의 자리에 숫자 ${digit}이 있으므로 값은 ${formatWithCommas(digit * unit)}을 나타냅니다.`
            });
        } else if (type === 'structure') {
            // "1000만이 5개, 1만이 3개인 수는?"
            const eok = Math.floor(Math.random() * 9) + 1;
            const man = Math.floor(Math.random() * 900) + 10;
            const num = (eok * 100000000) + (man * 10000);

            setQuizData({
                type,
                num,
                question: `1억이 ${eok}개, 1만이 ${man}개인 수는 얼마인가요?`,
                answer: num.toString(),
                explanation: `${eok}억 + ${man}만 = ${formatWithCommas(num)}입니다.`
            });
        } else {
            const num1 = (Math.floor(Math.random() * 900) + 100) * 10000;
            const num2 = (Math.floor(Math.random() * 900) + 100) * 10000;
            const bigger = Math.max(num1, num2);
            setQuizData({
                type,
                num1, num2,
                question: `${formatWithCommas(num1)}과 ${formatWithCommas(num2)} 중 더 큰 수는?`,
                answer: bigger.toString(),
                explanation: `자릿수를 비교하면 ${formatWithCommas(bigger)}가 더 큽니다.`
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
        const cleanedUserAns = userAnswer.replace(/ /g, '');
        const isCorrect = cleanedUserAns === quizData.answer || cleanedUserAns === quizData.answer.replace(/만/g, '만 ');

        if (isCorrect) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 큰 수 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>큰 수의 단위를 배워요 🔢</h2>
                    <p className={styles.subtitle}>숫자가 커 가면서 이름이 어떻게 바뀌는지 확인해봐요.</p>

                    <div className={styles.displayBoard}>
                        <motion.div
                            key={number}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={styles.numberDisplay}
                        >
                            <div className={styles.mainNumber}>{formatWithCommas(number)}</div>
                            <div className={styles.koreanRead}>{formatKorean(number)}</div>
                        </motion.div>
                    </div>

                    <div className={styles.unitControls}>
                        {units.map((u) => (
                            <button
                                key={u.label}
                                className={`${styles.unitBtn} ${number >= u.value ? styles.activeUnit : ''}`}
                                onClick={() => setNumber(u.value)}
                                style={{ backgroundColor: u.color }}
                            >
                                <span className={styles.unitLabel}>{u.label}</span>
                                <span className={styles.unitValue}>{formatWithCommas(u.value)}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.actionRow}>
                        <Button onClick={() => setNumber(prev => Math.max(1, prev / 10))} disabled={number <= 1}>÷ 10배 작게</Button>
                        <Button onClick={() => setNumber(prev => prev * 10)} disabled={number >= 1000000000000000}>× 10배 크게</Button>
                    </div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h3>📍 만 (10,000)</h3>
                            <p>1000이 10개인 수예요. 뒤에 0이 4개 붙어요.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>📍 억 (100,000,000)</h3>
                            <p>만이 10000개인 수예요. 0이 8개 붙어요.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>📍 조 (1,000,000,000,000)</h3>
                            <p>억이 10000개인 수예요. 0이 12개나 붙어요!</p>
                        </div>
                        <div className={styles.zeroTheory}>
                            <h3>🛡️ 0의 진짜 역할: 자릿수 수문장</h3>
                            <p>숫자 0은 단순히 '없다'는 뜻만 있는 게 아니에요. 0은 뒤에서 친구들을 든든하게 밀어주어 <strong>숫자의 자리</strong>를 지켜주는 아주 중요한 수문장이에요!</p>
                            <div className={styles.zeroViz}>
                                <span>1</span> ➡️ <span>1</span><strong>0</strong> ➡️ <span>1</span><strong>00</strong>
                            </div>
                            <p>0이 하나 붙을 때마다 숫자는 <strong>10배씩</strong> 강력해진답니다. 0이 없었다면 우리는 큰 수를 절대 쓸 수 없었을 거예요!</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>큰 수 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className={styles.input}
                                placeholder="정답 입력 (예: 일만)"
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
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 다시 한 번 생각해보세요!</motion.div>}
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

            <JsonLd data={generateCourseSchema("큰 수", "만, 억, 조 단위의 큰 수를 읽고 쓰는 법을 배웁니다.")} />
        </div>
    );
};

export default LargeNumbers4th;
