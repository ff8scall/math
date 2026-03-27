export const CURRICULUM_GRADE_6 = {
    grade: 6,
    semesters: [
        {
            semester: 1,
            units: [
                { id: '6-1-1', name: '분수의 나눗셈', topics: ['분수 / 자연수', '분수 / 분수'], problemTypes: [{ id: 'fraction-divide', difficulty: 'basic', desc: '분수 나누기 분수' }] },
                { id: '6-1-2', name: '각기둥과 각뿔', topics: ['면, 모서리, 꼭짓점', '전개도'], problemTypes: [{ id: 'prism-pyramid-diff', difficulty: 'basic', desc: '각기둥/각뿔 구분' }] },
                { id: '6-1-3', name: '소수의 나눗셈', topics: ['소수 / 자연수', '나머지 구하기'], problemTypes: [{ id: 'decimal-divide-res', difficulty: 'advanced', desc: '나머지가 있는 소수 나눗셈' }] },
                { id: '6-1-4', name: '비와 비율', topics: ['비율(%), 배율'], problemTypes: [{ id: 'ratio-percent', difficulty: 'basic', desc: '비율과 백분율 변환' }, { id: 'ratio-concentration', difficulty: 'advanced', desc: '농도와 이익률' }] },
                { id: '6-1-5', name: '여러 가지 그래프', topics: ['띠그래프', '원그래프'], problemTypes: [{ id: 'pie-chart-calc', difficulty: 'advanced', desc: '비율로 전체 값 찾기' }] },
                { id: '6-1-6', name: '직육면체의 부피와 겉넓이', topics: ['부피(cm3, m3)', '겉넓이'], problemTypes: [{ id: 'cuboid-vol-surface', difficulty: 'basic', desc: '부피와 겉넓이 공식' }, { id: 'water-level-rise', difficulty: 'advanced', desc: '수면 높이로 부피 추론' }] }
            ]
        },
        {
            semester: 2,
            units: [
                { id: '6-2-1', name: '분수의 나눗셈 (2)', topics: ['분모/분자 응용'], problemTypes: [{ id: 'fraction-divide-adv', difficulty: 'advanced', desc: '복합 분수 나눗셈' }] },
                { id: '6-2-2', name: '소수의 나눗셈 (2)', topics: ['몫의 반올림', '어림'], problemTypes: [{ id: 'decimal-divide-round', difficulty: 'basic', desc: '몫의 반올림 처리' }] },
                { id: '6-2-3', name: '공간과 입체', topics: ['쌓기나무 개수', '본 모양 추론'], problemTypes: [{ id: 'stack-blocks-view', difficulty: 'advanced', desc: '위/앞/옆 모양으로 쌓기나무' }] },
                { id: '6-2-4', name: '비례식과 비례배분', topics: ['비의 성질', '배분하기'], problemTypes: [{ id: 'ratio-distribution', difficulty: 'basic', desc: '비례배분 연산' }, { id: 'ratio-prop-advanced', difficulty: 'advanced', desc: '이차 비례배분' }] },
                { id: '6-2-5', name: '원의 넓이', topics: ['원주와 원주율', '원과 부채꼴 면적'], problemTypes: [{ id: 'circle-area-calc', difficulty: 'basic', desc: '원 면적 구하기' }, { id: 'circle-combined-area', difficulty: 'advanced', desc: '복합 원형 도형 면적' }] },
                { id: '6-2-6', name: '원기둥, 원뿔, 구', topics: ['입체도형 특징', '겉넓이/부피'], problemTypes: [{ id: 'cyl-cone-sphere', difficulty: 'basic', desc: '입체도형 구성 이해' }] }
            ]
        }
    ]
};
