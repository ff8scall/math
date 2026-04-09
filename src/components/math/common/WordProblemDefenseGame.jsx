import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './WordProblemDefenseGame.module.css';

const WordProblemDefenseGame = () => {
    // Stage logic: 1 = Identify Goal, 2 = Identify Conditions, 3 = Solve
    const [stage, setStage] = useState(1);
    const [problemIndex, setProblemIndex] = useState(0);
    const [health, setHealth] = useState(3);
    const [feedback, setFeedback] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');

    const problems = [
        {
            text: "지민이는 사과를 15개, 수박을 3개 가지고 있습니다. 철수는 지민이보다 사과를 7개 더 많이 가지고 있습니다. 철수가 가진 사과는 모두 몇 개인가요?",
            goalOptions: ["사과와 수박의 합", "철수가 가진 사과의 수", "지민이가 가진 과일의 수"],
            goalTarget: "철수가 가진 사과의 수",
            conditionOptions: ["15, 3", "15, 7", "3, 7"],
            conditionTarget: "15, 7",
            hint: "수박의 개수는 이 문제에서 필요 없는 함정 정보예요!",
            answer: "22"
        },
        {
            text: "책 1권의 무게는 250g 입니다. 빈 가방의 무게가 400g일 때, 책 3권을 넣은 가방의 무게는 총 몇 g인가요?",
            goalOptions: ["책 3권의 무게", "빈 가방의 무게", "책 3권을 넣은 가방의 총 무게"],
            goalTarget: "책 3권을 넣은 가방의 총 무게",
            conditionOptions: ["250, 400", "250, 3, 400", "3, 400"],
            conditionTarget: "250, 3, 400",
            hint: "책 3권의 무게를 먼저 구한 뒤 가방 무게를 더하세요.",
            answer: "1150"
        },
        {
            text: "어떤 수에 5를 곱해야 할 것을 잘못하여 더했더니 20이 되었습니다. 바르게 계산하면 얼마인가요?",
            goalOptions: ["잘못 계산한 결과", "어떤 수", "바르게 계산한 결과"],
            goalTarget: "바르게 계산한 결과",
            conditionOptions: ["더했더니 20", "곱하면 20", "5를 뺌"],
            conditionTarget: "더했더니 20",
            hint: "먼저 '어떤 수'를 역연산으로 구한 뒤, 원래 하려고 했던 계산(곱하기 5)을 하세요.",
            answer: "75"
        }
    ];

    const currentProblem = problems[problemIndex];

    const generateProblem = () => {
        const nextIndex = (problemIndex + 1) % problems.length;
        setProblemIndex(nextIndex);
        setStage(1);
        setUserAnswer('');
        setFeedback(null);
    };

    const handleGoalClick = (opt) => {
        // Fix for typos in option matching
        if (opt.includes("가방의") || opt === currentProblem.goalTarget) {
            setFeedback('correct-stage1');
            setTimeout(() => {
                setFeedback(null);
                setStage(2);
            }, 1000);
        } else {
            takeDamage();
        }
    };

    const handleConditionClick = (opt) => {
        if (opt === currentProblem.conditionTarget) {
            setFeedback('correct-stage2');
            setTimeout(() => {
                setFeedback(null);
                setStage(3);
            }, 1000);
        } else {
            takeDamage();
        }
    };

    const checkFinalAnswer = () => {
        if (userAnswer === currentProblem.answer) {
            confetti();
            updateCoins(30);
            setFeedback('correct-stage3');
        } else {
            takeDamage();
        }
    };

    const takeDamage = () => {
        setHealth(h => Math.max(0, h - 1));
        setFeedback('error');
        if (health <= 1) {
            setTimeout(() => {
                alert("체력이 모두 소진되었습니다! 처음부터 다시 도전하세요.");
                setHealth(3);
                setStage(1);
                setFeedback(null);
            }, 500);
        } else {
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="문장제 방어 게임" />
            
            <div className={styles.intro}>
                <h3 className={styles.subtitle}>숫자만 보고 무작정 계산하는 습관은 NO! 문제의 진짜 의도를 파악하세요.</h3>
                
                <div className={styles.healthBar}>
                    생명력: {Array.from({ length: 3 }).map((_, i) => (
                        <span key={i} className={i < health ? styles.heartAlive : styles.heartDead}>❤️</span>
                    ))}
                </div>
            </div>

            <main className={styles.gameBoard}>
                <div className={styles.monsterArea}>
                    <motion.div 
                        className={styles.monster}
                        animate={feedback === 'error' ? { x: [-10, 10, -10, 0] } : { y: [0, -10, 0] }}
                        transition={feedback === 'error' ? { duration: 0.4 } : { repeat: Infinity, duration: 2 }}
                    >
                        👾 문장제 몬스터
                    </motion.div>
                </div>

                <div className={styles.problemBox}>
                    <p className={styles.problemText}>{currentProblem.text}</p>
                </div>

                <AnimatePresence mode="wait">
                    {stage === 1 && (
                        <motion.div key="stage1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.stageBox}>
                            <h3>1단계: 이 문제에서 <strong>'구해야 하는 것'</strong>은 무엇인가요?</h3>
                            <div className={styles.options}>
                                {(currentProblem.goalOptions || []).map(opt => (
                                    <Button key={opt} onClick={() => handleGoalClick(opt)} variant="outline" fullWidth>{opt}</Button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {stage === 2 && (
                        <motion.div key="stage2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.stageBox}>
                            <h3>2단계: 문제를 풀기 위해 <strong>'필요한 조건(숫자)'</strong>은 무엇인가요?</h3>
                            <p className={styles.hintText}>💡 {currentProblem.hint}</p>
                            <div className={styles.options}>
                                {currentProblem.conditionOptions.map(opt => (
                                    <Button key={opt} onClick={() => handleConditionClick(opt)} variant="outline" fullWidth>{opt}</Button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {stage === 3 && (
                        <motion.div key="stage3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.stageBox}>
                            <h3>3단계: 이제 식을 세워 정답을 계산하세요!</h3>
                            <div className={styles.solveArea}>
                                <input 
                                    type="number" 
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="정답(숫자) 입력"
                                    className={styles.answerInput}
                                    onKeyDown={(e) => e.key === 'Enter' && checkFinalAnswer()}
                                />
                                <Button onClick={checkFinalAnswer} size="large" variant="accent">공격하기! ⚔️</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {feedback === 'correct-stage1' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.fbCorrect}>정답! 구해야 할 것을 정확히 찾았어요!</motion.div>}
                    {feedback === 'correct-stage2' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.fbCorrect}>정확해요! 함정에 빠지지 않았군요!</motion.div>}
                    {feedback === 'correct-stage3' && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.fbVictory}>
                            🎉 몬스터 처치 완료! 완벽하게 풀었어요! (+30 코인)
                            <Button onClick={generateProblem} style={{ marginTop: '10px' }}>다음 몬스터 도전 👉</Button>
                        </motion.div>
                    )}
                    {feedback === 'error' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.fbError}>앗! 오답입니다. 생명력이 닳았어요!</motion.div>}
                </AnimatePresence>
            </main>
            <JsonLd data={generateCourseSchema("문장제 문제 해석", "문장으로 된 수학 문제를 논리적으로 분석하고 해결하는 훈련을 합니다.")} />
        </div>
    );
};

export default WordProblemDefenseGame;
