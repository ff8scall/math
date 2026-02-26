import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../common/Button';
import PageHeader from '../common/PageHeader';
import styles from './WordProblemWorksheet.module.css';
import { generateProblemData } from '../../utils/math/wordProblemGenerator';

const WordProblemWorksheet = () => {
    const { gradeId } = useParams();
    const [problems, setProblems] = useState([]);
    const [date] = useState(new Date().toLocaleDateString('ko-KR'));

    const generateOneProblem = (grade) => {
        const gradeNum = parseInt(grade) || 1;
        return generateProblemData(gradeNum);
    };

    const generateWorksheet = () => {
        const newProblems = [];
        const currentGrade = gradeId || "1";
        for (let i = 0; i < 6; i++) {
            newProblems.push({ id: i + 1, ...generateOneProblem(currentGrade) });
        }
        setProblems(newProblems);
    };

    useEffect(() => {
        generateWorksheet();
    }, [gradeId]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.container}>
            <div className={styles.noPrint}>
                <PageHeader title={`${gradeId || '1'}학년 심화 문장제 학습지 🖨️`} />
                <p>문장형 문제를 종이에 직접 풀며 사고력을 키워보세요.</p>
                <div className={styles.actions}>
                    <Button onClick={generateWorksheet} variant="secondary">문제 새로 만들기</Button>
                    <Button onClick={handlePrint} variant="primary">출력 / PDF 저장</Button>
                </div>
            </div>

            <div className={styles.worksheet}>
                <div className={styles.wsHeader}>
                    <div className={styles.wsTitle}>{gradeId || '1'}학년 수학 심화 문장제</div>
                    <div className={styles.wsMeta}>
                        <span>날짜: {date}</span>
                        <span>이름: ______________</span>
                    </div>
                </div>

                <div className={styles.problemList}>
                    {problems.map((p) => (
                        <div key={p.id} className={styles.problemItem}>
                            <div className={styles.problemTop}>
                                <span className={styles.pNum}>{p.id}.</span>
                                <div className={styles.pContent}>{p.q}</div>
                            </div>
                            <div className={styles.answerSpace}>
                                <div className={styles.solutionLine}>식: __________________________________________________</div>
                                <div className={styles.answerLine}>답: _______________________</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.wsFooter}>
                    매쓰 펫토리(Math Petory) - 문장을 읽고 이해하는 힘!
                </div>
            </div>

            <div className={`${styles.worksheet} ${styles.answerKey}`}>
                <h2 className={styles.wsTitle}>[ 정답지 ]</h2>
                <div className={styles.answerGrid}>
                    {problems.map(p => (
                        <div key={p.id} className={styles.aItem}>
                            <strong>{p.id}번:</strong> {p.ans} ({p.exp})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WordProblemWorksheet;
