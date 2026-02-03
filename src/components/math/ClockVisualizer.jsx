import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';
import styles from './ClockVisualizer.module.css';

const ClockVisualizer = () => {
    // State for time in hours and minutes
    const [hour, setHour] = useState(3);
    const [minute, setMinute] = useState(0);

    // Calculate rotation angles
    // Minute hand: 6 degrees per minute
    // Hour hand: 30 degrees per hour + 0.5 degrees per minute
    const minuteDegrees = minute * 6;
    const hourDegrees = (hour % 12) * 30 + minute * 0.5;

    const handleAddMinute = (m) => {
        let newMin = minute + m;
        let newHour = hour;

        if (newMin >= 60) {
            newHour += Math.floor(newMin / 60);
            newMin = newMin % 60;
        } else if (newMin < 0) {
            // Handle subtraction if needed, logic is slightly more complex
            // Simple fallback for negative minutes not fully implemented here for brevity in this direction
            const absMin = Math.abs(newMin);
            const hoursSub = Math.ceil(absMin / 60);
            newHour -= hoursSub;
            newMin = 60 - (absMin % 60);
            if (newMin === 60) newMin = 0;
        }

        // Wrap hours (12-hour format for display logic, but state can be 24 or just cumulative)
        // Let's keep state simple: 1-12 range for basic clock? Or just continuous integer?
        // Continuous is better for correct rotation.
        setHour(newHour);
        setMinute(newMin);
    };

    const setTime = (h, m) => {
        setHour(h);
        setMinute(m);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>시계 탐험대: 몇 시일까요? ⏰</h2>

            <div className={styles.clockBody}>
                <div className={styles.clockFace}>
                    {/* Hour Markers */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={styles.marker}
                            style={{
                                transform: `rotate(${(i + 1) * 30}deg) translateY(-130px)`
                            }}
                        >
                            <span style={{ transform: `rotate(-${(i + 1) * 30}deg)`, display: 'inline-block' }}>
                                {i + 1}
                            </span>
                        </div>
                    ))}

                    {/* Hands */}
                    <motion.div
                        className={styles.hourHand}
                        animate={{ rotate: hourDegrees }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                    <motion.div
                        className={styles.minuteHand}
                        animate={{ rotate: minuteDegrees }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                    <div className={styles.centerDot} />
                </div>
            </div>

            <div className={styles.digitalDisplay}>
                {hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour)}시
                {" "}{minute.toString().padStart(2, '0')}분
            </div>

            <div className={styles.controls}>
                <div className={styles.controlGroup}>
                    <p>분침 돌리기 (긴 바늘)</p>
                    <div className={styles.btnRow}>
                        <Button onClick={() => handleAddMinute(5)} size="small" variant="secondary">+5분</Button>
                        <Button onClick={() => handleAddMinute(10)} size="small" variant="secondary">+10분</Button>
                        <Button onClick={() => handleAddMinute(30)} size="small" variant="secondary">+30분</Button>
                    </div>
                </div>
                <div className={styles.controlGroup}>
                    <p>시침 돌리기 (짧은 바늘)</p>
                    <div className={styles.btnRow}>
                        <Button onClick={() => setHour(hour + 1)} size="small" variant="accent">+1시간</Button>
                    </div>
                </div>
                <div className={styles.controlGroup}>
                    <p>시간 맞추기 미션</p>
                    <div className={styles.btnRow}>
                        <Button onClick={() => setTime(9, 0)} size="small" variant="outline">학교 갈 시간 (9:00)</Button>
                        <Button onClick={() => setTime(12, 30)} size="small" variant="outline">점심 시간 (12:30)</Button>
                        <Button onClick={() => setTime(15, 15)} size="small" variant="outline">간식 시간 (3:15)</Button>
                    </div>
                </div>
            </div>

            <article className={styles.note}>
                <h3>💡 시계 박사님 노트</h3>
                <ul>
                    <li><strong>긴 바늘(분침)</strong>: 한 바퀴 돌면 60분(1시간)이 지나요.</li>
                    <li><strong>짧은 바늘(시침)</strong>: 긴 바늘이 한 바퀴 돌 때 숫자 하나만큼 움직여요.</li>
                </ul>
            </article>

            <JsonLd data={generateCourseSchema("시계 보기 학습", "아날로그 시계를 직접 조작하며 시각과 시간의 흐름을 배웁니다.")} />
        </div>
    );
};

export default ClockVisualizer;
