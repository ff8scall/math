import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import Button from '../common/Button';
import PageHeader from '../common/PageHeader';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import styles from './MathQuiz.module.css';
import { generateProblemData } from '../../utils/math/wordProblemGenerator';

const WordProblemQuiz = () => {
    const { gradeId } = useParams();
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [started, setStarted] = useState(false);
    const [difficulty, setDifficulty] = useState('mixed');

    const generateProblem = (forcedDifficulty) => {
        const effectiveGrade = parseInt(gradeId) || 1;
        const targetDiff = forcedDifficulty || difficulty;
        const newProblem = generateProblemData(effectiveGrade, targetDiff);

        setProblem(newProblem);
        setUserAnswer('');
        setFeedback(null);
        setShowHint(false);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (started) {
            generateProblem();
        }
    }, [gradeId, started]);

    const startWithDifficulty = (diff) => {
        setDifficulty(diff);
        setStarted(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userAnswer) return;

        const normalize = (val) => val.toString().replace(/\s/g, '').split(',').sort().join(',');
        const isCorrect = normalize(userAnswer) === normalize(problem.ans);

        if (isCorrect) {
            const reward = difficulty === 'advanced' ? 25 : 10;
            setFeedback('correct');
            setScore(score + reward);
            updateCoins(reward);
            confetti();
        } else {
            setFeedback('incorrect');
        }
    };

    const strategiesByGrade = {
        '1': [
            { id: 'count', icon: '🔢', title: '순서 가로채기', principle: '앞에서 몇 번째인지, 그 앞에 몇 명이 있는지 구별해요.', example: '5번째라면 내 앞에는 4명이 있어요!' },
            { id: 'compare', icon: '⚖️', title: '비교 논리', principle: 'A>B, B>C 라면 A가 가장 크다는 것을 논리로 풀어요.', example: '사과 > 포도, 포도 > 귤 이면 사과가 최고!' }
        ],
        '2': [
            { id: 'cards', icon: '🃏', title: '카드 수 만들기', principle: '가장 큰 자리부터 큰 숫자를 채워 넣으세요.', example: '0, 1, 9 카드로 만든 가장 큰 수는 910!' },
            { id: 'time', icon: '⏰', title: '시간의 흐름', principle: '시침은 숫자를 지나고, 분침은 칸을 세어 이동해요.', example: '2시 45분에서 15분 전은 2시 30분!' }
        ],
        '3': [
            { id: 'reverse', icon: '🔄', title: '거꾸로 계산', principle: '결과에서 처음으로 돌아가요. 부호를 반대로 바꿔요!', example: '□ + 5 = 10 이면 □ = 10 - 5 = 5' },
            { id: 'divide', icon: '➗', title: '나누기의 비밀', principle: '똑같이 나눠 갖거나, 덜어내어 횟수를 세어보세요.', example: '사탕 12개를 3명이면 12÷3=4개씩!' }
        ],
        '4': [
            { id: 'large', icon: '💎', title: '억과 조의 세계', principle: '자릿수가 많을 땐 4개씩 끊어서 읽으세요.', example: '1,3200,5000 -> 1억 3200만 5000' },
            { id: 'angle', icon: '📐', title: '각도의 마법', principle: '삼각형 합은 180도, 사각형은 360도임을 이용해요.', example: '두 각이 60,70도면 나머지는 180-130=50도' }
        ],
        '5': [
            { id: 'lcm', icon: '⚙️', title: '약수와 배수', principle: '최대공약수와 최소공배수의 원리를 문장에서 찾아내요.', example: '함께 출발하는 시각 = 도착 주기의 최소공배수!' },
            { id: 'area', icon: '⬛', title: '도형의 면적', principle: '사다리꼴 넓이는 (윗변+아랫변) × 높이 ÷ 2 예요.', example: '복잡한 도형은 사각형에서 삼각형을 빼보세요.' }
        ],
        '6': [
            { id: 'ratio', icon: '📊', title: '비와 비율', principle: '전체에 대한 부분을 백분율(%)로 계산해요.', example: '정가 2만원-15%할인=17,000원!' },
            { id: 'circle', icon: '⭕', title: '원의 마법', principle: '반지름 × 반지름 × 3.14로 면적을 구해요.', example: '원주(둘레)는 지름 × 3.14 예요.' }
        ]
    };

    const currentStrategies = strategiesByGrade[gradeId] || strategiesByGrade['1'];

    if (!started) {
        return (
            <div className={styles.container}>
                <PageHeader title={`${gradeId}학년 문장제 도전! 🚀`} />
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.prepCard}
                >
                    <div className={styles.prepBadge}>준비하고 시작해요</div>
                    <h2 className={styles.prepTitle}>{gradeId}학년 사고력 수학 교실</h2>
                    <p className={styles.prepDesc}>어려운 문제를 풀기 전에 핵심 전략을 복습해 보세요.</p>
                    
                    <div className={styles.hardStrategyList}>
                        {currentStrategies.map(s => (
                            <div key={s.id} className={styles.hardStrategyItem}>
                                <div className={styles.sIcon}>{s.icon}</div>
                                <div className={styles.sContent}>
                                    <h4>{s.title}</h4>
                                    <p>{s.principle}</p>
                                    <div className={styles.sExample}>예: {s.example}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.modeSelection}>
                        <div className={styles.modeSectionHeader}>난이도를 선택하세요</div>
                        <div className={styles.modeGrid}>
                            <button className={`${styles.modeBtn} ${styles.basic}`} onClick={() => startWithDifficulty('basic')}>
                                <div className={styles.modeIcon}>🛡️</div>
                                <div className={styles.modeInfo}>
                                    <strong>기초 다지기</strong>
                                    <span>교과서 위주의 기본 문제</span>
                                    <div className={styles.rewardTag}>보상: 10코인</div>
                                </div>
                            </button>
                            <button className={`${styles.modeBtn} ${styles.advanced}`} onClick={() => startWithDifficulty('advanced')}>
                                <div className={styles.modeIcon}>🏆</div>
                                <div className={styles.modeInfo}>
                                    <strong>심화 도전</strong>
                                    <span>사고력을 키우는 어려운 문제</span>
                                    <div className={styles.rewardTag}>보상: 25코인</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <PageHeader />
                <div className={styles.scoreBadge}>점수: {score}</div>
            </div>

            {problem && (
                <div className={styles.quizCard}>
                    <div className={styles.problemWrapper}>
                        <div className={styles.wordProblemText}>{problem.q}</div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.answerForm}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className={`${styles.input} ${feedback === 'incorrect' ? styles.error : ''}`}
                                placeholder="정답 입력"
                                autoFocus
                                disabled={feedback === 'correct'}
                            />
                            {feedback === 'correct' && <CheckCircle2 className={styles.correctIcon} color="#2ecc71" />}
                        </div>
                        
                        <div className={styles.actionButtons}>
                            {feedback !== 'correct' && (
                                <Button type="submit" fullWidth size="large" variant="primary">정답 제출</Button>
                            )}
                            {feedback === 'correct' && (
                                <Button onClick={() => generateProblem()} fullWidth size="large" variant="primary">다음 문제 풀기 ➔</Button>
                            )}
                        </div>
                    </form>

                    <div className={styles.helperSection}>
                        {!showHint && feedback !== 'correct' && (
                            <Button type="button" onClick={() => setShowHint(true)} variant="ghost" fullWidth size="small">
                                <Lightbulb size={18} /> 💡 힌트 보기
                            </Button>
                        )}
                        
                        <AnimatePresence>
                            {showHint && !showAnswer && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={styles.hintBox}
                                >
                                    <span className={styles.hintIcon}>💡</span>
                                    <div>
                                        <strong>힌트:</strong> {problem.hint || "문제를 다시 한번 천천히 읽어보세요."}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {feedback === 'incorrect' && !showAnswer && (
                            <div className={styles.retryPrompt}>
                                <AlertCircle size={16} color="#e74c3c" />
                                <span>다시 대답해 볼까요? 어려우면 정답을 확인해 보세요.</span>
                                <Button onClick={() => setShowAnswer(true)} variant="ghost" size="small">정답 확인</Button>
                            </div>
                        )}

                        {feedback === 'correct' && !showAnswer && (
                            <div className={styles.retryPrompt}>
                                <Button onClick={() => setShowAnswer(true)} variant="ghost" size="small">풀이 과정 보기</Button>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {feedback === 'correct' && (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={styles.feedbackCorrect}
                            >
                                🎉 대단해요! 정확한 계산리에요. (+{difficulty === 'advanced' ? 25 : 10} 코인)
                            </motion.div>
                        )}
                        
                        {showAnswer && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={styles.explanationSection}
                            >
                                <div className={styles.explanationBox}>
                                    <div className={styles.ansHeader}><Info size={18} /> 정답 및 해설</div>
                                    <p className={styles.finalAns}><strong>정답:</strong> {problem.ans}</p>
                                    <div className={styles.expContent}>{problem.exp}</div>
                                </div>
                                {feedback !== 'correct' && (
                                    <Button onClick={() => generateProblem()} variant="primary">다음 문제 풀기</Button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default WordProblemQuiz;
