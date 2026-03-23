import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { updateCoins, getActiveMultiplier } from '../utils/storage/storageManager';
import styles from './MathGame.module.css';
import confetti from 'canvas-confetti';
import { Timer, Trophy, Star, Zap, ArrowLeft } from 'lucide-react';

const MathGame = () => {
    const { gradeId } = useParams();
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [combo, setCombo] = useState(0);
    const [problem, setProblem] = useState(null);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'

    // 문제 생성 로직
    const generateProblem = useCallback(() => {
        const grade = parseInt(gradeId);
        let num1, num2, op, answer;

        if (grade === 1) {
            // 1학년: 20 이하의 덧셈/뺄셈
            op = Math.random() > 0.5 ? '+' : '-';
            if (op === '+') {
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
                answer = num1 + num2;
            } else {
                num1 = Math.floor(Math.random() * 10) + 10;
                num2 = Math.floor(Math.random() * num1) + 1;
                answer = num1 - num2;
            }
        } else if (grade === 2) {
            // 2학년: 두 자리 수 덧셈/뺄셈 또는 구구단(2~5단)
            if (Math.random() > 0.5) {
                op = Math.random() > 0.5 ? '+' : '-';
                num1 = Math.floor(Math.random() * 50) + 10;
                num2 = Math.floor(Math.random() * 40) + 10;
                answer = op === '+' ? num1 + num2 : num1 - (num1 > num2 ? num2 : Math.floor(num1 / 2));
            } else {
                op = '×';
                num1 = Math.floor(Math.random() * 4) + 2;
                num2 = Math.floor(Math.random() * 9) + 1;
                answer = num1 * num2;
            }
        } else if (grade === 3) {
            // 3학년: 구구단 전체, 세 자리 수 덧셈
            if (Math.random() > 0.4) {
                op = '×';
                num1 = Math.floor(Math.random() * 8) + 2;
                num2 = Math.floor(Math.random() * 9) + 1;
                answer = num1 * num2;
            } else {
                op = '/';
                num2 = Math.floor(Math.random() * 8) + 2;
                answer = Math.floor(Math.random() * 9) + 1;
                num1 = num2 * answer;
            }
        } else if (grade === 4) {
            // 4학년: 큰 수 곱셈/나눗셈 기초
            op = Math.random() > 0.5 ? '×' : '÷';
            if (op === '×') {
                num1 = Math.floor(Math.random() * 40) + 11;
                num2 = Math.floor(Math.random() * 9) + 2;
                answer = num1 * num2;
            } else {
                num2 = Math.floor(Math.random() * 12) + 2;
                answer = Math.floor(Math.random() * 20) + 5;
                num1 = num2 * answer;
            }
        } else {
            // 5, 6학년: 소수/분수 개념 포함 (여기선 정수형 심화로 대체)
            op = Math.random() > 0.5 ? '×' : '÷';
            if (op === '×') {
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 19) + 2;
                answer = num1 * num2;
            } else {
                num2 = Math.floor(Math.random() * 15) + 5;
                answer = Math.floor(Math.random() * 50) + 10;
                num1 = num2 * answer;
            }
        }

        const newProblem = { text: `${num1} ${op} ${num2}`, answer };
        setProblem(newProblem);

        // 보기 생성
        const opts = [answer];
        while (opts.length < 4) {
            let offset = Math.floor(Math.random() * 11) - 5;
            if (offset === 0) offset = 1;
            const wrong = answer + offset;
            if (wrong > 0 && !opts.includes(wrong)) opts.push(wrong);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
        setFeedback(null);
    }, [gradeId]);

    // 게임 시작
    const startGame = () => {
        setScore(0);
        setTimeLeft(60);
        setCombo(0);
        setGameState('playing');
        generateProblem();
    };

    // 정답 체크
    const handleAnswer = (selected) => {
        if (feedback) return; // 연속 클릭 방지

        if (selected === problem.answer) {
            setFeedback('correct');
            const bonus = combo >= 5 ? 20 : 10;
            setScore(prev => prev + bonus);
            setCombo(prev => prev + 1);
            setTimeout(generateProblem, 200);
        } else {
            setFeedback('wrong');
            setCombo(0);
            setTimeout(generateProblem, 500);
        }
    };

    // 타이머
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameState('result');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);

    // 결과 화면에서 코인 지급
    useEffect(() => {
        if (gameState === 'result') {
            const multiplier = getActiveMultiplier();
            const coins = Math.floor(score * multiplier);
            updateCoins(coins);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [gameState, score]);

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Button onClick={() => navigate(-1)} variant="ghost" size="small"><ArrowLeft size={16} /> 뒤로</Button>
                <div className={styles.stats}>
                    <span className={styles.timer}><Timer size={20} /> {timeLeft}s</span>
                    <span className={styles.score}><Trophy size={20} /> {score}</span>
                    {combo >= 5 && <span className={styles.combo}><Zap size={20} /> FEVER!</span>}
                </div>
            </div>

            {gameState === 'start' && (
                <div className={styles.startScreen}>
                    <div className={styles.startIcon}>🏁</div>
                    <h1 className={styles.startTitle}>{gradeId}학년 수학 레이스</h1>
                    <p>60초 동안 최대한 많은 문제를 풀어보세요!<br />5연속 정답 시 보너스 점수가 있어요!</p>
                    <Button onClick={startGame} size="large" fullWidth>게임 시작!</Button>
                </div>
            )}

            {gameState === 'playing' && problem && (
                <div className={styles.gameArea}>
                    <div className={styles.problem}>
                        {problem.text} = ?
                    </div>
                    <div className={styles.options}>
                        {options.map((opt, i) => (
                            <button
                                key={i}
                                className={`${styles.optionBtn} ${feedback === 'correct' && opt === problem.answer ? styles.correct : ''} ${feedback === 'wrong' && opt !== problem.answer && opt === problem.lastSelected ? styles.wrong : ''}`}
                                onClick={() => handleAnswer(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                    {combo > 0 && <div className={styles.comboBadge}>{combo} COMBO! 🔥</div>}
                </div>
            )}

            {gameState === 'result' && (
                <div className={styles.resultScreen}>
                    <Star size={60} color="#ffd700" />
                    <h2 className={styles.resultTitle}>게임 종료!</h2>
                    <p className={styles.finalScore}>최종 점수: {score}점</p>
                    <p className={styles.coinEarned}>💰 획득 코인: {Math.floor(score * getActiveMultiplier())}코인</p>
                    {getActiveMultiplier() > 1 && <p className={styles.buffText}>(펫 버프 {getActiveMultiplier().toFixed(1)}배 적용됨!)</p>}
                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                        <Button onClick={startGame} variant="primary" fullWidth>다시 하기</Button>
                        <Button onClick={() => navigate(-1)} variant="secondary" fullWidth>목차로</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MathGame;
