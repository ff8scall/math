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
    activeBuffs: {} // { petId: expiryTimestamp }
};

export const getStorageData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return initialData;
        const parsed = JSON.parse(data);

        // 데이터 병합 및 간식 통합 마이그레이션
        const merged = { ...initialData, ...parsed };
        if (parsed.foodInventory && !parsed.foodInventory.snack) {
            // 기존에 물고기 등 다른 간식이 있었다면 합계로 변환
            const total = Object.values(parsed.foodInventory).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
            merged.foodInventory = { snack: total };
        }
        return merged;
    } catch (error) {
        console.error("Storage load error", error);
        return initialData;
    }
};

export const setStorageData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Trigger a custom event for reactivity if needed elsewhere without Context
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

    const newData = { ...current, coins: Math.max(0, current.coins + finalAmount) };
    setStorageData(newData);
    return finalAmount; // 실제로 추가된 금액 반환
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
