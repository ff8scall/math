import React from 'react';
import { JsonLd } from '../components/seo/JsonLd';
import styles from './HomePage.module.css';

const HomePage = () => {
    const globalSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "매쓰 펫토리",
            "url": "https://math.lego-sia.com",
            "logo": "https://math.lego-sia.com/favicon.png",
            "description": "초등학교 전학년 수학을 원리로 배우는 혁신적인 학습 플랫폼",
            "sameAs": []
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "매쓰 펫토리",
            "url": "https://math.lego-sia.com",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://math.lego-sia.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    ];

    return (
        <div className={styles.container}>
            <JsonLd data={globalSchema} />
            
            <header className={styles.hero}>
                <h1 className={styles.title}>매쓰 펫토리 초등 수학 여행! 🎒</h1>
                <p className={styles.subtitle}>
                    공식 암기가 아닌 **원리**로 배우는 재미있는 수학 도서관.<br />
                    귀여운 펫과 함께 미션을 해결하며 수학 자신감을 키워보세요!
                </p>
                <div className={styles.ctaArea}>
                    <a href="/grade/1" className={styles.ctaButton}>
                        수학 여행 시작하기 🚀
                    </a>
                </div>
            </header>

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

            <section className={styles.trustBadges}>
                <h3>전국 초등학생들과 함께하는 즐거운 학습</h3>
                <div className={styles.badgeGrid}>
                    <span>#원리수학</span>
                    <span>#자기주도학습</span>
                    <span>#에듀테크</span>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
