
export const seoData = [
    {
        path: '/',
        title: '매쓰 펫토리 | 초등 수학 원리 & 펫 키우기',
        description: '초등학교 전학년 수학을 공식 암기가 아닌 원리로 배우는 매쓰 펫토리! 나만의 펫을 키우고 방을 꾸미며 수학 실력을 키워보세요.',
        keywords: '매쓰펫토리, 초등수학, 수학원리, 펫키우기, 수학학습, 초등인강, 수학게임',
        priority: 1.0,
        changefreq: 'daily'
    },
    {
        path: '/myroom',
        title: '내 방 꾸미기 - 매쓰 펫토리',
        description: '수학 공부하고 모은 코인으로 나만의 방을 멋지게 꾸며보세요. 다양한 가구와 아이템이 기다리고 있습니다.',
        keywords: '방꾸미기, 인테리어, 수학보상, 펫룸, 매쓰펫토리',
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/shop',
        title: '매쓰 펫토리 상점',
        description: '매쓰 펫토리 상점에서 귀여운 펫과 가구를 입양하세요. 수학 문제를 풀면 얻는 코인으로 구매할 수 있습니다.',
        keywords: '상점, 펫입양, 가구구매, 코인샵, 매쓰펫토리',
        priority: 0.8,
        changefreq: 'weekly'
    },

    // 학년별 메인 (커리큘럼)
    { path: '/grade/1', title: '1학년 수학 커리큘럼 - 매쓰 펫토리', description: '1학년 수학 여행! 9까지의 수, 모양 찾기, 기초 덧셈과 뺄셈 등 1학년 핵심 원리를 배워요.', keywords: '1학년수학, 초등1학년, 수학커리큘럼', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/2', title: '2학년 수학 커리큘럼 - 매쓰 펫토리', description: '2학년 수학 여행! 세 자리 수, 여러 가지 도형, 구구단 등 2학년 핵심 원리를 배워요.', keywords: '2학년수학, 초등2학년, 수학커리큘럼', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3', title: '3학년 수학 커리큘럼 - 매쓰 펫토리', description: '3학년 수학 여행! 분수와 소수, 나눗셈, 평면도형 등 3학년 핵심 원리를 배워요.', keywords: '3학년수학, 초등3학년, 수학커리큘럼', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/4', title: '4학년 수학 커리큘럼 - 매쓰 펫토리', description: '4학년 수학 여행! 큰 수, 각도, 분수의 덧셈과 뺄셈 등 4학년 핵심 원리를 배워요.', keywords: '4학년수학, 초등4학년, 수학커리큘럼', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/5', title: '5학년 수학 커리큘럼 - 매쓰 펫토리', description: '5학년 수학 여행! 약수와 배수, 분수의 통분, 다각형의 넓이 등 5학년 핵심 원리를 배워요.', keywords: '5학년수학, 초등5학년, 수학커리큘럼', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/6', title: '6학년 수학 커리큘럼 - 매쓰 펫토리', description: '6학년 수학 여행! 비율과 백분율, 원의 넓이, 입체도형 등 6학년 핵심 원리를 배워요.', keywords: '6학년수학, 초등6학년, 수학커리큘럼', priority: 0.8, changefreq: 'weekly' },

    // 1학년 상세
    { path: '/grade/1/number-counting', title: '1학년 수학: 9까지의 수 세기', description: '9까지의 수를 세어보고 크기를 비교합니다. 시각적인 도구로 수의 개념을 재미있게 익혀요.', keywords: '1학년수학, 수세기, 숫자세기, 9까지의수', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/1/shapes', title: '1학년 수학: 여러 가지 모양 찾기', description: '동그라미, 세모, 네모 모양을 찾아보며 평면도형의 기초를 배웁니다.', keywords: '1학년모양, 도형기초, several-shapes', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/1/arithmetic', title: '1학년 수학: 기초 덧셈과 뺄셈', description: '모으기와 가르기를 통해 덧셈과 뺄셈의 기본 원리를 이해합니다.', keywords: '1학년연산, 모으기가르기, 덧셈뺄셈기초', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/1/number-50', title: '1학년 수학: 50까지의 수', description: '10개씩 묶음과 낱개로 50까지의 수를 이해하고 세는 방법을 배웁니다.', keywords: '1학년수학, 50까지의수, 수세기', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/1/clock', title: '1학년 수학: 시계 보기와 규칙 찾기', description: '정각과 30분 단위의 시계 보는 법과 기초적인 규칙 찾기를 학습합니다.', keywords: '1학년시계, 시간보기, 규칙찾기', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/1/number-100', title: '1학년 수학: 100까지의 수', description: '100까지의 수 체계를 익히고 크기를 비교하는 방법을 배웁니다.', keywords: '1학년수학, 100까지의수, 수의크기', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/1/quiz', title: '1학년 수학 퀴즈 - 매쓰 펫토리', description: '1학년 수학 범위를 모두 담은 무한 퀴즈!', keywords: '1학년퀴즈, 수학퀴즈, 실력테스트', priority: 0.8, changefreq: 'daily' },

    // 2학년 상세
    { path: '/grade/2/three-digit', title: '2학년 수학: 세 자리 수 이해하기', description: '백, 십, 일의 자리를 배우고 세 자리 수의 크기를 비교합니다.', keywords: '2학년수학, 세자리수, 자릿수', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/shapes', title: '2학년 수학: 여러 가지 도형 (삼각형, 사각형)', description: '삼각형, 사각형의 특징을 배우고 선분과 꼭짓점을 이해합니다.', keywords: '2학년도형, 삼각형, 사각형', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/arithmetic', title: '2학년 수학: 두 자리 수의 덧셈과 뺄셈', description: '받아올림과 받아내림이 있는 연산의 원리를 익힙니다.', keywords: '2학년연산, 받아올림, 받아내림', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/length', title: '2학년 수학: 길이 재기 (cm/m)', description: '센티미터와 미터 단위의 차이를 알고 길이를 재는 법을 배웁니다.', keywords: '2학년길이재기, 측정, 단위', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/four-digit', title: '2학년 수학: 네 자리 수 이해하기', description: '천의 자리까지 수의 개념을 확장하고 명수법을 학습합니다.', keywords: '2학년수학, 네자리수, 천의자리', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/multiplication', title: '2학년 수학: 곱셈과 구구단', description: '곱셈의 원리를 이해하고 구구단을 즐겁게 익힙니다.', keywords: '2학년곱셈, 구구단, 묶어세기', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/time', title: '2학년 수학: 시각과 시간', description: '몇 시 몇 분을 읽고 시간의 흐름을 이해합니다.', keywords: '2학년시계, 시간계산, 시각', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/2/quiz', title: '2학년 수학 퀴즈 - 매쓰 펫토리', description: '2학년 수학 개념 정복 퀴즈!', keywords: '2학년퀴즈, 수학문제집, 매쓰펫토리', priority: 0.8, changefreq: 'daily' },

    // 3학년 상세
    { path: '/grade/3/arithmetic', title: '3학년 수학: 세 자리 수의 덧셈과 뺄셈', description: '복잡한 세 자리 수 연산을 정확하고 빠르게 하는 법을 배웁니다.', keywords: '3학년덧셈, 3학년뺄셈, 세자리수계산', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/3/multiplication', title: '3학년 수학: 곱셈 (두 자리 x 한 자리)', description: '곱셈의 세로셈 원리를 완벽하게 이해하고 연습합니다.', keywords: '3학년곱셈, 곱셈원리, 연산', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/3/division', title: '3학년 수학: 나눗셈의 기초', description: '나눗셈의 기초 원리와 곱셈과의 관계를 학습합니다.', keywords: '3학년나눗셈, 나누기기초', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/3/fraction', title: '3학년 수학: 분수와 소수 (진분수/단위분수)', description: '전체와 부분의 관계를 통해 분수와 소수의 개념을 익힙니다.', keywords: '3학년분수, 분수기초, 소수개념', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/3/geometry', title: '3학년 수학: 평면도형과 각', description: '직각, 예각, 둔각의 개념과 도형의 기본 요소를 학습합니다.', keywords: '3학년도형, 각도, 평면도형', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/subtraction', title: '3학년 수학: 받아내림 있는 뺄셈', description: '받아내림이 여러 번 있는 뺄셈을 정확하게 계산하는 연습을 합니다.', keywords: '3학년뺄셈, 받아내림, 뺄셈원리', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/3/length', title: '3학년 수학: 길이와 시간의 계산', description: '길이의 단위 변환과 시간의 합과 차를 구하는 법을 배웁니다.', keywords: '3학년측정, 길이변환, 시간계산', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/clock', title: '3학년 수학: 시간과 시간 (시각 읽기)', description: '초 단위까지 시간을 읽고 시간의 덧셈과 뺄셈을 연습합니다.', keywords: '3학년시계, 시간계산, 초단위', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/circle', title: '3학년 수학: 원의 성질 (반지름/지름)', description: '컴퍼스로 원을 그려보고 원의 중심, 반지름, 지름을 배웁니다.', keywords: '3학년원, 반지름, 지름, 원의중심', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/weight-volume', title: '3학년 수학: 무게와 들이 측정', description: 'kg, g, L, mL 등의 단위를 이해하고 무게와 들이를 비교합니다.', keywords: '3학년측정, 무게, 들이, 단위계산', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/quiz', title: '3학년 수학 퀴즈 - 매쓰 펫토리', description: '3학년 수학 마스터! 재미있는 퀴즈로 복습하세요.', keywords: '3학년퀴즈, 수학퀴즈, 무한문제', priority: 0.8, changefreq: 'daily' },

    // 4학년 상세
    { path: '/grade/4/large-numbers', title: '4학년 수학: 수조 단위 큰 수', description: '만, 억, 조 단위의 수를 읽고 쓰는 법을 완벽히 마스터합니다.', keywords: '4학년수학, 큰수, 억단위, 조단위', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/angles', title: '4학년 수학: 각도의 합과 차', description: '각도기를 사용한 각 측정과 각의 연산을 배웁니다.', keywords: '4학년각도, 각도학습, 측정', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/arithmetic', title: '4학년 수학: 수의 곱셈과 나눗셈', description: '복잡한 세 자리 수 곱셈과 두 자리 수 나눗셈을 원리로 익힙니다.', keywords: '4학년연산, 세자리수곱셈, 나눗셈', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/fraction', title: '4학년 수학: 분수의 덧셈과 뺄셈', description: '진분수와 대분수의 연산을 그림과 수식으로 배웁니다.', keywords: '4학년분수, 분수연산, 대분수', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/line-graph', title: '4학년 수학: 꺾은선그래프', description: '데이터의 변화를 꺾은선그래프로 나타내고 분석합니다.', keywords: '4학년그래프, 꺾은선그래프, 통계', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/geometry-move', title: '4학년 수학: 평면도형의 이동', description: '도형의 밀기, 뒤집기, 돌리기를 시각적으로 학습합니다.', keywords: '도형이동, 뒤집기, 돌리기', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/bar-graph', title: '4학년 수학: 막대그래프', description: '데이터를 막대그래프로 정리하고 읽는 법을 배웁니다.', keywords: '막대그래프, 그래프공부, 통계기초', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/rules', title: '4학년 수학: 규칙 찾기와 배열', description: '수의 배열이나 모양의 변화에서 규칙을 찾아 식으로 나타냅니다.', keywords: '규칙찾기, 수의배열, 연산규칙', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/triangle', title: '4학년 수학: 삼각형의 종류', description: '이등변삼각형, 정삼각형, 예각/둔각삼각형을 구별하고 특징을 배웁니다.', keywords: '삼각형, 이등변삼각형, 정삼각형', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/decimal', title: '4학년 수학: 소수의 덧셈과 뺄셈', description: '소수 두 자리 수, 세 자리 수의 개념과 연산을 익힙니다.', keywords: '4학년소수, 소수연산, 소수개념', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/quadrilateral', title: '4학년 수학: 여러 가지 사각형', description: '사다리꼴, 평행사변형, 마름모의 정의와 성질을 학습합니다.', keywords: '사각형, 평행사변형, 마름모', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/polygons', title: '4학년 수학: 다각형과 대각선', description: '다각형의 정의와 대각선의 성질을 배우고 모양을 탐색합니다.', keywords: '다각형, 대각선, 도형의성질', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/4/quiz', title: '4학년 수학 퀴즈 - 매쓰 펫토리', description: '4학년 핵심 개념 총정리 퀴즈!', keywords: '4학년퀴즈, 수학복습, 매쓰펫토리', priority: 0.8, changefreq: 'daily' },

    // 5학년 상세
    { path: '/grade/5/mixed-arithmetic', title: '5학년 수학: 복합 사칙연산', description: '계산 순서에 주의하며 사칙연산 혼합 계산을 연습합니다.', keywords: '5학년연산, 혼합계산, 순서', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/factors-multiples', title: '5학년 수학: 약수와 배수', description: '최대공약수와 최소공배수를 구하는 원리와 활용을 배웁니다.', keywords: '약수, 배수, 최대공약수, 최소공배수', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/fraction-arithmetic', title: '5학년 수학: 분수의 약분과 통분', description: '분모가 다른 분수의 덧셈과 뺄셈을 위해 꼭 필요한 개념을 학습합니다.', keywords: '통분, 약분, 다른분모분수', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/area', title: '5학년 수학: 다각형의 둘레와 넓이', description: '다각형의 넓이 공식을 유도하고 계산해봅니다.', keywords: '5학년넓이, 도형공식, 면적계산', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/rules', title: '5학년 수학: 규칙과 대응', description: '두 양 사이의 대응 관계를 파악하고 식으로 나타냅니다.', keywords: '규칙과대응, 대응관계, 함수기초', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/reduction', title: '5학년 수학: 분수의 덧셈과 뺄셈 (심화)', description: '통분을 활용한 분수의 고급 연산을 연습합니다.', keywords: '분수심화, 통분연산, 분수합차', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/range', title: '5학년 수학: 범위와 어림하기', description: '이상, 이하, 초과, 미만의 개념과 올림, 버림, 반올림을 배웁니다.', keywords: '수의범위, 올림버림반올림, 어림하기', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/fraction-multiplication', title: '5학년 수학: 분수의 곱셈', description: '분수와 자연수, 분수와 분수의 곱셈 원리를 학습합니다.', keywords: '분수곱셈, 분수의계산, 연산', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/congruence', title: '5학년 수학: 합동과 대칭', description: '도형의 합동과 선대칭, 점대칭 도형의 성질을 배웁니다.', keywords: '합동, 선대칭, 점대칭, 도형성질', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/decimal-multiplication', title: '5학년 수학: 소수의 곱셈', description: '소수의 곱셈 원리를 소수점 위치 변화와 함께 이해합니다.', keywords: '소수곱셈, 소수점위치, 연산', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/cuboid', title: '5학년 수학: 직육면체와 정육면체', description: '입체도형의 기초인 직육면체의 구성 요소와 성질을 배웁니다.', keywords: '직육면체, 정육면체, 겨냥도, 전개도', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/average', title: '5학년 수학: 평균과 가능성', description: '평균을 구하고 일어날 가능성을 수로 표현해봅니다.', keywords: '평균구하기, 확률기초, 가능성', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/5/quiz', title: '5학년 수학 퀴즈 - 매쓰 펫토리', description: '5학년 수학 실력 점검 퀴즈!', keywords: '5학년퀴즈, 초등수학문제, 학습지', priority: 0.8, changefreq: 'daily' },

    // 6학년 상세
    { path: '/grade/6/fraction-division', title: '6학년 수학: 분수의 나눗셈', description: '분수의 나눗셈이 곱셈으로 변하는 원리를 완벽하게 이해합니다.', keywords: '분수나눗셈, 역수곱셈, 6학년수학', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/decimal-division', title: '6학년 수학: 소수의 나눗셈', description: '소수점 위치를 옮겨가며 정교하게 계산하는 법을 배웁니다.', keywords: '소수나눗셈, 나누기, 연산원리', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/ratio', title: '6학년 수학: 비와 비율, 백분율', description: '비율과 백분율의 실생활 활용과 개념을 마스터합니다.', keywords: '비와비율, 백분율, 퍼센트, 기준량', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/circle-area', title: '6학년 수학: 원의 넓이와 원주율', description: '원주율의 개념과 원의 넓이 계산 공식을 학습합니다.', keywords: '원의넓이, 원주율, 지름, 반지름', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/geometry', title: '6학년 수학: 각기둥과 각뿔', description: '각기둥과 각뿔의 특징을 비교하고 입체도형을 이해합니다.', keywords: '각기둥, 각뿔, 입체도형, 전개도', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/graphs', title: '6학년 수학: 띠그래프와 원그래프', description: '비율을 나타내는 여러 가지 그래프를 해석하고 그립니다.', keywords: '띠그래프, 원그래프, 비율그래프', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/volume', title: '6학년 수학: 직육면체의 부피와 겉넓이', description: '입체도형의 크기를 나타내는 부피와 겉넓이 구하는 법을 배웁니다.', keywords: '부피구하기, 겉넓이, 입체도형측정', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/proportion', title: '6학년 수학: 비례식과 비례배분', description: '비의 성질을 이용한 비례식과 비례배분 원리를 배웁니다.', keywords: '비례식, 비례배분, 비율활용', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/round-geometry', title: '6학년 수학: 원기둥, 원뿔, 구', description: '회전체인 원기둥, 원뿔, 구의 개념과 성질을 학습합니다.', keywords: '원기둥, 원뿔, 구, 회전체', priority: 0.9, changefreq: 'weekly' },
    { path: '/grade/6/quiz', title: '6학년 수학 퀴즈 - 매쓰 펫토리', description: '중학교 진학 전 마지막 수학 점검!', keywords: '6학년퀴즈, 졸업테스트, 중등기초', priority: 0.8, changefreq: 'daily' },

    // 공통 및 게임
    { path: '/grade/1/game', title: '1학년 수학 레이스 - 매쓰 펫토리', description: '재미있는 달리기 게임과 함께 1학년 수학 기초를 다지세요.', keywords: '수학게임, 달리기게임, 1학년놀이', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/2/game', title: '2학년 수학 레이스 - 매쓰 펫토리', description: '구구단을 외우며 달리는 신나는 레이싱 게임!', keywords: '구구단게임, 2학년수학게임', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/3/game', title: '3학년 수학 레이스 - 매쓰 펫토리', description: '연산 실력을 키우는 3학년 맞춤형 레이싱.', keywords: '3학년게임, 연산챌린지', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/4/game', title: '4학년 수학 레이스 - 매쓰 펫토리', description: '각도와 큰 수 문제를 풀며 승리를 쟁취하세요.', keywords: '4학년게임, 각도레이스', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/5/game', title: '5학년 수학 레이스 - 매쓰 펫토리', description: '혼합 계산의 달인이 되는 레이싱 게임.', keywords: '5학년게임, 사칙연산레이스', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/6/game', title: '6학년 수학 레이스 - 매쓰 펫토리', description: '비율과 백분율을 활용하는 고학년 수학 게임.', keywords: '6학년게임, 비율레이스', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/1/word-problem', title: '1학년 수학 문장제 퀴즈', description: '글로 된 수학 문제를 읽고 식으로 만들어 풀어보세요. 사고력을 키우는 1학년 문장제 연습입니다.', keywords: '문장제, 서술형문제, 1학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/2/word-problem', title: '2학년 수학 문장제 퀴즈', description: '다양한 실생활 상황의 수학 문제를 연습합니다. 2학년 연산 실력을 서술형 문제로 다져보세요.', keywords: '문장제, 서술형문제, 2학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/word-problem', title: '3학년 수학 문장제 퀴즈', description: '비판적 사고를 키우는 3학년 수학 문장제 도전! 어려운 문제도 원리로 해결합니다.', keywords: '문장제, 서술형문제, 3학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/4/word-problem', title: '4학년 수학 문장제 퀴즈', description: '4학년 사고력 문장제 퀴즈! 논리적인 풀이 과정을 연습합니다.', keywords: '문장제, 서술형문제, 4학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/5/word-problem', title: '5학년 수학 문장제 퀴즈', description: '5학년 심화 문장제! 복합 연산과 원리를 활용해 문제를 해결합니다.', keywords: '문장제, 서술형문제, 5학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/6/word-problem', title: '6학년 수학 문장제 퀴즈', description: '6학년 사고력 쑥쑥 문장제! 비율과 입체도형 문제를 글로 만나요.', keywords: '문장제, 서술형문제, 6학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/1/worksheet', title: '1학년 무료 수학 학습지 출력', description: '1학년 수학 연산 학습지를 무한으로 생성하고 출력하세요. 기초 실력을 키우는 완벽한 도구입니다.', keywords: '수학학습지, 무료학습지, 1학년학습지', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/2/worksheet', title: '2학년 무료 수학 학습지 출력', description: '2학년 수학 연산 학습지 무한 생성 서비스! 구구단과 받아올림 연산을 연습할 수 있습니다.', keywords: '수학학습지, 무료학습지, 2학년학습지', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/3/worksheet', title: '3학년 무료 수학 학습지 출력', description: '3학년 수학 학습지를 만들어보세요. 나눗셈과 분수 연산 실력을 키우기에 최적화되어 있습니다.', keywords: '수학학습지, 무료학습지, 3학년학습지', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/4/worksheet', title: '4학년 무료 수학 학습지 출력', description: '4학년 큰 수와 나누기 학습지를 생성하고 출력하여 공부하세요.', keywords: '4학년학습지, 수학문제지무료', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/5/worksheet', title: '5학년 무료 수학 학습지 출력', description: '5학년 사칙연산 혼합 계산 학습지 무한 생성! 실력을 점검해보세요.', keywords: '5학년학습지, 수학기초학습지', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/6/worksheet', title: '6학년 무료 수학 학습지 출력', description: '6학년 비와 비율, 입체도형 학습지를 생성하여 중학교 진학을 준비하세요.', keywords: '6학년학습지, 졸업대비학습지', priority: 0.9, changefreq: 'daily' },
    { path: '/grade/1/word-problem-worksheet', title: '1학년 문장제 수학 학습지 출력', description: '1학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 1학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/2/word-problem-worksheet', title: '2학년 문장제 수학 학습지 출력', description: '2학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 2학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/3/word-problem-worksheet', title: '3학년 문장제 수학 학습지 출력', description: '3학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 3학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/4/word-problem-worksheet', title: '4학년 문장제 수학 학습지 출력', description: '4학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 4학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/5/word-problem-worksheet', title: '5학년 문장제 수학 학습지 출력', description: '5학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 5학년수학', priority: 0.8, changefreq: 'weekly' },
    { path: '/grade/6/word-problem-worksheet', title: '6학년 문장제 수학 학습지 출력', description: '6학년 사고력 문장제 문제를 종이 학습지로 출력하여 풀이과정을 적어보세요.', keywords: '문장제학습지, 서술형학습지, 6학년수학', priority: 0.8, changefreq: 'weekly' }
];

