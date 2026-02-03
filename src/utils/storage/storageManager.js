const STORAGE_KEY = 'math_explorer_data';

const initialData = {
    inventory: [],
    coins: 0,
    progress: {},
    userName: '친구',
    roomLayout: {} // { itemId: { x: 0, y: 0, placed: true } }
};

export const getStorageData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : initialData;
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
    const newData = { ...current, coins: current.coins + amount };
    setStorageData(newData);
    return newData.coins;
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
