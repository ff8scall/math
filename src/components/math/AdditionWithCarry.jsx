import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { JsonLd, generateHowToSchema } from '../seo/JsonLd';

import { updateCoins } from '../../utils/storage/storageManager';

const AdditionWithCarry = () => {
    // Mode: 'explore' or 'practice'
    const [mode, setMode] = useState('explore');

    // Explore Mode State
    const [num1, setNum1] = useState(158);
    const [num2, setNum2] = useState(265);
    const [step, setStep] = useState(0);

    // Practice Mode State
    const [practiceData, setPracticeData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // --- Explore Logic ---
    const h1 = Math.floor(num1 / 100);
    const t1 = Math.floor((num1 % 100) / 10);
    const o1 = num1 % 10;

    const h2 = Math.floor(num2 / 100);
    const t2 = Math.floor((num2 % 100) / 10);
    const o2 = num2 % 10;

    const onesSum = o1 + o2;
    const carry1 = onesSum >= 10 ? 1 : 0;
    const onesResult = onesSum % 10;

    const tensSum = t1 + t2 + carry1;
    const carry2 = tensSum >= 10 ? 1 : 0;
    const tensResult = tensSum % 10;

    const hundredsResult = h1 + h2 + carry2;

    const nextStep = () => {
        if (step === 4) {
            setNum1(Math.floor(Math.random() * 800) + 100);
            setNum2(Math.floor(Math.random() * 800) + 100);
            setStep(0);
            return;
        }
        if (step === 3) {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
        setStep(prev => prev + 1);
    };

    // --- Practice Logic ---
    const startPractice = () => {
        const n1 = Math.floor(Math.random() * 800) + 100; // 100~899
        const n2 = Math.floor(Math.random() * 800) + 100; // 100~899

        setPracticeData({ n1, n2 });
        setUserAnswer('');
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (!practiceData) return;
        const correct = practiceData.n1 + practiceData.n2;
        if (parseInt(userAnswer) === correct) {
            setFeedback('correct');
            confetti();
            updateCoins(15);
            setTimeout(startPractice, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    // Auto start practice
    useEffect(() => {
        if (mode === 'practice' && !practiceData) startPractice();
    }, [mode]);


    return (
        <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2>세 자리 수의 덧셈 (받아올림)</h2>
                    <p style={{ marginBottom: '40px', color: '#666', minHeight: '3em' }}>
                        {step === 0 && "3학년 수학의 핵심! 세 자리 수 덧셈을 시작해볼까요? 일의 자리부터 더해요."}
                        {step === 1 && `일의 자리: ${o1} + ${o2} = ${onesSum}. 10이 넘으면 십의 자리로 1을 보내요!`}
                        {step === 2 && `십의 자리: ${t1} + ${t2} + ${carry1}(받아올림) = ${tensSum}. 또 10이 넘으면 백의 자리로!`}
                        {step === 3 && `백의 자리: ${h1} + ${h2} ${carry2 > 0 ? ` + ${carry2}(받아올림)` : ""} 를 계산해요.`}
                        {step === 4 && `정답은 ${num1 + num2}입니다! 정말 잘했어요!`}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '3rem', fontFamily: 'monospace', position: 'relative' }}>
                        {/* Operator */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
                            <div>+</div>
                        </div>

                        {/* Hundreds Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ height: '60px' }}>
                                <AnimatePresence>
                                    {step >= 3 && carry2 > 0 && (
                                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ color: 'red', fontSize: '2rem' }}>1</motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>{h1}</div>
                            <div>{h2}</div>
                            <div style={{ borderTop: '4px solid #333', width: '100%', marginTop: '10px' }}></div>
                            <div>
                                {step >= 4 ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{hundredsResult}</motion.span> : "?"}
                            </div>
                        </div>

                        {/* Tens Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ height: '60px' }}>
                                <AnimatePresence>
                                    {step >= 2 && carry1 > 0 && (
                                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ color: 'red', fontSize: '2rem' }}>1</motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>{t1}</div>
                            <div>{t2}</div>
                            <div style={{ borderTop: '4px solid #333', width: '100%', marginTop: '10px' }}></div>
                            <div>
                                {step >= 3 ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{tensResult}</motion.span> : "?"}
                            </div>
                        </div>

                        {/* Ones Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ height: '60px' }}></div>
                            <div>{o1}</div>
                            <div>{o2}</div>
                            <div style={{ borderTop: '4px solid #333', width: '100%', marginTop: '10px' }}></div>
                            <div>
                                {step >= 2 ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{onesResult}</motion.span> : "?"}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px' }}>
                        <Button onClick={nextStep} size="large">
                            {step === 4 ? "다른 문제!" : "다음 단계 👉"}
                        </Button>
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: '450px', margin: '0 auto' }}>
                    <h2>세 자리 수 덧셈 연습 ✍️</h2>
                    {practiceData && (
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '30px', textAlign: 'right', paddingRight: '40px' }}>
                                <div>{practiceData.n1}</div>
                                <div>+ {practiceData.n2}</div>
                                <div style={{ borderTop: '4px solid #333', marginTop: '10px' }}></div>
                            </div>

                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="정답"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                style={{ width: '100%', padding: '15px', fontSize: '2rem', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '20px', textAlign: 'center' }}
                            />

                            <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                            {feedback === 'correct' && <div style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>정답입니다! 🎉 (+15 코인)</div>}
                            {feedback === 'incorrect' && <div style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>다시 계산해보세요! 🧐</div>}
                        </div>
                    )}
                </div>
            )}

            <article style={{ marginTop: '80px', textAlign: 'left', lineHeight: '1.8', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '15px' }}>
                <h3>📚 3학년 수학: 세 자리 수 덧셈 가이드</h3>
                <p>
                    3학년 1학기 첫 단원에서 배우는 <strong>세 자리 수의 덧셈</strong>은 자릿값의 개념을 확장하는 중요한 과정입니다.
                    받아올림이 여러 번 일어나는 경우 아이들이 윗자리에 표시한 숫자를 더하는 것을 잊어버리기 쉽습니다.
                </p>

                <h4 style={{ marginTop: '20px' }}>💡 학습 팁</h4>
                <ol style={{ paddingLeft: '20px' }}>
                    <li><strong>일의 자리부터:</strong> 항상 오른쪽 끝에서부터 왼쪽으로 이동하며 계산합니다.</li>
                    <li><strong>받아올림 표시:</strong> 10이 넘으면 윗자리에 작게 '1'을 적어주는 습관이 실수를 줄여줍니다.</li>
                    <li><strong>어림하기:</strong> 계산 전 "답이 대략 얼마쯤 될까?"(예: 150+260은 약 410쯤)라고 생각해보면 큰 실수를 방지할 수 있습니다.</li>
                </ol>
            </article>

            <JsonLd data={generateHowToSchema("세 자리 수 덧셈 하는 법", [
                { title: "일의 자리 계산", text: "일의 자리 숫자를 더하고 10이 넘으면 십의 자리로 1을 넘깁니다." },
                { title: "십의 자리 계산", text: "십의 자리 숫자들과 받아올림한 1을 더합니다. 10이 넘으면 백의 자리로 넘깁니다." },
                { title: "백의 자리 계산", text: "백의 자리 숫자들과 받아올림한 1을 모두 더해 마무리합니다." }
            ])} />
        </div>
    );
};

export default AdditionWithCarry;
