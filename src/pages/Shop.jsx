import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { getStorageData, updateCoins, addToInventory, setStorageData, updateAvatar, updatePet } from '../utils/storage/storageManager';
import { generateSaveCode, parseSaveCode, generateCouponCode } from '../utils/storage/codeGenerator';
import styles from './Shop.module.css';
import confetti from 'canvas-confetti';

// Avatars (Original)
import boyImg from '../assets/images/avatar/boy.png';
import girlImg from '../assets/images/avatar/girl.png';

// New Avatars - Boys
import avatar_boy_hoodie from '../assets/images/avatar/avatar_boy_hoodie.png';
import avatar_boy_glasses from '../assets/images/avatar/avatar_boy_glasses.png';
import avatar_boy_beanie from '../assets/images/avatar/avatar_boy_beanie.png';
import avatar_boy_cap from '../assets/images/avatar/avatar_boy_cap.png';
import avatar_boy_scarf from '../assets/images/avatar/avatar_boy_scarf.png';
import avatar_boy_bandaid from '../assets/images/avatar/avatar_boy_bandaid.png';
import avatar_boy_cat from '../assets/images/avatar/avatar_boy_cat.png';
import avatar_boy_skate from '../assets/images/avatar/avatar_boy_skate.png';
import avatar_boy_dino from '../assets/images/avatar/avatar_boy_dino.png';

// Costume Boys
import avatar_boy_police from '../assets/images/avatar/avatar_boy_police.png';
import avatar_boy_firefighter from '../assets/images/avatar/avatar_boy_firefighter.png';
import avatar_boy_doctor from '../assets/images/avatar/avatar_boy_doctor.png';
import avatar_boy_astronaut from '../assets/images/avatar/avatar_boy_astronaut.png';
import avatar_boy_chef from '../assets/images/avatar/avatar_boy_chef.png';
import avatar_boy_scientist from '../assets/images/avatar/avatar_boy_scientist.png';
import avatar_boy_explorer from '../assets/images/avatar/avatar_boy_explorer.png';
import avatar_boy_superhero from '../assets/images/avatar/avatar_boy_superhero.png';
import avatar_boy_wizard from '../assets/images/avatar/avatar_boy_wizard.png';

// New Avatars - Girls
import avatar_girl_kimono from '../assets/images/avatar/avatar_girl_kimono.png';
import avatar_girl_pink from '../assets/images/avatar/avatar_girl_pink.png';
import avatar_girl_bob from '../assets/images/avatar/avatar_girl_bob.png';
import avatar_girl_purple from '../assets/images/avatar/avatar_girl_purple.png';
import avatar_girl_school from '../assets/images/avatar/avatar_girl_school.png';
import avatar_girl_red from '../assets/images/avatar/avatar_girl_red.png';
import avatar_girl_cat from '../assets/images/avatar/avatar_girl_cat.png';
import avatar_girl_orange from '../assets/images/avatar/avatar_girl_orange.png';
import avatar_girl_rain from '../assets/images/avatar/avatar_girl_rain.png';

// Costume Girls
import avatar_girl_mermaid from '../assets/images/avatar/avatar_girl_mermaid.png';
import avatar_girl_princess from '../assets/images/avatar/avatar_girl_princess.png';
import avatar_girl_fairy from '../assets/images/avatar/avatar_girl_fairy.png';
import avatar_girl_ballerina from '../assets/images/avatar/avatar_girl_ballerina.png';
import avatar_girl_witch from '../assets/images/avatar/avatar_girl_witch.png';
import avatar_girl_detective from '../assets/images/avatar/avatar_girl_detective.png';
import avatar_girl_nurse from '../assets/images/avatar/avatar_girl_nurse.png';
import avatar_girl_artist from '../assets/images/avatar/avatar_girl_artist.png';
import avatar_girl_athlete from '../assets/images/avatar/avatar_girl_athlete.png';

// Pets (Original)
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

// New Pets - Forest
import forest_bear from '../assets/images/pets/forest_bear.png';
import forest_fox from '../assets/images/pets/forest_fox.png';
import forest_deer from '../assets/images/pets/forest_deer.png';
import forest_raccoon from '../assets/images/pets/forest_raccoon.png';
import forest_squirrel from '../assets/images/pets/forest_squirrel.png';
import forest_owl from '../assets/images/pets/forest_owl.png';
import forest_hedgehog from '../assets/images/pets/forest_hedgehog.png';
import forest_rabbit from '../assets/images/pets/forest_rabbit.png';
import forest_wolf from '../assets/images/pets/forest_wolf.png';

// New Pets - Safari
import safari_lion from '../assets/images/pets/safari_lion.png';
import safari_elephant from '../assets/images/pets/safari_elephant.png';
import safari_giraffe from '../assets/images/pets/safari_giraffe.png';
import safari_zebra from '../assets/images/pets/safari_zebra.png';
import safari_monkey from '../assets/images/pets/safari_monkey.png';
import safari_tiger from '../assets/images/pets/safari_tiger.png';
import safari_hippo from '../assets/images/pets/safari_hippo.png';
import safari_rhino from '../assets/images/pets/safari_rhino.png';
import safari_koala from '../assets/images/pets/safari_koala.png';

// New Pets - Farm
import farm_cow from '../assets/images/pets/farm_cow.png';
import farm_pig from '../assets/images/pets/farm_pig.png';
import farm_sheep from '../assets/images/pets/farm_sheep.png';
import farm_chicken from '../assets/images/pets/farm_chicken.png';
import farm_duck from '../assets/images/pets/farm_duck.png';
import farm_horse from '../assets/images/pets/farm_horse.png';
import farm_goat from '../assets/images/pets/farm_goat.png';
import farm_chick from '../assets/images/pets/farm_chick.png';
import farm_goose from '../assets/images/pets/farm_goose.png';

// New Pets - Sea
import sea_penguin from '../assets/images/pets/sea_penguin.png';
import sea_seal from '../assets/images/pets/sea_seal.png';
import sea_whale from '../assets/images/pets/sea_whale.png';
import sea_dolphin from '../assets/images/pets/sea_dolphin.png';
import sea_shark from '../assets/images/pets/sea_shark.png';
import sea_turtle from '../assets/images/pets/sea_turtle.png';
import sea_octopus from '../assets/images/pets/sea_octopus.png';
import sea_crab from '../assets/images/pets/sea_crab.png';
import sea_starfish from '../assets/images/pets/sea_starfish.png';

// New Pets - Small Pets
import pet_parrot from '../assets/images/pets/pet_parrot.png';
import pet_turtle_v2 from '../assets/images/pets/pet_turtle_v2.png';
import pet_mouse from '../assets/images/pets/pet_mouse.png';
import pet_guinea_pig from '../assets/images/pets/pet_guinea_pig.png';
import pet_chinchilla from '../assets/images/pets/pet_chinchilla.png';
import pet_chameleon from '../assets/images/pets/pet_chameleon.png';
import pet_red_panda from '../assets/images/pets/pet_red_panda.png';
import pet_frog from '../assets/images/pets/pet_frog.png';
import pet_hedgehog_v2 from '../assets/images/pets/pet_hedgehog_v2.png';


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

        // Custom Styles
        { id: 'avatar_boy_hoodie', name: '파란 후드 소년', price: 200, img: avatar_boy_hoodie, desc: '편안한 후드티를 입은 소년' },
        { id: 'avatar_girl_pink', name: '핑크 트윈테일', price: 200, img: avatar_girl_pink, desc: '깜직한 양갈래 머리 소녀' },
        { id: 'avatar_boy_dino', name: '공룡 잠옷 소년', price: 300, img: avatar_boy_dino, desc: '공룡 잠옷을 입은 귀요미' },
        { id: 'avatar_girl_cat', name: '고양이 후드 소녀', price: 300, img: avatar_girl_cat, desc: '고양이 귀 후드를 쓴 소녀' },

        // Costumes - Boys
        { id: 'avatar_boy_police', name: '경찰관 소년', price: 500, img: avatar_boy_police, desc: '마을을 지키는 용감한 경찰관' },
        { id: 'avatar_boy_firefighter', name: '소방관 소년', price: 500, img: avatar_boy_firefighter, desc: '불을 끄는 씩씩한 소방관' },
        { id: 'avatar_boy_astronaut', name: '우주비행사', price: 500, img: avatar_boy_astronaut, desc: '우주를 탐험하는 비행사' },
        { id: 'avatar_boy_wizard', name: '꼬마 마법사', price: 500, img: avatar_boy_wizard, desc: '신비로운 마법을 부리는 소년' },
        { id: 'avatar_boy_superhero', name: '슈퍼 히어로', price: 600, img: avatar_boy_superhero, desc: '지구를 지키는 영웅 소년' },

        // Costumes - Girls
        { id: 'avatar_girl_mermaid', name: '인어공주', price: 500, img: avatar_girl_mermaid, desc: '푸른 바다의 신비로운 인어' },
        { id: 'avatar_girl_princess', name: '동화 속 공주', price: 500, img: avatar_girl_princess, desc: '우아한 드레스의 공주님' },
        { id: 'avatar_girl_fairy', name: '숲의 요정', price: 500, img: avatar_girl_fairy, desc: '반짝이는 날개를 가진 요정' },
        { id: 'avatar_girl_witch', name: '꼬마 마녀', price: 500, img: avatar_girl_witch, desc: '빗자루를 타는 귀여운 마녀' },
        { id: 'avatar_girl_ballerina', name: '발레리나', price: 500, img: avatar_girl_ballerina, desc: '아름다운 춤을 추는 발레리나' }
    ];

    const petItems = [
        // Classic Pets
        { id: 'hamster', name: '쫀득 햄찌', price: 150, img: hamsterImg, desc: '해바라기씨를 좋아하는 국민 햄찌!' },
        { id: 'cat_siamese', name: '샴 고양이', price: 300, img: catSiamese, desc: '푸른 눈이 매력적인 도도한 고양이' },
        { id: 'cat_calico', name: '삼색이', price: 300, img: catCalico, desc: '행운을 가져다주는 귀여운 삼색 고양이' },

        // Forest Friends
        { id: 'forest_bear', name: '아기 곰', price: 400, img: forest_bear, desc: '꿀을 좋아하는 든든한 곰 친구' },
        { id: 'forest_fox', name: '불여우', price: 400, img: forest_fox, desc: '똑똑하고 민첩한 오렌지 여우' },
        { id: 'forest_raccoon', name: '너구리', price: 400, img: forest_raccoon, desc: '보들보들한 꼬리의 귀염둥이' },

        // Safari Friends
        { id: 'safari_lion', name: '정글 왕 사자', price: 500, img: safari_lion, desc: '듬성듬성 갈기가 멋진 사자' },
        { id: 'safari_elephant', name: '덩치 코끼리', price: 500, img: safari_elephant, desc: '긴 코로 물을 뿜는 커다란 친구' },
        { id: 'safari_giraffe', name: '키다리 기린', price: 500, img: safari_giraffe, desc: '목이 아주 긴 기린 친구' },

        // Farm Friends
        { id: 'farm_cow', name: '얼룩소', price: 350, img: farm_cow, desc: '건강한 우유를 주는 착한 소' },
        { id: 'farm_pig', name: '핑크 돼지', price: 300, img: farm_pig, desc: '먹는 걸 좋아하는 핑크색 돼지' },
        { id: 'farm_chick', name: '삐약이 병아리', price: 200, img: farm_chick, desc: '이제 막 태어난 노란 병아리' },

        // Sea Friends
        { id: 'sea_penguin', name: '남극 펭귄', price: 400, img: sea_penguin, desc: '뒤뚱뒤뚱 걷는 남극의 신사' },
        { id: 'sea_whale', name: '푸른 고래', price: 500, img: sea_whale, desc: '바다에서 가장 큰 고래 친구' },
        { id: 'sea_shark', name: '아기 상어', price: 500, img: sea_shark, desc: '뚜루루뚜루~ 귀여운 상어' },

        // Special Pets
        { id: 'pet_red_panda', name: '레서판다', price: 600, img: pet_red_panda, desc: '세상에서 제일 귀여운 레서판다' },
        { id: 'pet_parrot', name: '말하는 앵무새', price: 400, img: pet_parrot, desc: '내 말을 따라 하는 알록달록 앵무새' },
        { id: 'pet_frog', name: '초록 개구리', price: 300, img: pet_frog, desc: '폴짝폴짝 뛰는 귀여운 개구리' }
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
            // 아바타의 경우 이미 보유중이면 선택만 함 (상점에선 분양/구매 버튼이므로 이 로직은 주로 펫용)
            return;
        }

        updateCoins(-item.price);
        addToInventory(item.id);
        confetti({ particleCount: 50, spread: 60 });
        alert(`${item.name} 아이템을 획득했습니다!`);
    };

    const selectAvatarAction = (item) => {
        if (item.price > 0 && !data.inventory.includes(item.id)) {
            if (window.confirm(`${item.name} 캐릭터를 분양받으시겠어요? ${item.price} 코인이 필요합니다.`)) {
                buyItem(item);
            }
        } else {
            updateAvatar(item.id);
            confetti({ particleCount: 20, spread: 40 });
        }
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
            <header className={styles.header}>
                <div className={styles.info}>
                    <h1>매쓰 펫토리 상점 🏪</h1>
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
                            <div key={item.id} className={`${styles.itemCard} ${data.inventory.includes(item.id) || item.price === 0 ? styles.owned : ''} ${data.selectedAvatar === item.id ? styles.selected : ''}`}>
                                <div className={styles.avatarImgBox}>
                                    <img src={item.img} alt={item.name} className={styles.avatarImg} loading="lazy" />
                                </div>
                                <h3>{item.name}</h3>
                                <p>{item.desc}</p>
                                <div className={styles.priceTag}>{(data.inventory.includes(item.id) || item.price === 0) ? '보유중' : `${item.price} 코인`}</div>
                                <Button
                                    onClick={() => selectAvatarAction(item)}
                                    variant={data.selectedAvatar === item.id ? 'accent' : 'primary'}
                                    fullWidth
                                >
                                    {(data.inventory.includes(item.id) || item.price === 0)
                                        ? (data.selectedAvatar === item.id ? '선택됨' : '선택하기')
                                        : '분양받기'}
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
                                    <img src={item.img} alt={item.name} className={styles.petItemImg} loading="lazy" />
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
