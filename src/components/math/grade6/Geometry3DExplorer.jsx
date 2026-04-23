import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import Button from '../../common/Button';
import styles from './Geometry3DExplorer.module.css';

const Shape = ({ type, color = "#FFD93D" }) => {
    switch (type) {
        case 'cylinder':
            return <cylinderGeometry args={[1, 1, 2, 32]} />;
        case 'cone':
            return <coneGeometry args={[1, 2, 32]} />;
        case 'sphere':
            return <sphereGeometry args={[1, 32, 32]} />;
        case 'prism':
            return <boxGeometry args={[1.5, 1.5, 1.5]} />;
        default:
            return <boxGeometry />;
    }
};

const Geometry3DExplorer = () => {
    const [shape, setShape] = useState('cylinder');
    const [wireframe, setWireframe] = useState(false);
    const [color, setColor] = useState('#FFD93D');

    const shapeInfo = {
        cylinder: { name: '원기둥', faces: 3, vertices: 0, edges: 2, desc: '위아래 면이 원이고 옆면이 굽은 면인 기둥 모양이에요.' },
        cone: { name: '원뿔', faces: 2, vertices: 1, edges: 1, desc: '밑면이 원이고 옆면이 굽은 면이며 뾰족한 뿔 모양이에요.' },
        sphere: { name: '구', faces: 1, vertices: 0, edges: 0, desc: '어느 방향에서 보아도 원 모양인 공 모양이에요.' },
        prism: { name: '각기둥 (정육면체)', faces: 6, vertices: 8, edges: 12, desc: '모든 면이 평면이고 다각형인 기둥 모양이에요.' }
    };

    return (
        <div className={styles.container}>
            <div className={styles.uiOverlay}>
                <div className={styles.infoCard}>
                    <h2>💎 {shapeInfo[shape].name} 실험실</h2>
                    <p>{shapeInfo[shape].desc}</p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>면: {shapeInfo[shape].faces}</div>
                        <div className={styles.stat}>꼭짓점: {shapeInfo[shape].vertices}</div>
                        <div className={styles.stat}>모서리: {shapeInfo[shape].edges}</div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.btnGroup}>
                        <Button onClick={() => setShape('cylinder')} variant={shape === 'cylinder' ? 'primary' : 'secondary'}>원기둥</Button>
                        <Button onClick={() => setShape('cone')} variant={shape === 'cone' ? 'primary' : 'secondary'}>원뿔</Button>
                        <Button onClick={() => setShape('sphere')} variant={shape === 'sphere' ? 'primary' : 'secondary'}>구</Button>
                        <Button onClick={() => setShape('prism')} variant={shape === 'prism' ? 'primary' : 'secondary'}>각기둥</Button>
                    </div>
                    <div className={styles.toggleArea}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" checked={wireframe} onChange={(e) => setWireframe(e.target.checked)} />
                            뼈대 보기 (Wireframe)
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.canvasWrapper}>
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.5}>
                            <mesh castShadow receiveShadow>
                                <Shape type={shape} />
                                <meshStandardMaterial 
                                    color={color} 
                                    wireframe={wireframe} 
                                    roughness={0.3} 
                                    metalness={0.2}
                                />
                            </mesh>
                        </Stage>
                        <OrbitControls autoRotate={!wireframe} autoRotateSpeed={2} />
                        <Environment preset="soft" />
                    </Suspense>
                    <gridHelper args={[10, 10, '#ddd', '#eee']} position={[0, -1.5, 0]} />
                </Canvas>
            </div>
            
            <p className={styles.hint}>🖱️ 마우스로 도형을 돌려보거나 휠로 확대해보세요!</p>
        </div>
    );
};

export default Geometry3DExplorer;
