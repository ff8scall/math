import React from 'react';
import { JsonLd } from '../components/seo/JsonLd';

const HomePage = () => {
    const globalSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "매쓰 펫토리",
            "url": "https://math.lego-sia.com",
            "logo": "https://math.lego-sia.com/favicon.png",
            "description": "초등학교 전학년 수학을 원리로 배우는 혁식적인 학습 플랫폼",
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <JsonLd data={globalSchema} />
            <h1 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>매쓰 펫토리에 오신 것을 환영합니다! 🚀</h1>
            <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '40px' }}>재미있는 수학 여행을 떠나볼까요?</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <a href="/arithmetic" style={{ padding: '20px', backgroundColor: '#FFD93D', borderRadius: '20px', fontSize: '1.5rem', textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                    덧셈/뺄셈 여행 떠나기 👉
                </a>
            </div>
        </div>
    );
};

export default HomePage;
