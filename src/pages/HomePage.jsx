import React from 'react';
import SEOHead from '../components/seo/SEOHead';

const HomePage = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <SEOHead title="홈" />
            <h1 style={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>수학 탐험대에 오신 것을 환영합니다! 🚀</h1>
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
