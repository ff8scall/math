import React from 'react';
import { motion } from 'framer-motion';
import styles from './BadgeInventory.module.css';

const badges = [
    { id: 'b_arithmetic_1', name: '연산 초보', icon: '🔢', desc: '더하기 빼기 10회 성공' },
    { id: 'b_multiplication_1', name: '구구단 박사', icon: '✖️', desc: '곱셈 퀴즈 10회 성공' },
    { id: 'b_rich_1', name: '코인 부자', icon: '💰', desc: '1,000 코인 돌파' },
    { id: 'b_pet_lover', name: '동물 친구', icon: '🐾', desc: '펫 3마리 입양' },
    { id: 'b_level_5', name: '우등생', icon: '🎓', desc: '레벨 5 달성' }
];

const BadgeInventory = ({ ownedBadges = [] }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>🏆 나의 뱃지 컬렉션</h3>
            <div className={styles.badgeGrid}>
                {badges.map(badge => {
                    const isOwned = ownedBadges.includes(badge.id);
                    return (
                        <motion.div 
                            key={badge.id} 
                            className={`${styles.badgeCard} ${isOwned ? styles.owned : styles.locked}`}
                            whileHover={isOwned ? { scale: 1.1 } : {}}
                        >
                            <div className={styles.icon}>{isOwned ? badge.icon : '🔒'}</div>
                            <div className={styles.name}>{badge.name}</div>
                            {isOwned && <div className={styles.desc}>{badge.desc}</div>}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default BadgeInventory;
