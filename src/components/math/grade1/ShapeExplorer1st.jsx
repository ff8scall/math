import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './ShapeExplorer1st.module.css';

const ShapeIcon = ({ type, color, size = "100%" }) => {
    const commonProps = {
        width: size,
        height: size,
        viewBox: "0 0 100 100",
        fill: color,
        style: { filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.2))" }
    };

    switch (type) {
        case 'circle':
            return (
                <svg {...commonProps}>
                    <circle cx="50" cy="50" r="45" />
                </svg>
            );
        case 'triangle':
            return (
                <svg {...commonProps}>
                    <polygon points="50,5 95,90 5,90" />
                </svg>
            );
        case 'square':
            return (
                <svg {...commonProps}>
                    <rect x="10" y="10" width="80" height="80" rx="4" ry="4" />
                </svg>
            );
        case 'rectangle':
            return (
                <svg {...commonProps} viewBox="0 0 160 100">
                    <rect x="5" y="25" width="150" height="50" rx="4" ry="4" />
                </svg>
            );
        default:
            return null;
    }
};

const ShapeExplorer1st = () => {
    const [mode, setMode] = useState('explore');

    // 탐험 모드 상태
    const [selectedShape, setSelectedShape] = useState('circle');
    const [placedShapes, setPlacedShapes] = useState([]);

    // 연습 모드 상태
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const shapes = {
        circle: { name: '동그라미', color: '#FF6B6B' },
        triangle: { name: '세모', color: '#4ECDC4' },
        square: { name: '네모', color: '#45B7D1' },
        rectangle: { name: '직사각형', color: '#FFA07A' }
    };

    const realWorldObjects = {
        circle: ['⏰ 시계', '⚽ 공', '🍕 피자', '💿 CD'],
        triangle: ['🔺 표지판', '⛺ 텐트', '🎪 서커스'],
        square: ['🎲 주사위', '📦 상자', '🧊 얼음'],
        rectangle: ['📱 핸드폰', '🚪 문', '📺 TV', '📖 책']
    };

    const generateQuiz = () => {
        const problemTypes = ['identify', 'count', 'match'];
        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        if (type === 'identify') {
            const shapeKeys = Object.keys(shapes);
            const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            setQuizData({
                type,
                question: `이 도형의 이름은 무엇인가요?`,
                shape: shapeKey,
                answer: shapes[shapeKey].name,
                choices: Object.values(shapes).map(s => s.name),
                explanation: `이 도형은 ${shapes[shapeKey].name}예요.`
            });
        } else if (type === 'count') {
            const shapeKeys = Object.keys(shapes);
            const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            const count = Math.floor(Math.random() * 6) + 3; // 3-8개
            setQuizData({
                type,
                question: `${shapes[shapeKey].name}는 몇 개인가요?`,
                shapes: Array(10).fill(null).map(() =>
                    shapeKeys[Math.floor(Math.random() * shapeKeys.length)]
                ).map((sk, i) => i < count ? shapeKey : sk),
                targetShape: shapeKey,
                answer: count,
                explanation: `${shapes[shapeKey].name}를 세어보면 ${count}개예요.`
            });
        } else {
            const shapeKeys = Object.keys(shapes);
            const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            const objects = realWorldObjects[shapeKey];
            const correctObj = objects[Math.floor(Math.random() * objects.length)];

            setQuizData({
                type,
                question: `${shapes[shapeKey].name} 모양을 찾아보세요!`,
                shape: shapeKey,
                options: [
                    correctObj,
                    ...Object.values(realWorldObjects)
                        .filter((_, i) => Object.keys(realWorldObjects)[i] !== shapeKey)
                        .flat()
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 2)
                ].sort(() => 0.5 - Math.random()),
                answer: correctObj,
                explanation: `${correctObj}는 ${shapes[shapeKey].name} 모양이에요.`
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
        let isCorrect = false;

        if (quizData.type === 'count') {
            isCorrect = parseInt(userAnswer) === quizData.answer;
        } else {
            isCorrect = userAnswer === quizData.answer;
        }

        if (isCorrect) {
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

    const addShape = () => {
        if (placedShapes.length < 20) {
            setPlacedShapes([...placedShapes, {
                id: Date.now(),
                type: selectedShape,
                x: Math.random() * 80 + 10,
                y: Math.random() * 70 + 10 // Adjusted for aspect ratio
            }]);
        }
    };

    const clearShapes = () => {
        setPlacedShapes([]);
    };

    return (
        <div className={styles.container}>
            {/* 모드 전환 */}
            <div className={styles.modeTabs}>
                <Button
                    onClick={() => setMode('explore')}
                    variant={mode === 'explore' ? 'primary' : 'secondary'}
                    size="large"
                >
                    🔍 도형 탐험하기
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
                    <h2 className={styles.title}>여러 가지 모양 🔷</h2>
                    <p className={styles.subtitle}>도형을 클릭하고 화면에 배치해보세요!</p>

                    {/* 도형 선택 */}
                    <div className={styles.shapeSelector}>
                        {Object.entries(shapes).map(([key, shape]) => (
                            <button
                                key={key}
                                className={`${styles.shapeBtn} ${selectedShape === key ? styles.selected : ''}`}
                                onClick={() => setSelectedShape(key)}
                                style={{ borderColor: shape.color }}
                            >
                                <div className={styles.shapeIconWrapper}>
                                    <ShapeIcon type={key} color={shape.color} />
                                </div>
                                <div className={styles.shapeName}>{shape.name}</div>
                            </button>
                        ))}
                    </div>

                    {/* 캔버스 */}
                    <div className={styles.canvas}>
                        <AnimatePresence>
                            {placedShapes.map(shape => (
                                <motion.div
                                    key={shape.id}
                                    className={styles.placedShape}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    style={{
                                        left: `${shape.x}%`,
                                        top: `${shape.y}%`,
                                        color: shapes[shape.type].color,
                                        width: shape.type === 'rectangle' ? '120px' : '80px',
                                        height: '80px'
                                    }}
                                >
                                    <ShapeIcon type={shape.type} color={shapes[shape.type].color} />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {placedShapes.length === 0 && (
                            <div className={styles.canvasPlaceholder}>
                                도형을 추가해보세요!
                            </div>
                        )}
                    </div>

                    {/* 컨트롤 */}
                    <div className={styles.controls}>
                        <Button onClick={addShape} size="large" disabled={placedShapes.length >= 20}>
                            ➕ 도형 추가
                        </Button>
                        <Button onClick={clearShapes} variant="secondary" size="large">
                            🗑️ 모두 지우기
                        </Button>
                    </div>

                    {/* 실생활 예시 */}
                    <div className={styles.realWorldBox}>
                        <h3>🏠 우리 주변에서 찾을 수 있는 모양</h3>
                        {Object.entries(realWorldObjects).map(([key, objects]) => (
                            <div key={key} className={styles.realWorldRow}>
                                <span className={styles.realWorldShape} style={{ color: shapes[key].color }}>
                                    <span style={{ display: 'inline-block', width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '8px' }}>
                                        <ShapeIcon type={key} color={shapes[key].color} />
                                    </span>
                                    {shapes[key].name}:
                                </span>
                                <span className={styles.realWorldObjects}>
                                    {objects.join(', ')}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <ul>
                            <li><strong>동그라미</strong>는 둥그런 모양이에요.</li>
                            <li><strong>세모</strong>는 뾰족한 곳이 3개 있어요.</li>
                            <li><strong>네모</strong>는 네 개의 꼭짓점이 있어요.</li>
                            <li><strong>직사각형</strong>은 네모와 비슷하지만 길쭉해요.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>도형 문제 풀기 ✏️</h2>

                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {/* 도형 표시 (identify, match 타입) */}
                            {(quizData.type === 'identify' || quizData.type === 'match') && (
                                <div className={styles.shapeDisplay}>
                                    <div className={styles.bigShape}>
                                        <ShapeIcon type={quizData.shape} color={shapes[quizData.shape].color} />
                                    </div>
                                </div>
                            )}

                            {/* 도형 세기 (count 타입) */}
                            {quizData.type === 'count' && (
                                <div className={styles.countGrid}>
                                    {quizData.shapes.map((shapeKey, i) => (
                                        <div key={i} className={styles.countShape}>
                                            <ShapeIcon type={shapeKey} color={shapes[shapeKey].color} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 답변 입력/선택 */}
                            {quizData.type === 'count' ? (
                                <input
                                    type="number"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="개수 입력"
                                    disabled={feedback === 'correct' || showAnswer}
                                    className={styles.input}
                                    min="0"
                                />
                            ) : (
                                <div className={styles.choiceButtons}>
                                    {(quizData.choices || quizData.options).map(choice => (
                                        <button
                                            key={choice}
                                            className={`${styles.choiceBtn} ${userAnswer === choice ? styles.choiceSelected : ''}`}
                                            onClick={() => setUserAnswer(choice)}
                                            disabled={feedback === 'correct' || showAnswer}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            )}

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
                                    <motion.div className={styles.feedbackCorrect}>
                                        🎉 정답입니다! 잘했어요! (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div className={styles.feedbackIncorrect}>
                                        😅 다시 생각해보세요!
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

            <JsonLd data={generateCourseSchema("여러 가지 모양", "동그라미, 세모, 네모 등 기본 도형을 배우고 실생활에서 찾아봅니다.")} />
        </div>
    );
};

export default ShapeExplorer1st;
