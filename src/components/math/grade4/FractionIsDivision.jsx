import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import PageHeader from '../../common/PageHeader';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './FractionIsDivision.module.css';

const FractionIsDivision = () => {
    // a(pizzas) / b(people)
    const [pizzas, setPizzas] = useState(3);
    const [people, setPeople] = useState(4);
    const [isCut, setIsCut] = useState(false);
    const [isDistributed, setIsDistributed] = useState(false);

    const reset = () => {
        setIsCut(false);
        setIsDistributed(false);
    };

    const handlePizzasChange = (delta) => {
        const newVal = Math.max(1, Math.min(5, pizzas + delta));
        if (newVal !== pizzas) {
            setPizzas(newVal);
            reset();
        }
    };

    const handlePeopleChange = (delta) => {
        const newVal = Math.max(2, Math.min(6, people + delta));
        if (newVal !== people) {
            setPeople(newVal);
            reset();
        }
    };

    const cutPizzas = () => {
        setIsCut(true);
        setTimeout(() => {
            setIsDistributed(true);
            confetti({ particleCount: 50, spread: 60 });
        }, 1500); // Auto distribute after 1.5s
    };

    // SVG Helper for a single pizza or slice
    const renderPizza = (slices, cutMode = false, scale = 1, singleSliceIndex = -1) => {
        const size = 100 * scale;
        const center = size / 2;
        const radius = size * 0.45;
        
        const paths = [];
        for (let i = 0; i < slices; i++) {
            const startAngle = (i * 360) / slices;
            const endAngle = ((i + 1) * 360) / slices;
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            const x1 = center + radius * Math.cos(startRad);
            const y1 = center + radius * Math.sin(startRad);
            const x2 = center + radius * Math.cos(endRad);
            const y2 = center + radius * Math.sin(endRad);
            const largeArcFlag = 360 / slices > 180 ? 1 : 0;
            
            // If slices is 1, draw full circle
            let pathData;
            if (slices === 1) {
                pathData = `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${radius} ${radius} 0 1 1 ${center} ${center - radius}`;
            } else {
                pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            }

            if (singleSliceIndex === -1 || singleSliceIndex === i) {
                paths.push(
                    <motion.path
                        key={`slice-${i}`}
                        d={pathData}
                        fill="#FFB347" // Pizza crust orange
                        stroke={cutMode && slices > 1 ? "#FFF" : "#E2E8F0"}
                        strokeWidth={cutMode ? 3 : 1}
                        initial={cutMode ? { opacity: 0 } : false}
                        animate={cutMode ? { opacity: 1, stroke: '#fff' } : false}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                );
            }
        }

        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={center} cy={center} r={radius} fill="#FFEEB3" /> {/* Cheese color behind */}
                {paths}
            </svg>
        );
    };

    return (
        <div className={styles.container}>
            <PageHeader title="분수는 나눗셈이에요!" grade="4" />

            <div className={styles.workspace}>
                <header className={styles.intro}>
                    <p>피자 {pizzas}판을 {people}명이 똑같이 나누어 먹으려면 한 명당 얼마를 먹을까요?</p>
                </header>

                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <label>피자 (나누어지는 수)</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Button size="small" variant="secondary" onClick={() => handlePizzasChange(-1)} disabled={pizzas <= 1 || isCut}>-</Button>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '30px' }}>{pizzas}</span>
                            <Button size="small" variant="secondary" onClick={() => handlePizzasChange(1)} disabled={pizzas >= 5 || isCut}>+</Button>
                        </div>
                    </div>
                    <div className={styles.controlGroup}>
                        <label>사람 (나누는 수)</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Button size="small" variant="secondary" onClick={() => handlePeopleChange(-1)} disabled={people <= 2 || isCut}>-</Button>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '30px' }}>{people}</span>
                            <Button size="small" variant="secondary" onClick={() => handlePeopleChange(1)} disabled={people >= 6 || isCut}>+</Button>
                        </div>
                    </div>
                </div>

                {!isDistributed ? (
                    <div className={styles.visualZone} style={{ marginTop: '3rem' }}>
                        {Array.from({ length: pizzas }).map((_, i) => (
                            <div key={`p-${i}`} className={styles.pizzaBox} onClick={!isCut ? cutPizzas : undefined}>
                                {!isCut && <div className={styles.knife}>🔪</div>}
                                {renderPizza(isCut ? people : 1, isCut)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.plateArea}>
                        {Array.from({ length: people }).map((_, personIdx) => (
                            <motion.div 
                                key={`person-${personIdx}`} 
                                className={styles.plate}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring' }}
                            >
                                <span className={styles.plateTitle}>{personIdx + 1}번 째 사람</span>
                                {/* Each person gets 1 slice from EACH pizza */}
                                {Array.from({ length: pizzas }).map((_, pizzaIdx) => (
                                    <div key={`slice-${personIdx}-${pizzaIdx}`} style={{ position: 'absolute' }}>
                                        {renderPizza(people, true, 1.2, personIdx)}
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                )}

                {isDistributed && (
                   <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                       <Button onClick={reset} variant="outline">다시 해보기</Button>
                   </div>
                )}

                <div className={styles.mathSection} style={{ marginTop: '3rem' }}>
                    <div className={styles.badge}>수학의 대발견 💡</div>
                    <div className={styles.equation}>
                        <span style={{ color: '#FF9F43' }}>{pizzas}</span>
                        <span>÷</span>
                        <span style={{ color: '#4299E1' }}>{people}</span>
                        <span>=</span>
                        <div className={styles.fraction}>
                            <span style={{ color: '#FF9F43' }}>{pizzas}</span>
                            <div className={styles.fractionLine} />
                            <span style={{ color: '#4299E1' }}>{people}</span>
                        </div>
                    </div>
                    {isDistributed && (
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#4a5568', fontSize: '1.2rem', marginTop: '1rem', borderTop: '2px dashed #e2e8f0', paddingTop: '1rem' }}
                        >
                            피자 1판을 {people}명으로 나눈 조각(<strong>1/{people}</strong>)을 <br/>
                            {pizzas}판에서 하나씩 다 가져왔으니 총 <strong>{pizzas}/{people}</strong>가 돼요!
                        </motion.p>
                    )}
                </div>
            </div>

            <JsonLd data={generateCourseSchema("초등 4학년 분수와 나눗셈의 관계", "나눗셈 결괏값을 분수로 나타내는 원리를 피자 자르기와 나누기 시뮬레이션을 통해 시각적으로 증명합니다.")} />
        </div>
    );
};

export default FractionIsDivision;
