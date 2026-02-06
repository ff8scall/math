import React, { useState, useEffect, useRef } from 'react';
import SEOHead from '../components/seo/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { getStorageData, updateAvatar, updateCoins, buyFood, feedPet, getActiveMultiplier } from '../utils/storage/storageManager';
import styles from './MyRoom.module.css';
import confetti from 'canvas-confetti';
import { ShoppingCart, Heart, Sparkles, MessageCircle, UtensilsCrossed, Timer, Star } from 'lucide-react';

// Avatars
import boyImg from '../assets/images/avatar/boy.png';
import girlImg from '../assets/images/avatar/girl.png';

// Pets
import catSiamese from '../assets/images/pets/cat_siamese.png';
import catCalico from '../assets/images/pets/cat_calico.png';
import catTabby from '../assets/images/pets/cat_tabby.png';
import catBlack from '../assets/images/pets/cat_black.png';
import catPersian from '../assets/images/pets/cat_persian.png';
import dogPoodle from '../assets/images/pets/dog_poodle.png';
import dogCorgi from '../assets/images/pets/dog_corgi.png';
import dogShiba from '../assets/images/pets/dog_shiba.png';
import dogRetriever from '../assets/images/pets/dog_retriever.png';
import hamsterImg from '../assets/images/pets/hamster.png';
import rabbitImg from '../assets/images/pets/rabbit.png';

const avatarMap = { boy: boyImg, girl: girlImg };

const petImgMap = {
    'hamster': hamsterImg,
    'cat_siamese': catSiamese,
    'cat_calico': catCalico,
    'cat_tabby': catTabby,
    'cat_black': catBlack,
    'cat_persian': catPersian,
    'dog_retriever': dogRetriever,
    'dog_shiba': dogShiba,
    'dog_corgi': dogCorgi,
    'dog_poodle': dogPoodle,
    'rabbit': rabbitImg
};

const petDefs = {
    'hamster': { name: '쫀득 햄찌', talks: ['찍찍! 간식 줄거야?', '볼따구가 빵빵해서 기분 좋아!', '쳇바퀴 한 바퀴만 더 돌고 올게!', '공부 열심히 하면 응원해줄게!'] },
    'cat_siamese': { name: '샴 고양이', talks: ['야아옹~ 맛있는 냄새가 나는데?', '그루밍은 중요하다고.', '너, 거기서 뭐해? 나랑 놀자!'] },
    'cat_calico': { name: '삼색이', talks: ['미야오! 맛있는 간식 한 입만~', '햇살이 너무 따뜻해~', '오늘 운이 아주 좋을 거야!'] },
    'cat_tabby': { name: '치즈 태비', talks: ['가르릉 가르릉... 기분 좋아!', '간식 먹으면 힘이 불끈 나!', '박스! 박스가 필요해!'] },
    'cat_black': { name: '까망이', talks: ['반짝반짝! 내 눈 예쁘지?', '야옹! 간식은 사랑이야.', '비밀 하나 알려줄까?'] },
    'cat_persian': { name: '페르시안', talks: ['주인님! 간식을 가져오너라.', '나는 우아한 고양이라고.', '쓰다듬어 주렴.'] },
    'dog_retriever': { name: '리트리버', talks: ['멍멍! 나 간식 고파!', '꼬리가 멈추질 않아! 붕붕~', '산책 가자! 산책! 산책!'] },
    'dog_shiba': { name: '시바견', talks: ['멍! 간식 하나 주면 공부 도와줄게!', '볼살이 말랑말랑해~', '헥헥, 날씨 좋다~'] },
    'dog_corgi': { name: '웰시코기', talks: ['캉캉! 간식 최고!', '다리는 짧지만 누구보다 빨라!', '엉덩이 실룩실룩~'] },
    'dog_poodle': { name: '푸들', talks: ['와프! 간식 맛이 일품이야!', '똑똑한 나를 칭찬해줘!', '나랑 산책 가자!'] },
    'rabbit': { name: '회색 토끼', talks: ['깡충깡충! 아삭한 간식 짱!', '귀를 쫑긋! 간식 봉지 소리?!', '토끼 정원을 만들고 싶어.'] }
};

const MyRoom = () => {
    const [data, setData] = useState(getStorageData());
    const [activeTalk, setActiveTalk] = useState({ id: null, text: '' });
    const [wallColor, setWallColor] = useState('#ffffff');
    const [floorColor, setFloorColor] = useState('#f8edeb');
    const [showFoodShop, setShowFoodShop] = useState(false);
    const [now, setNow] = useState(Date.now());
    const constraintRef = useRef(null);

    useEffect(() => {
        const handleUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleUpdate);
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => {
            window.removeEventListener('storage-update', handleUpdate);
            clearInterval(timer);
        };
    }, []);

    const myPets = data.inventory.filter(id => typeof id === 'string' && petImgMap[id]);

    const handlePetClick = (petId) => {
        const talks = petDefs[petId].talks;
        const randomText = talks[Math.floor(Math.random() * talks.length)];
        setActiveTalk({ id: petId, text: randomText });
        setTimeout(() => setActiveTalk({ id: null, text: '' }), 4000);
    };

    const handleFeed = (e, petId) => {
        e.stopPropagation();
        if (feedPet(petId)) {
            confetti({
                particleCount: 40, spread: 60, colors: ['#ffc0cb', '#ffd700'],
                origin: { x: 0.5, y: 0.7 }
            });
            setActiveTalk({ id: petId, text: '냠냠! 너무 맛있어! 30분 동안 공부 보너스가 생겼어! 🚀' });
        } else {
            alert('간식이 부족해요! 간식 상점에서 구매해 주세요.');
            setShowFoodShop(true);
        }
    };

    const handleBuyFood = () => {
        if (buyFood(50, 1)) {
            confetti();
        } else {
            alert('코인이 부족해요!');
        }
    };

    const getRemainingTime = (expiry) => {
        if (!expiry || typeof expiry !== 'number') return null;
        const diff = expiry - now;
        if (diff <= 0) return null;
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const currentMultiplier = getActiveMultiplier();

    return (
        <div className={styles.container}>
            <SEOHead title="내 방 꾸미기" description="동물 친구들과 함께 즐거운 시간!" />

            <header className={styles.header}>
                <div className={styles.titleBox}>
                    <h1>🏠 {data.userName}의 방</h1>
                    <div className={styles.stats}>
                        <span className={styles.coinBadge}>💰 {data.coins.toLocaleString()}</span>
                        {currentMultiplier > 1 && (
                            <span className={styles.buffBadge}>🚀 공부 보너스 x{currentMultiplier.toFixed(1)}</span>
                        )}
                    </div>
                </div>
                <div className={styles.topBtns}>
                    <Button onClick={() => setShowFoodShop(!showFoodShop)} variant="secondary" size="small"><UtensilsCrossed size={16} /> 간식 구매</Button>
                    <Button onClick={() => window.location.href = '/shop'} variant="primary" size="small"><ShoppingCart size={16} /> 상점 가기</Button>
                </div>
            </header>

            <AnimatePresence>
                {showFoodShop && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={styles.foodShop}>
                        <div className={styles.foodShopContent}>
                            <div className={styles.snackCard}>
                                <div className={styles.snackIcon}>🍪</div>
                                <div className={styles.snackInfo}>
                                    <h4>만능 펫 간식 (1개)</h4>
                                    <p>모든 동물들이 좋아하는 맛있는 간식이에요!</p>
                                    <div className={styles.priceRow}>
                                        <span className={styles.price}>💰 50</span>
                                        <Button onClick={handleBuyFood} size="small">구매하기</Button>
                                    </div>
                                </div>
                                <div className={styles.myStock}>내 간식: <strong>{data.foodInventory?.snack || 0}개</strong></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.roomStage} ref={constraintRef} style={{ background: wallColor }}>
                <div className={styles.floor} style={{ background: floorColor }}></div>

                <div className={styles.characterContainer}>
                    <img src={avatarMap[data.selectedAvatar]} alt="Character" className={styles.avatarImg} />
                    <div className={styles.nameTag}>{data.userName}</div>
                </div>

                <AnimatePresence>
                    {myPets.map((petId, index) => {
                        const expiry = data.activeBuffs?.[petId];
                        const timeLeft = getRemainingTime(expiry);
                        const pos = {
                            x: [-300, 300, -150, 150, -400, 400, 0, -250, 250][index % 9],
                            y: [-20, -20, 50, 50, 80, 80, 120, 150, 150][index % 9]
                        };

                        return (
                            <motion.div
                                key={`${petId}-${index}`}
                                className={styles.petContainer}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1, ...pos }}
                                exit={{ scale: 0, opacity: 0 }}
                                drag
                                dragConstraints={constraintRef}
                                onClick={() => handlePetClick(petId)}
                            >
                                <AnimatePresence>
                                    {activeTalk.id === petId && (
                                        <motion.div className={styles.bubble} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                            <MessageCircle size={14} className={styles.bubbleIcon} />
                                            {activeTalk.text}
                                            <div className={styles.feedBtn} onClick={(e) => handleFeed(e, petId)}>
                                                🍪 간식 주기 (보유: {data.foodInventory?.snack || 0})
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {timeLeft && (
                                    <div className={styles.timerBadge}>
                                        <Timer size={12} /> {timeLeft}
                                    </div>
                                )}

                                <img src={petImgMap[petId]} alt={petId} className={`${styles.petImg} ${timeLeft ? styles.buffed : ''}`} />
                                <div className={styles.petName}>{petDefs[petId].name}</div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className={styles.controls}>
                <div className={styles.petInventory}>
                    <h3>😺 우리 집 동물 친구들</h3>
                    <div className={styles.petList}>
                        {myPets.map((petId, i) => (
                            <div key={i} className={styles.petMiniCard} onClick={() => handlePetClick(petId)}>
                                <img src={petImgMap[petId]} alt={petId} />
                                <span>{petDefs[petId].name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.themeOptions}>
                    <h3>🎨 분위기 바꾸기</h3>
                    <div className={styles.colorPicker}>
                        {['#ffffff', '#fdf0d5', '#f8edeb', '#e3f2fd', '#f3e5f5'].map(c => (
                            <button key={c} onClick={() => setWallColor(c)} style={{ background: c }} className={wallColor === c ? styles.active : ''}></button>
                        ))}
                    </div>
                    <div className={styles.charSelect}>
                        <button onClick={() => updateAvatar('boy')} className={data.selectedAvatar === 'boy' ? styles.active : ''}>👦 소년</button>
                        <button onClick={() => updateAvatar('girl')} className={data.selectedAvatar === 'girl' ? styles.active : ''}>👧 소녀</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRoom;
