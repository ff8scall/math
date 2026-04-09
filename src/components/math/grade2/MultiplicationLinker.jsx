import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './MultiplicationLinker.module.css';

const MultiplicationLinker = () => {
    const [each, setEach] = useState(2);
    const [groups, setGroups] = useState(3);
    const total = each * groups;

    return (
        <div className={styles.container}>
            <PageHeader title="곱셈은 왜 배울까요?" grade="2" />

            <div className={styles.card}>
                <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p>더하기를 여러 번 하는 것보다 <strong>곱셈</strong>이 훨씬 빨라요! 사탕 봉지로 확인해 봐요.</p>
                </header>

                <div className={styles.visualArea}>
                    <AnimatePresence>
                        {Array.from({ length: groups }).map((_, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.bag}
                                initial={{ scale: 0, y: 30 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {Array.from({ length: each }).map((_, j) => (
                                    <div key={j} className={styles.item}>🍬</div>
                                ))}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className={styles.mathSection}>
                    <div className={styles.additionLine}>
                        {Array.from({ length: groups }).map((_, i) => (
                            <span key={i}>
                                {each}
                                {i < groups - 1 ? ' + ' : ''}
                            </span>
                        ))}
                        <span> = {total}</span>
                    </div>

                    <div className={styles.arrow}>⬇️</div>

                    <div className={styles.multiLine}>
                        <span className={styles.highlight}>{each}</span>
                        <span> × </span>
                        <span style={{ color: '#48bb78' }}>{groups}</span>
                        <span> = </span>
                        <span>{total}</span>
                    </div>

                    <p style={{ marginTop: '1.5rem', color: '#718096' }}>
                        {each}개씩 {groups}묶음은 줄여서 <strong>{each} × {groups}</strong>라고 써요!
                    </p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>한 봉지에 몇 개?</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button size="small" variant="secondary" onClick={() => setEach(Math.max(1, each - 1))}>-</Button>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '30px' }}>{each}</span>
                            <Button size="small" variant="secondary" onClick={() => setEach(Math.min(9, each + 1))}>+</Button>
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>몇 봉지 있어?</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button size="small" variant="secondary" onClick={() => setGroups(Math.max(1, groups - 1))}>-</Button>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '30px' }}>{groups}</span>
                            <Button size="small" variant="secondary" onClick={() => setGroups(Math.min(9, groups + 1))}>+</Button>
                        </div>
                    </div>
                </div>
            </div>

            <JsonLd data={generateCourseSchema("초등 2학년 곱셈의 원리", "같은 수를 반복해서 더하는 것과 곱셈의 관계를 사탕 봉지 시뮬레이션을 통해 이해합니다.")} />
        </div>
    );
};

export default MultiplicationLinker;
