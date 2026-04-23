const STORAGE_KEY = 'math_explorer_data';

const initialData = {
    inventory: [],
    coins: 100,
    progress: {},
    userName: '친구',
    selectedAvatar: 'boy',
    selectedPet: null,
    roomLayout: {},
    foodInventory: { snack: 0 },
    activeBuffs: {}, // { petId: expiryTimestamp }
    xp: 0,
    level: 1,
    badges: [] // 수집한 뱃지 ID 목록
};

import { getStateFromUrl, updateUrlWithState } from './urlSync';

export const getStorageData = () => {
    try {
        // 1. URL 파라미터에서 데이터 복원 시도 (우선순위 높음)
        const urlData = getStateFromUrl();
        
        // 2. LocalStorage에서 데이터 로드
        const localData = localStorage.getItem(STORAGE_KEY);
        const parsedLocal = localData ? JSON.parse(localData) : null;

        // 3. 데이터 병합 (URL 데이터가 있다면 LocalStorage 데이터보다 우선)
        const sourceData = urlData || parsedLocal || initialData;
        
        const merged = { ...initialData, ...sourceData };

        // 데이터 마이그레이션 (간식 통합)
        if (merged.foodInventory && !merged.foodInventory.snack) {
            const total = Object.values(merged.foodInventory).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
            merged.foodInventory = { snack: total };
        }

        // 만약 URL에서 데이터를 가져왔다면 LocalStorage에도 즉시 반영
        if (urlData && JSON.stringify(urlData) !== localData) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        }

        return merged;
    } catch (error) {
        console.error("Storage load error", error);
        return initialData;
    }
};

export const setStorageData = (data) => {
    try {
        const jsonString = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, jsonString);
        
        // URL 상태 동기화
        updateUrlWithState(data);
        
        // Context 및 다른 컴포넌트에 알림
        window.dispatchEvent(new Event('storage-update'));
    } catch (error) {
        console.error("Storage save error", error);
    }
};

export const updateCoins = (amount) => {
    const current = getStorageData();
    let finalAmount = amount;

    // 이득을 볼 때만 버프 적용 (공부 보상)
    if (amount > 0) {
        const multiplier = getActiveMultiplier();
        finalAmount = Math.round(amount * multiplier);
    }

    const currentXP = current.xp || 0;
    const newXP = currentXP + Math.abs(amount); // 공부한 만큼 경험치 획득
    const newLevel = Math.floor(newXP / 1000) + 1; // 1000XP당 1레벨업

    const newData = { 
        ...current, 
        coins: Math.max(0, current.coins + finalAmount),
        xp: newXP,
        level: newLevel
    };
    
    setStorageData(newData);
    return finalAmount; 
};

export const addToInventory = (itemId) => {
    const current = getStorageData();
    if (!current.inventory.includes(itemId)) {
        const newData = { ...current, inventory: [...current.inventory, itemId] };
        setStorageData(newData);
        return true;
    }
    return false;
};

export const saveRoomLayout = (layout) => {
    const current = getStorageData();
    const newData = { ...current, roomLayout: layout };
    setStorageData(newData);
};

export const awardBadge = (badgeId) => {
    const current = getStorageData();
    if (!current.badges) current.badges = [];
    if (!current.badges.includes(badgeId)) {
        const newData = { ...current, badges: [...current.badges, badgeId] };
        setStorageData(newData);
        return true;
    }
    return false;
};

export const updateAvatar = (avatarType) => {
    const current = getStorageData();
    const newData = { ...current, selectedAvatar: avatarType };
    setStorageData(newData);
};

export const updatePet = (petId) => {
    const current = getStorageData();
    const newData = { ...current, selectedPet: petId };
    setStorageData(newData);
};

export const buyFood = (price, count = 1) => {
    const current = getStorageData();
    if (current.coins < price) return false;
    const newData = {
        ...current,
        coins: current.coins - price,
        foodInventory: { snack: (current.foodInventory.snack || 0) + count }
    };
    setStorageData(newData);
    return true;
};

export const feedPet = (petId) => {
    const current = getStorageData();
    if (!current.foodInventory.snack || current.foodInventory.snack <= 0) return false;

    const newBuffs = { ...current.activeBuffs };
    const duration = 30 * 60 * 1000; // 30 minutes
    newBuffs[petId] = Date.now() + duration;

    const newData = {
        ...current,
        foodInventory: { snack: current.foodInventory.snack - 1 },
        activeBuffs: newBuffs
    };
    setStorageData(newData);
    return true;
};

export const getActiveMultiplier = () => {
    const current = getStorageData();
    const now = Date.now();
    let activeBuffCount = 0;

    const buffs = current.activeBuffs || {};
    Object.values(buffs).forEach(expiry => {
        if (expiry > now) activeBuffCount++;
    });
    // Base 1.0, each active pet gives +0.2 up to 2.0x max
    return Math.min(2.0, 1.0 + (activeBuffCount * 0.2));
};
