import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '100px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
            <h1 style={{ fontSize: '5rem', margin: '0', color: '#ff6b6b' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>찾으시는 페이지가 없어요! 😅</h2>
            <p style={{ color: '#666', marginBottom: '40px' }}>
                주소가 잘못되었거나 삭제된 페이지인 것 같아요.<br />
                아래 버튼을 눌러 홈으로 돌아가볼까요?
            </p>
            <Link to="/">
                <Button variant="primary" size="large">🏠 홈으로 돌아가기</Button>
            </Link>
        </div>
    );
};

export default NotFound;
