import React from 'react';
import { motion } from 'framer-motion';
import styles from './RankingBoard.module.css';

const mockRankings = [
    { rank: 1, name: '수학천재 토끼', level: 42, xp: 42500, pet: 'rabbit' },
    { rank: 2, name: '똑똑한 사자', level: 38, xp: 38200, pet: 'safari_lion' },
    { rank: 3, name: '연산왕 고양이', level: 35, xp: 35100, pet: 'cat_siamese' },
    { rank: 4, name: '무지개 고래', level: 31, xp: 31000, pet: 'sea_whale' },
    { rank: 5, name: '꿈꾸는 판다', level: 28, xp: 28500, pet: 'pet_red_panda' },
];

const RankingBoard = ({ myData }) => {
    const myRank = 156; // Mock rank for user

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>🏆 실시간 명예의 전당</h3>
                <p>전국의 친구들과 함께 달려보아요!</p>
            </div>

            <div className={styles.rankList}>
                {mockRankings.map((user) => (
                    <motion.div 
                        key={user.rank} 
                        className={styles.rankItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: user.rank * 0.1 }}
                    >
                        <div className={styles.rankNumber}>{user.rank}</div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.userLevel}>Lv.{user.level}</span>
                        </div>
                        <div className={styles.xpBox}>{user.xp.toLocaleString()} XP</div>
                    </motion.div>
                ))}
            </div>

            <div className={styles.myRankCard}>
                <div className={styles.myRankInfo}>
                    <span className={styles.myRankLabel}>나의 순위</span>
                    <span className={styles.myRankValue}>{myRank}위</span>
                </div>
                <div className={styles.myStats}>
                    <span className={styles.myName}>{myData.userName}</span>
                    <span className={styles.myXP}>{myData.xp.toLocaleString()} XP</span>
                </div>
                <div className={styles.rankUpHint}>상위 100위까지 {1000 - (myData.xp % 1000)} XP 남았어요!</div>
            </div>
        </div>
    );
};

export default RankingBoard;
