import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './DivisionMeaning.module.css';

const PRESETS = [
    { total: 12, divisor: 3 },
    { total: 15, divisor: 5 },
    { total: 16, divisor: 4 },
    { total: 20, divisor: 4 },
    { total: 18, divisor: 6 },
];

const DivisionMeaning = () => {
    const [mode, setMode] = useState('equal'); // 'equal' (등분제) | 'subtract' (포함제)
    const [preset, setPreset] = useState(0);
    const { total, divisor } = PRESETS[preset];
    const quotient = total / divisor;

    // Equal-sharing state — items distributed across people's plates
    const [distributed, setDistributed] = useState(
        Array.from({ length: divisor }, () => 0)
    );
    const distributedTotal = distributed.reduce((s, v) => s + v, 0);

    // Repeated-subtraction state — bundles removed
    const [bundlesRemoved, setBundlesRemoved] = useState(0);
    const remaining = total - bundlesRemoved * divisor;

    useEffect(() => {
        setDistributed(Array.from({ length: divisor }, () => 0));
        setBundlesRemoved(0);
    }, [preset, mode, divisor]);

    /* Equal-sharing: click a plate to add 1 candy */
    const giveCandy = (plateIdx) => {
        if (distributedTotal >= total) return;
        const next = [...distributed];
        next[plateIdx] += 1;
        setDistributed(next);
        if (next.reduce((s, v) => s + v, 0) === total) {
            setTimeout(() => confetti(), 300);
        }
    };

    /* Repeated-subtraction: remove one bundle */
    const removeBundle = () => {
        if (remaining >= divisor) {
            setBundlesRemoved(b => b + 1);
            if (remaining - divisor === 0) setTimeout(() => confetti(), 300);
        }
    };

    return (
        <div className={styles.container}>
            <PageHeader title="나눗셈의 두 가지 얼굴" grade="3" />

            <div className={styles.card}>
                <p className={styles.intro}>
                    나눗셈에는 두 가지 다른 의미가 있어요. 같은 식 <strong>{total} ÷ {divisor} = {quotient}</strong>이지만<br/>
                    상황에 따라 뜻이 달라요!
                </p>

                <div className={styles.toggleRow}>
                    <Button
                        variant={mode === 'equal' ? 'primary' : 'outline'}
                        onClick={() => setMode('equal')}
                    >
                        🍭 {divisor}명에게 똑같이 나누기 (등분제)
                    </Button>
                    <Button
                        variant={mode === 'subtract' ? 'accent' : 'outline'}
                        onClick={() => setMode('subtract')}
                    >
                        📦 {divisor}개씩 묶어 덜어내기 (포함제)
                    </Button>
                </div>

                {/* Problem selector */}
                <div className={styles.numbersRow}>
                    {PRESETS.map((p, i) => (
                        <button
                            key={i}
                            className={`${styles.numBtn} ${preset === i ? styles.numBtnActive : ''}`}
                            onClick={() => setPreset(i)}
                        >
                            {p.total}÷{p.divisor}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {mode === 'equal' ? (
                        <motion.div
                            key="equal"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={styles.visualArea}
                        >
                            <p style={{ textAlign: 'center', color: '#718096', marginBottom: '1.5rem' }}>
                                🍭 사탕 {total}개를 {divisor}명에게 한 번씩 클릭해서 나눠 주세요! (남은 사탕: <strong>{total - distributedTotal}</strong>개)
                            </p>
                            <div className={styles.groupsRow}>
                                {distributed.map((count, pIdx) => (
                                    <div
                                        key={`p-${pIdx}`}
                                        className={styles.group}
                                        onClick={() => giveCandy(pIdx)}
                                        style={{ cursor: distributedTotal < total ? 'pointer' : 'default' }}
                                    >
                                        <div style={{ width: '100%', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#a0aec0', marginBottom: 4 }}>
                                            {pIdx + 1}번 친구
                                        </div>
                                        {Array.from({ length: count }).map((_, ci) => (
                                            <motion.span
                                                key={`c-${pIdx}-${ci}`}
                                                className={styles.item}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                🍬
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="subtract"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={styles.visualArea}
                        >
                            <p style={{ textAlign: 'center', color: '#718096', marginBottom: '1.5rem' }}>
                                📦 사탕 {total}개에서 {divisor}개씩 묶어 상자에 담아요! (남은 사탕: <strong>{remaining}</strong>개)
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                {/* Remaining candy pile */}
                                <div className={styles.group} style={{ borderColor: '#fc8181', background: '#fff5f5' }}>
                                    <div style={{ width: '100%', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#fc8181', marginBottom: 4 }}>
                                        🍭 남은 사탕
                                    </div>
                                    {Array.from({ length: remaining }).map((_, i) => (
                                        <span key={i} className={styles.item}>🍬</span>
                                    ))}
                                </div>
                                {/* Removed boxes */}
                                {Array.from({ length: bundlesRemoved }).map((_, bi) => (
                                    <motion.div
                                        key={`box-${bi}`}
                                        className={styles.group}
                                        style={{ borderColor: '#68d391', background: '#f0fff4' }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <div style={{ width: '100%', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#38a169', marginBottom: 4 }}>
                                            📦 {bi + 1}번 상자
                                        </div>
                                        {Array.from({ length: divisor }).map((_, ci) => (
                                            <span key={ci} className={styles.item}>🍬</span>
                                        ))}
                                    </motion.div>
                                ))}
                            </div>
                            {remaining >= divisor ? (
                                <div style={{ textAlign: 'center' }}>
                                    <Button onClick={removeBundle} variant="accent">
                                        📦 {divisor}개씩 상자에 담기
                                    </Button>
                                </div>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ textAlign: 'center', fontWeight: 700, color: '#38a169' }}
                                >
                                    ✅ 모두 담았어요! 상자가 {bundlesRemoved}개 만들어졌어요!
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.mathSection}>
                    <div className={styles.equation}>
                        {total} ÷ {divisor} = {quotient}
                    </div>
                    <p className={styles.label}>
                        {mode === 'equal'
                            ? `💡 "사탕 ${total}개를 ${divisor}명에게 똑같이 나눠주면 한 명당 ${quotient}개" → 等分制(등분제)`
                            : `💡 "사탕 ${total}개에서 ${divisor}개씩 덜어내면 ${quotient}번 덜 수 있다" → 包含制(포함제)`
                        }
                    </p>
                </div>
            </div>

            <JsonLd data={generateCourseSchema(
                "초등 3학년 나눗셈의 두 가지 의미",
                "같은 나눗셈 식이 '등분제'와 '포함제'라는 두 가지 상황을 나타낼 수 있음을 시각적으로 이해합니다."
            )} />
        </div>
    );
};

export default DivisionMeaning;
