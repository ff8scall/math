import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import { getStorageData } from '../utils/storage/storageManager';
import BadgeInventory from '../components/common/BadgeInventory';
import RankingBoard from '../components/common/RankingBoard';
import { JsonLd } from '../components/seo/JsonLd';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [data, setData] = useState(getStorageData());

    useEffect(() => {
        const handleUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleUpdate);
        return () => window.removeEventListener('storage-update', handleUpdate);
    }, []);

    const globalSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "매쓰 펫토리",
            "url": "https://math.lego-sia.com",
            "logo": "https://math.lego-sia.com/favicon.png",
            "description": "초등학교 전학년 수학을 원리로 배우는 혁신적인 학습 플랫폼"
        }
    ];

    return (
        <div className={styles.container}>
            <JsonLd data={globalSchema} />
            
            <header className={styles.hero}>
                <h1 className={styles.title}>매쓰 펫토리 수학 여행! 🎒</h1>
                <p className={styles.subtitle}>
                    공식이 아닌 **원리**로 배우는 재미있는 수학 도서관.<br />
                    {data.userName}님, 오늘은 어떤 수학 원리를 탐험해볼까요?
                </p>
                <div className={styles.ctaArea}>
                    <a href="/grade/1" className={styles.ctaButton}>
                        수학 여행 시작하기 🚀
                    </a>
                    <a href="/myroom" className={styles.ctaButton} style={{ background: '#FF8B13' }}>
                        내 펫방 가기 🏠
                    </a>
                </div>
            </header>

            <div className={styles.gridSection}>
                <section className={styles.mainCol}>
                    <BadgeInventory ownedBadges={data.badges || []} />
                    <div style={{ marginTop: '30px' }}>
                        <RankingBoard myData={data} />
                    </div>
                </section>
                
                <section className={styles.sideCol}>
                    <div className={styles.levelCard}>
                        <span className={styles.levelLabel}>나의 학습 레벨</span>
                        <h2 className={styles.levelValue}>Lv. {data.level || 1}</h2>
                        <div className={styles.xpBar}>
                            <div className={styles.xpProgress} style={{ width: `${(data.xp % 1000) / 10}%` }}></div>
                        </div>
                        <span className={styles.xpText}>{(data.xp || 0) % 1000} / 1000 XP</span>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>
                            문제를 풀고 1,000 XP를 모으면 레벨업!
                        </p>
                    </div>

                    <div className={styles.socialWidget}>
                        <h4>👋 친구들이 방문했어요!</h4>
                        <div className={styles.visitLogs}>
                            <p>🐾 <strong>행복한 강아지</strong>님이 방을 구경하고 하트를 남겼어요!</p>
                            <p>🍪 <strong>배고픈 햄찌</strong>님이 간식을 선물하고 싶어해요.</p>
                        </div>
                    </div>
                </section>
            </div>

            <section className={styles.features}>
                <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🍕</span>
                    <h3>직관적인 원리 시뮬레이터</h3>
                    <p>분수 피자, 들이 비커 등 추상적인 수학 개념을 눈으로 직접 확인하고 조작하며 익힙니다.</p>
                </div>
                <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🐾</span>
                    <h3>나만의 펫 키우기</h3>
                    <p>수학 문제를 해결하고 얻은 코인으로 펫을 입양하고 방을 꾸미며 학습 동기를 유지합니다.</p>
                </div>
                <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🖨️</span>
                    <h3>무료 학습지 출력</h3>
                    <p>언제 어디서나 아이의 수준에 맞는 맞춤형 연산 학습지를 생성하고 즉시 출력할 수 있습니다.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
