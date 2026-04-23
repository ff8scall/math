import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import styles from './ParentDashboard.module.css';

const mockData = [
    { day: '월', score: 85, time: 20 },
    { day: '화', score: 90, time: 25 },
    { day: '수', score: 75, time: 15 },
    { day: '목', score: 95, time: 40 },
    { day: '금', score: 88, time: 30 },
    { day: '토', score: 100, time: 50 },
    { day: '일', score: 92, time: 35 },
];

const ParentDashboard = ({ userData }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>📊 학부모 학습 리포트</h2>
                <p>{userData.userName} 어린이의 이번 주 학습 현황입니다.</p>
            </div>

            <div className={styles.statsSummary}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>총 학습 시간</span>
                    <span className={styles.statValue}>215분</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>평균 정답률</span>
                    <span className={styles.statValue}>88%</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>취약 단원</span>
                    <span className={styles.statValue} style={{ color: '#FF6B6B' }}>시각과 시간</span>
                </div>
            </div>

            <div className={styles.chartSection}>
                <h3>📈 일별 정답률 추이</h3>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={mockData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="#FFD93D" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={styles.analysisSection}>
                <h3>🔍 AI 분석 의견</h3>
                <div className={styles.analysisBox}>
                    <p>
                        최근 **'세 자리 수'**와 **'덧셈과 뺄셈'** 단원에서 매우 높은 이해도를 보이고 있습니다. 
                        다만, **'시각과 시간'** 단원에서 정답을 맞히기까지 시간이 다소 소요되는 경향이 있으니 
                        집에 있는 시계를 활용한 실생활 퀴즈를 함께 해주시면 큰 도움이 될 것입니다.
                    </p>
                </div>
            </div>

            <div className={styles.couponSection}>
                <h3>🎁 칭찬 쿠폰 관리</h3>
                <div className={styles.couponList}>
                    <div className={styles.couponItem}>
                        <span>📺 유튜브 30분 보기</span>
                        <span className={styles.couponStatus}>사용 완료 (4/22)</span>
                    </div>
                    <div className={styles.couponItem}>
                        <span>🍦 아이스크림 간식권</span>
                        <span className={styles.couponStatusActive}>사용 가능</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
