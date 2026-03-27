export const CURRICULUM_GRADE_2 = {
    grade: 2,
    semesters: [
        {
            semester: 1,
            units: [
                {
                    id: '2-1-1',
                    name: '세 자리 수',
                    topics: ['100 알기', '세 자리 수 읽기', '자릿값', '뛰어 세기', '크기 비교'],
                    problemTypes: [
                        { id: 'count-hundreds', difficulty: 'basic', desc: '100씩 묶음 세기' },
                        { id: 'place-value-hundreds', difficulty: 'basic', desc: '자릿값(백)' },
                        { id: 'card-make-max-min', difficulty: 'advanced', desc: '수 카드로 세 자리 수' }
                    ]
                },
                {
                    id: '2-1-2',
                    name: '여러 가지 도형',
                    topics: ['삼각형, 사각형', '오각형, 육각형', '똑같은 모양 쌓기'],
                    problemTypes: [
                        { id: 'sides-vertices', difficulty: 'basic', desc: '변과 꼭짓점' },
                        { id: 'stack-blocks', difficulty: 'advanced', desc: '쌓은 모양 개수' }
                    ]
                },
                {
                    id: '2-1-3',
                    name: '덧셈과 뺄셈',
                    topics: ['두 자리 덧셈/뺄셈', '여러 가지 방법'],
                    problemTypes: [
                        { id: 'add-carry-no-carry', difficulty: 'basic', desc: '받아올림/내림계산' },
                        { id: 'mistake-restore', difficulty: 'advanced', desc: '어떤 수 구하기(복구)' }
                    ]
                },
                {
                    id: '2-1-4',
                    name: '길이 재기',
                    topics: ['cm 단위', '자로 길이 재기'],
                    problemTypes: [
                        { id: 'measure-cm', difficulty: 'basic', desc: 'cm 단위 측정' },
                        { id: 'overlap-length', difficulty: 'advanced', desc: '겹쳐 이어붙인 길이' }
                    ]
                },
                {
                    id: '2-1-5',
                    name: '분류하기',
                    topics: ['기준에 따라 분류', '결과 말하기'],
                    problemTypes: [
                        { id: 'classify-basic', difficulty: 'basic', desc: '단일 기준 분류' }
                    ]
                },
                {
                    id: '2-1-6',
                    name: '곱셈',
                    topics: ['묶음으로 세기', '배의 이해', '곱셈식'],
                    problemTypes: [
                        { id: 'multiply-basis', difficulty: 'basic', desc: '몇의 몇 배' },
                        { id: 'multiply-word', difficulty: 'advanced', desc: '곱셈 문장제' }
                    ]
                }
            ]
        },
        {
            semester: 2,
            units: [
                {
                    id: '2-2-1',
                    name: '네 자리 수',
                    topics: ['1000 알기', '네 자리 수', '크기 비교'],
                    problemTypes: [
                        { id: 'read-write-1000', difficulty: 'basic', desc: '1000 읽고 쓰기' }
                    ]
                },
                {
                    id: '2-2-2',
                    name: '곱셈구구',
                    topics: ['2단~9단', '0의 곱'],
                    problemTypes: [
                        { id: 'multi-table', difficulty: 'basic', desc: '구구단' }
                    ]
                },
                {
                    id: '2-2-3',
                    name: '길이 재기 (2)',
                    topics: ['m 단위', '길이의 합/차'],
                    problemTypes: [
                        { id: 'm-cm-convert', difficulty: 'basic', desc: 'm와 cm 단위 변환' }
                    ]
                },
                {
                    id: '2-2-4',
                    name: '시각과 시간',
                    topics: ['시각 읽기', '시간의 양', '달력'],
                    problemTypes: [
                        { id: 'clock-advanced', difficulty: 'advanced', desc: '전/후 시간 추론' }
                    ]
                },
                {
                    id: '2-2-5',
                    name: '표와 그래프',
                    topics: ['표로 나타내기', '그래프 그리기'],
                    problemTypes: [
                        { id: 'table-to-graph', difficulty: 'basic', desc: '표를 보고 그래프 찾기' }
                    ]
                },
                {
                    id: '2-2-6',
                    name: '규칙 찾기',
                    topics: ['덧셈표/곱셈표', '무늬 규칙'],
                    problemTypes: [
                        { id: 'rule-pattern', difficulty: 'advanced', desc: '수와 무늬 규칙' }
                    ]
                }
            ]
        }
    ]
};
