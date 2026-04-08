
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../src/data/seoData.js');

let content = fs.readFileSync(filePath, 'utf8');

const updates = [
    {
        target: "{ path: '/grade/5/mixed-arithmetic', title: '5학년 수학: 복합 사칙연산', description: '계산 순서에 주의하며 사칙연산 혼합 계산을 연습합니다.', keywords: '5학년연산, 혼합계산, 순서', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/mixed-arithmetic', title: '5학년 수학: 복합 사칙연산', description: '덧셈, 뺄셈, 곱셈, 나눗셈이 섞여 있는 복합 연산의 우선순위를 정확하게 학습합니다. 괄호의 유무에 따른 계산 순서의 변화를 시각적으로 이해하고 연습함으로써 연산 실수를 줄이고, 복잡한 수식을 체계적으로 해결하는 논리적 사고력을 탄탄하게 다지는 과정입니다.', keywords: '5학년연산, 혼합계산, 순서', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/factors-multiples', title: '5학년 수학: 약수와 배수', description: '최대공약수와 최소공배수를 구하는 원리와 활용을 배웁니다.', keywords: '약수, 배수, 최대공약수, 최소공배수', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/factors-multiples', title: '5학년 수학: 약수와 배수', description: '약수와 배수의 정의를 넘어서 최대공약수와 최소공배수를 구하는 여러 가지 방법을 익힙니다. 수들의 관계를 파악하고 실생활의 분배 문제나 주기 문제를 해결하는 활용 능력을 기르며, 향후 배울 분수의 통분과 약분을 위한 핵심적인 수학적 기초를 완성합니다.', keywords: '약수, 배수, 최대공약수, 최소공배수', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/fraction-arithmetic', title: '5학년 수학: 분수의 약분과 통분', description: '분모가 다른 분수의 덧셈과 뺄셈을 위해 꼭 필요한 개념을 학습합니다.', keywords: '통분, 약분, 다른분모분수', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/fraction-arithmetic', title: '5학년 수학: 분수의 약분과 통분', description: '분모가 다른 분수를 계산하기 위해 필수적인 약분과 통분의 원리를 배웁니다. 크기가 같은 분수의 성질을 이해하고 공통분모를 찾아 연산하는 과정을 통해 분수 체계를 완벽하게 장악하고, 복잡한 분수 연산을 쉽고 빠르게 해결하는 고난도 연산 능력을 함양합니다.', keywords: '통분, 약분, 다른분모분수', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/area', title: '5학년 수학: 다각형의 둘레와 넓이', description: '다각형의 넓이 공식을 유도하고 계산해봅니다.', keywords: '5학년넓이, 도형공식, 면적계산', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/area', title: '5학년 수학: 다각형의 둘레와 넓이', description: '정사각형, 직사각형을 넘어 평행사변형, 삼각형, 마름모, 사다리꼴의 넓이 공식을 직접 유도해봅니다. 도형을 자르고 붙이는 인터랙티브 활동을 통해 공식의 원리를 깨닫고, 복잡한 평면도형의 면적을 계산하는 공간 분석력과 기하학적 사고력을 극대화합니다.', keywords: '5학년넓이, 도형공식, 면적계산', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/rules', title: '5학년 수학: 규칙과 대응', description: '두 양 사이의 대응 관계를 파악하고 식으로 나타냅니다.', keywords: '규칙과대응, 대응관계, 함수기초', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/rules', title: '5학년 수학: 규칙과 대응', description: '두 양 사이의 변하는 관계를 파악하고 이를 기호나 식으로 나타내는 법을 학습합니다. 향후 중등 수학에서 배울 함수의 기초가 되는 대응 관계를 실생활 예시를 통해 발견함으로써, 현상의 규칙성을 수학적으로 모델링하는 추상화 능력을 기르는 중요한 단계입니다.', keywords: '규칙과대응, 대응관계, 함수기초', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/reduction', title: '5학년 수학: 분수의 덧셈과 뺄셈 (심화)', description: '통분을 활용한 분수의 고급 연산을 연습합니다.', keywords: '분수심화, 통분연산, 분수합차', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/reduction', title: '5학년 수학: 분수의 덧셈과 뺄셈 (심화)', description: '통분을 활용하여 분모가 다른 진분수와 대분수의 합과 차를 구하는 심화 과정을 연습합니다. 연산 과정에서의 실수 포인트를 점검하고 최적의 계산 경로를 찾아내는 훈련을 통해, 분수 연산에 대한 완전한 자신감을 얻고 고학년 수학의 복합적 난관을 돌파합니다.', keywords: '분수심화, 통분연산, 분수합차', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/range', title: '5학년 수학: 범위와 어림하기', description: '이상, 이하, 초과, 미만의 개념과 올림, 버림, 반올림을 배웁니다.', keywords: '수의범위, 올림버림반올림, 어림하기', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/range', title: '5학년 수학: 범위와 어림하기', description: '이상, 이하, 초과, 미만의 수의 범위 개념과 올림, 버림, 반올림의 어림하기 기술을 실생활 사례와 함께 배웁니다. 상황에 맞는 적절한 어림법을 선택하여 수치를 처리하는 실용적인 감각을 기르고, 데이터의 근사치를 이해함으로써 합리적인 판단 능력을 키워줍니다.', keywords: '수의범위, 올림버림반올림, 어림하기', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/fraction-multiplication', title: '5학년 수학: 분수의 곱셈', description: '분수와 자연수, 분수와 분수의 곱셈 원리를 학습합니다.', keywords: '분수곱셈, 분수의계산, 연산', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/fraction-multiplication', title: '5학년 수학: 분수의 곱셈', description: '분수와 자연수, 분수와 분수의 곱셈 원리를 시각적 모델을 통해 완벽하게 이해합니다. 전체의 부분의 부분을 구하는 과정을 통해 곱셈이 수의 크기를 어떻게 변화시키는지 깨닫고, 분수 연산의 확장성을 경험하며 중등 대수 학습을 위한 기초 실력을 완성합니다.', keywords: '분수곱셈, 분수의계산, 연산', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/congruence', title: '5학년 수학: 합동과 대칭', description: '도형의 합동과 선대칭, 점대칭 도형의 성질을 배웁니다.', keywords: '합동, 선대칭, 점대칭, 도형성질', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/congruence', title: '5학년 수학: 합동과 대칭', description: '모양과 크기가 똑같은 도형의 합동 조건과 선대칭, 점대칭 도형의 성질을 탐구합니다. 도형을 뒤집거나 돌렸을 때의 변화를 예측하고 대칭축과 대칭의 중심을 찾는 활동을 통해, 고차원적인 공간 지각력과 기하학적 추론 능력을 비약적으로 향상시킬 수 있습니다.', keywords: '합동, 선대칭, 점대칭, 도형성질', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/decimal-multiplication', title: '5학년 수학: 소수의 곱셈', description: '소수의 곱셈 원리를 소수점 위치 변화와 함께 이해합니다.', keywords: '소수곱셈, 소수점위치, 연산', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/decimal-multiplication', title: '5학년 수학: 소수의 곱셈', description: '소수의 곱셈 결과에서 소수점의 위치가 결정되는 원리를 십진법과 분수의 관계를 통해 학습합니다. 자연수 곱셈과의 연관성을 이해하고 실생활의 정밀한 수치 계산(넓이, 가격 등)에 적용해보며, 수의 정밀한 조작 능력과 수학적 정확성을 기르는 훈련입니다.', keywords: '소수곱셈, 소수점위치, 연산', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/cuboid', title: '5학년 수학: 직육면체와 정육면체', description: '입체도형의 기초인 직육면체의 구성 요소와 성질을 배웁니다.', keywords: '직육면체, 정육면체, 겨냥도, 전개도', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/cuboid', title: '5학년 수학: 직육면체와 정육면체', description: '입체도형의 기초인 직육면체의 구성 요소(면, 모서리, 꼭짓점)와 성질을 배웁니다. 겨냥도와 전개도를 그려보고 조립하는 시뮬레이션을 통해 평면에서 입체를 상상하는 능력을 키우며, 공간 구조를 분석하고 입체적으로 사고하는 기하학적 기초를 확립합니다.', keywords: '직육면체, 정육면체, 겨냥도, 전개도', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/average', title: '5학년 수학: 평균과 가능성', description: '평균을 구하고 일어날 가능성을 수로 표현해봅니다.', keywords: '평균구하기, 확률기초, 가능성', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/average', title: '5학년 수학: 평균과 가능성', description: '흩어져 있는 자료의 대표값인 평균을 구하고, 사건이 일어날 가능성을 수치로 표현하는 법을 익힙니다. 통계의 기초를 형성하고 불확실한 상황에서 합리적인 예측을 수행하는 연습을 통해, 데이터 기반의 비판적 사고력과 확률적 통찰력을 기르는 현대 사회의 필수 과정입니다.', keywords: '평균구하기, 확률기초, 가능성', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/quiz', title: '5학년 수학 퀴즈 - 매쓰 펫토리', description: '5학년 수학 실력 점검 퀴즈!', keywords: '5학년퀴즈, 초등수학문제, 학습지', priority: 0.8, changefreq: 'daily' },",
        replacement: "{ path: '/grade/5/quiz', title: '5학년 수학 퀴즈 - 매쓰 펫토리', description: '중등 수학의 가교 역할을 하는 5학년 핵심 개념들을 완벽히 마스터할 수 있는 퀴즈 서비스! 약수와 배수부터 입체도형까지 범위별 맞춤 문제를 통해 학습 성취도를 극대화할 수 있습니다. 각 문제에 최적화된 시각적 해설은 어려운 개념도 단번에 이해시켜 줍니다.', keywords: '5학년퀴즈, 초등수학문제, 학습지', priority: 0.8, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/6/fraction-division', title: '6학년 수학: 분수의 나눗셈', description: '분수의 나눗셈이 곱셈으로 변하는 원리를 완벽하게 이해합니다.', keywords: '분수나눗셈, 역수곱셈, 6학년수학', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/fraction-division', title: '6학년 수학: 분수의 나눗셈', description: '분수의 나눗셈이 왜 역수를 곱하는 형태로 변하는지 그 근원적인 원리를 시각적으로 증명하며 배웁니다. 기계적인 암기가 아닌 개념적 이해를 통해 어떤 형태의 분수 나눗셈도 자유자재로 해결하는 능력을 기르고, 중등 대수의 기초가 되는 연산 원리를 정립합니다.', keywords: '분수나눗셈, 역수곱셈, 6학년수학', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/decimal-division', title: '6학년 수학: 소수의 나눗셈', description: '소수점 위치를 옮겨가며 정교하게 계산하는 법을 배웁니다.', keywords: '소수나눗셈, 나누기, 연산원리', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/decimal-division', title: '6학년 수학: 소수의 나눗셈', description: '소수점 위치 이동의 의미를 정확히 파악하여 세로셈으로 소수의 나눗셈을 수행하는 법을 학습합니다. 몫의 소수점과 나머지의 소수점 차이를 구별하고 제수가 소수인 경우의 처리 과정을 익힘으로써, 정확한 수치 계산과 수 감각을 극한으로 끌어올리는 단계입니다.', keywords: '소수나눗셈, 나누기, 연산원리', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/ratio', title: '6학년 수학: 비와 비율, 백분율', description: '비율과 백분율의 실생활 활용과 개념을 마스터합니다.', keywords: '비와비율, 백분율, 퍼센트, 기준량', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/ratio', title: '6학년 수학: 비와 비율, 백분율', description: '두 양을 비교하는 비의 개념부터 비율, 백분율(%)의 실생활 활용까지 마스터합니다. 할인율, 농도, 인구밀도 등 복잡한 사회 현상을 수치화하여 분석하는 법을 배우며, 수의 관계적 의미를 파악하고 비판적으로 정보를 해석하는 데이터 리터러시 능력을 함양합니다.', keywords: '비와비율, 백분율, 퍼센트, 기준량', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/circle-area', title: '6학년 수학: 원의 넓이와 원주율', description: '원주율의 개념과 원의 넓이 계산 공식을 학습합니다.', keywords: '원의넓이, 원주율, 지름, 반지름', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/circle-area', title: '6학년 수학: 원의 넓이와 원주율', description: '원주와 지름의 관계인 원주율(3.14...)의 고전적 발견 원리를 실습하고 원의 넓이 공식을 유도합니다. 원을 무수히 잘라 사각형으로 만드는 적분의 기초 개념을 시각화하여 학습함으로써, 곡선 도형에 대한 기하학적 이해를 높이고 고차원적인 수학적 영감을 선사합니다.', keywords: '원의넓이, 원주율, 지름, 반지름', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/geometry', title: '6학년 수학: 각기둥과 각뿔', description: '각기둥과 각뿔의 특징을 비교하고 입체도형을 이해합니다.', keywords: '각기둥, 각뿔, 입체도형, 전개도', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/geometry', title: '6학년 수학: 각기둥과 각뿔', description: '밑면의 모양에 따른 각기둥과 각뿔의 체계적인 분류와 구성 요소별 특징을 학습합니다. 입체도형의 전개도를 분석하고 겨냥도를 그려보며 공간 지각력을 완성하고, 다면체의 성질을 탐구하며 기하학적 논리 체계를 중등 과정 수준으로 끌어올리는 중요한 과정입니다.', keywords: '각기둥, 각뿔, 입체도형, 전개도', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/graphs', title: '6학년 수학: 띠그래프와 원그래프', description: '비율을 나타내는 여러 가지 그래프를 해석하고 그립니다.', keywords: '띠그래프, 원그래프, 비율그래프', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/graphs', title: '6학년 수학: 띠그래프와 원그래프', description: '비율을 시각화하는 띠그래프와 원그래프의 작성법과 해석법을 배웁니다. 전체에 대한 부분의 크기를 직관적으로 파악하고 다양한 통계 자료를 목적에 맞는 그래프로 표현하는 연습을 통해, 정보 디자인 능력과 정보 요약 및 전달의 효율적인 기술을 익히게 됩니다.', keywords: '띠그래프, 원그래프, 비율그래프', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/volume', title: '6학년 수학: 직육면체의 부피와 겉넓이', description: '입체도형의 크기를 나타내는 부피와 겉넓이 구하는 법을 배웁니다.', keywords: '부피구하기, 겉넓이, 입체도형측정', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/volume', title: '6학년 수학: 직육면체의 부피와 겉넓이', description: '입체도형의 공간적 크기인 부피와 표면의 넓이 합인 겉넓이의 개념을 명확히 구분하여 배웁니다. 쌓기나무 모델을 통해 단위 부피의 의미를 이해하고 계산 공식을 유도해봄으로써, 3차원 공간을 수치화하는 정밀한 측정 능력과 실용적인 기하 능력을 기릅니다.', keywords: '부피구하기, 겉넓이, 입체도형측정', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/proportion', title: '6학년 수학: 비례식과 비례배분', description: '비의 성질을 이용한 비례식과 비례배분 원리를 배웁니다.', keywords: '비례식, 비례배분, 비율활용', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/proportion', title: '6학년 수학: 비례식과 비례배분', description: '비의 성질을 이용한 비례식의 해 구하기와 전체를 일정 비율로 나누는 비례배분의 원리를 배웁니다. 실생활의 이익 배분, 지도 제작의 축척, 요리 레시피 조절 등 수학이 실제 환경에서 어떻게 문제 해결의 강력한 도구가 되는지 경험하며 수학적 응용력을 완성합니다.', keywords: '비례식, 비례배분, 비율활용', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/round-geometry', title: '6학년 수학: 원기둥, 원뿔, 구', description: '회전체인 원기둥, 원뿔, 구의 개념과 성질을 학습합니다.', keywords: '원기둥, 원뿔, 구, 회전체', priority: 0.9, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/round-geometry', title: '6학년 수학: 원기둥, 원뿔, 구', description: '평면도형을 회전시켜 만드는 회전체인 원기둥, 원뿔, 구의 입체적 성질을 학습합니다. 회전축과 단면의 모양을 분석하고 각 입체도형의 특징을 비교함으로써 곡면이 포함된 입체 공간을 이해하고, 고등학교 미적분의 기초가 되는 공간 감각의 완성 단계를 밟습니다.', keywords: '원기둥, 원뿔, 구, 회전체', priority: 0.9, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/quiz', title: '6학년 수학 퀴즈 - 매쓰 펫토리', description: '중학교 진학 전 마지막 수학 점검!', keywords: '6학년퀴즈, 졸업테스트, 중등기초', priority: 0.8, changefreq: 'daily' },",
        replacement: "{ path: '/grade/6/quiz', title: '6학년 수학 퀴즈 - 매쓰 펫토리', description: '초등 수학을 마무리하고 중등 과정을 준비하는 6학년을 위한 완벽 점검 퀴즈! 비와 비율부터 입체도형의 심화 문제까지 다채로운 문항 구성을 통해 자신의 실력을 최종 확인하세요. 정밀한 오답 분석과 개념 중심의 해설은 중학교 수학으로 가는 탄탄한 가교가 되어줍니다.', keywords: '6학년퀴즈, 졸업테스트, 중등기초', priority: 0.8, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/1/game', title: '1학년 수학 레이스 - 매쓰 펫토리', description: '재미있는 달리기 게임과 함께 1학년 수학 기초를 다지세요.', keywords: '수학게임, 달리기게임, 1학년놀이', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/1/game', title: '1학년 수학 레이스 - 매쓰 펫토리', description: '신나는 달리기 게임을 하며 1학년 수학 기초 연산을 마스터하세요! 장애물을 피하고 문제를 맞히며 퀴즈 코인을 모으는 과정에서 수학에 대한 두려움은 사라지고 학습 동기가 유발됩니다. 재미와 공부를 동시에 잡는 1학년 맞춤형 에듀테인먼트 콘텐츠입니다.', keywords: '수학게임, 달리기게임, 1학년놀이', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/2/game', title: '2학년 수학 레이스 - 매쓰 펫토리', description: '구구단을 외우며 달리는 신나는 레이싱 게임!', keywords: '구구단게임, 2학년수학게임', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/2/game', title: '2학년 수학 레이스 - 매쓰 펫토리', description: '구구단을 외우며 신나게 달리는 2학년 전용 레이싱 게임! 정답을 맞힐 때마다 속도가 올라가는 박진감 넘치는 플레이를 통해 구구단을 암기가 아닌 즐거운 놀이로 기억하게 됩니다. 게임 보상으로 펫을 키우며 수학 공부의 즐거움을 매일매일 발견해보세요.', keywords: '구구단게임, 2학년수학게임', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/3/game', title: '3학년 수학 레이스 - 매쓰 펫토리', description: '연산 실력을 키우는 3학년 맞춤형 레이싱.', keywords: '3학년게임, 연산챌린지', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/3/game', title: '3학년 수학 레이스 - 매쓰 펫토리', description: '세 자리 수 연산과 나눗셈 기초를 레이싱 액션으로 즐겨보세요! 3학년 수준에 맞춘 고난도 연산 챌린지를 해결하며 승리의 쾌감을 느끼고, 반복적인 문제 풀이의 지루함을 신나는 게임으로 극복할 수 있습니다. 수학 실력을 향상과 스트레스 해소를 동시에 경험하세요.', keywords: '3학년게임, 연산챌린지', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/4/game', title: '4학년 수학 레이스 - 매쓰 펫토리', description: '각도와 큰 수 문제를 풀며 승리를 쟁취하세요.', keywords: '4학년게임, 각도레이스', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/4/game', title: '4학년 수학 레이스 - 매쓰 펫토리', description: '각도 측정과 큰 수 읽기 미션을 수행하며 달리는 4학년 수학 어드벤처! 복잡한 규칙 찾기 문제를 게임 속 퍼즐로 해결하며 논리적 사고력을 키울 수 있습니다. 친구들과의 기록 경쟁을 통해 더 높은 학습 목표에 도전하고, 나만의 펫을 멋지게 성장시켜보세요.', keywords: '4학년게임, 각도레이스', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/5/game', title: '5학년 수학 레이스 - 매쓰 펫토리', description: '혼합 계산의 달인이 되는 레이싱 게임.', keywords: '5학년게임, 사칙연산레이스', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/5/game', title: '5학년 수학 레이스 - 매쓰 펫토리', description: '혼합 사칙연산의 순서를 지키며 장애물을 돌파하는 5학년 전략 레이싱! 약수와 배수 개념을 활용한 아이템 획득 시스템은 게임 플레이 자체를 수학적 사고 과정으로 만들어줍니다. 고도의 집중력이 필요한 고학년 연산을 가장 즐겁게 학습할 수 있는 방법입니다.', keywords: '5학년게임, 사칙연산레이스', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/6/game', title: '6학년 수학 레이스 - 매쓰 펫토리', description: '비율과 백분율을 활용하는 고학년 수학 게임.', keywords: '6학년게임, 비율레이스', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/6/game', title: '6학년 수학 레이스 - 매쓰 펫토리', description: '비율과 백분율 문제를 풀며 승부를 가리는 6학년 고난도 수학 챌린지! 입체도형의 전개도 문제를 머릿속으로 그리며 달리는 레이싱은 공간 지각력을 실시간으로 훈련시켜줍니다. 초등 과정을 마무리하는 핵심 개념들을 게임으로 총정리하며 중등 과정의 자신감을 얻으세요.', keywords: '6학년게임, 비율레이스', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/1/word-problem', title: '1학년 수학 문장제 퀴즈', description: '글로 된 수학 문제를 읽고 식으로 만들어 풀어보세요. 사고력을 키우는 1학년 문장제 연습입니다.', keywords: '문장제, 서술형문제, 1학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/1/word-problem', title: '1학년 수학 문장제 퀴즈', description: '짧은 이야기를 읽고 수학 상황을 파악하여 식으로 만드는 능력을 기릅니다. 1학년 아이들의 눈높이에 맞춘 일상 소재의 문장제 연습을 통해 국어 실력과 수학 실력을 동시에 키워주며, 서술형 문제에 대한 막연한 거부감을 없애고 논리적인 풀이 습관을 형성합니다.', keywords: '문장제, 서술형문제, 1학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/2/word-problem', title: '2학년 수학 문장제 퀴즈', description: '다양한 실생활 상황의 수학 문제를 연습합니다. 2학년 연산 실력을 서술형 문제로 다져보세요.', keywords: '문장제, 서술형문제, 2학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/2/word-problem', title: '2학년 수학 문장제 퀴즈', description: '다양한 실생활 상황이 담긴 2학년 사고력 문장제 도전! 구체적인 상황 묘사를 근거로 덧셈과 뺄셈, 곱셈의 적절한 식을 찾아내는 훈련을 합니다. 문제를 끊어 읽고 핵심 정보를 추출하는 연습을 통해 문해력을 높이고, 서술형 답안 작성을 위한 논리 구성을 배웁니다.', keywords: '문장제, 서술형문제, 2학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/3/word-problem', title: '3학년 수학 문장제 퀴즈', description: '비판적 사고를 키우는 3학년 수학 문장제 도전! 어려운 문제도 원리로 해결합니다.', keywords: '문장제, 서술형문제, 3학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/3/word-problem', title: '3학년 수학 문장제 퀴즈', description: '나눗셈과 분수가 포함된 3학년 심화 문장제 연습! 문제 속에 숨겨진 단서를 찾아 단계별로 해결하는 비판적 사고력을 길러줍니다. 어려운 문장제도 매쓰 펫토리의 단계별 힌트 시스템과 함께라면 스스로 끝까지 풀 수 있는 자신감을 얻고 수학적 독해력이 비약적으로 향상됩니다.', keywords: '문장제, 서술형문제, 3학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/4/word-problem', title: '4학년 수학 문장제 퀴즈', description: '4학년 사고력 문장제 퀴즈! 논리적인 풀이 과정을 연습합니다.', keywords: '문장제, 서술형문제, 4학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/4/word-problem', title: '4학년 수학 문장제 퀴즈', description: '큰 수와 각도, 그래프 해석이 결합된 4학년 사고력 문장제 학습! 정보를 분석하여 전체적인 해결 전략을 수립하는 논리적 사고의 틀을 완성합니다. 서술형 평가 비중이 높아지는 4학년 교육과정에 맞춰 풀이 과정을 논리정연하게 적는 법을 연습하며 실력을 탄탄히 다집니다.', keywords: '문장제, 서술형문제, 4학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/word-problem', title: '5학년 수학 문장제 퀴즈', description: '5학년 심화 문장제! 복합 연산과 원리를 활용해 문제를 해결합니다.', keywords: '문장제, 서술형문제, 5학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/word-problem', title: '5학년 수학 문장제 퀴즈', description: '약수, 배수, 복합 연산이 섞인 5학년 고난도 문장제 정복! 문제의 조건들을 수학적 기호와 식의 관계로 변환하는 고차원적 사유 능력을 학습합니다. 여러 단계의 풀이 과정이 필요한 복합 문제를 해결하며 인내심과 집요한 탐구력, 그리고 수학적 창의성을 길러주는 과정입니다.', keywords: '문장제, 서술형문제, 5학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/word-problem', title: '6학년 수학 문장제 퀴즈', description: '6학년 사고력 쑥쑥 문장제! 비율과 입체도형 문제를 글로 만나요.', keywords: '문장제, 서술형문제, 6학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/6/word-problem', title: '6학년 수학 문장제 퀴즈', description: '비율, 비례식, 입체도형의 원리를 총동원하는 6학년 사고력 완성 문장제! 실생활의 경제 활동이나 과학 원리가 담긴 문제를 통해 수학의 가치를 깊이 있게 경험합니다. 중학교 서술형 평가를 대비하여 완벽한 풀이 논리를 정립하고 최고난도 문제 해결 전략을 마스터하세요.', keywords: '문장제, 서술형문제, 6학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/1/worksheet', title: '1학년 무료 수학 학습지 출력', description: '1학년 수학 연산 학습지를 무한으로 생성하고 출력하세요. 기초 실력을 키우는 완벽한 도구입니다.', keywords: '수학학습지, 무료학습지, 1학년학습지', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/1/worksheet', title: '1학년 무료 수학 학습지 출력', description: '1학년 교육과정 맞춤형 연산 학습지를 무한으로 생성하고 프린트하세요! 수 세기부터 기초 연산까지 아이의 진도에 맞춰 난이도를 조절할 수 있습니다. 종이 위에 직접 숫자를 쓰며 공부하는 아날로그적 경험은 뇌 발달에 도움을 주며 기초 연산의 정확도를 비약적으로 높여줍니다.', keywords: '수학학습지, 무료학습지, 1학년학습지', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/2/worksheet', title: '2학년 무료 수학 학습지 출력', description: '2학년 수학 연산 학습지 무한 생성 서비스! 구구단과 받아올림 연산을 연습할 수 있습니다.', keywords: '수학학습지, 무료학습지, 2학년학습지', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/2/worksheet', title: '2학년 무료 수학 학습지 출력', description: '2학년 구구단과 받아올림 연산을 완벽히 마스터할 수 있는 무료 학습지 출력 서비스! 매번 새로운 숫자 조합으로 생성되어 반복 학습의 지루함을 없앴습니다. 집에서 간편하게 출력하여 매일 조금씩 꾸준히 학습하는 습관을 길러주고, 연산의 속도와 정확성을 완벽하게 보장해줍니다.', keywords: '수학학습지, 무료학습지, 2학년학습지', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/3/worksheet', title: '3학년 무료 수학 학습지 출력', description: '3학년 수학 학습지를 만들어보세요. 나눗셈과 분수 연산 실력을 키우기에 최적화되어 있습니다.', keywords: '수학학습지, 무료학습지, 3학년학습지', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/3/worksheet', title: '3학년 무료 수학 학습지 출력', description: '3학년 나눗셈과 분수 연산 실력을 키우기 위한 최적의 프린트 학습지! 어려운 세 자리 수 덧셈/뺄셈 연습용 문제집을 필요할 때마다 무한으로 생성하세요. 정답지도 함께 출력되어 보호자가 쉽고 빠르게 채점해줄 수 있으며, 아이의 성취도를 가시적으로 확인하며 공부할 수 있습니다.', keywords: '수학학습지, 무료학습지, 3학년학습지', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/4/worksheet', title: '4학년 무료 수학 학습지 출력', description: '4학년 큰 수와 나누기 학습지를 생성하고 출력하여 공부하세요.', keywords: '4학년학습지, 수학문제지무료', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/4/worksheet', title: '4학년 무료 수학 학습지 출력', description: '4학년 큰 수와 나누기 학습지를 무한으로 생성하여 출력하세요! 각도 측정 연습지 등 보조 교구 성격의 학습지도 준비되어 있습니다. 학교 시험 전 취약한 유형만 골라 집중적으로 연습할 수 있는 맞춤형 문제 생성 기능으로 4학년 수학 성적을 확실히 관리하세요.', keywords: '4학년학습지, 수학문제지무료', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/5/worksheet', title: '5학년 무료 수학 학습지 출력', description: '5학년 사칙연산 혼합 계산 학습지 무한 생성! 실력을 점검해보세요.', keywords: '5학년학습지, 수학기초학습지', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/5/worksheet', title: '5학년 무료 수학 학습지 출력', description: '5학년 사칙연산 혼합 계산과 약수/배수 학습지를 프린트하여 실력을 점검하세요! 실수가 잦은 분수의 통분/약분 연산 문제를 집중적으로 생성하여 연산의 노련함을 기를 수 있습니다. 무한 문제 생성 시스템으로 문제집 구매 비용 부담 없이 최고의 학습 효과를 경험해보세요.', keywords: '5학년학습지, 수학기초학습지', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/6/worksheet', title: '6학년 무료 수학 학습지 출력', description: '6학년 비와 비율, 입체도형 학습지를 생성하여 중학교 진학을 준비하세요.', keywords: '6학년학습지, 졸업대비학습지', priority: 0.9, changefreq: 'daily' },",
        replacement: "{ path: '/grade/6/worksheet', title: '6학년 무료 수학 학습지 출력', description: '6학년 비와 비율, 입체도형 학습지를 생성하여 중학교 진학을 준비하세요! 소수의 나눗셈 등 고도의 집중력이 필요한 연산들을 종이 위에 풀며 꼼꼼한 풀이 습관을 들일 수 있습니다. 졸업 전 초등 전 과정을 총괄적으로 복습할 수 있는 최고의 무료 자기주도 학습 도구입니다.', keywords: '6학년학습지, 졸업대비학습지', priority: 0.9, changefreq: 'daily' },"
    },
    {
        target: "{ path: '/grade/1/word-problem-worksheet', title: '1학년 문장제 수학 학습지 출력', description: '1학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 1학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/1/word-problem-worksheet', title: '1학년 문장제 수학 학습지 출력', description: '1학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이 과정을 직접 적는 연습을 해보세요! 글로 된 문제를 식으로 바꾸는 훈련은 문해력과 수리력을 동시에 키워줍니다. 풍부한 삽화와 친근한 예시들로 구성되어 아이들이 문장제 문제를 놀이처럼 즐겁게 해결할 수 있습니다.', keywords: '문장제학습지, 서술형학습지, 1학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/2/word-problem-worksheet', title: '2학년 문장제 수학 학습지 출력', description: '2학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 2학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/2/word-problem-worksheet', title: '2학년 문장제 수학 학습지 출력', description: '2학년 수준의 다양한 사고력 문장제 문제를 프린트하여 서술형 평가를 대비하세요! 수의 계산 과정뿐만 아니라 왜 그런 식이 나왔는지 설명하는 능력을 길러줍니다. 아이와 함께 문제를 읽고 대화하며 풀이 전략을 짜는 과정에서 부모님과 아이 사이의 수학적 교감이 깊어집니다.', keywords: '문장제학습지, 서술형학습지, 2학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/3/word-problem-worksheet', title: '3학년 문장제 수학 학습지 출력', description: '3학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 3학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/3/word-problem-worksheet', title: '3학년 문장제 수학 학습지 출력', description: '나눗셈과 분수 개념을 실생활 문장으로 풀어낸 3학년 사고력 학습지 출력 서비스! 복합적인 문제 상황을 논리적으로 분석하여 단계별 식을 세우는 훈련에 최적화되어 있습니다. 종이 위에 풀이의 흔적을 남기며 사고의 깊이를 더하고 수학적 문제 해결 능력의 고수 단계로 진입하세요.', keywords: '문장제학습지, 서술형학습지, 3학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/4/word-problem-worksheet', title: '4학년 문장제 수학 학습지 출력', description: '4학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 4학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/4/word-problem-worksheet', title: '4학년 문장제 수학 학습지 출력', description: '각도와 큰 수, 그래프 해석력이 필요한 4학년 심화 문장제를 무한으로 생성하여 풀어보세요! 서술형 평가의 비준이 높은 4학년 과정에서 풀이 과정을 체계적으로 기술하는 능력은 필수입니다. 깔끔한 여백과 명확한 문제 구성으로 아이들이 스스로 사고의 과정을 정리할 수 있도록 돕습니다.', keywords: '문장제학습지, 서술형학습지, 4학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/5/word-problem-worksheet', title: '5학년 문장제 수학 학습지 출력', description: '5학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 5학년수학', priority: 0.8, changefreq: 'weekly' },",
        replacement: "{ path: '/grade/5/word-problem-worksheet', title: '5학년 문장제 수학 학습지 출력', description: '약수와 배수, 혼합 계산 원리를 활용하는 5학년 고급 사고력 문장제 학습지! 복합적인 문제의 조건을 구조화하여 수식으로 표현하는 수학적 모델링 능력을 길러줍니다. 난이도 높은 문장제를 종이 위에서 치열하게 고민하며 해결하는 과정은 중학교 상위권 수학 실력의 원동력이 됩니다.', keywords: '문장제학습지, 서술형학습지, 5학년수학', priority: 0.8, changefreq: 'weekly' },"
    },
    {
        target: "{ path: '/grade/6/word-problem-worksheet', title: '6학년 문장제 수학 학습지 출력', description: '6학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 6학년수학', priority: 0.8, changefreq: 'weekly' }",
        replacement: "{ path: '/grade/6/word-problem-worksheet', title: '6학년 문장제 수학 학습지 출력', description: '비율, 비례식, 원의 넓이 등 6학년 핵심 개념을 아우르는 최종 사고력 문장제 프린트 서비스! 실생활의 수학적 문제를 창의적으로 해결하는 능력을 완성하세요. 초등 과정을 마무리하며 중등 서술형 평가의 기초 체력을 탄탄하게 다지고 최고 수준의 수학적 자신감을 완성하는 단계입니다.', keywords: '문장제학습지, 서술형학습지, 6학년수학' }"
    }
];

updates.forEach(update => {
    content = content.replace(update.target, update.replacement);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ seoData.js updated successfully');
