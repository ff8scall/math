# 컴포넌트 구현 기술 참고서

> 각 학년별 컴포넌트 구현 시 참고할 코드 패턴과 라이브러리

---

## 📦 필수 라이브러리

### 이미 설치됨
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.x",
  "framer-motion": "^10.x",
  "canvas-confetti": "^1.x"
}
```

### 추가 설치 필요 (학년별)
```bash
# 3D 도형용 (5-6학년)
npm install three @react-three/fiber @react-three/drei

# 그래프용 (4-6학년)
npm install recharts
# 또는
npm install chart.js react-chartjs-2

# 드래그 앤 드롭 (1-2학년)
npm install react-dnd react-dnd-html5-backend
# 또는 Framer Motion의 drag 기능 사용
```

---

## 🎯 컴포넌트 템플릿

### 기본 템플릿 (모든 학년 공통)

```jsx
// src/components/math/grade1/NumberCounting.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './NumberCounting.module.css';

const NumberCounting = () => {
    // 모드 상태
    const [mode, setMode] = useState('explore'); // 'explore' or 'practice'
    
    // 탐험 모드 상태
    const [count, setCount] = useState(0);
    
    // 연습 모드 상태
    const [quizData, setQuizData] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // 문제 생성
    const generateQuiz = () => {
        const problemTypes = ['counting', 'comparison', 'sequence'];
        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];
        
        if (type === 'counting') {
            const count = Math.floor(Math.random() * 9) + 1; // 1-9
            setQuizData({
                type,
                question: `사과가 몇 개인가요?`,
                answer: count,
                items: Array(count).fill('🍎'),
                explanation: `사과를 세어보면 ${count}개예요.`
            });
        }
        // ... 다른 타입들
        
        setUserAnswer('');
        setFeedback(null);
        setShowAnswer(false);
    };

    useEffect(() => {
        if (mode === 'practice' && !quizData) generateQuiz();
    }, [mode]);

    // 답 확인
    const checkAnswer = () => {
        if (parseInt(userAnswer) === quizData.answer) {
            setFeedback('correct');
            confetti();
            updateCoins(10);
            setTimeout(generateQuiz, 2000);
        } else {
            setFeedback('incorrect');
        }
    };

    // 답 보기
    const handleShowAnswer = () => {
        setShowAnswer(true);
        setFeedback('skipped');
    };

    return (
        <div className={styles.container}>
            {/* 모드 전환 탭 */}
            <div className={styles.modeTabs}>
                <Button 
                    onClick={() => setMode('explore')} 
                    variant={mode === 'explore' ? 'primary' : 'secondary'}
                >
                    🔍 탐험하기
                </Button>
                <Button 
                    onClick={() => setMode('practice')} 
                    variant={mode === 'practice' ? 'primary' : 'secondary'}
                >
                    ✏️ 문제 풀기
                </Button>
            </div>

            {mode === 'explore' ? (
                <ExploreMode count={count} setCount={setCount} />
            ) : (
                <PracticeMode 
                    quizData={quizData}
                    userAnswer={userAnswer}
                    setUserAnswer={setUserAnswer}
                    checkAnswer={checkAnswer}
                    feedback={feedback}
                    showAnswer={showAnswer}
                    handleShowAnswer={handleShowAnswer}
                    generateQuiz={generateQuiz}
                />
            )}

            <JsonLd data={generateCourseSchema("9까지의 수", "1부터 9까지 수를 세고 비교합니다.")} />
        </div>
    );
};

// 탐험 모드 컴포넌트
const ExploreMode = ({ count, setCount }) => {
    return (
        <div className={styles.explore}>
            <h2>수 세기 탐험 🔢</h2>
            
            {/* 시각적 요소 */}
            <div className={styles.itemGrid}>
                {Array(count).fill(null).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={styles.item}
                    >
                        🍎
                    </motion.div>
                ))}
            </div>

            {/* 컨트롤 */}
            <div className={styles.controls}>
                <Button onClick={() => setCount(Math.max(0, count - 1))}>
                    하나 빼기
                </Button>
                <span className={styles.countDisplay}>{count}</span>
                <Button onClick={() => setCount(Math.min(9, count + 1))}>
                    하나 추가
                </Button>
            </div>
        </div>
    );
};

// 연습 모드 컴포넌트
const PracticeMode = ({ quizData, userAnswer, setUserAnswer, checkAnswer, feedback, showAnswer, handleShowAnswer, generateQuiz }) => {
    if (!quizData) return null;

    return (
        <div className={styles.practice}>
            <h2>수 세기 문제 풀기 ✏️</h2>
            
            {/* 문제 */}
            <div className={styles.problemCard}>
                <h3>{quizData.question}</h3>
                
                {/* 시각적 요소 */}
                <div className={styles.itemGrid}>
                    {quizData.items.map((item, i) => (
                        <span key={i} className={styles.item}>{item}</span>
                    ))}
                </div>

                {/* 답 입력 */}
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="답을 입력하세요"
                    disabled={feedback === 'correct' || showAnswer}
                    className={styles.input}
                />

                {/* 버튼 */}
                <div className={styles.buttons}>
                    <Button onClick={checkAnswer} disabled={feedback === 'correct' || showAnswer} fullWidth>
                        제출하기
                    </Button>
                    {!showAnswer && feedback !== 'correct' && (
                        <Button onClick={handleShowAnswer} variant="secondary" fullWidth>
                            답 보기
                        </Button>
                    )}
                </div>

                {/* 피드백 */}
                <AnimatePresence>
                    {feedback === 'correct' && (
                        <motion.div className={styles.feedbackCorrect}>
                            정답입니다! +10 코인 🪙
                        </motion.div>
                    )}
                    {feedback === 'incorrect' && (
                        <motion.div className={styles.feedbackIncorrect}>
                            다시 생각해보세요!
                        </motion.div>
                    )}
                    {showAnswer && (
                        <motion.div className={styles.feedbackAnswer}>
                            <p><strong>정답:</strong> {quizData.answer}</p>
                            <p>{quizData.explanation}</p>
                            <Button onClick={generateQuiz}>다음 문제</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NumberCounting;
```

---

## 🎨 애니메이션 패턴

### 1. Framer Motion 기본

```jsx
// 페이드 인
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
>
    내용
</motion.div>

// 슬라이드 인
<motion.div
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    transition={{ type: "spring" }}
>
    내용
</motion.div>

// 스케일 애니메이션
<motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
>
    버튼
</motion.div>

// 드래그
<motion.div
    drag
    dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
    dragElastic={0.1}
>
    드래그 가능
</motion.div>
```

### 2. 수 변화 애니메이션

```jsx
const [displayNumber, setDisplayNumber] = useState(0);

useEffect(() => {
    const start = displayNumber;
    const end = targetNumber;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        setDisplayNumber(current);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}, [targetNumber]);
```

---

## 📊 그래프/차트 구현

### Recharts 예제 (막대그래프)

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    { name: '월', value: 30 },
    { name: '화', value: 50 },
    { name: '수', value: 40 },
];

<BarChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#8884d8" />
</BarChart>
```

### Chart.js 예제 (원그래프)

```jsx
import { Pie } from 'react-chartjs-2';

const data = {
    labels: ['빨강', '파랑', '노랑'],
    datasets: [{
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
};

<Pie data={data} />
```

---

## 🎮 인터랙티브 요소

### 드래그 앤 드롭 (Framer Motion)

```jsx
const [items, setItems] = useState(['🍎', '🍌', '🍇']);

<motion.div
    drag
    onDragEnd={(e, info) => {
        // 드롭 위치 확인
        const dropZone = document.elementFromPoint(info.point.x, info.point.y);
        if (dropZone.classList.contains('dropzone')) {
            // 분류 로직
        }
    }}
>
    {item}
</motion.div>
```

### 클릭으로 그리기

```jsx
const [points, setPoints] = useState([]);

const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, { x, y }]);
};

<svg onClick={handleCanvasClick}>
    {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="5" fill="blue" />
    ))}
    {points.length > 1 && (
        <polyline
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="blue"
            strokeWidth="2"
        />
    )}
</svg>
```

---

## 🔢 수학 로직 헬퍼

### 약수 구하기

```javascript
export const findFactors = (n) => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) factors.push(i);
    }
    return factors;
};
```

### 최대공약수

```javascript
export const gcd = (a, b) => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};
```

### 최소공배수

```javascript
export const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
};
```

### 분수 약분

```javascript
export const simplifyFraction = (numerator, denominator) => {
    const divisor = gcd(numerator, denominator);
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
    };
};
```

### 소수 판별

```javascript
export const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};
```

---

## 🎭 3D 도형 구현 (5-6학년)

### Three.js + React Three Fiber

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const Cube3D = () => {
    return (
        <Canvas camera={{ position: [5, 5, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            {/* 직육면체 */}
            <Box args={[2, 3, 4]}>
                <meshStandardMaterial color="orange" />
            </Box>
            
            {/* 회전 컨트롤 */}
            <OrbitControls />
        </Canvas>
    );
};
```

### 각기둥

```jsx
import { CylinderGeometry } from 'three';

<mesh>
    <cylinderGeometry args={[1, 1, 3, 6]} /> {/* 육각기둥 */}
    <meshStandardMaterial color="blue" />
</mesh>
```

### 원뿔

```jsx
<mesh>
    <coneGeometry args={[1, 2, 32]} />
    <meshStandardMaterial color="green" />
</mesh>
```

---

## 🎨 학년별 CSS 변수

### src/styles/grade-themes.css

```css
/* 1-2학년 */
.grade-1-2 {
    --primary-color: #FF6B6B;
    --secondary-color: #FFA500;
    --bg-color: #FFF9E6;
    --font-size-base: 2rem;
    --button-size: 60px;
}

/* 3-4학년 */
.grade-3-4 {
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --bg-color: #F0F8FF;
    --font-size-base: 1.5rem;
    --button-size: 50px;
}

/* 5-6학년 */
.grade-5-6 {
    --primary-color: #2C3E50;
    --secondary-color: #3498DB;
    --bg-color: #ECF0F1;
    --font-size-base: 1.2rem;
    --button-size: 45px;
}
```

---

## 📱 반응형 디자인

### 모바일 우선

```css
/* 기본 (모바일) */
.container {
    padding: 20px;
    max-width: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

/* 태블릿 */
@media (min-width: 768px) {
    .container {
        padding: 30px;
    }
    
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 데스크톱 */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## 🧪 테스트 가이드

### 필수 테스트 항목

1. **기능 테스트**
   - [ ] 탐험 모드 인터랙션 작동
   - [ ] 연습 모드 문제 생성
   - [ ] 정답 체크 정확성
   - [ ] 코인 보상 지급

2. **UI/UX 테스트**
   - [ ] 모바일 반응형
   - [ ] 버튼 크기 적절
   - [ ] 애니메이션 부드러움
   - [ ] 피드백 명확성

3. **성능 테스트**
   - [ ] 로딩 속도 (3초 이내)
   - [ ] 애니메이션 60fps
   - [ ] 메모리 누수 없음

---

## 🚀 배포 체크리스트

- [ ] 모든 컴포넌트 테스트 완료
- [ ] SEO 메타태그 추가
- [ ] 이미지 최적화 (WebP)
- [ ] 번들 크기 확인 (< 500KB per chunk)
- [ ] `npm run build` 성공
- [ ] Git commit & push
- [ ] Vercel 자동 배포 확인

---

## 📚 참고 자료

- [Framer Motion 문서](https://www.framer.com/motion/)
- [Three.js 예제](https://threejs.org/examples/)
- [Recharts 문서](https://recharts.org/)
- [React DnD](https://react-dnd.github.io/react-dnd/)
- [MDN 수학 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math)

---

## 💡 팁

1. **재사용 가능한 컴포넌트 만들기**
   - NumberInput, ShapeCanvas, GraphMaker 등

2. **상태 관리 단순화**
   - Context API 또는 Zustand 고려 (학년 간 공통 상태)

3. **성능 최적화**
   - React.memo() 사용
   - useMemo(), useCallback() 활용
   - 큰 리스트는 virtualization

4. **접근성**
   - ARIA 라벨 추가
   - 키보드 네비게이션 지원
   - 색맹 고려 (색상만으로 정보 전달 X)

---

**Ready to build! 🚀**
