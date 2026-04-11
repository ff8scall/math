import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../common/Button';
import PageHeader from '../common/PageHeader';
import styles from './MathWorksheet.module.css';

const MathWorksheet = () => {
    const { grade } = useParams();
    const [problems, setProblems] = useState([]);
    const [date] = useState(new Date().toLocaleDateString('ko-KR'));

    const generateProblems = (g) => {
        const newProblems = [];
        for (let i = 1; i <= 20; i++) {
            let q, a;
            const gradeNum = parseInt(g);

            if (gradeNum === 1) {
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                if (Math.random() > 0.5) {
                    q = `${n1} + ${n2} = (   )`;
                    a = n1 + n2;
                } else {
                    const max = Math.max(n1, n2);
                    const min = Math.min(n1, n2);
                    q = `${max} - ${min} = (   )`;
                    a = max - min;
                }
            } else if (gradeNum === 2) {
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `${n1} × ${n2} = (   )`;
                a = n1 * n2;
            } else if (gradeNum === 3) {
                // Grade 3: Three-digit arithmetic
                const n1 = Math.floor(Math.random() * 800) + 100;
                const n2 = Math.floor(Math.random() * 800) + 100;
                if (Math.random() > 0.5) {
                    q = `${n1} + ${n2} = (   )`;
                    a = n1 + n2;
                } else {
                    const bigger = Math.max(n1, n2);
                    const smaller = Math.min(n1, n2);
                    q = `${bigger} - ${smaller} = (   )`;
                    a = bigger - smaller;
                }
            } else if (gradeNum === 4) {
                const n1 = Math.floor(Math.random() * 900) + 100;
                const n2 = Math.floor(Math.random() * 9) + 2;
                q = `${n1} × ${n2} = (   )`;
                a = n1 * n2;
            } else if (gradeNum === 5) {
                const d1 = Math.floor(Math.random() * 5) + 2;
                const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
                const d2 = Math.floor(Math.random() * 5) + 2;
                const n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
                q = `${n1}/${d1} + ${n2}/${d2} = (   )`;
                a = "계산해보기";
            } else if (gradeNum === 6) {
                const v1 = (Math.floor(Math.random() * 50) + 10) / 10;
                const v2 = (Math.floor(Math.random() * 8) + 2) / 10;
                q = `${v1} ÷ ${v2} = (   )`;
                a = (v1 / v2).toFixed(1);
            } else {
                q = `수학 연습 문제 ${i}`;
                a = "정답";
            }

            newProblems.push({ id: i, q, a });
        }
        setProblems(newProblems);
    };

    useEffect(() => {
        generateProblems(grade);
    }, [grade]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.noPrint}>
                <Link to={`/grade/${grade}`} className={styles.back}>← 돌아가기</Link>
                    <h2 className={styles.configTitle}>{grade}학년 수학 학습지 생성 🖨️</h2>
                <p>프린터로 출력하거나 PDF로 저장하여 종이로 풀어보세요.</p>
                <div className={styles.actions}>
                    <Button onClick={() => generateProblems(grade)} variant="secondary">문제 새로고침</Button>
                    <Button onClick={handlePrint} variant="primary">출력하기 (PDF 저장)</Button>
                </div>
            </div>

            <div className={styles.worksheet}>
                <div className={styles.wsHeader}>
                    <div className={styles.wsTitle}>{grade}학년 수학 단원평가 (연습용)</div>
                    <div className={styles.wsMeta}>
                        <span>날짜: {date}</span>
                        <span>이름: ______________</span>
                        <span>점수: ______ / 100</span>
                    </div>
                </div>

                <div className={styles.problemGrid}>
                    {problems.map((p) => (
                        <div key={p.id} className={styles.pItem}>
                            <span className={styles.pNum}>{p.id}.</span>
                            <span className={styles.pContent}>{p.q}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.wsFooter}>
                    ⓒ 매쓰 펫토리 (Math Petory) - 스스로 공부하는 힘
                </div>
            </div>

            {/* Answer Key (Optional, printed on second page or separate) */}
            <div className={`${styles.worksheet} ${styles.answerKey}`}>
                <h2 className={styles.wsTitle}>[ 정답지 ]</h2>
                <div className={styles.answerGrid}>
                    {problems.map(p => (
                        <div key={p.id} className={styles.aItem}>
                            {p.id}번: {p.a}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MathWorksheet;
