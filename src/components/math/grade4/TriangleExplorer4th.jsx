import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './TriangleExplorer4th.module.css';

const TriangleExplorer4th = () => {
    const [mode, setMode] = useState('explore');
    const [points, setPoints] = useState([
        { x: 120, y: 250 },
        { x: 280, y: 250 },
        { x: 200, y: 50 }
    ]);
    const [triangleType, setTriangleType] = useState('이등변삼각형');

    // Quiz states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // Calculate side lengths and angles
    const getDist = (p1, p2) => Math.round(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) / 10);
    const sideA = getDist(points[0], points[1]);
    const sideB = getDist(points[1], points[2]);
    const sideC = getDist(points[2], points[0]);

    const setType = (type) => {
        setTriangleType(type);
        if (type === '정삼각형') {
            setPoints([{ x: 100, y: 250 }, { x: 300, y: 250 }, { x: 200, y: 77 }]);
        } else if (type === '이등변삼각형') {
            setPoints([{ x: 120, y: 250 }, { x: 280, y: 250 }, { x: 200, y: 50 }]);
        } else if (type === '직각삼각형') {
            setPoints([{ x: 100, y: 250 }, { x: 300, y: 250 }, { x: 100, y: 100 }]);
        } else if (type === '둔각삼각형') {
            setPoints([{ x: 150, y: 250 }, { x: 350, y: 250 }, { x: 50, y: 150 }]);
        } else { // 예각삼각형
            setPoints([{ x: 100, y: 250 }, { x: 300, y: 250 }, { x: 180, y: 100 }]);
        }
    };

    const generateQuiz = () => {
        const types = ['identify', 'property', 'angle-sum'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'identify') {
            const choices = ['이등변삼각형', '정삼각형', '직각삼각형', '둔각삼각형'];
            const ans = choices[Math.floor(Math.random() * choices.length)];
            setQuizData({
                type, question: '두 변의 길이가 같은 삼각형의 이름은 무엇인가요?',
                choices, answer: '이등변삼각형', explanation: '두 변의 길이가 같으면 이등변삼각형이에요.'
            });
        } else if (type === 'angle-sum') {
            const a1 = 60;
            const a2 = 70;
            setQuizData({
                type, question: `삼각형의 세 각 중 두 각이 ${a1}°, ${a2}° 일 때, 나머지 한 각은 몇 도일까요?`,
                answer: (180 - a1 - a2).toString(), explanation: '삼각형의 세 각의 합은 항상 180°예요!'
            });
        } else {
            setQuizData({
                type, question: '세 변의 길이가 모두 같은 삼각형은 정삼각형입니다. (O / X)',
                choices: ['O', 'X'], answer: 'O', explanation: '정삼각형은 세 변의 길이와 세 각의 크기가 모두 같아요.'
            });
        }
        setUserAnswer(''); setFeedback(null); setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = (ans) => {
        const finalAns = ans || userAnswer;
        if (finalAns.trim() === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(5);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 삼각형 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>삼각형의 세계 📐</h2>
                    <p className={styles.subtitle}>다양한 삼각형의 성질을 직접 확인해 보세요.</p>

                    <div className={styles.exploreCard}>
                        <svg width="400" height="300" className={styles.svgArea}>
                            <polygon
                                points={points.map(p => `${p.x},${p.y}`).join(' ')}
                                fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" strokeWidth="4"
                            />
                            {/* Length Labels */}
                            <text x={(points[0].x + points[1].x) / 2} y={points[0].y + 25} textAnchor="middle" fill="#666">{sideA}cm</text>
                            <text x={(points[1].x + points[2].x) / 2 + 10} y={(points[1].y + points[2].y) / 2} fill="#666">{sideB}cm</text>
                            <text x={(points[2].x + points[0].x) / 2 - 30} y={(points[2].y + points[0].y) / 2} fill="#666">{sideC}cm</text>

                            {/* Vertices */}
                            {points.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="6" fill="#2e7d32" stroke="white" strokeWidth="2" />
                            ))}
                        </svg>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}><span className={styles.infoLabel}>현재 모양</span><span className={styles.infoValue}>{triangleType}</span></div>
                            <div className={styles.infoItem}><span className={styles.infoLabel}>특징</span><span className={styles.infoValue}>{sideA === sideB && sideB === sideC ? '세 변이 모두 같음' : (sideA === sideB || sideB === sideC || sideC === sideA ? '두 변이 같음' : '세 변이 다름')}</span></div>
                        </div>

                        <div className={styles.controls}>
                            <p>삼각형 버튼을 눌러보세요!</p>
                            <div className={styles.typeSelector}>
                                <Button onClick={() => setType('이등변삼각형')} variant={triangleType === '이등변삼각형' ? 'primary' : 'secondary'} size="small">이등변삼각형</Button>
                                <Button onClick={() => setType('정삼각형')} variant={triangleType === '정삼각형' ? 'primary' : 'secondary'} size="small">정삼각형</Button>
                                <Button onClick={() => setType('직각삼각형')} variant={triangleType === '직각삼각형' ? 'primary' : 'secondary'} size="small">직각삼각형</Button>
                                <Button onClick={() => setType('둔각삼각형')} variant={triangleType === '둔각삼각형' ? 'primary' : 'secondary'} size="small">둔각삼각형</Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 삼각형 박사님 노트</h3>
                        <ul>
                            <li>• <strong>이등변삼각형</strong>: 두 변의 길이가 같고, 두 각의 크기도 같아요.</li>
                            <li>• <strong>정삼각형</strong>: 세 변의 길이가 모두 같고, 세 각이 모두 60°예요.</li>
                            <li>• <strong>예각/직각/둔각</strong>: 가장 큰 각이 90°보다 작으면 예각, 딱 90°면 직각, 90°보다 크면 둔각이에요.</li>
                            <li>• <strong>중요!</strong>: 삼각형의 세 각을 모두 더하면 항상 <strong>180°</strong>가 된답니다!</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>삼각형 마스터 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.choices ? (
                                <div className={styles.choiceGrid}>
                                    {quizData.choices.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => checkAnswer(c)}
                                            className={`${styles.choiceBtn} ${userAnswer === c ? styles.choiceActive : ''}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ marginBottom: '30px' }}>
                                    <input
                                        type="number" value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className={styles.input} placeholder="정답 입력"
                                        style={{ width: '100%', padding: '15px', fontSize: '1.5rem', borderRadius: '15px', border: '2px solid #ddd', textAlign: 'center' }}
                                    />
                                    <Button onClick={() => checkAnswer()} fullWidth size="large" variant="primary" style={{ marginTop: '20px' }}>제출하기</Button>
                                </div>
                            )}

                            <AnimatePresence>
                                {feedback === 'correct' && <motion.div className={styles.feedback} style={{ color: '#2e7d32', backgroundColor: '#e8f5e9' }}>🎉 정답입니다! 도형 박사님이시네요!</motion.div>}
                                {feedback === 'incorrect' && <motion.div className={styles.feedback} style={{ color: '#c62828', backgroundColor: '#ffebee' }}>😅 다시 한번 생각해볼까요? 박사님 노트를 참고해 보세요!</motion.div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("삼각형", "이등변삼각형, 정삼각형의 성질을 이해하고 각도와 변의 관계를 배웁니다.")} />
        </div>
    );
};

export default TriangleExplorer4th;
