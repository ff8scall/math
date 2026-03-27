export const CURRICULUM_GRADE_4 = {
    grade: 4,
    semesters: [
        {
            semester: 1,
            units: [
                { id: '4-1-1', name: '큰 수', topics: ['만, 억, 조 단위', '자릿값', '뛰어 세기', '크기 비교'], problemTypes: [{ id: 'large-num-read', difficulty: 'basic', desc: '큰 수 읽기' }, { id: 'card-num-near', difficulty: 'advanced', desc: '카드 사용 특정 수 만들기' }] },
                { id: '4-1-2', name: '각도', topics: ['어림하기', '합과 차', '삼각형 내각의 합', '사각형 내각의 합'], problemTypes: [{ id: 'calc-angle', difficulty: 'basic', desc: '각도의 합/차' }, { id: 'clock-angle', difficulty: 'advanced', desc: '시계 각도 추론' }] },
                { id: '4-1-3', name: '곱셈과 나눗셈', topics: ['(세 자리)*(두 자리)', '몇십으로 나누기'], problemTypes: [{ id: 'multiply-3by2', difficulty: 'basic', desc: '세 자리 * 두 자리' }] },
                { id: '4-1-4', name: '평면도형의 이동', topics: ['밀기, 뒤집기, 돌리기'], problemTypes: [{ id: 'shape-rotation', difficulty: 'advanced', desc: '도형 돌린 모양' }] },
                { id: '4-1-5', name: '막대그래프', topics: ['읽기/그리기'], problemTypes: [{ id: 'graph-reading', difficulty: 'basic', desc: '막대그래프 해석' }] },
                { id: '4-1-6', name: '규칙 찾기', topics: ['수 배열', '도형 배열'], problemTypes: [{ id: 'pattern-finding', difficulty: 'advanced', desc: '배열 규칙 추론' }] }
            ]
        },
        {
            semester: 2,
            units: [
                { id: '4-2-1', name: '분수의 덧셈과 뺄셈', topics: ['분모가 같은 분수'], problemTypes: [{ id: 'fraction-add-sub-same', difficulty: 'basic', desc: '동분모 분수 연산' }] },
                { id: '4-2-2', name: '삼각형', topics: ['이등변, 정삼각형', '예각, 직각, 둔각 삼각형'], problemTypes: [{ id: 'triangle-feature', difficulty: 'basic', desc: '삼각형의 분류' }] },
                { id: '4-2-3', name: '소수의 덧셈과 뺄셈', topics: ['소수 두/세 자리', '크기 비교', '소수 계산'], problemTypes: [{ id: 'decimal-add-sub', difficulty: 'basic', desc: '소수 연산' }] },
                { id: '4-2-4', name: '사각형', topics: ['수직/평행', '사다리꼴/평행사변형/마름모'], problemTypes: [{ id: 'quad-property', difficulty: 'advanced', desc: '사각형의 성질 추론' }] },
                { id: '4-2-5', name: '꺾은선그래프', topics: ['읽기/그리기/해석'], problemTypes: [{ id: 'line-graph-trend', difficulty: 'basic', desc: '변화 경향 해석' }] },
                { id: '4-2-6', name: '다각형', topics: ['다각형과 정다각형', '대각선 모양 만들기'], problemTypes: [{ id: 'polygon-diagonal', difficulty: 'advanced', desc: '대각선 개수 세기' }] }
            ]
        }
    ]
};
