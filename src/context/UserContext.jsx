import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageData, setStorageData } from '../utils/storage/storageManager';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(getStorageData());

    // storageManager에서 발생하는 커스텀 이벤트를 감지하여 상태 업데이트
    useEffect(() => {
        const handleStorageUpdate = () => {
            setUserData(getStorageData());
        };

        window.addEventListener('storage-update', handleStorageUpdate);
        return () => window.removeEventListener('storage-update', handleStorageUpdate);
    }, []);

    // 래퍼 함수들 (필요시 추가)
    const refreshData = () => {
        setUserData(getStorageData());
    };

    return (
        <UserContext.Provider value={{ userData, refreshData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
