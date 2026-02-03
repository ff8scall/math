import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './GeometryExplorer.module.css';

const GeometryExplorer = () => {
    const canvasRef = useRef(null);
    const [mode, setMode] = useState('line'); // line, triangle, rectangle, circle
    const [shapes, setShapes] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

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
                type: mode,
                start: startPos,
                end: currentPos,
                id: Date.now()
            }]);
        }
    };

    const clearCanvas = () => {
        setShapes([]);
    };

    // Rendering helper (simple SVG based on shapes state)
    // We render the "drawing" shape separately if isDrawing is true

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>도형 탐험대: 내가 만드는 도형 📐</h2>
            <p className={styles.description}>
                점들을 이어서 도형을 만들어보세요. <strong>직각삼각형</strong>과 <strong>직사각형</strong>을 찾아볼까요?
            </p>

            <div className={styles.toolbar}>
                <button
                    className={`${styles.toolBtn} ${mode === 'line' ? styles.active : ''}`}
                    onClick={() => setMode('line')}
                >
                    📏 선분
                </button>
                <button
                    className={`${styles.toolBtn} ${mode === 'rectangle' ? styles.active : ''}`}
                    onClick={() => setMode('rectangle')}
                >
                    ⬜ 직사각형
                </button>
                <button
                    className={`${styles.toolBtn} ${mode === 'triangle' ? styles.active : ''}`}
                    onClick={() => setMode('triangle')}
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
                            {mode === 'line' && (
                                <line x1={startPos.x} y1={startPos.y} x2={currentPos.x} y2={currentPos.y} stroke="#333" strokeWidth="3" strokeDasharray="5,5" />
                            )}
                            {mode === 'rectangle' && (
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
                            {mode === 'triangle' && (
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

            <JsonLd data={generateCourseSchema("평면도형 그리기 실습", "격자 위에서 선분, 직각삼각형, 직사각형을 직접 그려보며 도형의 구성 요소를 학습합니다.")} />
        </div>
    );
};

export default GeometryExplorer;
