import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './RatioBarModel.module.css';

const SCENARIOS = [
    {
        id: 'discount',
        emoji: '🛍️',
        title: '할인율 계산',
        desc: (base, pct) => `원가 ${base.toLocaleString()}원인 운동화를 ${pct}% 할인 판매합니다. 할인 금액과 판매가는?`,
        baseLabel: '원가 (기준량, 100%)',
        compareLabel: (pct) => `할인 금액 (${pct}%)`,
        resultLabel: (pct) => `판매가 (${100 - pct}%)`,
        baseColor: '#4299e1',
        compareColor: '#fc8181',
        resultColor: '#48bb78',
    },
    {
        id: 'salt',
        emoji: '🧂',
        title: '소금물 농도',
        desc: (base, pct) => `${base}g 의 물에 소금을 녹여 ${pct}% 소금물을 만들려면 소금이 몇 g 필요할까요?`,
        baseLabel: '소금물 전체 (기준량)',
        compareLabel: (pct) => `소금의 양 (${pct}%)`,
        resultLabel: (pct) => `물의 양 (${100 - pct}%)`,
        baseColor: '#4299e1',
        compareColor: '#f6ad55',
        resultColor: '#9ae6b4',
    },
    {
        id: 'growth',
        emoji: '📈',
        title: '증가율',
        desc: (base, pct) => `작년 판매량이 ${base.toLocaleString()}개였고 올해 ${pct}% 증가했습니다. 올해 판매량은?`,
        baseLabel: '작년 판매량 (기준량, 100%)',
        compareLabel: (pct) => `증가한 양 (${pct}%)`,
        resultLabel: (pct) => `올해 판매량 (${100 + pct}%)`,
        baseColor: '#4299e1',
        compareColor: '#b794f4',
        resultColor: '#4299e1',
    },
];

const RatioBarModel = () => {
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [base, setBase] = useState(50000);
    const [pct, setPct] = useState(20);
    const [revealed, setRevealed] = useState(false);

    const sc = SCENARIOS[scenarioIdx];
    const compareAmt = Math.round(base * pct / 100);
    const resultAmt = sc.id === 'growth'
        ? base + compareAmt
        : base - compareAmt;

    const resetReveal = () => setRevealed(false);

    const basePcts = { discount: [50000, 80000, 120000], salt: [200, 400, 500], growth: [3000, 5000, 10000] };
    const pctOptions = [10, 15, 20, 25, 30];

    return (
        <div className={styles.container}>
            <PageHeader title="비율 매직 바 (Bar Model)" grade="6" />

            <div className={styles.card}>
                <p className={styles.intro}>
                    비율은 <strong>기준량을 100%</strong>로 보았을 때 비교하는 양이 차지하는 비율이에요.<br />
                    막대로 크기를 직접 보면서 계산해 봐요!
                </p>

                {/* Scenario selection */}
                <div className={styles.presetRow}>
                    {SCENARIOS.map((s, i) => (
                        <button
                            key={s.id}
                            className={`${styles.presetBtn} ${scenarioIdx === i ? styles.presetBtnActive : ''}`}
                            onClick={() => { setScenarioIdx(i); resetReveal(); }}
                        >
                            {s.emoji} {s.title}
                        </button>
                    ))}
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <div className={styles.sliderGroup}>
                        <span className={styles.sliderLabel}>기준량 선택</span>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {basePcts[sc.id].map(v => (
                                <button
                                    key={v}
                                    className={`${styles.presetBtn} ${base === v ? styles.presetBtnActive : ''}`}
                                    onClick={() => { setBase(v); resetReveal(); }}
                                >
                                    {v.toLocaleString()}{sc.id === 'salt' ? 'g' : sc.id === 'growth' ? '개' : '원'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.sliderGroup}>
                        <span className={styles.sliderLabel}>비율 (%) 선택</span>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {pctOptions.map(v => (
                                <button
                                    key={v}
                                    className={`${styles.presetBtn} ${pct === v ? styles.presetBtnActive : ''}`}
                                    onClick={() => { setPct(v); resetReveal(); }}
                                >
                                    {v}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scenario description */}
                <div className={styles.scenarioBox}>
                    📋 {sc.desc(base, pct)}
                </div>

                {/* Bar Model */}
                <div className={styles.barSection}>
                    {/* Full base bar */}
                    <div className={styles.barLabel}>
                        <span>{sc.baseLabel}</span>
                        <span>{base.toLocaleString()}</span>
                    </div>
                    <div className={styles.barTrack}>
                        <motion.div
                            className={styles.barFill}
                            style={{ width: '100%', background: sc.baseColor }}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5 }}
                        >
                            100% = {base.toLocaleString()}
                        </motion.div>
                    </div>

                    {/* Comparison bar */}
                    <div className={styles.barLabel}>
                        <span>{sc.compareLabel(pct)}</span>
                        <span style={{ color: sc.compareColor }}>{revealed ? compareAmt.toLocaleString() : '?'}</span>
                    </div>
                    <div className={styles.barTrack}>
                        <motion.div
                            className={styles.barFill}
                            style={{ background: sc.compareColor }}
                            initial={{ width: 0 }}
                            animate={{ width: revealed ? `${pct}%` : '0%' }}
                            transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
                        >
                            {revealed && `${pct}%`}
                        </motion.div>
                    </div>

                    {/* Result bar */}
                    {sc.id !== 'salt' && (
                        <>
                            <div className={styles.barLabel}>
                                <span>{sc.resultLabel(pct)}</span>
                                <span style={{ color: sc.resultColor }}>{revealed ? resultAmt.toLocaleString() : '?'}</span>
                            </div>
                            <div className={styles.barTrack}>
                                <motion.div
                                    className={styles.barFill}
                                    style={{ background: sc.resultColor }}
                                    initial={{ width: 0 }}
                                    animate={{ width: revealed ? `${sc.id === 'growth' ? 100 + pct : 100 - pct}%` : '0%' }}
                                    transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 80 }}
                                >
                                    {revealed && `${sc.id === 'growth' ? 100 + pct : 100 - pct}%`}
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    {!revealed
                        ? <Button size="large" onClick={() => setRevealed(true)}>✨ 정답 막대 펼치기!</Button>
                        : <Button variant="ghost" onClick={resetReveal}>숨기기</Button>
                    }
                </div>

                {/* Equation */}
                <div className={styles.equationBox}>
                    <div className={styles.equationTitle}>📐 수식으로 표현하면</div>
                    <div className={styles.equation}>
                        {sc.id === 'discount' && (
                            <>
                                할인 금액: <span className={styles.highlight}>{base.toLocaleString()} × {pct}/100 = {compareAmt.toLocaleString()}원</span><br />
                                판매가: <span className={styles.highlight}>{base.toLocaleString()} × {(100 - pct)}/100 = {resultAmt.toLocaleString()}원</span>
                            </>
                        )}
                        {sc.id === 'salt' && (
                            <>
                                소금: <span className={styles.highlight}>{base} × {pct}/100 = {compareAmt}g</span>
                            </>
                        )}
                        {sc.id === 'growth' && (
                            <>
                                증가량: <span className={styles.highlight}>{base.toLocaleString()} × {pct}/100 = {compareAmt.toLocaleString()}</span><br />
                                올해: <span className={styles.highlight}>{base.toLocaleString()} + {compareAmt.toLocaleString()} = {resultAmt.toLocaleString()}개</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <JsonLd data={generateCourseSchema(
                "초등 6학년 비와 비율 (Bar Model)",
                "할인율, 소금물 농도, 증가율 등 실생활 비율 문제를 시각적 막대 모델(Bar Model)로 이해하고 수식으로 연결합니다."
            )} />
        </div>
    );
};

export default RatioBarModel;
