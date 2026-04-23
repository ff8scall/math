import React, { useState, useEffect } from 'react';
import ParentDashboard from '../components/common/ParentDashboard';
import PageHeader from '../components/common/PageHeader';
import { getStorageData } from '../utils/storage/storageManager';

const ParentPage = () => {
    const [data, setData] = useState(getStorageData());

    useEffect(() => {
        const handleUpdate = () => setData(getStorageData());
        window.addEventListener('storage-update', handleUpdate);
        return () => window.removeEventListener('storage-update', handleUpdate);
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <PageHeader title="부모님 안심 대시보드" />
            <ParentDashboard userData={data} />
        </div>
    );
};

export default ParentPage;
