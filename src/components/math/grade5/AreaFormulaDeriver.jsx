import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './AreaFormulaDeriver.module.css';

const AreaFormulaDeriver = () => {
    // Modes: 'parallelogram', 'triangle'
    const [shapeType, setShapeType] = useState('parallelogram');
    
    // States for Parallelogram
    const [isCutPara, setIsCutPara] = useState(false);
    const [isMovedPara, setIsMovedPara] = useState(false);

    // States for Triangle
    const [isDuplicatedTri, setIsDuplicatedTri] = useState(false);
    const [isMovedTri, setIsMovedTri] = useState(false);

    const reset = () => {
        setIsCutPara(false);
        setIsMovedPara(false);
        setIsDuplicatedTri(false);
        setIsMovedTri(false);
    };

    const handleShapeChange = (type) => {
        setShapeType(type);
        reset();
    };

    // Parallelogram logic
    const cutParallelogram = () => setIsCutPara(true);
    const assembleParallelogram = () => {
        setIsMovedPara(true);
        setTimeout(() => confetti(), 500);
    };

    // Triangle logic
    const duplicateTriangle = () => setIsDuplicatedTri(true);
    const assembleTriangle = () => {
        setIsMovedTri(true);
        setTimeout(() => confetti(), 500);
    };

    return (
        <div className={styles.container}>
            <PageHeader title="도형 가위질! (넓이 공식 유도기)" grade="5" />

            <div className={styles.workspace}>
                <header className={styles.intro}>
                    <p>공식을 무작정 외우지 마세요! 우리가 아는 <strong>직사각형</strong>으로 변신시켜 볼까요?</p>
                </header>

                <div className={styles.controls}>
                    <Button 
                        onClick={() => handleShapeChange('parallelogram')} 
                        variant={shapeType === 'parallelogram' ? 'primary' : 'outline'}
                    >
                        평행사변형 자르기
                    </Button>
                    <Button 
                        onClick={() => handleShapeChange('triangle')} 
                        variant={shapeType === 'triangle' ? 'primary' : 'outline'}
                    >
                        삼각형 복제하기
                    </Button>
                </div>

                <div className={styles.canvasArea}>
                    <AnimatePresence mode="wait">
                        {shapeType === 'parallelogram' && (
                            <motion.div 
                                key="para"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ position: 'relative', width: 400, height: 200 }}
                            >
                                {/* Left triangle (that gets cut and moved) */}
                                <motion.div
                                    className={styles.part}
                                    style={{
                                        width: 100, height: 200, left: 0, top: 0,
                                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                        background: '#4299e1',
                                        zIndex: isCutPara ? 10 : 1
                                    }}
                                    animate={{
                                        x: isMovedPara ? 300 : (isCutPara ? -20 : 0),
                                        opacity: 1
                                    }}
                                    transition={{ type: 'spring', stiffness: 100 }}
                                >
                                    {isCutPara && !isMovedPara && <span style={{ position: 'absolute', top: '50%', left: '40%' }}>✂️</span>}
                                </motion.div>

                                {/* Main body (the slanted part minus the left triangle) */}
                                <motion.div
                                    className={styles.part}
                                    style={{
                                        width: 300, height: 200, left: 100, top: 0,
                                        clipPath: 'polygon(0 0, 100% 0, calc(100% - 100px) 100%, 0 100%)',
                                        background: '#3182ce',
                                        zIndex: 1
                                    }}
                                />

                                {/* Cut dashed line */}
                                {!isCutPara && (
                                     <div style={{ position: 'absolute', left: 100, top: 0, height: '100%', width: 4, borderLeft: '4px dashed white', zIndex: 5 }} />
                                )}

                                {/* Base/Height labels */}
                                <div style={{ position: 'absolute', bottom: -30, left: 100, width: 300, textAlign: 'center', fontWeight: 'bold' }}>밑변</div>
                                <div style={{ position: 'absolute', left: -50, top: 0, height: 200, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>높이</div>
                            </motion.div>
                        )}

                        {shapeType === 'triangle' && (
                            <motion.div 
                                key="tri"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ position: 'relative', width: 300, height: 200 }}
                            >
                                {/* Original Triangle */}
                                <motion.div
                                    className={styles.part}
                                    style={{
                                        width: 300, height: 200, left: 0, top: 0,
                                        clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                                        background: '#48bb78',
                                        zIndex: 2
                                    }}
                                />

                                {/* Duplicated Triangle */}
                                <AnimatePresence>
                                    {isDuplicatedTri && (
                                        <motion.div
                                            className={styles.part}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ 
                                                opacity: 1, 
                                                scale: 1,
                                                x: isMovedTri ? 150 : 50,
                                                y: isMovedTri ? -200 : 50, // Move up and right relative to origin, then rotate
                                                rotate: isMovedTri ? 180 : 0
                                            }}
                                            style={{
                                                width: 300, height: 200, left: 0, top: 0,
                                                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                                                background: '#38a169',
                                                zIndex: 1,
                                                transformOrigin: 'top left' // important for rotation alignment
                                            }}
                                            transition={{ type: 'spring', stiffness: 80 }}
                                        >
                                           {!isMovedTri && "✨ 복제됨"}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Labels */}
                                <div style={{ position: 'absolute', bottom: -30, left: 0, width: 300, textAlign: 'center', fontWeight: 'bold' }}>밑변</div>
                                <div style={{ position: 'absolute', left: 150, top: 0, height: 200, borderLeft: '2px dashed #000', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginLeft: '10px', background: 'rgba(255,255,255,0.7)' }}>높이</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {shapeType === 'parallelogram' ? (
                        <>
                            {!isCutPara ? (
                                <Button onClick={cutParallelogram}>✂️ 수직으로 자르기</Button>
                            ) : !isMovedPara ? (
                                <Button onClick={assembleParallelogram} variant="accent">➡️ 오른쪽으로 붙이기</Button>
                            ) : (
                                <Button onClick={reset} variant="ghost">다시 하기</Button>
                            )}
                        </>
                    ) : (
                        <>
                             {!isDuplicatedTri ? (
                                <Button onClick={duplicateTriangle}>✨ 똑같은 모양 복제하기</Button>
                            ) : !isMovedTri ? (
                                <Button onClick={assembleTriangle} variant="accent">🔄 180도 돌려서 붙이기</Button>
                            ) : (
                                <Button onClick={reset} variant="ghost">다시 하기</Button>
                            )}
                        </>
                    )}
                </div>

                <div className={styles.formulaSection}>
                    <div className={styles.badge}>공식 탄생의 비밀 📜</div>
                    {shapeType === 'parallelogram' ? (
                        <div className={styles.mathLine}>
                            {isMovedPara ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    잘라서 붙였더니 완벽한 <strong>직사각형</strong>이 되었어요!<br/>
                                    따라서 평행사변형 넓이 = <span className={styles.highlight}>밑변 × 높이</span>
                                </motion.div>
                            ) : (
                                <div>평행사변형은 비스듬해서 가로×세로를 할 수 없어요.<br />직사각형으로 만들 수 없을까요?</div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.mathLine}>
                            {isMovedTri ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    삼각형 2개를 붙였더니 <strong>평행사변형</strong>이 되었어요!<br/>
                                    우리가 구하려는 건 1개니까 반(÷2)으로 나눠야죠?<br/>
                                    따라서 삼각형 넓이 = <span className={styles.highlight}>(밑변 × 높이) ÷ 2</span>
                                </motion.div>
                            ) : (
                                <div>삼각형의 넓이는 어떻게 구할까요?<br/>똑같은 삼각형을 하나 더 만들면 힌트가 보일지도 몰라요!</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <JsonLd data={generateCourseSchema("초등 5학년 다각형 넓이 공식 유도", "평행사변형을 가위로 잘라 직사각형으로 만들고, 삼각형을 복제해 평행사변형을 만드는 과정을 통해 넓이 공식을 스스로 유도합니다.")} />
        </div>
    );
};

export default AreaFormulaDeriver;
