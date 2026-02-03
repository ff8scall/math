import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './GeometryExplorer.module.css';

const GeometryExplorer = () => {
    const canvasRef = useRef(null);

    // Mode: 'explore' or 'practice'
    const [mode, setMode] = useState('explore');

    // Explore mode states
    const [drawMode, setDrawMode] = useState('line'); // line, triangle, rectangle
    const [shapes, setShapes] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

    // Practice mode states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // Grid settings
    const gridSize = 40;

    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;
        // Snap to grid
        const x = Math.round(rawX / gridSize) * gridSize;
        const y = Math.round(rawY / gridSize) * gridSize;
        return { x, y };
    };

    const handleMouseDown = (e) => {
        const pos = getMousePos(e);
        setStartPos(pos);
        setCurrentPos(pos);
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        setCurrentPos(getMousePos(e));
    };

    const handleMouseUp = () => {
        if (!isDrawing) return;
        setIsDrawing(false);

        // Add new shape
        if (startPos.x !== currentPos.x || startPos.y !== currentPos.y) {
            setShapes([...shapes, {
                type: drawMode,
                start: startPos,
                end: currentPos,
                id: Date.now()
            }]);
        }
    };

    const clearCanvas = () => {
        setShapes([]);
    };

    // Practice Mode Logic
    const generateQuiz = () => {
        const shapeTemplates = [
            { name: '삼각형', type: 'triangle', vertices: 3, sides: 3, rightAngles: 0, points: [[100, 80], [200, 80], [150, 180]] },
            { name: '직각삼각형', type: 'rightTriangle', vertices: 3, sides: 3, rightAngles: 1, points: [[100, 80], [200, 80], [100, 180]] },
            { name: '사각형', type: 'quadrilateral', vertices: 4, sides: 4, rightAngles: 0, points: [[80, 80], [220, 100], [200, 200], [100, 180]] },
            { name: '직사각형', type: 'rectangle', vertices: 4, sides: 4, rightAngles: 4, points: [[80, 80], [240, 80], [240, 200], [80, 200]] },
            { name: '정사각형', type: 'square', vertices: 4, sides: 4, rightAngles: 4, points: [[100, 80], [220, 80], [220, 200], [100, 200]] }
        ];

        const problemTypes = [
            { type: 'countVertices', question: '이 도형의 꼭짓점은 몇 개일까요?' },
            { type: 'countSides', question: '이 도형의 변은 몇 개일까요?' },
            { type: 'countRightAngles', question: '이 도형에서 직각(ㄱ 모양)은 몇 개일까요?' },
            { type: 'nameShape', question: '이 도형의 이름은 무엇일까요?' }
        ];

        const shape = shapeTemplates[Math.floor(Math.random() * shapeTemplates.length)];
        const problem = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        let answer;
        if (problem.type === 'countVertices') answer = shape.vertices;
        else if (problem.type === 'countSides') answer = shape.sides;
        else if (problem.type === 'countRightAngles') answer = shape.rightAngles;
        else if (problem.type === 'nameShape') answer = shape.name;

        setQuizData({ shape, problem, answer });
        setUserAnswer('');
        setFeedback(null);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (!quizData) return;

        let isCorrect = false;
        if (quizData.problem.type === 'nameShape') {
            isCorrect = userAnswer.trim() === quizData.answer;
        } else {
            isCorrect = parseInt(userAnswer) === quizData.answer;
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

    return (
        <div className={styles.container}>
            {/* Mode Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 도형 그리기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 className={styles.title}>도형 탐험대: 내가 만드는 도형 📐</h2>
                    <p className={styles.description}>
                        점들을 이어서 도형을 만들어보세요. <strong>직각삼각형</strong>과 <strong>직사각형</strong>을 찾아볼까요?
                    </p>

                    <div className={styles.toolbar}>
                        <button
                            className={`${styles.toolBtn} ${drawMode === 'line' ? styles.active : ''}`}
                            onClick={() => setDrawMode('line')}
                        >
                            📏 선분
                        </button>
                        <button
                            className={`${styles.toolBtn} ${drawMode === 'rectangle' ? styles.active : ''}`}
                            onClick={() => setDrawMode('rectangle')}
                        >
                            ⬜ 직사각형
                        </button>
                        <button
                            className={`${styles.toolBtn} ${drawMode === 'triangle' ? styles.active : ''}`}
                            onClick={() => setDrawMode('triangle')}
                        >
                            🔺 직각삼각형
                        </button>
                        <Button onClick={clearCanvas} variant="secondary" size="small">지우기</Button>
                    </div>

                    <div className={styles.canvasWrapper}>
                        <svg
                            ref={canvasRef}
                            className={styles.canvas}
                            width={600}
                            height={400}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {/* Grid Lines */}
                            <defs>
                                <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                                    <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#eee" strokeWidth="1" />
                                    <circle cx="0" cy="0" r="2" fill="#ddd" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />

                            {/* Existing Shapes */}
                            {shapes.map(shape => (
                                <g key={shape.id}>
                                    {shape.type === 'line' && (
                                        <line x1={shape.start.x} y1={shape.start.y} x2={shape.end.x} y2={shape.end.y} stroke="#333" strokeWidth="3" />
                                    )}
                                    {shape.type === 'rectangle' && (
                                        <rect
                                            x={Math.min(shape.start.x, shape.end.x)}
                                            y={Math.min(shape.start.y, shape.end.y)}
                                            width={Math.abs(shape.start.x - shape.end.x)}
                                            height={Math.abs(shape.start.y - shape.end.y)}
                                            stroke="#FF9F43"
                                            strokeWidth="3"
                                            fill="rgba(255, 159, 67, 0.2)"
                                        />
                                    )}
                                    {shape.type === 'triangle' && (
                                        <path
                                            d={`M ${shape.start.x} ${shape.start.y} L ${shape.end.x} ${shape.end.y} L ${shape.start.x} ${shape.end.y} Z`}
                                            stroke="#54a0ff"
                                            strokeWidth="3"
                                            fill="rgba(84, 160, 255, 0.2)"
                                        />
                                    )}
                                    {/* Vertices */}
                                    <circle cx={shape.start.x} cy={shape.start.y} r="4" fill="red" />
                                    <circle cx={shape.end.x} cy={shape.end.y} r="4" fill="red" />
                                    {(shape.type === 'triangle' || shape.type === 'rectangle') && (
                                        <circle cx={shape.start.x} cy={shape.end.y} r="4" fill="red" />
                                    )}
                                    {shape.type === 'rectangle' && (
                                        <circle cx={shape.end.x} cy={shape.start.y} r="4" fill="red" />
                                    )}
                                </g>
                            ))}

                            {/* Pending Shape (Drawing) */}
                            {isDrawing && (
                                <g opacity="0.6">
                                    {drawMode === 'line' && (
                                        <line x1={startPos.x} y1={startPos.y} x2={currentPos.x} y2={currentPos.y} stroke="#333" strokeWidth="3" strokeDasharray="5,5" />
                                    )}
                                    {drawMode === 'rectangle' && (
                                        <rect
                                            x={Math.min(startPos.x, currentPos.x)}
                                            y={Math.min(startPos.y, currentPos.y)}
                                            width={Math.abs(startPos.x - currentPos.x)}
                                            height={Math.abs(startPos.y - currentPos.y)}
                                            stroke="#FF9F43"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                    )}
                                    {drawMode === 'triangle' && (
                                        <path
                                            d={`M ${startPos.x} ${startPos.y} L ${currentPos.x} ${currentPos.y} L ${startPos.x} ${currentPos.y} Z`}
                                            stroke="#54a0ff"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                    )}
                                </g>
                            )}
                        </svg>
                    </div>

                    <article style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', textAlign: 'left', lineHeight: '1.6' }}>
                        <h3>💡 도형 박사님 노트</h3>
                        <ul>
                            <li><strong>선분:</strong> 두 점을 곧게 이은 선이에요.</li>
                            <li><strong>직각삼각형:</strong> 한 각이 직각(90도)인 삼각형이에요. 'ㄴ'자 모양을 찾아보세요!</li>
                            <li><strong>직사각형:</strong> 네 각이 모두 직각인 사각형이에요.</li>
                            <li><strong>꼭짓점:</strong> 선분과 선분이 만나는 뾰족한 점이에요. (빨간 점)</li>
                        </ul>
                    </article>
                </>
            ) : (
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 className={styles.title}>도형 문제 풀기 ✏️</h2>
                    {quizData && (
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#333' }}>{quizData.problem.question}</h3>

                            {/* Draw Shape */}
                            <svg width="320" height="280" style={{ margin: '20px auto', display: 'block', backgroundColor: '#f9f9f9', borderRadius: '15px' }}>
                                <polygon
                                    points={quizData.shape.points.map(p => `${p[0]},${p[1]}`).join(' ')}
                                    fill="rgba(84, 160, 255, 0.3)"
                                    stroke="#4285F4"
                                    strokeWidth="3"
                                />
                                {quizData.shape.points.map((point, idx) => (
                                    <circle key={idx} cx={point[0]} cy={point[1]} r="5" fill="red" />
                                ))}
                                {quizData.shape.rightAngles > 0 && quizData.shape.type === 'rightTriangle' && (
                                    <rect x={quizData.shape.points[2][0]} y={quizData.shape.points[2][1] - 15} width="15" height="15" fill="none" stroke="#FF6B6B" strokeWidth="2" />
                                )}
                            </svg>

                            <div style={{ marginTop: '30px' }}>
                                <input
                                    type={quizData.problem.type === 'nameShape' ? 'text' : 'number'}
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder={quizData.problem.type === 'nameShape' ? '도형 이름 입력' : '숫자 입력'}
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                    style={{ width: '100%', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '20px', textAlign: 'center' }}
                                />
                                <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>
                            </div>

                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        정답입니다! 👏 (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        다시 생각해보세요! 힌트: {quizData.problem.type === 'nameShape' ? '도형을 잘 관찰해보세요' : '하나씩 차근차근 세어보세요'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("평면도형 학습", "격자 위에서 선분, 직각삼각형, 직사각형을 직접 그려보고 도형 문제를 풀며 학습합니다.")} />
        </div>
    );
};

export default GeometryExplorer;
