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
    const [num1, setNum1] = useState(18);
    const [num2, setNum2] = useState(5);
    const [step, setStep] = useState(0);

    // Practice Mode State
    const [practiceData, setPracticeData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // --- Explore Logic ---
    const ones1 = num1 % 10;
    const tens1 = Math.floor(num1 / 10);
    const ones2 = num2 % 10;

    const onesSum = ones1 + ones2;
    const carry = onesSum >= 10 ? 1 : 0;
    const onesResult = onesSum % 10;
    const tensResult = tens1 + carry;

    const nextStep = () => {
        if (step === 3) {
            setNum1(Math.floor(Math.random() * 40) + 10);
            setNum2(Math.floor(Math.random() * 9) + 1);
            setStep(0);
            return;
        }
        if (step === 2) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        setStep(prev => prev + 1);
    };

    // --- Practice Logic ---
    const startPractice = () => {
        const n1 = Math.floor(Math.random() * 80) + 10; // 10~89
        const n2 = Math.floor(Math.random() * 9) + 1; // 1~9 (simple carry focus)
        // Ensure carry often? 50% chance
        // Let's just random it, but simple.

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
            updateCoins(10);
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
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 원리 탐험</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 실전 연습</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2>받아올림이 있는 덧셈</h2>
                    <p style={{ marginBottom: '40px', color: '#666' }}>
                        {step === 0 && "자, 일의 자리 친구들부터 더해볼까요?"}
                        {step === 1 && `8 더하기 5는 13이네요! 어? 10개가 넘었네?`}
                        {step === 2 && "10개 묶음은 십의 자리 마을로 슝~ 이사 가요!"}
                        {step === 3 && "짜잔! 정답은 23입니다!"}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '3rem', fontFamily: 'monospace', position: 'relative' }}>
                        {/* Operator Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
                            <div style={{ height: '50px' }}></div>
                            <div>&nbsp;</div>
                            <div>+</div>
                            <div style={{ borderTop: '4px solid transparent', width: '100%', marginTop: '10px' }}></div>
                            <div>&nbsp;</div>
                        </div>

                        {/* Tens Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ height: '50px' }}>
                                <AnimatePresence>
                                    {step >= 2 && carry > 0 && (
                                        <motion.div
                                            initial={{ y: 100, x: 50, opacity: 0, scale: 0.5 }}
                                            animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, type: "spring" }}
                                            style={{ color: 'red', fontSize: '2rem' }}
                                        >
                                            1
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>{tens1}</div>
                            <div style={{ visibility: 'hidden' }}>0</div>
                            <div style={{ borderTop: '4px solid #333', width: '100%', marginTop: '10px' }}></div>
                            <div>
                                {step >= 3 ? (
                                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1.2 }} transition={{ type: "spring" }}>{tensResult}</motion.span>
                                ) : "?"}
                            </div>
                        </div>

                        {/* Ones Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ height: '50px' }}></div>
                            <div>{ones1}</div>
                            <div>{ones2}</div>
                            <div style={{ borderTop: '4px solid #333', width: '100%', marginTop: '10px' }}></div>
                            <div style={{ position: 'relative' }}>
                                {step === 1 && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ position: 'absolute', width: '100%' }}>{onesSum}</motion.div>}
                                {step >= 2 ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{onesResult}</motion.span> : <span style={{ visibility: step >= 1 ? 'hidden' : 'visible' }}>?</span>}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px' }}>
                        <Button onClick={nextStep} size="large">
                            {step === 3 ? "다음 문제!" : "다음 단계 👉"}
                        </Button>
                    </div>

                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <div style={{ width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: '#999' }}>십의 자리 블록 공간</span>
                        </div>
                        <div style={{ width: '100px', height: '100px', border: '2px dashed #ccc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: '#999' }}>일의 자리 블록 공간</span>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h2>받아올림 덧셈 연습 ✍️</h2>
                    {practiceData && (
                        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div>{practiceData.n1}</div>
                                    <div>+ {practiceData.n2}</div>
                                    <div style={{ borderTop: '3px solid #333', marginTop: '10px', width: '100%' }}></div>
                                </div>
                            </div>

                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="정답"
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                style={{ width: '100%', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '20px', textAlign: 'center' }}
                            />

                            <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                            {feedback === 'correct' && <div style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>정답입니다! 🎉 (+10 코인)</div>}
                            {feedback === 'incorrect' && <div style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>다시 계산해보세요! 🧐</div>}
                        </div>
                    )}
                </div>
            )}

            <article style={{ marginTop: '80px', textAlign: 'left', lineHeight: '1.8', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '15px' }}>
                <h3>📚 부모님을 위한 개념 가이드: 받아올림이란?</h3>
                <p>
                    <strong>받아올림(Carry)</strong>은 덧셈 과정에서 같은 자리의 수의 합이 10 이상이 될 때,
                    10을 윗자리의 1로 올려주는 것을 말합니다. 초등학교 2~3학년 수학에서 아이들이 가장 처음 마주하는 '벽'이기도 하죠.
                </p>

                <h4 style={{ marginTop: '20px' }}>💡 이렇게 지도해주세요</h4>
                <ol style={{ paddingLeft: '20px' }}>
                    <li><strong>일의 자리부터 더해요:</strong> 항상 오른쪽(일의 자리)부터 계산하는 습관을 들여주세요.</li>
                    <li><strong>10개면 이사 가요:</strong> "일의 자리 방에는 숫자가 9개까지만 살 수 있어. 10개가 되면 십의 자리 형님 댁으로 이사 가야 해!"라고 스토리텔링 해주세요.</li>
                    <li><strong>작은 1을 잊지 마세요:</strong> 받아올림 한 숫자 '1'을 식 위에 작게 쓰는 연습을 시켜 실수(Missing Carry)를 줄여주세요.</li>
                </ol>
            </article>

            <JsonLd data={generateHowToSchema("받아올림이 있는 덧셈 하는 법", [
                { title: "일의 자리 더하기", text: "일의 자리 숫자끼리 더합니다. 합이 10이 넘는지 확인하세요." },
                { title: "받아올림 표시하기", text: "합이 10 이상이면 10을 십의 자리 위로 '1'로 올려 적습니다." },
                { title: "십의 자리 더하기", text: "십의 자리 숫자와 받아올림한 1을 모두 더해 최종 답을 구합니다." }
            ])} />
        </div>
    );
};

export default AdditionWithCarry;
