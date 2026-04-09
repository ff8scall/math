import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { updateCoins } from '../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import PageHeader from '../common/PageHeader';
import styles from './DivisorVisualizer.module.css';

const DivisorVisualizer = () => {
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
        calculateData();
    }, [num1, num2, mode]);

    const calculateData = () => {
        // Divisors
        const d1 = getDivisors(num1);
        const d2 = getDivisors(num2);
        setDivisors1(d1);
        setDivisors2(d2);
        setCommonDivisors(d1.filter(d => d2.includes(d)));

        // Multiples (up to 100 for visualization)
        const m1 = Array.from({ length: Math.floor(100 / num1) }, (_, i) => num1 * (i + 1));
        const m2 = Array.from({ length: Math.floor(100 / num2) }, (_, i) => num2 * (i + 1));
        setMultiples1(m1);
        setMultiples2(m2);
        setCommonMultiples(m1.filter(m => m2.includes(m)));
    };

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
            <PageHeader title="약수와 배수 탐험대" grade="5" />
            
            <div className={styles.intro}>
                <h3 className={styles.subtitle}>숫자 속에 숨겨진 약수와 배수를 눈으로 확인해보세요!</h3>
            </div>

            <div className={styles.controls}>
                <div className={styles.inputGroup}>
                    <label>첫 번째 숫자:
                        <input type="number" value={num1} onChange={(e) => setNum1(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} />
                    </label>
                    <label>두 번째 숫자:
                        <input type="number" value={num2} onChange={(e) => setNum2(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} />
                    </label>
                </div>
                <div className={styles.tabGroup}>
                    <button className={mode === 'divisor' ? styles.activeTab : ''} onClick={() => setMode('divisor')}>약수 (Divisors)</button>
                    <button className={mode === 'multiple' ? styles.activeTab : ''} onClick={() => setMode('multiple')}>배수 (Multiples)</button>
                    <button className={mode === 'common' ? styles.activeTab : ''} onClick={() => setMode('common')}>공약수 & 공배수</button>
                </div>
            </div>

            <main className={styles.visualBoard}>
                <AnimatePresence mode="wait">
                    {mode === 'divisor' && (
                        <motion.div key="div" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={styles.modeSection}>
                            <h3>{num1}의 약수: 구름 속에 숨은 숫자 찾기</h3>
                            <div className={styles.divisorGrid}>
                                {divisors1.map(d => (
                                    <motion.div key={d} className={styles.divisorCloud} whileHover={{ scale: 1.1 }}>
                                        <span className={styles.divNum}>{d}</span>
                                        <div className={styles.divDetail}>{num1} ÷ {d} = {num1 / d}</div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className={styles.explanation}>
                                💡 <strong>약수란?</strong> 어떤 수를 나누었을 때 나머지가 0이 되게 하는 수예요.
                            </div>
                        </motion.div>
                    )}

                    {mode === 'multiple' && (
                        <motion.div key="mult" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={styles.modeSection}>
                            <h3>{num1}의 배수: 징검다리 건너기</h3>
                            <div className={styles.numberGrid}>
                                {Array.from({ length: 50 }, (_, i) => i + 1).map(i => (
                                    <div key={i} className={`${styles.gridCell} ${multiples1.includes(i) ? styles.isMultiple : ''}`}>
                                        {i}
                                        {multiples1.includes(i) && <span className={styles.multipleBadge}>{multiples1.indexOf(i) + 1}배</span>}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.explanation}>
                                💡 <strong>배수란?</strong> 어떤 수를 1배, 2배, 3배... 한 수예요. 끝없이 계속 커져요!
                            </div>
                        </motion.div>
                    )}

                    {mode === 'common' && (
                        <motion.div key="common" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={styles.modeSection}>
                            <div className={styles.comparisonLayout}>
                                <div className={styles.conceptCard}>
                                    <h4>🤝 공약수와 최대공약수</h4>
                                    <div className={styles.venn}>
                                        <div className={styles.vennCircle}>
                                            <span className={styles.circleLabel}>{num1}</span>
                                        </div>
                                        <div className={styles.vennCenter}>
                                            {commonDivisors.map(d => <span key={d} className={d === gcd ? styles.isGcd : ''}>{d}</span>)}
                                        </div>
                                        <div className={styles.vennCircle}>
                                             <span className={styles.circleLabel}>{num2}</span>
                                        </div>
                                    </div>
                                    <p>최대공약수(GCD): <strong>{gcd}</strong></p>
                                </div>

                                <div className={styles.conceptCard}>
                                    <h4>🚀 공배수와 최소공배수</h4>
                                    <div className={styles.multipleLine}>
                                        <div className={styles.lcmDisplay}>
                                            최소공배수(LCM): <span>{lcm}</span>
                                        </div>
                                        <p>처음으로 만나는 공통 배수예요!</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className={styles.summary}>
                <div className={styles.petTip}>
                    <p>😺 펫토리 팁: 큰 수의 약수를 찾을 때는 1과 자기 자신부터 짝을 지어 찾아보세요!</p>
                </div>
            </footer>
        </div>
    );
};

export default DivisorVisualizer;
