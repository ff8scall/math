import React, { useState, useEffect } from 'react';
import SEOHead from '../components/seo/SEOHead';
import Button from '../components/common/Button';
import { getStorageData, updateCoins, addToInventory, setStorageData } from '../utils/storage/storageManager';
import { generateSaveCode, parseSaveCode, generateCouponCode } from '../utils/storage/codeGenerator';
import styles from './Shop.module.css';
import confetti from 'canvas-confetti';

const Shop = () => {
    const [data, setData] = useState(getStorageData());
    const [inputCode, setInputCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [showCodeModal, setShowCodeModal] = useState(false);

    useEffect(() => {
        // Refresh data on mount
        setData(getStorageData());

        // Listen for storage updates
        const handleStorageUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleStorageUpdate);
        return () => window.removeEventListener('storage-update', handleStorageUpdate);
    }, []);

    const items = [
        { id: 101, name: '멋진 모자', price: 100, icon: '🎩' },
        { id: 102, name: '반짝이는 왕관', price: 300, icon: '👑' },
        { id: 103, name: '마법 지팡이', price: 500, icon: '🪄' },
        { id: 201, name: '비밀의 열쇠', price: 1000, icon: '🗝️' },
    ];

    const buyItem = (item) => {
        if (data.coins < item.price) {
            alert('코인이 부족해요! 문제를 더 풀고 오세요.');
            return;
        }

        if (item.type === 'coupon') {
            if (!window.confirm(`${item.name}을(를) 구매하시겠어요? ${item.price}코인이 사용됩니다.`)) return;
            updateCoins(-item.price);
            // generateCouponCode should be imported from codeGenerator
            // But if it wasn't exported or updated, we might need to fallback or ensure it's there.
            // Assuming it's added to codeGenerator.js as planned.
            const code = generateCouponCode ? generateCouponCode(item.name) : `C-${item.id}-${Math.floor(Math.random() * 1000)}`;

            setCouponModal({ name: item.name, code: code });
            confetti({ particleCount: 150, spread: 100 });
            return;
        }

        if (data.inventory.includes(item.id)) {
            alert('이미 가지고 있는 아이템이에요!');
            return;
        }

        updateCoins(-item.price);
        addToInventory(item.id);
        confetti({ particleCount: 50, spread: 60 });
        alert(`${item.name}을(를) 구매했습니다!`);
    };

    const handleApplyCode = () => {
        const loadedData = parseSaveCode(inputCode);
        if (loadedData) {
            setStorageData(loadedData);
            confetti();
            alert('비밀 코드 적용 완료! 선물 도착 🎁');
            setInputCode('');
        } else {
            alert('올바르지 않은 코드입니다. 다시 확인해주세요.');
        }
    };

    const handleGenerateCode = () => {
        const code = generateSaveCode(data);
        setGeneratedCode(code);
        setShowCodeModal(true);
    };

    return (
        <div className={styles.container}>
            <SEOHead title="수학 상점" description="열심히 모은 코인으로 아이템을 사요!" />

            <div className={styles.header}>
                <h1>수학 상점 🏪</h1>
                <div className={styles.wallet}>
                    <Button onClick={() => window.location.href = '/myroom'} size="small" variant="secondary" style={{ marginRight: '10px' }}>🏠 내 방 가기</Button>
                    내 코인: <span className={styles.coin}>{data.coins}</span> 🪙
                </div>
            </div>

            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>🔐 아빠의 비밀 코드</h3>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <input
                        type="text"
                        placeholder="코드를 입력하세요"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', flex: 1 }}
                    />
                    <Button onClick={handleApplyCode} variant="accent" size="small">코드 적용</Button>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={handleGenerateCode} style={{ textDecoration: 'underline', color: '#666', border: 'none', background: 'none', cursor: 'pointer' }}>
                        현재 상태 저장 코드 만들기 (백업)
                    </button>
                </div>
            </div>

            {couponModal && (
                <div className={styles.modalOverlay} onClick={() => setCouponModal(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ border: '4px dashed #FFD93D', backgroundColor: '#FFFDE7' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>🎉 쿠폰 발급 완료! 🎉</h2>
                        <div style={{ fontSize: '4rem', margin: '20px 0' }}>🎁</div>
                        <h3 style={{ fontSize: '1.5rem', color: '#333' }}>[{couponModal.name}]</h3>
                        <p style={{ margin: '20px 0', color: '#666' }}>아래 코드를 부모님께 보여드리세요!</p>
                        <div style={{ padding: '15px', backgroundColor: '#fff', border: '2px solid #333', borderRadius: '10px', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                            {couponModal.code}
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Button onClick={() => setCouponModal(null)}>확인</Button>
                        </div>
                    </div>
                </div>
            )}

            {showCodeModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCodeModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3>내 저장 코드 💾</h3>
                        <textarea readOnly value={generatedCode} style={{ width: '100%', height: '100px', margin: '10px 0' }} />
                        <Button onClick={() => setShowCodeModal(false)}>닥기</Button>
                    </div>
                </div>
            )}

            {/* Coupons Section */}
            <h2 style={{ margin: '40px 0 20px', borderTop: '2px dashed #eee', paddingTop: '40px' }}>🎟️ 부모님 조르기 쿠폰 (강력 추천!)</h2>
            <div className={styles.grid}>
                {[
                    { id: 'c1', name: '유튜브 30분 보기', price: 500, icon: '📺', type: 'coupon' },
                    { id: 'c2', name: '간식 1개 획득권', price: 300, icon: '🍪', type: 'coupon' },
                    { id: 'c3', name: '게임 1시간 이용권', price: 1000, icon: '🎮', type: 'coupon' }
                ].map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                        <div className={styles.itemIcon}>{item.icon}</div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemPrice}>{item.price} 코인</div>
                        <Button
                            onClick={() => buyItem(item)}
                            variant="accent"
                            size="small"
                        >
                            구매하기
                        </Button>
                    </div>
                ))}
            </div>

            <h2 style={{ margin: '40px 0 20px', borderTop: '2px dashed #eee', paddingTop: '40px' }}>🎩 내 캐릭터 꾸미기</h2>
            <div className={styles.grid}>
                {items.map((item) => (
                    <div key={item.id} className={`${styles.itemCard} ${data.inventory.includes(item.id) ? styles.owned : ''}`}>
                        <div className={styles.itemIcon}>{item.icon}</div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemPrice}>{item.price} 코인</div>
                        <Button
                            onClick={() => buyItem(item)}
                            variant={data.inventory.includes(item.id) ? 'secondary' : 'primary'}
                            disabled={data.inventory.includes(item.id)}
                            size="small"
                        >
                            {data.inventory.includes(item.id) ? '보유중' : '구매하기'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
