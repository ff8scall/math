import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import styles from './WorksheetGenerator.module.css';
import { generateProblemData } from '../../utils/math/wordProblemGenerator';

const WorksheetGenerator = () => {
    const { gradeId, grade } = useParams();
    const effectiveGrade = gradeId || grade;

    const [config, setConfig] = useState({
        topic: 'mix', // 'addition', 'subtraction', 'multiplication', 'division', 'mix'
        difficulty: 'basic', // 'basic', 'advanced'
        count: 20,
        title: `${effectiveGrade || ''}학년 수학 학습지`
    });
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        generateWorksheet();
    }, [config.topic, config.count, config.difficulty, effectiveGrade]); // Auto regen on config change

    const generateWorksheet = () => {
        const newProblems = [];
        const types = ['addition', 'subtraction', 'multiplication', 'division'];
        const gradeNum = parseInt(effectiveGrade) || 2;
        const difficulty = config.difficulty;

        for (let i = 0; i < config.count; i++) {
            let type = config.topic;
            if (type === 'mix') {
                type = types[Math.floor(Math.random() * types.length)];
            }

            let p;
            if (type === 'word') {
                const wordData = generateProblemData(gradeNum, difficulty);
                p = { q: wordData.q, isWord: true };
            } else if (gradeNum >= 3 || difficulty === 'advanced') {
                // Higher Difficulty or Advanced mode
                const factor = difficulty === 'advanced' ? 1.5 : 1;
                if (type === 'addition') {
                    p = { n1: Math.floor(Math.random() * 800 * factor) + 100, n2: Math.floor(Math.random() * 800 * factor) + 100, operator: '+' };
                } else if (type === 'subtraction') {
                    let a = Math.floor(Math.random() * 800 * factor) + 200;
                    let b = Math.floor(Math.random() * (a - 100)) + 50;
                    p = { n1: a, n2: b, operator: '-' };
                } else if (type === 'multiplication') {
                    const maxN2 = difficulty === 'advanced' ? 99 : 9;
                    p = { n1: Math.floor(Math.random() * 90 * factor) + 10, n2: Math.floor(Math.random() * maxN2) + 2, operator: '×' };
                } else { // division
                    const maxQuotient = difficulty === 'advanced' ? 50 : 15;
                    let divisor = Math.floor(Math.random() * 10 * factor) + 2;
                    let quotient = Math.floor(Math.random() * maxQuotient) + 2;
                    p = { n1: divisor * quotient, n2: divisor, operator: '÷' };
                }
            } else {
                // Lower Grade Difficulty (1-2)
                if (type === 'addition') {
                    p = { n1: Math.floor(Math.random() * 80) + 10, n2: Math.floor(Math.random() * 80) + 10, operator: '+' };
                } else if (type === 'subtraction') {
                    let a = Math.floor(Math.random() * 90) + 10;
                    let b = Math.floor(Math.random() * (a - 1)) + 1;
                    p = { n1: a, n2: b, operator: '-' };
                } else if (type === 'multiplication') {
                    p = { n1: Math.floor(Math.random() * 8) + 2, n2: Math.floor(Math.random() * 9) + 1, operator: '×' };
                } else { // division
                    let divisor = Math.floor(Math.random() * 8) + 2;
                    let quotient = Math.floor(Math.random() * 9) + 1;
                    p = { n1: divisor * quotient, n2: divisor, operator: '÷' };
                }
            }
            newProblems.push({ ...p, id: i });
        }
        setProblems(newProblems);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.container}>
            {/* Screen-only Controls */}
            <div className={styles.controls}>
                <h2 className={styles.screenTitle}>🖨️ {effectiveGrade}학년 수학 학습지 만들기</h2>
                <div className={styles.configRow}>
                    <label>제목: <input type="text" value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} /></label>
                    <label>종류:
                        <select value={config.topic} onChange={(e) => setConfig({ ...config, topic: e.target.value })}>
                            <option value="mix">연산 모두 섞어서</option>
                            <option value="addition">덧셈</option>
                            <option value="subtraction">뺄셈</option>
                            <option value="multiplication">곱셈</option>
                            <option value="division">나눗셈</option>
                            <option value="word">사고력 문장제</option>
                        </select>
                    </label>
                    <label>난이도:
                        <select value={config.difficulty} onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}>
                            <option value="basic">기본</option>
                            <option value="advanced">심화 도전</option>
                        </select>
                    </label>
                    <label>문제 수:
                        <select value={config.count} onChange={(e) => setConfig({ ...config, count: Number(e.target.value) })}>
                            <option value={10}>10문제</option>
                            <option value={20}>20문제</option>
                            <option value={30}>30문제</option>
                        </select>
                    </label>
                </div>
                <div className={styles.btnRow}>
                    <Button onClick={generateWorksheet} variant="secondary">새로운 문제 만들기</Button>
                    <Button onClick={handlePrint}>인쇄 / PDF 저장</Button>
                </div>
            </div>

            {/* Printable Area (A4 Preview) */}
            <div className={styles.sheetPage} id="printable-area">
                <div className={styles.sheetHeader}>
                    <h1 className={styles.sheetTitle}>{config.title}</h1>
                    <div className={styles.sheetMeta}>
                        <span>이름: _______________</span>
                        <span>날짜: _______________</span>
                        <span>점수: _______ / {config.count}</span>
                    </div>
                </div>

                <div className={`${styles.problemGrid} ${config.topic === 'word' ? styles.wordProblemGrid : ''}`}>
                    {problems.map((p, index) => (
                        <div key={p.id} className={`${styles.problemItem} ${p.isWord ? styles.wordProblemItem : ''}`}>
                            <div className={styles.problemNum}>{index + 1}.</div>
                            {p.isWord ? (
                                <div className={styles.wordContent}>
                                    <div>{p.q}</div>
                                    <div className={styles.wordAnswerSpace}>답: ____________________</div>
                                </div>
                            ) : (
                                <div className={styles.equation}>
                                    {p.n1} {p.operator} {p.n2} =
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.sheetFooter}>
                    매쓰 펫토리 (Math Petory) - 매일매일 조금씩 성장해요!
                </div>
            </div>
        </div>
    );
};

export default WorksheetGenerator;
