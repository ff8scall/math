import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './FactorsMultiples5th.module.css';

const FactorsMultiples5th = () => {
    const [num1, setNum1] = useState(12);
    const [num2, setNum2] = useState(18);
    const [mode, setMode] = useState('divisor'); // 'divisor', 'multiple', 'common'
    const [divisors1, setDivisors1] = useState([]);
    const [divisors2, setDivisors2] = useState([]);
    const [commonDivisors, setCommonDivisors] = useState([]);
    const [multiples1, setMultiples1] = useState([]);
    const [multiples2, setMultiples2] = useState([]);
    const [commonMultiples, setCommonMultiples] = useState([]);

    useEffect(() => {
        const d1 = getDivisors(num1);
        const d2 = getDivisors(num2);
        setDivisors1(d1);
        setDivisors2(d2);
        setCommonDivisors(d1.filter(d => d2.includes(d)));

        const m1 = Array.from({ length: 15 }, (_, i) => num1 * (i + 1));
        const m2 = Array.from({ length: 15 }, (_, i) => num2 * (i + 1));
        setMultiples1(m1);
        setMultiples2(m2);
        setCommonMultiples(m1.filter(m => m2.includes(m)));
    }, [num1, num2]);

    const getDivisors = (n) => {
        const divs = [];
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) divs.push(i);
        }
        return divs;
    };

    const gcd = commonDivisors.length > 0 ? Math.max(...commonDivisors) : 1;
    const lcm = commonMultiples.length > 0 ? Math.min(...commonMultiples) : (num1 * num2);

    return (
        <div className={styles.container}>
            <PageHeader />
            <div className={styles.header}>
                <h2 className={styles.title}>약수와 배수 원리 탐험대 🔍</h2>
                <div className={styles.tabGroup}>
                    <Button onClick={() => setMode('divisor')} variant={mode === 'divisor' ? 'primary' : 'secondary'}>약수</Button>
                    <Button onClick={() => setMode('multiple')} variant={mode === 'multiple' ? 'primary' : 'secondary'}>배수</Button>
                    <Button onClick={() => setMode('common')} variant={mode === 'common' ? 'primary' : 'secondary'}>공약수&공배수</Button>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.inputGroup}>
                    <label>숫자1: <input type="number" value={num1} onChange={(e) => setNum1(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} /></label>
                    <label>숫자2: <input type="number" value={num2} onChange={(e) => setNum2(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} /></label>
                </div>
            </div>

            <main className={styles.visualBoard}>
                <AnimatePresence mode="wait">
                    {mode === 'divisor' && (
                        <motion.div key="div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.modeSection}>
                            <h3>{num1}의 약수</h3>
                            <div className={styles.divisorGrid}>
                                {divisors1.map(d => (
                                    <div key={d} className={styles.divisorCloud}>
                                        <span className={styles.divNum}>{d}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {mode === 'multiple' && (
                        <motion.div key="mult" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.modeSection}>
                            <h3>{num1}의 배수</h3>
                            <div className={styles.mobileMultipleList}>
                                {multiples1.map((m, i) => (
                                    <div key={m} className={styles.multipleItem}>
                                        <span className={styles.mIdx}>{i+1}배</span>
                                        <span className={styles.mVal}>{m}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {mode === 'common' && (
                        <motion.div key="common" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.modeSection}>
                             <div className={styles.vennContainer}>
                                <div className={styles.vennCircle}>
                                    <div className={styles.vennLabel}>{num1}</div>
                                    <div className={styles.vennList}>
                                        {divisors1.filter(d => !commonDivisors.includes(d)).map(d => <span key={d}>{d}</span>)}
                                    </div>
                                </div>
                                <div className={styles.vennCenter}>
                                    <div className={styles.vennLabel}>공약수</div>
                                    <div className={styles.vennList}>
                                        {commonDivisors.map(d => <strong key={d} className={d === gcd ? styles.gcd : ''}>{d}</strong>)}
                                    </div>
                                </div>
                                <div className={styles.vennCircle}>
                                    <div className={styles.vennLabel}>{num2}</div>
                                    <div className={styles.vennList}>
                                        {divisors2.filter(d => !commonDivisors.includes(d)).map(d => <span key={d}>{d}</span>)}
                                    </div>
                                </div>
                             </div>
                             <div className={styles.results}>
                                <p>최대공약수(GCD): <strong>{gcd}</strong></p>
                                <p>최소공배수(LCM): <strong>{lcm}</strong></p>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <JsonLd data={generateCourseSchema("약수와 배수", "약수와 배수의 정의를 배우고 직접 계산해봅니다.")} />
        </div>
    );
};

export default FactorsMultiples5th;
