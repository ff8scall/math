import React, { useState, useEffect } from 'react';
import SEOHead from '../components/seo/SEOHead';
import Button from '../components/common/Button';
import { getStorageData, updateCoins, addToInventory, setStorageData, updateAvatar, updatePet } from '../utils/storage/storageManager';
import { generateSaveCode, parseSaveCode, generateCouponCode } from '../utils/storage/codeGenerator';
import styles from './Shop.module.css';
import confetti from 'canvas-confetti';

// Avatars
import boyImg from '../assets/images/avatar/boy.png';
import girlImg from '../assets/images/avatar/girl.png';

// Cats
import catSiamese from '../assets/images/pets/cat_siamese.png';
import catCalico from '../assets/images/pets/cat_calico.png';
import catTabby from '../assets/images/pets/cat_tabby.png';
import catBlack from '../assets/images/pets/cat_black.png';
import catPersian from '../assets/images/pets/cat_persian.png';

// Dogs
import dogPoodle from '../assets/images/pets/dog_poodle.png';
import dogCorgi from '../assets/images/pets/dog_corgi.png';
import dogShiba from '../assets/images/pets/dog_shiba.png';
import dogRetriever from '../assets/images/pets/dog_retriever.png';

// Others
import hamsterImg from '../assets/images/pets/hamster.png';
import rabbitImg from '../assets/images/pets/rabbit.png';

const Shop = () => {
    const [data, setData] = useState(getStorageData());
    const [tab, setTab] = useState('character'); // 'character', 'pets', 'coupons'
    const [inputCode, setInputCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [couponModal, setCouponModal] = useState(null);

    useEffect(() => {
        setData(getStorageData());
        const handleStorageUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleStorageUpdate);
        return () => window.removeEventListener('storage-update', handleStorageUpdate);
    }, []);

    const avatarItems = [
        { id: 'boy', name: '씩씩한 소년', price: 0, img: boyImg, desc: '밝고 씩씩한 소년 캐릭터예요.' },
        { id: 'girl', name: '깜찍한 소녀', price: 0, img: girlImg, desc: '귀엽고 똑똑한 소녀 캐릭터예요.' },
    ];

    const petItems = [
        { id: 'hamster', name: '쫀득 햄찌', price: 150, img: hamsterImg, desc: '해바라기씨를 좋아하는 국민 햄찌!' },
        { id: 'cat_siamese', name: '샴 고양이', price: 300, img: catSiamese, desc: '푸른 눈이 매력적인 도도한 고양이' },
        { id: 'cat_calico', name: '삼색이', price: 300, img: catCalico, desc: '행운을 가져다주는 귀여운 삼색 고양이' },
        { id: 'cat_tabby', name: '치즈 태비', price: 300, img: catTabby, desc: '언제나 씩씩한 호랑이 무늬 고양이' },
        { id: 'cat_black', name: '까망이', price: 300, img: catBlack, desc: '까만 털이 매력적인 신비로운 고양이' },
        { id: 'cat_persian', name: '페르시안', price: 400, img: catPersian, desc: '우아하고 풍성한 털의 귀족 고양이' },
        { id: 'dog_retriever', name: '리트리버', price: 350, img: dogRetriever, desc: '사람을 너무 좋아하는 똑똑한 강아지' },
        { id: 'dog_shiba', name: '시바견', price: 350, img: dogShiba, desc: '눈썹이 매력적인 용맹한 시바 캐릭터' },
        { id: 'dog_corgi', name: '웰시코기', price: 350, img: dogCorgi, desc: '짧은 다리와 치명적인 뒷모습!' },
        { id: 'dog_poodle', name: '푸들', price: 350, img: dogPoodle, desc: '똑똑하고 애교 많은 꼬부랑 털 강아지' },
        { id: 'rabbit', name: '회색 토끼', price: 250, img: rabbitImg, desc: '귀가 큰 깡충깡충 토끼 친구' },
    ];

    const couponItems = [
        { id: 'c1', name: '유튜브 30분 보기', price: 500, icon: '📺', type: 'coupon' },
        { id: 'c2', name: '간식 1개 획득권', price: 300, icon: '🍪', type: 'coupon' },
        { id: 'c3', name: '게임 1시간 이용권', price: 1000, icon: '🎮', type: 'coupon' },
        { id: 'c4', name: '장난감 쇼핑권', price: 2000, icon: '🧸', type: 'coupon' }
    ];

    const buyItem = (item) => {
        if (data.coins < item.price) {
            alert('코인이 부족해요! 문제를 더 풀고 오세요.');
            return;
        }

        if (item.type === 'coupon') {
            if (!window.confirm(`${item.name}을(를) 구매하시겠어요? ${item.price}코인이 사용됩니다.`)) return;
            updateCoins(-item.price);
            const code = generateCouponCode(item.name);
            setCouponModal({ name: item.name, code: code });
            confetti({ particleCount: 150, spread: 100 });
            return;
        }

        if (data.inventory.includes(item.id)) {
            alert('이미 가지고 있는 친구예요!');
            return;
        }

        updateCoins(-item.price);
        addToInventory(item.id);
        confetti({ particleCount: 50, spread: 60 });
        alert(`${item.name} 친구가 생겼습니다! 내 방에서 확인해보세요.`);
    };

    const selectAvatarAction = (id) => {
        updateAvatar(id);
        confetti({ particleCount: 20, spread: 40 });
    };

    const selectPetAction = (id) => {
        if (!data.inventory.includes(id)) {
            const item = petItems.find(p => p.id === id);
            buyItem({ ...item, type: 'pet' });
        } else {
            updatePet(data.selectedPet === id ? null : id);
        }
    };

    return (
        <div className={styles.container}>
            <SEOHead title="수학 상점" description="열심히 공부한 코인으로 귀여운 펫 친구들을 만나보세요!" />

            <header className={styles.header}>
                <div className={styles.info}>
                    <h1>수학 탐험대 상점 🏪</h1>
                    <p className={styles.subtitle}>열심히 공부한 당신, 멋지게 꾸며보세요!</p>
                </div>
                <div className={styles.wallet}>
                    <div className={styles.coinCount}>
                        <span className={styles.coinIcon}>💰</span>
                        <span className={styles.coinAmount}>{data.coins}</span>
                    </div>
                    <Button onClick={() => window.location.href = '/myroom'} variant="secondary" size="small">🏠 내 방</Button>
                </div>
            </header>

            <nav className={styles.tabs}>
                <button className={tab === 'character' ? styles.activeTab : ''} onClick={() => setTab('character')}>👤 캐릭터</button>
                <button className={tab === 'pets' ? styles.activeTab : ''} onClick={() => setTab('pets')}>🐾 펫 친구들</button>
                <button className={tab === 'coupons' ? styles.activeTab : ''} onClick={() => setTab('coupons')}>🎟️ 쿠폰</button>
            </nav>

            <main className={styles.mainContent}>
                {tab === 'character' && (
                    <div className={styles.grid}>
                        {avatarItems.map(item => (
                            <div key={item.id} className={`${styles.itemCard} ${data.selectedAvatar === item.id ? styles.selected : ''}`}>
                                <div className={styles.avatarImgBox}>
                                    <img src={item.img} alt={item.name} className={styles.avatarImg} />
                                </div>
                                <h3>{item.name}</h3>
                                <p>{item.desc}</p>
                                <Button
                                    onClick={() => selectAvatarAction(item.id)}
                                    variant={data.selectedAvatar === item.id ? 'accent' : 'primary'}
                                    fullWidth
                                >
                                    {data.selectedAvatar === item.id ? '선택됨' : '선택하기'}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'pets' && (
                    <div className={styles.grid}>
                        {petItems.map(item => (
                            <div key={item.id} className={`${styles.itemCard} ${data.inventory.includes(item.id) ? styles.owned : ''} ${data.selectedPet === item.id ? styles.selected : ''}`}>
                                <div className={styles.petIconBox}>
                                    <img src={item.img} alt={item.name} className={styles.petItemImg} />
                                </div>
                                <h3>{item.name}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666', height: '40px' }}>{item.desc}</p>
                                <div className={styles.priceTag}>{data.inventory.includes(item.id) ? '보유중' : `${item.price} 코인`}</div>
                                <Button
                                    onClick={() => selectPetAction(item.id)}
                                    variant={data.inventory.includes(item.id) ? (data.selectedPet === item.id ? 'accent' : 'secondary') : 'primary'}
                                    fullWidth
                                >
                                    {data.inventory.includes(item.id)
                                        ? (data.selectedPet === item.id ? '함께하는 중' : '데려가기')
                                        : '분양받기'}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'coupons' && (
                    <div className={styles.grid}>
                        {couponItems.map(item => (
                            <div key={item.id} className={styles.couponCard}>
                                <div className={styles.couponIcon}>{item.icon}</div>
                                <div className={styles.couponLabel}>SPECIAL COUPON</div>
                                <h3>{item.name}</h3>
                                <div className={styles.priceTag}>{item.price} 코인</div>
                                <Button onClick={() => buyItem(item)} variant="accent" fullWidth>쿠폰 구매</Button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className={styles.footer}>
                <div className={styles.secretCode}>
                    <h4>🔐 부모님 보관용 코드</h4>
                    <div className={styles.codeRow}>
                        <input type="text" placeholder="코드를 입력해 불러오기" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                        <Button onClick={() => {
                            const loaded = parseSaveCode(inputCode);
                            if (loaded) { setStorageData(loaded); alert('성공!'); }
                        }} variant="ghost" size="small">불러오기</Button>
                    </div>
                    <button onClick={() => { setGeneratedCode(generateSaveCode(data)); setShowCodeModal(true); }} className={styles.backupBtn}>내 점수 백업 코드 만들기</button>
                </div>
            </footer>

            {couponModal && (
                <div className={styles.modalOverlay} onClick={() => setCouponModal(null)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h2>🎟️ 쿠폰이 도착했어요!</h2>
                        <div className={styles.bigCoupon}>
                            <div className={styles.couponTop}>{couponModal.name}</div>
                            <div className={styles.couponCode}>{couponModal.code}</div>
                            <p>부모님께 이 화면을 보여드리고<br />약속하신 보상을 받으세요!</p>
                        </div>
                        <Button onClick={() => setCouponModal(null)}>확인</Button>
                    </div>
                </div>
            )}

            {showCodeModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCodeModal(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3>💾 백업용 비밀 코드</h3>
                        <p>이 코드를 메모장 등에 적어두면 나중에 앱을 다시 깔아도 내 점수와 아이템을 되찾을 수 있어요!</p>
                        <textarea readOnly value={generatedCode} style={{ width: '100%', height: '100px', margin: '15px 0', padding: '10px' }} />
                        <Button onClick={() => setShowCodeModal(false)}>닫기</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
