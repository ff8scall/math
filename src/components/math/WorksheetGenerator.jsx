import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import styles from './WorksheetGenerator.module.css';

const WorksheetGenerator = () => {
    const [config, setConfig] = useState({
        topic: 'mix', // 'addition', 'subtraction', 'multiplication', 'division', 'mix'
        count: 20,
        title: '나만의 수학 학습지'
    });
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        generateWorksheet();
    }, [config.topic, config.count]); // Auto regen on config change

    const generateProblem = (type) => {
        let n1, n2, operator;
        switch (type) {
            case 'addition':
                n1 = Math.floor(Math.random() * 90) + 10;
                n2 = Math.floor(Math.random() * 90) + 10;
                operator = '+';
                break;
            case 'subtraction':
                n1 = Math.floor(Math.random() * 90) + 10;
                n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
                operator = '-';
                break;
            case 'multiplication':
                n1 = Math.floor(Math.random() * 8) + 2;
                n2 = Math.floor(Math.random() * 9) + 1;
                operator = '×';
                break;
            case 'division':
                n2 = Math.floor(Math.random() * 8) + 2;
                ans = Math.floor(Math.random() * 9) + 1;
                n1 = n2 * ans;
                operator = '÷';
                break;
            default:
                n1 = 0; n2 = 0; operator = '?';
        }
        return { n1, n2, operator };
    };

    const generateWorksheet = () => {
        const newProblems = [];
        const types = ['addition', 'subtraction', 'multiplication', 'division'];

        for (let i = 0; i < config.count; i++) {
            let type = config.topic;
            if (type === 'mix') {
                type = types[Math.floor(Math.random() * types.length)];
            }
            // Fix for 'division' variable scope issue in generateProblem if pasted directly
            // Extracting logic cleanly:
            let p;
            if (type === 'division') {
                let divisor = Math.floor(Math.random() * 8) + 2;
                let quotient = Math.floor(Math.random() * 9) + 1;
                p = { n1: divisor * quotient, n2: divisor, operator: '÷' };
            } else if (type === 'multiplication') {
                p = { n1: Math.floor(Math.random() * 8) + 2, n2: Math.floor(Math.random() * 9) + 1, operator: '×' };
            } else if (type === 'subtraction') {
                let a = Math.floor(Math.random() * 90) + 10;
                let b = Math.floor(Math.random() * (a - 1)) + 1;
                p = { n1: a, n2: b, operator: '-' };
            } else { // addition
                p = { n1: Math.floor(Math.random() * 90) + 10, n2: Math.floor(Math.random() * 90) + 10, operator: '+' };
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
                <h2 className={styles.screenTitle}>🖨️ 학습지 만들기 도구</h2>
                <div className={styles.configRow}>
                    <label>제목: <input type="text" value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} /></label>
                    <label>과목:
                        <select value={config.topic} onChange={(e) => setConfig({ ...config, topic: e.target.value })}>
                            <option value="mix">모두 섞어서</option>
                            <option value="addition">덧셈</option>
                            <option value="subtraction">뺄셈</option>
                            <option value="multiplication">곱셈</option>
                            <option value="division">나눗셈</option>
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

                <div className={styles.problemGrid}>
                    {problems.map((p, index) => (
                        <div key={p.id} className={styles.problemItem}>
                            <div className={styles.problemNum}>{index + 1}.</div>
                            <div className={styles.equation}>
                                {p.n1} {p.operator} {p.n2} =
                            </div>
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
