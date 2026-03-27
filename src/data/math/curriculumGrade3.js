export const CURRICULUM_GRADE_3 = {
    grade: 3,
    semesters: [
        {
            semester: 1,
            units: [
                {
                    id: '3-1-1',
                    name: '덧셈과 뺄셈',
                    topics: ['세 자리 덧셈/뺄셈', '받아올림/내림'],
                    problemTypes: [
                        { id: 'three-digit-calc', difficulty: 'basic', desc: '세 자리 수의 계산' },
                        { id: 'mistake-calc-solve', difficulty: 'advanced', desc: '잘못 계산한 수 바르게 고치기' }
                    ]
                },
                {
                    id: '3-1-2',
                    name: '평면도형',
                    topics: ['선분, 직선, 반직선', '각과 직각', '직사각형, 정사각형'],
                    problemTypes: [
                        { id: 'lines-concept', difficulty: 'basic', desc: '선분/직선/반직선 구분' },
                        { id: 'rectangle-property', difficulty: 'advanced', desc: '사각형의 길이 성질' }
                    ]
                },
                {
                    id: '3-1-3',
                    name: '나눗셈',
                    topics: ['똑같이 나누기', '곱셈과 나눗셈'],
                    problemTypes: [
                        { id: 'divide-table', difficulty: 'basic', desc: '몫 구하기 기초' },
                        { id: 'divide-word', difficulty: 'advanced', desc: '나눗셈 문장제' }
                    ]
                },
                {
                    id: '3-1-4',
                    name: '곱셈',
                    topics: ['두 자리 * 한 자리', '올림이 있는 계산'],
                    problemTypes: [
                        { id: 'multiply-core', difficulty: 'basic', desc: '두 자리 곱하기 한 자리' }
                    ]
                },
                {
                    id: '3-1-5',
                    name: '길이와 시간',
                    topics: ['mm와 km', '시간의 덧셈/뺄셈'],
                    problemTypes: [
                        { id: 'time-add-sub', difficulty: 'basic', desc: '시/분/초 연산' },
                        { id: 'time-interval', difficulty: 'advanced', desc: '걸린 시간/끝난 시각 추론' }
                    ]
                },
                {
                    id: '3-1-6',
                    name: '분수와 소수',
                    topics: ['전체와 부분', '소수 0.1'],
                    problemTypes: [
                        { id: 'fraction-basic', difficulty: 'basic', desc: '분수로 나타내기' },
                        { id: 'decimal-compare', difficulty: 'advanced', desc: '소수 크기 비교' }
                    ]
                }
            ]
        },
        {
            semester: 2,
            units: [
                {
                    id: '3-2-1',
                    name: '곱셈 (2)',
                    topics: ['두 자리 * 두 자리', '세 자리 * 한 자리'],
                    problemTypes: [
                        { id: 'multiply-2by2', difficulty: 'basic', desc: '두 자리끼리의 곱셈' }
                    ]
                },
                {
                    id: '3-2-2',
                    name: '나눗셈 (2)',
                    topics: ['내림이 있는 나눗셈', '나머지 구하기', '검산'],
                    problemTypes: [
                        { id: 'divide-remainder', difficulty: 'basic', desc: '나머지가 있는 나눗셈' },
                        { id: 'divide-check', difficulty: 'advanced', desc: '검산식 이용 문제' }
                    ]
                },
                {
                    id: '3-2-3',
                    name: '원',
                    topics: ['원의 중심, 반지름, 지름', '원 그리기'],
                    problemTypes: [
                        { id: 'circle-diameter', difficulty: 'basic', desc: '지름과 반지름 관계' }
                    ]
                },
                {
                    id: '3-2-4',
                    name: '분수 (2)',
                    topics: ['가분수, 대분수, 단위분수'],
                    problemTypes: [
                        { id: 'fraction-convert', difficulty: 'basic', desc: '가분수와 대분수 변환' }
                    ]
                },
                {
                    id: '3-2-5',
                    name: '들이와 무게',
                    topics: ['L와 mL', 'kg과 g'],
                    problemTypes: [
                        { id: 'weight-add-sub', difficulty: 'basic', desc: '들이와 무게 합/차' }
                    ]
                },
                {
                    id: '3-2-6',
                    name: '자료의 정리',
                    topics: ['그림그래프' ],
                    problemTypes: [
                        { id: 'pictogram-reading', difficulty: 'basic', desc: '그림그래프 해석' }
                    ]
                }
            ]
        }
    ]
};
