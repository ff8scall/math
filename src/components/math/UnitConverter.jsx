import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';

const UnitConverter = () => {
    // Mode: 'explore' or 'practice'
    const [mode, setMode] = useState('explore');

    // Explore mode states
    const [cm, setCm] = useState(150);

    // Practice mode states
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    // Conversions
    const m = Math.floor(cm / 100);
    const remCm = cm % 100;
    const mm = cm * 10;

    // Practice Mode Logic
    const generateQuiz = () => {
        const problemTypes = [
            'cm_to_mm',    // cm를 mm로
            'cm_to_m',     // cm를 m와 cm로
            'compare',     // 크기 비교
            'addition'     // 길이 더하기
        ];

        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        if (type === 'cm_to_mm') {
            const value = Math.floor(Math.random() * 20) + 1; // 1~20cm
            setQuizData({
                type,
                question: `${value}cm는 몇 mm일까요?`,
                answer: value * 10,
                hint: '1cm = 10mm'
            });
        } else if (type === 'cm_to_m') {
            const totalCm = (Math.floor(Math.random() * 3) + 1) * 100 + Math.floor(Math.random() * 50); // 100~350
            const meters = Math.floor(totalCm / 100);
            const centimeters = totalCm % 100;
            setQuizData({
                type,
                question: `${totalCm}cm는 몇 m 몇 cm일까요?`,
                questionType: 'two_parts',
                answer: meters,
                answerCm: centimeters,
                hint: '100cm = 1m'
            });
        } else if (type === 'compare') {
            const options = [
                { a: '150cm', aValue: 150, b: '1m 40cm', bValue: 140 },
                { a: '200cm', aValue: 200, b: '2m', bValue: 200 },
                { a: '1m 70cm', aValue: 170, b: '180cm', bValue: 180 },
                { a: '250cm', aValue: 250, b: '2m 60cm', bValue: 260 }
            ];
            const selected = options[Math.floor(Math.random() * options.length)];

            let answerText = '같다';
            if (selected.aValue > selected.bValue) answerText = '크다';
            else if (selected.aValue < selected.bValue) answerText = '작다';

            setQuizData({
                type,
                question: `${selected.a}는 ${selected.b}보다 클까요, 작을까요, 같을까요?`,
                questionType: 'choice',
                answer: answerText,
                choices: ['크다', '작다', '같다'],
                hint: '같은 단위로 바꿔서 비교해보세요'
            });
        } else {
            const a = Math.floor(Math.random() * 50) + 10;
            const b = Math.floor(Math.random() * 50) + 10;
            setQuizData({
                type,
                question: `${a}cm + ${b}cm = ?`,
                answer: a + b,
                hint: '같은 단위끼리 더하세요'
            });
        }

        setUserAnswer('');
        setFeedback(null);
    };

    const [userAnswerCm, setUserAnswerCm] = useState('');

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    const checkAnswer = () => {
        if (!quizData) return;

        let isCorrect = false;

        if (quizData.questionType === 'two_parts') {
            isCorrect = parseInt(userAnswer) === quizData.answer && parseInt(userAnswerCm) === quizData.answerCm;
        } else if (quizData.questionType === 'choice') {
            isCorrect = userAnswer === quizData.answer;
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
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Mode Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <Button onClick={() => setMode('explore')} variant={mode === 'explore' ? 'primary' : 'secondary'}>🔍 단위 변환기</Button>
                <Button onClick={() => setMode('practice')} variant={mode === 'practice' ? 'primary' : 'secondary'}>✏️ 문제 풀기</Button>
            </div>

            {mode === 'explore' ? (
                <>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'Jua, sans-serif' }}>단위 변환기: 길이 📏</h2>
                    <p style={{ marginBottom: '40px', fontSize: '1.2rem', color: '#666' }}>
                        센티미터(cm)가 모이면 미터(m)가 되고, 쪼개지면 밀리미터(mm)가 돼요!
                    </p>

                    <div style={{
                        backgroundColor: '#fff',
                        padding: '40px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px'
                    }}>
                        {/* Visual Bar */}
                        <div style={{ position: 'relative', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '30px', overflow: 'hidden' }}>
                            <motion.div
                                style={{ height: '100%', backgroundColor: '#48dbfb', borderRadius: '30px' }}
                                animate={{ width: `${Math.min(100, (cm / 200) * 100)}%` }}
                            />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold' }}>
                                {cm} cm
                            </div>
                        </div>

                        {/* Input Control */}
                        <div>
                            <input
                                type="range"
                                min="1"
                                max="200"
                                value={cm}
                                onChange={(e) => setCm(Number(e.target.value))}
                                style={{ width: '100%', cursor: 'pointer' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', marginTop: '5px' }}>
                                <span>1cm</span>
                                <span>200cm</span>
                            </div>
                        </div>

                        {/* Converters */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ backgroundColor: '#FFF9C4', padding: '20px', borderRadius: '15px' }}>
                                <h3>미터(m)와 센티미터(cm)</h3>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                                    {m} m {remCm} cm
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>100cm = 1m</p>
                            </div>

                            <div style={{ backgroundColor: '#FFCCBC', padding: '20px', borderRadius: '15px' }}>
                                <h3>밀리미터(mm)</h3>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                                    {mm} mm
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>1cm = 10mm</p>
                            </div>
                        </div>
                    </div>

                    <article style={{ marginTop: '40px', textAlign: 'left', lineHeight: '1.6', backgroundColor: '#E0F7FA', padding: '20px', borderRadius: '15px' }}>
                        <h3>💡 길이 박사님 노트</h3>
                        <ul>
                            <li><strong>1mm (밀리미터)</strong>: 개미만큼 작은 길이. 자의 가장 작은 눈금 하나예요.</li>
                            <li><strong>1cm (센티미터)</strong>: 손톱 너비 정도. 10mm가 모여 1cm가 돼요.</li>
                            <li><strong>1m (미터)</strong>: 양팔을 벌린 길이 정도. 100cm가 모여 1m가 돼요.</li>
                        </ul>
                    </article>
                </>
            ) : (
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'Jua, sans-serif' }}>길이 문제 풀기 📏</h2>
                    {quizData && (
                        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#333' }}>{quizData.question}</h3>

                            {quizData.questionType === 'choice' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                                    {quizData.choices.map(choice => (
                                        <button
                                            key={choice}
                                            onClick={() => setUserAnswer(choice)}
                                            style={{
                                                padding: '15px',
                                                fontSize: '1.3rem',
                                                borderRadius: '10px',
                                                border: userAnswer === choice ? '3px solid #4285F4' : '2px solid #ddd',
                                                backgroundColor: userAnswer === choice ? '#E3F2FD' : 'white',
                                                cursor: 'pointer',
                                                fontWeight: userAnswer === choice ? 'bold' : 'normal'
                                            }}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            ) : quizData.questionType === 'two_parts' ? (
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="미터"
                                        style={{ width: '80px', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', textAlign: 'center' }}
                                    />
                                    <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>m</span>
                                    <input
                                        type="number"
                                        value={userAnswerCm}
                                        onChange={(e) => setUserAnswerCm(e.target.value)}
                                        placeholder="센티"
                                        style={{ width: '80px', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', textAlign: 'center' }}
                                    />
                                    <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>cm</span>
                                </div>
                            ) : (
                                <div style={{ marginBottom: '20px' }}>
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="정답 입력"
                                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                        style={{ width: '100%', padding: '15px', fontSize: '1.5rem', borderRadius: '10px', border: '2px solid #ddd', textAlign: 'center' }}
                                    />
                                </div>
                            )}

                            <Button onClick={checkAnswer} size="large" fullWidth>정답 확인</Button>

                            <AnimatePresence>
                                {feedback === 'correct' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'green', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        정답입니다! 단위 변환을 잘했어요! 👏 (+10 코인)
                                    </motion.div>
                                )}
                                {feedback === 'incorrect' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '20px', color: 'red', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        다시 생각해보세요! 힌트: {quizData.hint}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            )}

            <JsonLd data={generateCourseSchema("길이 단위 변환", "cm, m, mm 단위의 관계를 시각적으로 확인하고 변환 문제를 풉니다.")} />
        </div>
    );
};

export default UnitConverter;
