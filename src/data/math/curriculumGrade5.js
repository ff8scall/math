export const CURRICULUM_GRADE_5 = {
    grade: 5,
    semesters: [
        {
            semester: 1,
            units: [
                { id: '5-1-1', name: '자연수의 혼합 계산', topics: ['괄호 있는 식', '계산 순서'], problemTypes: [{ id: 'complex-calc-order', difficulty: 'basic', desc: '혼합 계산 순서' }, { id: 'number-puzzle-calc', difficulty: 'advanced', desc: '특정 결과 만드는 식' }] },
                { id: '5-1-2', name: '약수와 배수', topics: ['최대공약수', '최소공배수'], problemTypes: [{ id: 'lcm-gcd-basic', difficulty: 'basic', desc: '공약/배수 기초' }, { id: 'any-num-remainder', difficulty: 'advanced', desc: '나머지가 있는 수 찾기' }] },
                { id: '5-1-3', name: '규칙과 대응', topics: ['대응 관계식'], problemTypes: [{ id: 'relation-formula', difficulty: 'advanced', desc: '대응 관계 공식화' }] },
                { id: '5-1-4', name: '약분과 통분', topics: ['크기 비교', '기약분수'], problemTypes: [{ id: 'simplify-fraction', difficulty: 'basic', desc: '약분하기' }, { id: 'fraction-compare', difficulty: 'advanced', desc: '다른 분모 비교' }] },
                { id: '5-1-5', name: '분수의 덧셈과 뺄셈', topics: ['분모가 다른 분수'], problemTypes: [{ id: 'fraction-add-sub-diff', difficulty: 'basic', desc: '이분모 분수 연산' }] },
                { id: '5-1-6', name: '다각형의 둘레와 넓이', topics: ['삼각형/사각형/사다리꼴 넓이'], problemTypes: [{ id: 'shape-area-formula', difficulty: 'basic', desc: '면적 공식 대입' }, { id: 'complex-shape-area', difficulty: 'advanced', desc: '복합 도형의 면적' }] }
            ]
        },
        {
            semester: 2,
            units: [
                { id: '5-2-1', name: '수의 범위와 어림하기', topics: ['이상, 이하, 초과, 미만', '반올림/올림/버림'], problemTypes: [{ id: 'rounding-logic', difficulty: 'advanced', desc: '어림수의 활용' }] },
                { id: '5-2-2', name: '분수의 곱셈', topics: ['진분수/가분수/대분수 곱셈'], problemTypes: [{ id: 'fraction-multiply', difficulty: 'basic', desc: '분수 곱하기 분수' }] },
                { id: '5-2-3', name: '합동과 대칭', topics: ['선대칭/점대칭 도형'], problemTypes: [{ id: 'symmetry-shape', difficulty: 'advanced', desc: '대칭 중심 찾기' }] },
                { id: '5-2-4', name: '소수의 곱셈', topics: ['소수 * 자연수/자연수 * 소수', '소수 * 소수'], problemTypes: [{ id: 'decimal-multiply', difficulty: 'basic', desc: '소수점 위치 파악' }] },
                { id: '5-2-5', name: '직육면체', topics: ['면, 모서리, 꼭짓점', '전개도'], problemTypes: [{ id: 'cuboid-net', difficulty: 'advanced', desc: '전개도 보고 접기' }] },
                { id: '5-2-6', name: '평균과 가능성', topics: ['평균 구하기', '확률 어림'], problemTypes: [{ id: 'avg-inference', difficulty: 'advanced', desc: '새로운 값 추가 후 평균' }] }
            ]
        }
    ]
};
