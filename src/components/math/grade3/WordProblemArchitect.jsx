import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './WordProblemArchitect.module.css';
import confetti from 'canvas-confetti';

const WordProblemArchitect = () => {
    const problems = [
        { id: 1, text: "민수가 초콜릿을 15개 가지고 있습니다. 3명의 친구들에게 똑같이 나누어 준다면, 한 명당 몇 개씩 가질 수 있을까요?", numbers: [15, 3], op: "÷", ans: 5 },
        { id: 2, text: "어항에 물고기가 8마리 살고 있습니다. 오늘 4마리를 더 사와서 넣었다면, 어항에는 모두 몇 마리의 물고기가 있을까요?", numbers: [8, 4], op: "+", ans: 12 },
        { id: 3, text: "사과가 24개 있습니다. 한 봉지에 6개씩 담는다면, 모두 몇 봉지가 필요할까요?", numbers: [24, 6], op: "÷", ans: 4 }
    ];

    const [currentIdx, setCurrentIdx] = useState(0);
    const [extracted, setExtracted] = useState([]);
    const [equation, setEquation] = useState([]);
    const [feedback, setFeedback] = useState(null);

    const problem = problems[currentIdx];

    const handleWordClick = (word) => {
        const num = parseInt(word.replace(/[^0-9]/g, ''));
        if (!isNaN(num) && !extracted.includes(num)) {
            setExtracted([...extracted, num]);
        }
    };

    const addToEquation = (val) => {
        setEquation([...equation, val]);
        setFeedback(null);
    };

    const clearEquation = () => {
        setEquation([]);
        setFeedback(null);
    };

    const checkEquation = () => {
        // Simple check: check if equation looks like [num, op, num, '=', ans]
        // or just the value check for grade 3
        const eqString = equation.join('');
        const expected = `${problem.numbers[0]}${problem.op}${problem.numbers[1]}`;
        const reverseExpected = `${problem.numbers[1]}${problem.op}${problem.numbers[0]}`;

        const isCorrect = (eqString.includes(expected) || (problem.op === '+' && eqString.includes(reverseExpected)));

        if (isCorrect) {
            setFeedback('correct');
            confetti();
        } else {
            setFeedback('incorrect');
        }
    };

    const nextProblem = () => {
        setCurrentIdx((currentIdx + 1) % problems.length);
        setExtracted([]);
        setEquation([]);
        setFeedback(null);
    };

    return (
        <div className={styles.container}>
            <PageHeader title="문장제 설계소" grade="3" />

            <div className={styles.workspace}>
                <section className={styles.problemBox}>
                    {problem.text.split(' ').map((word, i) => (
                        <span 
                            key={i} 
                            className={styles.clickableWord}
                            onClick={() => handleWordClick(word)}
                        >
                            {word}{' '}
                        </span>
                    ))}
                    <p style={{ fontSize: '0.9rem', color: '#f87171', marginTop: '1rem' }}>
                        💡 문제 속의 <strong>숫자</strong>를 클릭해서 아래로 가져오세요!
                    </p>
                </section>

                <section>
                    <span className={styles.label}>📥 발견한 정보 (단서)</span>
                    <div className={styles.extractedData}>
                        {extracted.map((num, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.dataBlock}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => addToEquation(num)}
                            >
                                {num}
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className={styles.builderArea}>
                    <span className={styles.label}>🏗️ 수학 식 세우기</span>
                    <div className={styles.dropZone}>
                        {equation.length === 0 && <span style={{ color: '#94a3b8' }}>위의 숫자와 아래 기호를 클릭해 식을 완성하세요</span>}
                        {equation.map((item, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                className={typeof item === 'number' ? styles.dataBlock : styles.opBlock}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>

                    <div className={styles.operatorTray}>
                        {['+', '-', '×', '÷', '='].map(op => (
                            <div 
                                key={op} 
                                className={styles.opBlock}
                                onClick={() => addToEquation(op)}
                            >
                                {op}
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.resultSection}>
                    {feedback === 'correct' ? (
                        <div className={styles.feedbackBox}>
                            <h2 className={styles.correct}>🎉 완벽한 설계입니다!</h2>
                            <p>문제의 상황을 정확한 식으로 만들어냈어요.</p>
                            <Button onClick={nextProblem} variant="primary" size="large" style={{ marginTop: '1rem' }}>다음 문제 설계하기</Button>
                        </div>
                    ) : (
                        <>
                            <div className={styles.btnRow} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <Button onClick={clearEquation} variant="secondary">지우기</Button>
                                <Button onClick={checkEquation} variant="primary" disabled={equation.length < 3}>설계 검토</Button>
                            </div>
                            {feedback === 'incorrect' && (
                                <p className={styles.incorrect} style={{ marginTop: '1rem' }}>
                                    앗! 식의 순서나 기호가 맞는지 다시 확인해 볼까요?
                                </p>
                            )}
                        </>
                    )}
                </section>
            </div>

            <JsonLd data={generateCourseSchema("초등 3학년 문장제 해결 전략", "문장으로 된 문제를 분석하여 정보를 추출하고, 이를 수학적 식(Equation)으로 설계하는 능력을 배양합니다.")} />
        </div>
    );
};

export default WordProblemArchitect;
