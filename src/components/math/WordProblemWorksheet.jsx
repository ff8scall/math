import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../common/Button';
import styles from './WordProblemWorksheet.module.css';

const WordProblemWorksheet = () => {
    const { gradeId } = useParams();
    const [problems, setProblems] = useState([]);
    const [date] = useState(new Date().toLocaleDateString('ko-KR'));

    const generateOneProblem = (grade) => {
        let q = '', ans = '', exp = '';
        const gradeNum = parseInt(grade);

        if (gradeNum === 1) {
            const types = ['addition', 'subtraction', 'comparison'];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['철수', '영희', '민수', '지수', '수지', '민아', '도겸', '호시'];
            const items = ['사과', '포도', '구슬', '장난감', '딱지', '사탕', '연필'];
            const name1 = names[Math.floor(Math.random() * names.length)];
            const name2 = names[(names.indexOf(name1) + 1) % names.length];
            const item = items[Math.floor(Math.random() * items.length)];

            if (type === 'addition') {
                const n1 = Math.floor(Math.random() * 9) + 1;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `${name1}는 ${item}를 ${n1}개 가지고 있고, ${name2}는 ${item}를 ${n2}개 가지고 있습니다. 두 사람이 가진 ${item}는 모두 몇 개인가요?`;
                ans = (n1 + n2).toString();
                exp = `${n1} + ${n2} = ${ans}입니다.`;
            } else {
                const n1 = Math.floor(Math.random() * 8) + 10;
                const n2 = Math.floor(Math.random() * 9) + 1;
                q = `나무 위에 새가 ${n1}마리 앉아 있었습니다. 그중에서 ${n2}마리가 하늘로 날아갔습니다. 남은 새는 몇 마리인가요?`;
                ans = (n1 - n2).toString();
                exp = `${n1} - ${n2} = ${ans}입니다.`;
            }
        } else if (gradeNum === 2) {
            const types = ['length', 'multiplication', 'complex-arithmetic'];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['민호', '유진', '서준', '하은', '도윤', '채원', '사쿠라', '카즈하'];
            const name1 = names[Math.floor(Math.random() * names.length)];

            if (type === 'length') {
                const m = Math.floor(Math.random() * 3) + 1;
                const cm = Math.floor(Math.random() * 80) + 10;
                const addCm = Math.floor(Math.random() * 50) + 20;
                q = `${name1}의 키는 ${m}m ${cm}cm입니다. 작년보다 ${addCm}cm가 더 컸다면, 작년 ${name1}의 키는 몇 cm였나요?`;
                ans = (m * 100 + cm - addCm).toString();
                exp = `${m}m ${cm}cm는 ${m * 100 + cm}cm입니다. 여기서 ${addCm}cm를 빼면 ${ans}cm가 됩니다.`;
            } else if (type === 'multiplication') {
                const bags = Math.floor(Math.random() * 7) + 3;
                const perBag = Math.floor(Math.random() * 8) + 2;
                q = `사과가 한 봉지에 ${perBag}개씩 들어있습니다. 이런 봉지가 ${bags}봉지 있다면, 사과는 모두 몇 개인가요?`;
                ans = (bags * perBag).toString();
                exp = `${perBag} × ${bags} = ${ans}개입니다.`;
            } else {
                const n1 = Math.floor(Math.random() * 40) + 30;
                const n2 = Math.floor(Math.random() * 20) + 10;
                const n3 = Math.floor(Math.random() * 15) + 5;
                q = `버스에 사람이 ${n1}명 타고 있었습니다. 정류장에서 ${n2}명이 내리고 ${n3}명이 새로 탔습니다. 지금 버스에 타고 있는 사람은 몇 명인가요?`;
                ans = (n1 - n2 + n3).toString();
                exp = `${n1} - ${n2} + ${n3} = ${ans}명입니다.`;
            }
        } else if (gradeNum === 3) {
            const types = ['multi-div', 'fraction-basic', 'measurement'];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['지아', '우진', '소윤', '준우', '예은', '하니', '민지', '혜인'];
            const name1 = names[Math.floor(Math.random() * names.length)];

            if (type === 'multi-div') {
                const total = [24, 30, 36, 42, 48, 56, 64][Math.floor(Math.random() * 7)];
                const split = [3, 4, 6, 8][Math.floor(Math.random() * 4)];
                q = `사탕 ${total}개를 친구 ${split}명에게 똑같이 나누어 주려고 합니다. 한 명에게 몇 개씩 줄 수 있을까요?`;
                ans = (total / split).toString();
                exp = `${total} ÷ ${split} = ${ans}입니다.`;
            } else {
                const h = Math.floor(Math.random() * 2) + 1;
                const m = Math.floor(Math.random() * 30) + 10;
                q = `영화가 시작된 지 ${h}시간 ${m}분이 지났습니다. ${h}시간 ${m}분은 모두 몇 분인가요?`;
                ans = (h * 60 + m).toString();
                exp = `${h}시간 ${m}분 = ${h * 60} + ${m} = ${ans}분입니다.`;
            }
        }
        return { q, ans, exp };
    };

    const generateWorksheet = () => {
        const newProblems = [];
        for (let i = 0; i < 8; i++) {
            newProblems.push({ id: i + 1, ...generateOneProblem(gradeId) });
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
                <Link to={`/grade/${gradeId}`} className={styles.backLink}>← 돌아가기</Link>
                <h1>{gradeId}학년 심화 문장제 학습지 🖨️</h1>
                <p>문장형 문제를 종이에 직접 풀며 사고력을 키워보세요.</p>
                <div className={styles.actions}>
                    <Button onClick={generateWorksheet} variant="secondary">문제 새로 만들기</Button>
                    <Button onClick={handlePrint} variant="primary">출력 / PDF 저장</Button>
                </div>
            </div>

            <div className={styles.worksheet}>
                <div className={styles.wsHeader}>
                    <div className={styles.wsTitle}>{gradeId}학년 수학 심화 문장제</div>
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
