import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { JsonLd, generateCourseSchema } from '../seo/JsonLd';

const UnitConverter = () => {
    const [cm, setCm] = useState(150); // Base unit cm

    // 1m = 100cm
    const m = Math.floor(cm / 100);
    const remCm = cm % 100;

    // 1cm = 10mm
    const mm = cm * 10;

    return (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontFamily: 'Jua, sans-serif' }}>단위 변환기: 길이 📏</h2>
            <p style={{ marginBottom: '40px', fontSize: '1.2rem', color: '#666' }}>
                센티미터(cm)가 모이면 미터(m)가 되고, 쪼개지면 밀리미터(mm)가 돼요!
            </p>

            <div style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
            }}>
                {/* Visual Bar */}
                <div style={{ position: 'relative', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '30px', overflow: 'hidden' }}>
                    <motion.div
                        style={{ height: '100%', backgroundColor: '#48dbfb', borderRadius: '30px' }}
                        animate={{ width: `${Math.min(100, (cm / 200) * 100)}%` }} // Scale 200cm to 100%
                    />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold' }}>
                        {cm} cm
                    </div>
                </div>

                {/* Input Control */}
                <div>
                    <input
                        type="range"
                        min="1"
                        max="200"
                        value={cm}
                        onChange={(e) => setCm(Number(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', marginTop: '5px' }}>
                        <span>1cm</span>
                        <span>200cm</span>
                    </div>
                </div>

                {/* Converters */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ backgroundColor: '#FFF9C4', padding: '20px', borderRadius: '15px' }}>
                        <h3>미터(m)와 센티미터(cm)</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                            {m} m {remCm} cm
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>100cm = 1m</p>
                    </div>

                    <div style={{ backgroundColor: '#FFCCBC', padding: '20px', borderRadius: '15px' }}>
                        <h3>밀리미터(mm)</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                            {mm} mm
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>1cm = 10mm</p>
                    </div>
                </div>
            </div>

            <article style={{ marginTop: '40px', textAlign: 'left', lineHeight: '1.6', backgroundColor: '#E0F7FA', padding: '20px', borderRadius: '15px' }}>
                <h3>💡 길이 박사님 노트</h3>
                <ul>
                    <li><strong>1mm (밀리미터)</strong>: 개미만큼 작은 길이. 자의 가장 작은 눈금 하나예요.</li>
                    <li><strong>1cm (센티미터)</strong>: 손톱 너비 정도. 10mm가 모여 1cm가 돼요.</li>
                    <li><strong>1m (미터)</strong>: 양팔을 벌린 길이 정도. 100cm가 모여 1m가 돼요.</li>
                </ul>
            </article>

            <JsonLd data={generateCourseSchema("길이 단위 변환", "cm, m, mm 단위의 관계를 시각적으로 확인하고 변환해봅니다.")} />
        </div>
    );
};

export default UnitConverter;
