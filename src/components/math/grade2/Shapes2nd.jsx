import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import PageHeader from '../../common/PageHeader';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './Shapes2nd.module.css';

const Shapes2nd = () => {
    const [mode, setMode] = useState('explore');
    const [selectedShape, setSelectedShape] = useState('triangle');
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const shapes = {
        triangle: { name: '삼각형', sides: 3, vertices: 3, color: '#FF6B6B', svg: 'M50,10 L90,90 L10,90 Z', vertexPoints: [[50, 10], [90, 90], [10, 90]] },
        rectangle: { name: '직사각형', sides: 4, vertices: 4, color: '#4ECDC4', svg: 'M20,30 L80,30 L80,70 L20,70 Z', vertexPoints: [[20, 30], [80, 30], [80, 70], [20, 70]] },
        square: { name: '정사각형', sides: 4, vertices: 4, color: '#95E1D3', svg: 'M25,25 L75,25 L75,75 L25,75 Z', vertexPoints: [[25, 25], [75, 25], [75, 75], [25, 75]] },
        pentagon: { name: '오각형', sides: 5, vertices: 5, color: '#FFA07A', svg: 'M50,10 L85,35 L70,75 L30,75 L15,35 Z', vertexPoints: [[50, 10], [85, 35], [70, 75], [30, 75], [15, 35]] },
        hexagon: { name: '육각형', sides: 6, vertices: 6, color: '#F9CA24', svg: 'M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z', vertexPoints: [[50, 10], [80, 30], [80, 70], [50, 90], [20, 70], [20, 30]] }
    };

    const generateQuiz = () => {
        const types = ['identify', 'count-sides', 'count-vertices', 'classify'];
        const type = types[Math.floor(Math.random() * types.length)];
        const shapeKeys = Object.keys(shapes);

        if (type === 'identify') {
            const key = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            setQuizData({
                type, question: '이 도형의 이름은?', shapeKey: key,
                choices: shapeKeys.map(k => shapes[k].name).sort(() => 0.5 - Math.random()).slice(0, 3),
                answer: shapes[key].name, explanation: `이 도형은 ${shapes[key].name}이에요.`
            });
        } else if (type === 'count-sides') {
            const key = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            setQuizData({
                type, question: `${shapes[key].name}의 변은 몇 개인가요?`, shapeKey: key,
                answer: shapes[key].sides, explanation: `${shapes[key].name}은 변이 ${shapes[key].sides}개예요.`
            });
        } else if (type === 'count-vertices') {
            const key = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            setQuizData({
                type, question: `${shapes[key].name}의 꼭짓점은 몇 개인가요?`, shapeKey: key,
                answer: shapes[key].vertices, explanation: `${shapes[key].name}은 꼭짓점이 ${shapes[key].vertices}개예요.`
            });
        } else {
            const sides = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
            const matching = shapeKeys.filter(k => shapes[k].sides === sides);
            setQuizData({
                type, question: `변이 ${sides}개인 도형을 모두 고르세요.`, sides,
                choices: shapeKeys.map(k => shapes[k].name),
                answer: matching.map(k => shapes[k].name),
                explanation: `변이 ${sides}개인 도형은 ${matching.map(k => shapes[k].name).join(', ')}예요.`
            });
        }
        setUserAnswer(''); setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => { if (mode === 'practice' && !quizData) generateQuiz(); }, [mode]);

    const checkAnswer = () => {
        const isCorrect = Array.isArray(quizData.answer)
            ? quizData.answer.includes(userAnswer)
            : (quizData.choices ? userAnswer === quizData.answer : parseInt(userAnswer) === quizData.answer);

        if (isCorrect) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="여러 가지 도형 (삼각형, 사각형)" grade="2" />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 탐험하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <p className={styles.subtitle}>도형의 변과 꼭짓점을 배워봐요!</p>

                    <div className={styles.shapeSelector}>
                        {Object.entries(shapes).map(([key, shape]) => (
                            <button key={key} className={`${styles.shapeBtn} ${selectedShape === key ? styles.selected : ''}`}
                                onClick={() => setSelectedShape(key)} style={{ borderColor: shape.color }}>
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <path d={shape.svg} fill={shape.color} stroke="#333" strokeWidth="2" />
                                    <g className={styles.vertexGroup}>
                                        {shape.vertexPoints.map((pt, i) => (
                                            <circle key={i} cx={pt[0]} cy={pt[1]} r="3" fill="inherit" />
                                        ))}
                                    </g>
                                </svg>
                                <div className={styles.shapeName}>{shape.name}</div>
                            </button>
                        ))}
                    </div>

                    <div className={styles.shapeDetail}>
                        <svg width="300" height="300" viewBox="0 0 100 100">
                            <path d={shapes[selectedShape].svg} fill={shapes[selectedShape].color} stroke="#333" strokeWidth="2" />
                            <g className={styles.vertexGroup}>
                                {shapes[selectedShape].vertexPoints.map((pt, i) => (
                                    <circle key={i} cx={pt[0]} cy={pt[1]} r="4" fill="inherit" />
                                ))}
                            </g>
                        </svg>
                        <div className={styles.info}>
                            <h3>{shapes[selectedShape].name}</h3>
                            <p>📏 변: <strong>{shapes[selectedShape].sides}개</strong></p>
                            <p>📍 꼭짓점: <strong>{shapes[selectedShape].vertices}개</strong></p>
                        </div>
                    </div>

                    <div className={styles.helpBox}>
                        <h3>💡 알아두기</h3>
                        <p>• <strong>변</strong>: 도형의 선 부분</p>
                        <p>• <strong>꼭짓점</strong>: 변이 만나는 점</p>
                        <p>• 삼각형은 변 3개, 사각형은 변 4개</p>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.shapeKey && (
                                <div className={styles.quizShape}>
                                    <svg width="200" height="200" viewBox="0 0 100 100">
                                        <path d={shapes[quizData.shapeKey].svg} fill={shapes[quizData.shapeKey].color} stroke="#333" strokeWidth="2" />
                                        <g className={styles.vertexGroup}>
                                            {shapes[quizData.shapeKey].vertexPoints.map((pt, i) => (
                                                <circle key={i} cx={pt[0]} cy={pt[1]} r="4" fill="inherit" />
                                            ))}
                                        </g>
                                    </svg>
                                </div>
                            )}

                            {quizData.choices ? (
                                <div className={styles.choiceButtons}>
                                    {quizData.choices.map(c => (
                                        <button key={c} className={`${styles.choiceBtn} ${userAnswer === c ? styles.selected : ''}`}
                                            onClick={() => setUserAnswer(c)} disabled={feedback === 'correct' || showAnswer}>
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="개수 입력" disabled={feedback === 'correct' || showAnswer} className={styles.input} />
                            )}

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
                                {showAnswer && (
                                    <motion.div className={styles.feedbackAnswer}>
                                        <div className={styles.answerBox}><p><strong>정답:</strong> {Array.isArray(quizData.answer) ? quizData.answer.join(', ') : quizData.answer}</p><p>{quizData.explanation}</p></div>
                                        <Button onClick={generateQuiz} size="large">다음 문제</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("여러 가지 도형", "삼각형, 사각형, 오각형, 육각형의 변과 꼭짓점을 배웁니다.")} />
        </div>
    );
};

export default Shapes2nd;
