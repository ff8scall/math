import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { getStorageData, updateAvatar, updateCoins, buyFood, feedPet, getActiveMultiplier } from '../utils/storage/storageManager';
import styles from './MyRoom.module.css';
import confetti from 'canvas-confetti';
import { ShoppingCart, Heart, Sparkles, MessageCircle, UtensilsCrossed, Timer, Star } from 'lucide-react';

// Avatars
import boyImg from '../assets/images/avatar/boy.png';
import girlImg from '../assets/images/avatar/girl.png';
import avatar_boy_hoodie from '../assets/images/avatar/avatar_boy_hoodie.png';
import avatar_boy_dino from '../assets/images/avatar/avatar_boy_dino.png';
import avatar_girl_pink from '../assets/images/avatar/avatar_girl_pink.png';
import avatar_girl_cat from '../assets/images/avatar/avatar_girl_cat.png';

// Costumes
import avatar_boy_police from '../assets/images/avatar/avatar_boy_police.png';
import avatar_boy_firefighter from '../assets/images/avatar/avatar_boy_firefighter.png';
import avatar_boy_doctor from '../assets/images/avatar/avatar_boy_doctor.png';
import avatar_boy_astronaut from '../assets/images/avatar/avatar_boy_astronaut.png';
import avatar_boy_chef from '../assets/images/avatar/avatar_boy_chef.png';
import avatar_boy_scientist from '../assets/images/avatar/avatar_boy_scientist.png';
import avatar_boy_explorer from '../assets/images/avatar/avatar_boy_explorer.png';
import avatar_boy_superhero from '../assets/images/avatar/avatar_boy_superhero.png';
import avatar_boy_wizard from '../assets/images/avatar/avatar_boy_wizard.png';

import avatar_girl_mermaid from '../assets/images/avatar/avatar_girl_mermaid.png';
import avatar_girl_princess from '../assets/images/avatar/avatar_girl_princess.png';
import avatar_girl_fairy from '../assets/images/avatar/avatar_girl_fairy.png';
import avatar_girl_ballerina from '../assets/images/avatar/avatar_girl_ballerina.png';
import avatar_girl_witch from '../assets/images/avatar/avatar_girl_witch.png';
import avatar_girl_detective from '../assets/images/avatar/avatar_girl_detective.png';
import avatar_girl_nurse from '../assets/images/avatar/avatar_girl_nurse.png';
import avatar_girl_artist from '../assets/images/avatar/avatar_girl_artist.png';
import avatar_girl_athlete from '../assets/images/avatar/avatar_girl_athlete.png';

// Pets
import catSiamese from '../assets/images/pets/cat_siamese.png';
import catCalico from '../assets/images/pets/cat_calico.png';
import dogRetriever from '../assets/images/pets/dog_retriever.png';
import hamsterImg from '../assets/images/pets/hamster.png';
import rabbitImg from '../assets/images/pets/rabbit.png';

// Forest
import forest_bear from '../assets/images/pets/forest_bear.png';
import forest_fox from '../assets/images/pets/forest_fox.png';
import forest_deer from '../assets/images/pets/forest_deer.png';
import forest_raccoon from '../assets/images/pets/forest_raccoon.png';
import forest_squirrel from '../assets/images/pets/forest_squirrel.png';
import forest_owl from '../assets/images/pets/forest_owl.png';
import forest_hedgehog from '../assets/images/pets/forest_hedgehog.png';
import forest_rabbit from '../assets/images/pets/forest_rabbit.png';
import forest_wolf from '../assets/images/pets/forest_wolf.png';

// Safari
import safari_lion from '../assets/images/pets/safari_lion.png';
import safari_elephant from '../assets/images/pets/safari_elephant.png';
import safari_giraffe from '../assets/images/pets/safari_giraffe.png';
import safari_zebra from '../assets/images/pets/safari_zebra.png';
import safari_monkey from '../assets/images/pets/safari_monkey.png';
import safari_tiger from '../assets/images/pets/safari_tiger.png';
import safari_hippo from '../assets/images/pets/safari_hippo.png';
import safari_rhino from '../assets/images/pets/safari_rhino.png';
import safari_koala from '../assets/images/pets/safari_koala.png';

// Farm
import farm_cow from '../assets/images/pets/farm_cow.png';
import farm_pig from '../assets/images/pets/farm_pig.png';
import farm_sheep from '../assets/images/pets/farm_sheep.png';
import farm_chicken from '../assets/images/pets/farm_chicken.png';
import farm_duck from '../assets/images/pets/farm_duck.png';
import farm_horse from '../assets/images/pets/farm_horse.png';
import farm_goat from '../assets/images/pets/farm_goat.png';
import farm_chick from '../assets/images/pets/farm_chick.png';
import farm_goose from '../assets/images/pets/farm_goose.png';

// Sea
import sea_penguin from '../assets/images/pets/sea_penguin.png';
import sea_seal from '../assets/images/pets/sea_seal.png';
import sea_whale from '../assets/images/pets/sea_whale.png';
import sea_dolphin from '../assets/images/pets/sea_dolphin.png';
import sea_shark from '../assets/images/pets/sea_shark.png';
import sea_turtle from '../assets/images/pets/sea_turtle.png';
import sea_octopus from '../assets/images/pets/sea_octopus.png';
import sea_crab from '../assets/images/pets/sea_crab.png';
import sea_starfish from '../assets/images/pets/sea_starfish.png';

// Small Pets
import pet_parrot from '../assets/images/pets/pet_parrot.png';
import pet_red_panda from '../assets/images/pets/pet_red_panda.png';
import pet_frog from '../assets/images/pets/pet_frog.png';

const avatarMap = {
    boy: boyImg, girl: girlImg,
    avatar_boy_hoodie, avatar_boy_dino, avatar_girl_pink, avatar_girl_cat,
    avatar_boy_police, avatar_boy_firefighter, avatar_boy_doctor, avatar_boy_astronaut,
    avatar_boy_chef, avatar_boy_scientist, avatar_boy_explorer, avatar_boy_superhero, avatar_boy_wizard,
    avatar_girl_mermaid, avatar_girl_princess, avatar_girl_fairy, avatar_girl_ballerina,
    avatar_girl_witch, avatar_girl_detective, avatar_girl_nurse, avatar_girl_artist, avatar_girl_athlete
};

const petImgMap = {
    'hamster': hamsterImg, 'cat_siamese': catSiamese, 'cat_calico': catCalico,
    'dog_retriever': dogRetriever, 'rabbit': rabbitImg,
    'forest_bear': forest_bear, 'forest_fox': forest_fox, 'forest_deer': forest_deer,
    'forest_raccoon': forest_raccoon, 'forest_squirrel': forest_squirrel, 'forest_owl': forest_owl,
    'forest_hedgehog': forest_hedgehog, 'forest_rabbit': forest_rabbit, 'forest_wolf': forest_wolf,
    'safari_lion': safari_lion, 'safari_elephant': safari_elephant, 'safari_giraffe': safari_giraffe,
    'safari_zebra': safari_zebra, 'safari_monkey': safari_monkey, 'safari_tiger': safari_tiger,
    'safari_hippo': safari_hippo, 'safari_rhino': safari_rhino, 'safari_koala': safari_koala,
    'farm_cow': farm_cow, 'farm_pig': farm_pig, 'farm_sheep': farm_sheep,
    'farm_chicken': farm_chicken, 'farm_duck': farm_duck, 'farm_horse': farm_horse,
    'farm_goat': farm_goat, 'farm_chick': farm_chick, 'farm_goose': farm_goose,
    'sea_penguin': sea_penguin, 'sea_seal': sea_seal, 'sea_whale': sea_whale,
    'sea_dolphin': sea_dolphin, 'sea_shark': sea_shark, 'sea_turtle': sea_turtle,
    'sea_octopus': sea_octopus, 'sea_crab': sea_crab, 'sea_starfish': sea_starfish,
    'pet_parrot': pet_parrot, 'pet_red_panda': pet_red_panda, 'pet_frog': pet_frog
};

const defaultTalks = [
    '주인님! 수학 공부 화이팅! 📚',
    '간식 먹으면 기분이 너무 좋아져요! ✨',
    '함께 있어서 즐거워요! 🥰',
    '수학은 정말 재밌는 것 같아요! 🧠',
    '문제를 풀 때마다 똑똑해지는 기분이에요! 🌟',
    '상점에 귀여운 친구들이 더 많대요! 🏪',
    '나랑 같이 공부해요! 🐾'
];

const petDefs = {
    'hamster': { name: '쫀득 햄찌', talks: ['찍찍! 간식 줄거야?', '볼따구가 빵빵해서 기분 좋아!', '쳇바퀴 한 바퀴만 더 돌고 올게!', '해바라기씨 최고! 🌻'] },
    'cat_siamese': { name: '샴 고양이', talks: ['야아옹~ 맛있는 냄새가 나는데?', '그루밍은 중요하다고.', '나랑 놀자!', '수학 천재 고양이가 여기 있지! 🐈'] },
    'forest_bear': { name: '아기 곰', talks: ['크와앙! 꿀주세요 꿀! 🍯', '겨울잠 자기엔 아직 일러요!', '힘찬 하루 보내세요! 🐻'] },
    'safari_lion': { name: '정글 왕 사자', talks: ['어흥! 내가 바로 정글의 왕이다! 🦁', '나의 멋진 갈기를 보라고!', '용기를 북돋아 줄게! ✨'] },
    'sea_whale': { name: '푸른 고래', talks: ['푸우~ 시원한 물줄기를 받아라! 🐳', '바다는 정말 넓고 푸르러요.', '깊은 바다 속 원리도 알고 싶어!'] },
    'farm_pig': { name: '핑크 돼지', talks: ['꿀꿀! 간식 더 없나요? 🍎', '진흙 목욕이 최고예요!', '뚠뚠해서 너무 귀엽죠? 🐷'] },
    'pet_red_panda': { name: '레서판다', talks: ['우와! 나랑 눈 마주쳤다! 🥰', '나무 타기만큼 수학도 재밌어!', '귀염둥이 출동! 🐾'] }
};

const getPetDef = (petId) => {
    return petDefs[petId] || { name: '동물 친구', talks: defaultTalks };
};

const MyRoom = () => {
    const [data, setData] = useState(getStorageData());
    const [activeTalk, setActiveTalk] = useState({ id: null, text: '' });
    const [jumpingPet, setJumpingPet] = useState(null);
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
        const def = getPetDef(petId);
        const talks = def.talks;
        const randomText = talks[Math.floor(Math.random() * talks.length)];
        setActiveTalk({ id: petId, text: randomText });
        setJumpingPet(petId);
        
        // Reset state after animation/talk duration
        setTimeout(() => setJumpingPet(null), 1000);
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
                    <img src={avatarMap[data.selectedAvatar]} alt={`${data.userName}의 학습 캐릭터`} className={styles.avatarImg} loading="lazy" />
                    <div className={styles.nameTag}>{data.userName}</div>
                </div>

                <AnimatePresence>
                    {myPets.map((petId, index) => {
                        const expiry = data.activeBuffs?.[petId];
                        const timeLeft = getRemainingTime(expiry);
                        const pos = {
                            x: [-300, 300, -150, 150, -400, 400, 0, -250, 250][index % 9] + (index > 8 ? (Math.random() * 20 - 10) : 0),
                            y: [-20, -20, 50, 50, 80, 80, 120, 150, 150][index % 9] + (index > 8 ? (Math.random() * 20 - 10) : 0)
                        };

                        return (
                            <motion.div
                                key={`${petId}-${index}`}
                                className={styles.petContainer}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                    scale: 1, 
                                    opacity: 1, 
                                    y: jumpingPet === petId ? [pos.y, pos.y - 40, pos.y] : pos.y,
                                    x: pos.x
                                }}
                                transition={{
                                    y: jumpingPet === petId ? { duration: 0.4, repeat: 1 } : { duration: 0.3 }
                                }}
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
                                                🍪 간식 주기
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {timeLeft && (
                                    <div className={styles.timerBadge}>
                                        <Timer size={12} /> {timeLeft}
                                    </div>
                                )}

                                <img src={petImgMap[petId]} alt={getPetDef(petId).name} className={`${styles.petImg} ${timeLeft ? styles.buffed : ''}`} loading="lazy" />
                                <div className={styles.petName}>{getPetDef(petId).name}</div>
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
                                <img src={petImgMap[petId]} alt={getPetDef(petId).name} />
                                <span>{getPetDef(petId).name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.themeOptions}>
                    <h3>🎨 캐릭터 및 방 꾸미기</h3>
                    <div className={styles.themeScroll}>
                        <div className={styles.colorPicker}>
                            {['#ffffff', '#fdf0d5', '#f8edeb', '#e3f2fd', '#f3e5f5'].map(c => (
                                <button key={c} onClick={() => setWallColor(c)} style={{ background: c }} className={wallColor === c ? styles.active : ''}></button>
                            ))}
                        </div>
                        <div className={styles.avatarGridShort}>
                            {Object.keys(avatarMap).map(id => (
                                <button key={id} onClick={() => {
                                    if (data.inventory.includes(id) || id === 'boy' || id === 'girl') {
                                        updateAvatar(id);
                                    } else {
                                        alert('상점에서 먼저 분양받아야 해요!');
                                        window.location.href = '/shop';
                                    }
                                }} className={data.selectedAvatar === id ? styles.active : ''}>
                                    <img src={avatarMap[id]} alt={`캐릭터 스타일: ${id.replace(/_/g, ' ')}`} style={{ width: '40px' }} />
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>상점에서 더 많은 캐릭터를 구매하세요!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRoom;
