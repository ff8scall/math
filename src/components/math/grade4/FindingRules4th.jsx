import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './FindingRules4th.module.css';

const FindingRules4th = () => {
    const [mode, setMode] = useState('explore');
    const [exploreType, setExploreType] = useState('number'); // 'number', 'shape'
    const [sequence, setSequence] = useState([2, 4, 6, 8]);
    const [revealNext, setRevealNext] = useState(false);
    const [exploreRule, setExploreRule] = useState('');
    const [nextValue, setNextValue] = useState(10);

    // Quiz state
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateSequence = (type) => {
        setRevealNext(false);
        if (type === 'number') {
            const isAdd = Math.random() > 0.5;
            if (isAdd) {
                const start = Math.floor(Math.random() * 20) + 1;
                const diff = Math.floor(Math.random() * 10) + 2;
                const seq = [start, start + diff, start + diff * 2, start + diff * 3];
                setSequence(seq);
                setNextValue(start + diff * 4);
                setExploreRule(`앞의 수에 ${diff}씩 더해지는 규칙이에요!`);
            } else {
                const start = [1, 2, 3][Math.floor(Math.random() * 3)];
                const multi = [2, 3][Math.floor(Math.random() * 2)];
                const seq = [start, start * multi, start * multi * 2, start * multi * 3];
                setSequence(seq);
                setNextValue(start * multi * 4);
                setExploreRule(`앞의 수에 ${multi}배씩 커지는 규칙이에요!`);
            }
        } else {
            const patternType = Math.floor(Math.random() * 2);
            if (patternType === 0) {
                const start = Math.floor(Math.random() * 3) + 1;
                const diff = Math.floor(Math.random() * 2) + 1;
                const seq = [start, start + diff, start + diff * 2, start + diff * 3];
                setSequence(seq);
                setNextValue(start + diff * 4);
                setExploreRule(`모양이 ${diff}개씩 늘어나는 규칙이에요!`);
            } else {
                const start = 1;
                const multi = 2;
                const seq = [start, start * multi, start * multi * 2, start * multi * 3];
                setSequence(seq);
                setNextValue(start * multi * 4);
                setExploreRule(`모양이 ${multi}배씩 늘어나는 규칙이에요!`);
            }
        }
    };

    const generateQuiz = () => {
        const types = ['number-add', 'number-multi', 'shape-count'];
        const type = types[Math.floor(Math.random() * types.length)];

        let question = "";
        let answer = "";
        let explanation = "";
        let displaySeq = [];

        if (type === 'number-add') {
            const start = Math.floor(Math.random() * 50) + 10;
            const diff = Math.floor(Math.random() * 9) + 2;
            displaySeq = [start, start + diff, start + diff * 2, start + diff * 3];
            question = `${displaySeq.join(', ')} ... 다음 빈칸에 알맞은 수는 무엇인가요?`;
            answer = (start + diff * 4).toString();
            explanation = `앞의 수에 ${diff}씩 더해지는 규칙이에요. ${start + diff * 3} + ${diff} = ${answer}가 됩니다.`;
        } else if (type === 'number-multi') {
            const start = [2, 3, 5][Math.floor(Math.random() * 3)];
            const multi = 2;
            displaySeq = [start, start * multi, start * multi * 2, start * multi * 3];
            question = `${displaySeq.join(', ')} ... 다음 빈칸에 알맞은 수는 무엇인가요?`;
            answer = (start * multi * 4).toString();
            explanation = `앞의 수에 ${multi}배씩 커지는 규칙이에요. ${start * multi * 3} × ${multi} = ${answer}가 됩니다.`;
        } else {
            const base = Math.floor(Math.random() * 3) + 1;
            const diff = 2;
            displaySeq = [base, base + diff, base + diff * 2, base + diff * 3];
            question = `모양이 [${displaySeq[0]}개, ${displaySeq[1]}개, ${displaySeq[2]}개...] 순서로 늘어날 때, 5번째 모양은 몇 개일까요?`;
            answer = (base + diff * 4).toString();
            explanation = `모양이 ${diff}개씩 늘어나는 규칙이에요. 4번째가 ${displaySeq[3]}개이므로 5번째는 ${displaySeq[3]} + ${diff} = ${answer}개입니다.`;
        }

        setQuizData({
            displaySeq,
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
        if (mode === 'explore' && exploreRule === '') generateSequence('number');
    }, [mode]);

    const checkAnswer = () => {
        if (userAnswer.trim() === quizData.answer) {
            setFeedback('correct');
            setShowAnswer(true); // 정답 시에도 설명을 보여줌
            confetti();
            updateCoins(15);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 규칙 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 규칙 퀴즈</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>규칙 패턴 탐험하기</h2>
                    <p className={styles.subtitle}>숫자나 모양의 배열에서 어떤 규칙이 숨어있는지 확인하세요.</p>

                    <div className={styles.exploreToggle}>
                        <button
                            onClick={() => { setExploreType('number'); generateSequence('number'); }}
                            className={exploreType === 'number' ? styles.activeType : ''}
                        >
                            숫자 규칙
                        </button>
                        <button
                            onClick={() => { setExploreType('shape'); generateSequence('shape'); }}
                            className={exploreType === 'shape' ? styles.activeType : ''}
                        >
                            모양 규칙
                        </button>
                    </div>

                    <div className={styles.displayBoard}>
                        <div className={styles.sequenceRow}>
                            {sequence.map((item, i) => (
                                <motion.div
                                    key={`${exploreType}-${i}-${item}`}
                                    className={styles.sequenceItem}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {exploreType === 'number' ? (
                                        <div className={styles.numBox}>{item}</div>
                                    ) : (
                                        <div
                                            className={styles.shapeBox}
                                            style={{
                                                gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(item))}, 1fr)`,
                                                gap: item > 10 ? '3px' : '5px'
                                            }}
                                        >
                                            {Array.from({ length: item }).map((_, j) => (
                                                <div
                                                    key={j}
                                                    className={styles.dot}
                                                    style={{
                                                        width: item > 10 ? '12px' : '20px',
                                                        height: item > 10 ? '12px' : '20px'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            <motion.div
                                className={`${styles.sequenceItem} ${styles.nextItem} ${revealNext ? styles.revealed : ''}`}
                                onClick={() => setRevealNext(true)}
                                whileTap={{ scale: 0.95 }}
                            >
                                {revealNext ? (
                                    exploreType === 'number' ? (
                                        <div className={styles.numBox}>{nextValue}</div>
                                    ) : (
                                        <div className={styles.shapeBox} style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(nextValue))}, 1fr)` }}>
                                            {Array.from({ length: nextValue }).map((_, j) => (
                                                <div key={j} className={styles.dot} />
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    "?"
                                )}
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {revealNext && (
                                <motion.div
                                    className={styles.ruleMessage}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✨ {exploreRule}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button onClick={() => generateSequence(exploreType)} size="large">새로운 규칙 보기</Button>

                    <div className={styles.infoCards}>
                        <div className={styles.infoCard}>
                            <h3>덧셈 규칙</h3>
                            <p>일정한 수를 계속 더해서 다음 수가 만들어져요.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>곱셈 규칙</h3>
                            <p>일정한 수를 계속 곱해서 다음 수가 만들어져요.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>배열 규칙</h3>
                            <p>모양이 일정한 방향이나 개수로 늘어나요.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>숨은 규칙 찾기 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
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
                                {feedback === 'incorrect' && <motion.div className={styles.feedbackIncorrect}>😅 앞의 숫자들 사이의 관계를 잘 살펴보세요!</motion.div>}
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
            <JsonLd data={generateCourseSchema("규칙 찾기", "수와 도형의 배열에서 규칙을 발견하고 예측하는 능력을 키웁니다.")} />
        </div>
    );
};

export default FindingRules4th;
