import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import Button from './Button';
import styles from './AchievementCard.module.css';

const AchievementCard = ({ isVisible, onClose, userData }) => {
    const cardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#ffffff',
                scale: 2, // 고해상도
            });
            const link = document.createElement('a');
            link.download = `math-petory-achievement-${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Failed to generate image', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className={styles.overlay}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={styles.modal}
                    >
                        <div className={styles.cardWrapper} ref={cardRef}>
                            <div className={styles.cardHeader}>
                                <div className={styles.logo}>Math Petory</div>
                                <div className={styles.date}>{new Date().toLocaleDateString()}</div>
                            </div>
                            
                            <div className={styles.cardBody}>
                                <div className={styles.petCircle}>🐾</div>
                                <h2 className={styles.congrats}>참 잘했어요!</h2>
                                <p className={styles.userName}><strong>{userData.userName}</strong> 어린이</p>
                                
                                <div className={styles.statsGrid}>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>보유 코인</span>
                                        <span className={styles.statValue}>💰 {userData.coins}</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>학습 수준</span>
                                        <span className={styles.statValue}>⭐ Level {Math.floor(userData.coins / 500) + 1}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.cardFooter}>
                                <p>math.lego-sia.com에서 함께 공부해요!</p>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Button onClick={handleDownload} variant="primary" disabled={isGenerating}>
                                {isGenerating ? '생성 중...' : '이미지로 저장하기'}
                            </Button>
                            <Button onClick={onClose} variant="ghost">닫기</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AchievementCard;
