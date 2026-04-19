import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import PageHeader from '../common/PageHeader';
import styles from './CircleExplorer.module.css';

const CircleExplorer = () => {
    const [mode, setMode] = useState('explore');
    const [radiusPx, setRadiusPx] = useState(80);
    const [showCenter, setShowCenter] = useState(true);
    const [showRadius, setShowRadius] = useState(true);
    const [showDiameter, setShowDiameter] = useState(false);
    const [rotation, setRotation] = useState(0); // 원리를 위한 회전 상태

    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // px를 cm로 환산 (약 20px = 1cm 기준)
    const radiusCm = (radiusPx / 20).toFixed(1);
    const diameterCm = (radiusCm * 2).toFixed(1);

    const generateQuiz = () => {
        const types = ['convert', 'term', 'compare', 'logic', 'overlap'];
        const type = types[Math.floor(Math.random() * types.length)];

        if (type === 'convert') {
            const r = Math.floor(Math.random() * 7) + 2;
            setQuizData({
                question: `반지름이 ${r}cm인 원의 지름은 몇 cm일까요?`,
                answer: (r * 2).toString(), hint: '지름은 반지름의 2배예요!', type: 'number'
            });
        } else if (type === 'term') {
            setQuizData({
                question: '컴퍼스로 원을 그릴 때, 컴퍼스의 침이 꽂혔던 자리는 무엇이 되나요?',
                answer: '중심', hint: '중심(원의 중심)이라고 불러요.', type: 'text'
            });
        } else if (type === 'overlap') {
            setQuizData({
                question: '반지름이 5cm인 두 원의 중심을 이어 붙였습니다. 두 중심 사이의 거리는 얼마일까요?',
                answer: '5', hint: '두 원의 반지름만큼의 거리가 됩니다.', type: 'number'
            });
        } else if (type === 'compare') {
            const r1 = 4;
            setQuizData({
                question: '한 원에서 반지름은 여러 개 그을 수 있고, 그 길이는 모두 같습니다. (O/X)',
                choices: ['O', 'X'],
                answer: 'O', hint: '어느 방향으로 그어도 길이는 반지름으로 동일해요.', type: 'choice'
            });
        } else {
            setQuizData({
                question: '컴퍼스를 3cm 벌려 원을 그렸다면, 이 원의 지름은 몇 cm일까요?',
                answer: '6', hint: '컴퍼스를 벌린 길이는 반지름이에요.', type: 'number'
            });
        }
        setUserAnswer(''); setFeedback(null);
    };


    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();

        // 탐색 모드일 때 반지름 선이 천천히 회전하게 하여 '어느 방향이나 길이가 같음'을 시각화
        let interval;
        if (mode === 'explore' && showRadius) {
            interval = setInterval(() => {
                setRotation(prev => (prev + 1) % 360);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [mode, showRadius]);

    const checkAnswer = () => {
        if (userAnswer.trim() === quizData.answer) {
            setFeedback('correct'); confetti(); updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.modeTabs}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'} size="large">🔍 원 탐험하기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'} size="large">✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <div className={styles.explore}>
                    <h2 className={styles.title}>원의 성질 탐험</h2>
                    <p className={styles.subtitle}>동그란 원의 비밀! 중심, 반지름, 지름을 직접 조절하며 배워봐요.</p>

                    <div className={styles.canvasCard}>
                        <svg width="400" height="400" className={styles.svgArea}>
                            {/* Circle Shadow (Base) */}
                            <circle cx="200" cy="200" r={radiusPx} fill="rgba(26, 115, 232, 0.1)" stroke="#1a73e8" strokeWidth="4" />

                            {/* Rotation Layer for Radius Principle */}
                            <g transform={`rotate(${rotation} 200 200)`}>
                                {showRadius && (
                                    <>
                                        <line x1="200" y1="200" x2={200 + radiusPx} y2="200" stroke="#ea4335" strokeWidth="3" />
                                        <circle cx={200 + radiusPx} cy="200" r="5" fill="#ea4335" />
                                        <text x={200 + radiusPx / 2} y="190" textAnchor="middle" fill="#ea4335" fontWeight="bold" fontSize="14">
                                            반지름 {radiusCm}cm
                                        </text>
                                    </>
                                )}
                            </g>

                            {/* Diameter Line */}
                            {showDiameter && (
                                <>
                                    <line x1={200 - radiusPx} y1="200" x2={200 + radiusPx} y2="200" stroke="#34a853" strokeWidth="3" strokeDasharray="8,4" />
                                    <text x="200" y="225" textAnchor="middle" fill="#34a853" fontWeight="bold" fontSize="14">
                                        지름 {diameterCm}cm
                                    </text>
                                </>
                            )}

                            {/* Center Point */}
                            {showCenter && (
                                <>
                                    <circle cx="200" cy="200" r="6" fill="#1a73e8" stroke="white" strokeWidth="2" />
                                    <text x="200" y="240" textAnchor="middle" fill="#1a73e8" fontWeight="bold">원의 중심</text>
                                </>
                            )}
                        </svg>

                        <div className={styles.controlSection}>
                            <div className={styles.sliderBox}>
                                <label className={styles.sliderLabel}>📏 원의 크기 조절 (반지름: {radiusCm}cm)</label>
                                <input
                                    type="range" min="40" max="160" step="10"
                                    value={radiusPx} onChange={(e) => setRadiusPx(Number(e.target.value))}
                                    className={styles.slider}
                                />
                            </div>

                            <div className={styles.toggleButtons}>
                                <Button onClick={() => setShowCenter(!showCenter)} variant={showCenter ? 'primary' : 'secondary'} size="small">중심 {showCenter ? '숨기기' : '보이기'}</Button>
                                <Button onClick={() => setShowRadius(!showRadius)} variant={showRadius ? 'primary' : 'secondary'} size="small">반지름 {showRadius ? '숨기기' : '보이기'}</Button>
                                <Button onClick={() => setShowDiameter(!showDiameter)} variant={showDiameter ? 'primary' : 'secondary'} size="small">지름 {showDiameter ? '숨기기' : '보이기'}</Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.noteCard}>
                        <h3>💡 원 박사님 노하우</h3>
                        <ul>
                            <li><strong>원의 중심</strong>: 어떤 방향으로 재도 원 위의 한 점에서 거리가 모두 같은 단 하나의 점이에요!</li>
                            <li><strong>반지름</strong>: 보이나요? 빨간 선이 빙글빙글 돌아도 <strong>{radiusCm}cm</strong>로 길이는 항상 일정해요!</li>
                            <li><strong>지름</strong>: 중심을 뚫고 지나가는 가장 긴 선이에요. 반지름 두 개가 합쳐진 <strong>{diameterCm}cm</strong>예요.</li>
                            <li><strong>중요!</strong>: 한 원에서 반지름과 지름은 각각 어느 방향으로 재도 항상 길이가 같아요.</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className={styles.practice}>
                    <h2 className={styles.title}>원 마스터 퀴즈 ✏️</h2>
                    {quizData && (
                        <div className={styles.problemCard}>
                            <h3 className={styles.question}>{quizData.question}</h3>

                            {quizData.choices ? (
                                <div className={styles.choiceList}>
                                    {quizData.choices.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setUserAnswer(c)}
                                            className={`${styles.choiceBtn} ${userAnswer === c ? styles.choiceActive : ''}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    className={styles.inputField}
                                    type={quizData.type === 'number' ? 'number' : 'text'}
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="정답을 입력하세요"
                                    onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                />
                            )}

                            <Button onClick={checkAnswer} fullWidth size="large" variant="primary" disabled={feedback === 'correct'}>정답 확인</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && <div className={styles.feedbackCorrect}>🎉 정말 잘했어요! 원 박사님 인정! (+10 코인)</div>}
                                {feedback === 'incorrect' && <div className={styles.feedbackIncorrect}>😅 힌트를 드릴게요: {quizData.hint}</div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}
            <JsonLd data={generateCourseSchema("원의 성질", "원의 중심, 반지름, 지름의 관계를 시각적으로 이해하고 문제를 풉니다.")} />
        </div>
    );
};

export default CircleExplorer;
