import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../common/Button';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import PageHeader from '../../common/PageHeader';
import styles from './Cuboids5th.module.css';

const Cuboids5th = () => {
    const [l, setL] = useState(100); // Length
    const [w, setW] = useState(80);  // Width
    const [h, setH] = useState(60);  // Height
    const [rotate, setRotate] = useState({ x: -20, y: 35 });

    const surfaceArea = 2 * (l * w + w * h + h * l);

    return (
        <div className={styles.container}>
            <PageHeader />
            <header className={styles.header}>
                <h2 className={styles.title}>5학년 수학: 직육면체 원리 탐험</h2>
                <p className={styles.subtitle}>입체도형의 부피와 겉넓이를 입체적으로 이해해봐요!</p>
            </header>

            <div className={styles.mainLayout}>
                <div className={styles.visualizer}>
                    <div className={styles.scene}>
                        <motion.div 
                            className={styles.cube}
                            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
                            transition={{ type: 'spring', stiffness: 50 }}
                        >
                            {/* Faces */}
                            <div className={`${styles.face} ${styles.front}`} style={{ width: l, height: h, transform: `translateZ(${w/2}px)` }}>앞</div>
                            <div className={`${styles.face} ${styles.back}`} style={{ width: l, height: h, transform: `rotateY(180deg) translateZ(${w/2}px)` }}>뒤</div>
                            <div className={`${styles.face} ${styles.right}`} style={{ width: w, height: h, transform: `rotateY(90deg) translateZ(${l/2}px)` }}>우</div>
                            <div className={`${styles.face} ${styles.left}`} style={{ width: w, height: h, transform: `rotateY(-90deg) translateZ(${l/2}px)` }}>좌</div>
                            <div className={`${styles.face} ${styles.top}`} style={{ width: l, height: w, transform: `rotateX(90deg) translateZ(${h/2}px)` }}>상</div>
                            <div className={`${styles.face} ${styles.bottom}`} style={{ width: l, height: w, transform: `rotateX(-90deg) translateZ(${h/2}px)` }}>하</div>
                        </motion.div>
                    </div>

                    <div className={styles.rotationControls}>
                        <input type="range" min="-180" max="180" value={rotate.y} onChange={(e) => setRotate({...rotate, y: parseInt(e.target.value)})} />
                        <p>좌우 회전 (Y-axis)</p>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.controlCard}>
                        <h3>📏 크기 조절 (px)</h3>
                        <div className={styles.inputItem}>
                            <label>가로 (Length): {l}</label>
                            <input type="range" min="40" max="150" value={l} onChange={(e) => setL(parseInt(e.target.value))} />
                        </div>
                        <div className={styles.inputItem}>
                            <label>세로 (Width): {w}</label>
                            <input type="range" min="40" max="150" value={w} onChange={(e) => setW(parseInt(e.target.value))} />
                        </div>
                        <div className={styles.inputItem}>
                            <label>높이 (Height): {h}</label>
                            <input type="range" min="40" max="150" value={h} onChange={(e) => setH(parseInt(e.target.value))} />
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <h3>📐 계산 결과</h3>
                        <p>겉넓이: <strong>{surfaceArea.toLocaleString()} px²</strong></p>
                        <p>입체도형 요소:</p>
                        <ul>
                            <li>면의 개수: <strong>6개</strong></li>
                            <li>모서리의 개수: <strong>12개</strong></li>
                            <li>꼭짓점의 개수: <strong>8개</strong></li>
                        </ul>
                    </div>
                    
                    <div className={styles.proTip}>
                        💡 <strong>직육면체 팁:</strong> 마주 보는 두 면은 서로 평행하고 크기가 같아요!
                    </div>
                </div>
            </div>
            <JsonLd data={generateCourseSchema("직육면체", "직육면체의 구성 요소와 성질을 입체적으로 배웁니다.")} />
        </div>
    );
};

export default Cuboids5th;
