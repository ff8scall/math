import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './QuadrilateralExplorer4th.module.css';

const QuadrilateralExplorer4th = () => {
    const [mode, setMode] = useState('explore');
    const [selectedShape, setSelectedShape] = useState('사다리꼴');

    const shapes = {
        '사다리꼴': {
            points: "150,80 350,80 400,220 100,220",
            properties: ["적어도 한 쌍의 변이 평행해요"],
            description: "사다리꼴은 마주 보는 한 쌍의 변이 서로 평행한 사각형이에요."
        },
        '평행사변형': {
            points: "150,80 400,80 350,220 100,220",
            properties: ["두 쌍의 변이 평행해요", "마주 보는 변의 길이가 같아요", "마주 보는 각의 크기가 같아요"],
            description: "마주 보는 두 쌍의 변이 서로 평행한 사각형을 평행사변형이라고 해요."
        },
        '마름모': {
            points: "250,50 400,150 250,250 100,150",
            properties: ["네 변의 길이가 모두 같아요", "마주 보는 두 쌍의 변이 평행해요"],
            description: "네 변의 길이가 모두 같은 사각형을 마름모라고 해요."
        },
        '직사각형': {
            points: "120,80 380,80 380,220 120,220",
            properties: ["네 각이 모두 직각이에요", "마주 보는 두 쌍의 변이 평행해요"],
            description: "네 각이 모두 직각인 사각형을 직사각형이라고 해요."
        },
        '정사각형': {
            points: "130,80 270,80 270,220 130,220",
            properties: ["네 변의 길이가 모두 같아요", "네 각이 모두 직각이에요", "마주 보는 두 쌍의 변이 평행해요"],
            description: "네 변의 길이가 모두 같고 네 각이 모두 직각인 사각형을 정사각형이라고 해요."
        }
    };

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const generateQuiz = () => {
        const shapeNames = Object.keys(shapes);
        const randomShape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
        const questionType = Math.random() > 0.5 ? 'definition' : 'property';

        let question, answer, explanation, choices;

        if (questionType === 'definition') {
            question = `${shapes[randomShape].description.replace("사각형을 " + randomShape + "이라고 해요.", "")} 사각형은 무엇일까요?`;
            answer = randomShape;
            choices = [...shapeNames].sort(() => Math.random() - 0.5);
            explanation = shapes[randomShape].description;
        } else {
            const prop = shapes[randomShape].properties[0];
            question = `"${prop}" 이 성질을 가진 사각형 중 하나는 무엇일까요?`;
            answer = randomShape;
            choices = [...shapeNames].sort(() => Math.random() - 0.5);
            explanation = `${randomShape}은(는) ${prop} 성질을 가지고 있어요.`;
        }

        setQuizData({ question, answer, choices, explanation });
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
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
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 사각형 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h1 className={styles.title}>사각형의 종류 🔳</h1>
                    <p className={styles.subtitle}>여러 가지 사각형의 이름을 알고 성질을 알아봐요.</p>

                    <div className={styles.exploreCard}>
                        <svg width="100%" height="300" viewBox="0 0 500 300" className={styles.svgArea}>
                            <motion.polygon
                                key={selectedShape}
                                points={shapes[selectedShape].points}
                                fill="rgba(63, 81, 181, 0.2)"
                                stroke="#3f51b5"
                                strokeWidth="5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            />
                        </svg>

                        <div className={styles.propertyList}>
                            {shapes[selectedShape].properties.map((prop, i) => (
                                <motion.span
                                    key={i}
                                    className={styles.propertyTag}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    ✨ {prop}
                                </motion.span>
                            ))}
                        </div>

                        <div className={styles.controls}>
                            <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>탐험하고 싶은 사각형을 눌러보세요!</p>
                            <div className={styles.shapeButtons}>
                                {Object.keys(shapes).map(s => (
                                    <Button
                                        key={s}
                                        onClick={() => setSelectedShape(s)}
                                        variant={selectedShape === s ? 'primary' : 'secondary'}
                                        size="medium"
                                    >
                                        {s}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 사각형 공부 비법</h3>
                        <ul>
                            <li>• <strong>평행</strong>: 두 직선을 아무리 늘려도 만나지 않는 것을 평행하다고 해요.</li>
                            <li>• <strong>사다리꼴</strong>: 한 쌍이라도 평행하면 합격!</li>
                            <li>• <strong>정사각형</strong>: 완벽주의자 사각형이에요. 네 변의 길이도 같고 네 각도 모두 직각이어야 하죠.</li>
                            <li>• 포함 관계를 기억하세요! 모든 정사각형은 직사각형이기도 하고 마름모이기도 하답니다.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>사각형 이름 맞히기 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>
                            <div className={styles.choiceGrid}>
                                {quizData.choices.map(choice => (
                                    <button
                                        key={choice}
                                        onClick={() => checkAnswer(choice)}
                                        className={styles.choiceItem}
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! 사각형 박사님!</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 다시 한번 성질을 읽어볼까요?</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("사각형", "사다리꼴, 평행사변형, 마름모, 직사각형, 정사각형의 정의와 성질을 배웁니다.")} />
        </div>
    );
};

export default QuadrilateralExplorer4th;
