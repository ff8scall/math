export const CURRICULUM_GRADE_1 = {
    grade: 1,
    semesters: [
        {
            semester: 1,
            units: [
                {
                    id: '1-1-1',
                    name: '9까지의 수',
                    topics: ['수 세기', '수 읽고 쓰기', '수의 순서', '수의 크기 비교'],
                    problemTypes: [
                        { id: 'count-9', difficulty: 'basic', desc: '그림 수 세기' },
                        { id: 'read-write-9', difficulty: 'basic', desc: '읽고 쓰기' },
                        { id: 'order-9', difficulty: 'basic', desc: '수의 순서' },
                        { id: 'compare-9', difficulty: 'advanced', desc: '크기 비교' },
                        { id: 'condition-9', difficulty: 'advanced', desc: '조건에 맞는 수' }
                    ]
                },
                {
                    id: '1-1-2',
                    name: '여러 가지 모양',
                    topics: ['상자 모양', '둥근 기둥 모양', '공 모양'],
                    problemTypes: [
                        { id: 'shape-find', difficulty: 'basic', desc: '모양 찾기' },
                        { id: 'shape-feature', difficulty: 'basic', desc: '모양의 특징' },
                        { id: 'shape-count', difficulty: 'advanced', desc: '복합 모양 개수' }
                    ]
                },
                {
                    id: '1-1-3',
                    name: '덧셈과 뺄셈',
                    topics: ['모으기/가르기', '덧셈식/뺄셈식'],
                    problemTypes: [
                        { id: 'plus-basic-9', difficulty: 'basic', desc: '한 자리 덧셈' },
                        { id: 'minus-basic-9', difficulty: 'basic', desc: '한 자리 뺄셈' },
                        { id: 'plus-minus-word-9', difficulty: 'advanced', desc: '문장형 덧뺄셈' }
                    ]
                },
                {
                    id: '1-1-4',
                    name: '비교하기',
                    topics: ['길이', '무게', '넓이', '들이'],
                    problemTypes: [
                        { id: 'len-compare', difficulty: 'basic', desc: '길이 비교' },
                        { id: 'weight-compare', difficulty: 'basic', desc: '무게 비교' },
                        { id: 'compare-order', difficulty: 'advanced', desc: '세 수의 순서 비교' }
                    ]
                },
                {
                    id: '1-1-5',
                    name: '50까지의 수',
                    topics: ['10개씩 묶음과 낱개', '수의 순서/크기'],
                    problemTypes: [
                        { id: 'tens-ones-50', difficulty: 'basic', desc: '묶음과 낱개' },
                        { id: 'order-50', difficulty: 'basic', desc: '50까지의 순서' },
                        { id: 'compare-50', difficulty: 'advanced', desc: '50까지의 크기 비교' }
                    ]
                }
            ]
        },
        {
            semester: 2,
            units: [
                {
                    id: '1-2-1',
                    name: '100까지의 수',
                    topics: ['99까지의 수', '수의 크기', '짝수와 홀수'],
                    problemTypes: [
                        { id: 'count-100', difficulty: 'basic', desc: '자릿값(100)' },
                        { id: 'even-odd', difficulty: 'advanced', desc: '짝수와 홀수 조건' }
                    ]
                },
                {
                    id: '1-2-2',
                    name: '덧셈과 뺄셈 (1)',
                    topics: ['받아올림 없는 덧뺄셈'],
                    problemTypes: [
                        { id: 'plus-no-carry-2nd', difficulty: 'basic', desc: '두 자리(무받아올림)' },
                        { id: 'minus-no-carry-2nd', difficulty: 'advanced', desc: '두 자리(무받아내림)' }
                    ]
                },
                {
                    id: '1-2-3',
                    name: '여러 가지 모양',
                    topics: ['세모, 네모, 동그라미'],
                    problemTypes: [
                        { id: 'plane-shape-find', difficulty: 'basic', desc: '평면 도형 찾기' }
                    ]
                },
                {
                    id: '1-2-4',
                    name: '덧셈과 뺄셈 (2)',
                    topics: ['세 수의 계산', '10을 이용한 덧뺄셈'],
                    problemTypes: [
                        { id: 'three-num-add', difficulty: 'basic', desc: '세 수의 덧셈' },
                        { id: 'plus-total-10', difficulty: 'advanced', desc: '10이 되는 두 수' }
                    ]
                },
                {
                    id: '1-2-5',
                    name: '시계 보기와 규칙 찾기',
                    topics: ['정각/30분', '모양/수 규칙'],
                    problemTypes: [
                        { id: 'read-clock', difficulty: 'basic', desc: '시계 읽기' },
                        { id: 'find-rule', difficulty: 'advanced', desc: '규칙 추론' }
                    ]
                },
                {
                    id: '1-2-6',
                    name: '덧셈과 뺄셈 (3)',
                    topics: ['10을 매개로 한 덧뺄셈'],
                    problemTypes: [
                        { id: 'plus-carry-basic', difficulty: 'advanced', desc: '받아올림 기초' }
                    ]
                }
            ]
        }
    ]
};
