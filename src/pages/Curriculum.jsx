import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader';
import styles from './Curriculum.module.css';

const Curriculum = () => {
    const { gradeId } = useParams();

    // Mock Data (나중에 파일로 분리 가능)
    const curriculumData = {
        1: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'number-counting', title: '9까지의 수', description: '숫자를 세고 읽고 쓰는 법을 배워요.', link: '/grade/1/number-counting', status: 'available' },
                        { id: 'subitizing', title: '순간 수 인식 게임', description: '반짝 보이는 개수를 눈 깜짝할 새 알아봐요!', link: '/grade/1/subitizing', status: 'available' },
                        { id: 'decomposer', title: '가르기와 모으기', description: '숫자를 나누고 합치는 연습을 해요.', link: '/grade/1/decomposer', status: 'available' },
                        { id: 'shapes', title: '여러 가지 모양', description: '동그라미, 세모, 네모를 찾아요.', link: '/grade/1/shapes', status: 'available' },
                        { id: 'addition-subtraction', title: '덧셈과 뺄셈', description: '한 자리 수 덧셈과 뺄셈을 배워요.', link: '/grade/1/arithmetic', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'number-50', title: '50까지의 수', description: '10개씩 묶어서 50까지 세어요.', link: '/grade/1/number-50', status: 'available' },
                        { id: 'clock-basic', title: '시계 보기', description: '몇 시, 몇 시 30분을 읽어요.', link: '/grade/1/clock', status: 'available' },
                        { id: 'number-100', title: '100까지의 수', description: '100까지 수를 세고 쓰기를 해요.', link: '/grade/1/number-100', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 문제를 풀어보세요!', link: '/grade/1/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '생각하며 푸는 문장형 수학 문제!', link: '/grade/1/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 심화 학습지', description: '사고력을 키우는 심화 문장제를 종이로 출력해요.', link: '/grade/1/word-problem-worksheet', status: 'available' },
                { id: 'defense', title: '🛡️ 문장제 방어 게임', description: '몬스터가 내는 문장제 문제를 논리적으로 파악해봐요!', link: '/grade/1/defense-game', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/1/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '집에서 종이로 직접 풀어보세요!', link: '/grade/1/worksheet', status: 'available' },
            ]
        },
        2: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'three-digit', title: '세 자리 수', description: '백, 십, 일을 배워요.', link: '/grade/2/three-digit', status: 'available' },
                        { id: 'shapes-2nd', title: '여러 가지 도형', description: '삼각형, 사각형 등을 배워요.', link: '/grade/2/shapes', status: 'available' },
                        { id: 'addition-subtraction-2nd', title: '덧셈과 뺄셈', description: '두 자리 수 계산을 배워요.', link: '/grade/2/arithmetic', status: 'available' },
                        { id: 'length', title: '길이 재기', description: 'cm와 m를 배워요.', link: '/grade/2/length', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'four-digit', title: '네 자리 수', description: '천의 자리를 배워요.', link: '/grade/2/four-digit', status: 'available' },
                        { id: 'multiplication-link', title: '곱셈의 원리', description: '왜 곱셈을 배울까요?', link: '/grade/2/multiplication-link', status: 'available' },
                        { id: 'multiplication', title: '구구단', description: '구구단을 외우고 게임해요.', link: '/grade/2/multiplication', status: 'available' },
                        { id: 'time', title: '시각과 시간', description: '시간을 계산해요.', link: '/grade/2/time', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 문제를 풀어보세요!', link: '/grade/2/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '상황을 이해하고 식으로 풀어봐요!', link: '/grade/2/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 심화 학습지', description: '창의성과 사고력을 키우는 심화 문제를 종이로 풀어요.', link: '/grade/2/word-problem-worksheet', status: 'available' },
                { id: 'defense', title: '🛡️ 문장제 방어 게임', description: '무작정 계산은 금물! 문장의 핵심을 파악하세요.', link: '/grade/2/defense-game', status: 'available' },
                { id: 'number-card', title: '🃏 숫자 카드 추리', description: '주어진 카드로 조건에 맞는 가장 큰/작은 수 만들기!', link: '/grade/2/number-card', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/2/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '오늘 배운 내용을 종이로 풀어보세요!', link: '/grade/2/worksheet', status: 'available' },
            ]
        },
        3: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'addition-subtraction', title: '덧셈과 뺄셈', description: '원리 탐험부터 실전 연습까지!', link: '/grade/3/arithmetic', status: 'available' },
                        { id: 'subtraction-borrow', title: '받아내림 뺄셈', description: '빌려오는 뺄셈, 원리를 보고 풀어요.', link: '/grade/3/subtraction', status: 'available' },
                        { id: 'arithmetic-advanced', title: '덧셈과 뺄셈 심화', description: '문장제와 사고력 수학 도전!', link: '/grade/3/word-problem', status: 'available' },
                        { id: 'architect', title: '문장제 설계소', description: '문제를 읽고 수학 식을 설계해봐요.', link: '/grade/3/architect', status: 'available' },
                        { id: 'multiplication', title: '곱셈 (구구단)', description: '구구단 원리를 보고 퀴즈로 마스터!', link: '/grade/3/multiplication', status: 'available' },
                        { id: 'division', title: '나눗셈', description: '사탕 나누기로 원리를 익히고 연습해요.', link: '/grade/3/division', status: 'available' },
                        { id: 'division-meaning', title: '나눗셈의 두 얼굴', description: '등분제와 포함제, 두 가지 나눗셈의 의미!', link: '/grade/3/division-meaning', status: 'available' },
                        { id: 'division-multi', title: '나눗셈과 곱셈', description: '곱셈구구로 나눗셈의 정답을 빨리 찾아요.', link: '/grade/3/division-multi', status: 'available' },
                        { id: 'fractions', title: '분수와 소수', description: '피자 나누기로 배우는 분수의 세계.', link: '/grade/3/fraction', status: 'available' },
                        { id: 'fraction-decimal', title: '분수와 소수의 관계', description: '수직선 위에서 분수와 소수의 크기를 비교해요.', link: '/grade/3/fraction-decimal', status: 'available' },
                        { id: 'plane-figures', title: '평면도형', description: '직각삼각형, 직사각형을 그려봐요.', link: '/grade/3/geometry', status: 'available' },
                        { id: 'length-time', title: '길이와 시간', description: '시계 보기와 길이 변환하기.', link: '/grade/3/length', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'multiplication-2', title: '곱셈 (심화)', description: '더 큰 수의 곱셈을 도전해요.', link: '/grade/3/multiplication', status: 'available' },
                        { id: 'division-2', title: '나눗셈 (심화)', description: '나머지가 있는 나눗셈!', link: '/grade/3/division', status: 'available' },
                        { id: 'circle', title: '원', description: '중심, 반지름, 지름을 배워요.', link: '/grade/3/circle', status: 'available' },
                        { id: 'compass', title: '컴퍼스로 원 그리기', description: '컴퍼스를 사용해 직접 원을 그려봐요!', link: '/grade/3/compass', status: 'available' },
                        { id: 'fraction-2', title: '분수 (심화)', description: '분수의 크기를 비교해요.', link: '/grade/3/fraction', status: 'available' },
                        { id: 'weight-volume', title: '들이와 무게', description: 'L, mL, kg, g 단위를 배워요.', link: '/grade/3/weight-volume', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '1학기+2학기 모든 단원 문제를 풀어보세요!', link: '/grade/3/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '나눗셈, 분수, 시간 계산 등 어려운 문제 도전!', link: '/grade/3/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 심화 학습지', description: '3학년 필수 심화 문장제를 출력해서 도전해봐요.', link: '/grade/3/word-problem-worksheet', status: 'available' },
                { id: 'defense', title: '🛡️ 문장제 방어 게임', description: '논리적 사고로 문장제 몬스터를 물리치세요!', link: '/grade/3/defense-game', status: 'available' },
                { id: 'number-card', title: '🃏 숫자 카드 추리', description: '여러 카드를 조합해 특정한 수를 유추해보세요.', link: '/grade/3/number-card', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/3/game', status: 'available' },
                { id: 'worksheet', title: '📄 학습지 출력', description: '원하는 단원 문제를 PDF로 뽑아요.', link: '/grade/3/worksheet', status: 'available' },
            ]
        },
        4: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'large-numbers', title: '큰 수', description: '만, 억, 조 단위의 숫자를 배워요.', link: '/grade/4/large-numbers', status: 'available' },
                        { id: 'angles', title: '각도', description: '각의 크기를 재고 어림해봐요.', link: '/grade/4/angles', status: 'available' },
                        { id: 'multi-div', title: '곱셈과 나눗셈', description: '세 자리 수의 곱셈과 나눗셈을 해요.', link: '/grade/4/arithmetic', status: 'available' },
                        { id: 'geometry-move', title: '평면도형의 이동', description: '밀기, 뒤집기, 돌리기를 배워요.', link: '/grade/4/geometry-move', status: 'available' },
                        { id: 'bar-graph', title: '막대그래프', description: '자료를 막대로 나타내봐요.', link: '/grade/4/bar-graph', status: 'available' },
                        { id: 'rules', title: '규칙 찾기', description: '우리 주변의 다양한 규칙을 찾아요.', link: '/grade/4/rules', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'fraction-division-link', title: '분수와 나눗셈', description: '나눗셈의 몫을 분수로 바꿔봐요!', link: '/grade/4/fraction-division-link', status: 'available' },
                        { id: 'fraction-calc', title: '분수의 덧셈과 뺄셈', description: '대분수의 계산을 배워요.', link: '/grade/4/fraction', status: 'available' },
                        { id: 'triangles', title: '삼각형', description: '삼각형의 성질과 종류를 배워요.', link: '/grade/4/triangle', status: 'available' },
                        { id: 'decimal-calc', title: '소수의 덧셈과 뺄셈', description: '소수의 자릿값을 알고 더하고 빼요.', link: '/grade/4/decimal', status: 'available' },
                        { id: 'quadrilaterals', title: '사각형', description: '평행사변형과 마름모를 배워요.', link: '/grade/4/quadrilateral', status: 'available' },
                        { id: 'line-graph', title: '꺾은선그래프', description: '변화하는 모습을 그래프로 그려요.', link: '/grade/4/line-graph', status: 'available' },
                        { id: 'polygons', title: '다각형', description: '변이 여러 개인 도형과 정다각형을 배워요.', link: '/grade/4/polygons', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '4학년 모든 문제를 풀어보세요!', link: '/grade/4/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '논리와 사고력을 키우는 4학년 문장제 문제!', link: '/grade/4/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 심화 학습지', description: '논리와 사고력을 키우는 4학년 심화 문제를 출력해요.', link: '/grade/4/word-problem-worksheet', status: 'available' },
                { id: 'defense', title: '🛡️ 문장제 방어 게임', description: '문장제 문제의 숨은 의도를 찾아 몬스터를 처치해요.', link: '/grade/4/defense-game', status: 'available' },
                { id: 'number-card', title: '🃏 숫자 카드 추리', description: '숫자 카드로 조건에 맞는 큰 수와 작은 수를 만들어요!', link: '/grade/4/number-card', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/4/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '단원평가 준비! 종이 학습지로 해봐요.', link: '/grade/4/worksheet', status: 'available' },
            ]
        },
        5: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'mixed-arithmetic', title: '자연수의 혼합 계산', description: '덧셈, 뺄셈, 곱셈, 나눗셈이 섞여 있는 식을 계산해요.', link: '/grade/5/mixed-arithmetic', status: 'available' },
                        { id: 'factors-multiples', title: '약수와 배수', description: '약수와 배수, 공약수와 공배수를 배워요.', link: '/grade/5/factors-multiples', status: 'available' },
                        { id: 'rules-response', title: '규칙과 대응', description: '두 양 사이의 관계를 찾아봐요.', link: '/grade/5/rules', status: 'available' },
                        { id: 'reduction', title: '약분과 통분', description: '분수를 간단하게 만들고 분모를 맞춰요.', link: '/grade/5/reduction', status: 'available' },
                        { id: 'common-denominator', title: '통분 원리 탐험', description: '다른 분모의 분수를 더하는 원리!', link: '/grade/5/common-denominator', status: 'available' },
                        { id: 'fraction-addition-subtraction', title: '분수의 덧셈과 뺄셈', description: '분모가 다른 분수의 계산을 배워요.', link: '/grade/5/fraction-arithmetic', status: 'available' },
                        { id: 'area-formula', title: '넓이 공식 유도기', description: '도형을 잘라 붙이며 공식을 만들어요.', link: '/grade/5/area-formula', status: 'available' },
                        { id: 'perimeters-areas', title: '다각형의 둘레와 넓이', description: '다각형의 둘레와 넓이 구하는 방법을 배워요.', link: '/grade/5/area', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'numbers-range', title: '수의 범위와 어림하기', description: '이상, 이하, 초과, 미만과 반올림을 배워요.', link: '/grade/5/range', status: 'available' },
                        { id: 'fraction-multiplication', title: '분수의 곱셈', description: '분수와 자연수, 분수와 분수의 곱셈을 해요.', link: '/grade/5/fraction-multiplication', status: 'available' },
                        { id: 'congruence-symmetry', title: '합동과 대칭', description: '모양이 같은 도형과 대칭을 배워요.', link: '/grade/5/congruence', status: 'available' },
                        { id: 'decimal-multiplication', title: '소수의 곱셈', description: '소수의 곱셈 원리를 배워요.', link: '/grade/5/decimal-multiplication', status: 'available' },
                        { id: 'cuboids', title: '직육면체', description: '직육면체와 정육면체의 성질을 배워요.', link: '/grade/5/cuboid', status: 'available' },
                        { id: 'average-possibility', title: '평균과 가능성', description: '평균을 구하고 일어날 가능성을 알아보아요.', link: '/grade/5/average', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '5학년 모든 문제를 풀어보세요!', link: '/grade/5/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '복합 연산과 원리를 활용한 5학년 문장제!', link: '/grade/5/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 심화 학습지', description: '5학년 복합 연산 심화 문제를 종이로 출력해요.', link: '/grade/5/word-problem-worksheet', status: 'available' },
                { id: 'defense', title: '🛡️ 문장제 방어 게임', description: "복잡한 '어떤 수 구하기' 문제를 논리적으로 방어하세요!", link: '/grade/5/defense-game', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/5/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '5학년 실력을 종이로 확인해봐요!', link: '/grade/5/worksheet', status: 'available' },
            ]
        },
        6: {
            semesters: [
                {
                    semester: 1,
                    topics: [
                        { id: 'fraction-division', title: '분수의 나눗셈', description: '분수의 나눗셈 원리를 배워요.', link: '/grade/6/fraction-division', status: 'available' },
                        { id: 'prism-pyramid', title: '각기둥과 각뿔', description: '입체도형의 특징을 탐구해요.', link: '/grade/6/geometry', status: 'available' },
                        { id: 'decimal-division', title: '소수의 나눗셈', description: '소수의 나눗셈을 소수점 맞춰 계산해요.', link: '/grade/6/decimal-division', status: 'available' },
                        { id: 'ratio-proportion', title: '비와 비율', description: '비의 뜻과 백분율을 배워요.', link: '/grade/6/ratio', status: 'available' },
                        { id: 'ratio-bar', title: '비율 매직 바', description: '막대로 보는 할인율·농도 계산!', link: '/grade/6/ratio-bar', status: 'available' },
                        { id: 'graphs', title: '여러 가지 그래프', description: '띠그래프와 원그래프를 그려요.', link: '/grade/6/graphs', status: 'available' },
                        { id: 'volume-area', title: '직육면체의 부피와 겉넓이', description: '부피와 겉넓이 구하는 법을 배워요.', link: '/grade/6/volume', status: 'available' },
                    ]
                },
                {
                    semester: 2,
                    topics: [
                        { id: 'ratio-expression', title: '비례식과 비례배분', description: '비례식의 성질을 이용해 문제를 풀어요.', link: '/grade/6/proportion', status: 'available' },
                        { id: 'circle-area', title: '원의 넓이', description: '원주와 원의 넓이를 구해요.', link: '/grade/6/circle-area', status: 'available' },
                        { id: 'cylinder-cone-sphere', title: '원기둥, 원뿔, 구', description: '회전체의 성질을 배워요.', link: '/grade/6/round-geometry', status: 'available' },
                    ]
                }
            ],
            tools: [
                { id: 'quiz', title: '🏆 종합 퀴즈왕', description: '6학년 모든 문제를 풀어보세요!', link: '/grade/6/quiz', status: 'available' },
                { id: 'word-problem', title: '🧠 심화 문장제', description: '6학년 사고력 쑥쑥 문장제 도전!', link: '/grade/6/word-problem', status: 'available' },
                { id: 'word-print', title: '🖨️ 심화 학습지', description: '중학교 대비 6학년 사고력 심화 문제를 출력해요.', link: '/grade/6/word-problem-worksheet', status: 'available' },
                { id: 'defense', title: '🛡️ 문장제 방어 게임', description: '비례식과 비율 문장제, 논리로 맞서 싸우세요!', link: '/grade/6/defense-game', status: 'available' },
                { id: 'block', title: '🧱 쌓기나무 3D', description: '도형을 3D로 보고 위, 앞, 옆 투영도를 맞춰봐요!', link: '/grade/6/block-builder', status: 'available' },
                { id: 'game', title: '🏁 수학 레이스', description: '60초 동안 달리는 스피드 수학 게임!', link: '/grade/6/game', status: 'available' },
                { id: 'print', title: '🖨️ 학습지 출력', description: '중학교 가기 전, 종이로 최종 점검!', link: '/grade/6/worksheet', status: 'available' },
            ]
        }
    };

    const currentCurriculum = curriculumData[gradeId] || { smesters: [], tools: [] };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <PageHeader title={`${gradeId}학년 수학 탐험 지도 🗺️`} />
            </div>

            <div className={styles.content}>
                {/* Semesters */}
                {currentCurriculum.semesters && currentCurriculum.semesters.map((sem, index) => (
                    <section key={index} className={styles.semesterSection}>
                        <h2 className={styles.semesterTitle}>{sem.semester}학기</h2>
                        <div className={styles.topicGrid}>
                            {sem.topics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    to={topic.link}
                                    className={`${styles.topicCard} ${topic.status === 'coming-soon' ? styles.disabled : ''}`}
                                    onClick={(e) => topic.status === 'coming-soon' && e.preventDefault()}
                                >
                                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                                    <p className={styles.topicDesc}>{topic.description}</p>
                                    {topic.status === 'available' ? (
                                        <span className={styles.playButton}>탐험하기 ▶</span>
                                    ) : (
                                        <span className={styles.soonBadge}>준비 중</span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}

                {/* Additional Tools */}
                {currentCurriculum.tools && currentCurriculum.tools.length > 0 && (
                    <section className={styles.semesterSection}>
                        <h2 className={styles.semesterTitle}>📚 추가 학습 도구</h2>
                        <div className={styles.topicGrid}>
                            {currentCurriculum.tools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    to={tool.link}
                                    className={`${styles.topicCard} ${styles.toolCard}`}
                                >
                                    <h3 className={styles.topicTitle}>{tool.title}</h3>
                                    <p className={styles.topicDesc}>{tool.description}</p>
                                    <span className={styles.playButton}>시작하기 ▶</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* SEO 및 정보성 콘텐츠 섹션 추가 */}
            <div className={styles.seoSection}>
                <section className={styles.guideCard}>
                    <h2 className={styles.guideTitle}>💡 {gradeId}학년 수학, 무엇을 어떻게 배울까요?</h2>
                    <div className={styles.guideContent}>
                        <p>
                            초등학교 {gradeId}학년 과정은 수학적 사고력의 기초를 다지는 매우 중요한 시기입니다. 
                            매쓰 펫토리에서는 공식을 단순히 암기하는 것이 아니라, 시각적 시뮬레이션과 
                            인터랙티브 활동을 통해 수의 원리를 몸소 체험하며 배울 수 있도록 설계되었습니다.
                        </p>
                        <p>
                            <strong>주요 학습 목표:</strong><br />
                            {gradeId === '1' && "100까지의 수 개념을 완벽히 이해하고, 모으기와 가르기를 통해 덧셈과 뺄셈의 기초를 형성합니다."}
                            {gradeId === '2' && "자릿값의 원리를 바탕으로 세 자리 수와 네 자리 수를 이해하며, 구구단을 통해 곱셈의 기초를 마스터합니다."}
                            {gradeId === '3' && "분수와 소수의 탄생 원리를 깨닫고, 나눗셈의 의미를 구체물 조작을 통해 정확히 파악합니다."}
                            {gradeId === '4' && "만, 억, 조 단위의 큰 수를 자신 있게 다루며, 각도와 도형의 이동을 통해 공간 지각력을 극대화합니다."}
                            {gradeId === '5' && "약수와 배수의 관계를 탐구하고, 분수의 약분과 통분을 통해 중등 수학으로 가는 중간 다리를 놓습니다."}
                            {gradeId === '6' && "비와 비율, 백분율의 실생활 활용 능력을 기르고, 입체도형의 부피와 겉넓이를 구하며 초등 수학을 총정리합니다."}
                        </p>
                        <p>
                            <strong>부모님을 위한 가이드:</strong><br />
                            수학은 단계별 학습이 중요한 과목입니다. 아이가 특정 단원을 어려워한다면, 
                            매쓰 펫토리의 시각화 도구를 활용해 원리부터 다시 차근차근 짚어주는 것이 좋습니다. 
                            공부가 끝난 후에는 펫에게 먹이를 주거나 방을 꾸미는 활동을 통해 
                            학습에 대한 긍정적인 보상을 제공해주세요.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Curriculum;
