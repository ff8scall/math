export const NAMES = ['철수', '영희', '민수', '지수', '수지', '민아', '도겸', '호시', '민호', '유진', '서준', '하은', '도윤', '채원', '사쿠라', '카즈하', '지아', '우진', '소윤', '준우', '예은', '하니', '민지', '혜인'];
export const ITEMS = ['사과', '포도', '구슬', '장난감', '딱지', '사탕', '연필', '지우개', '스티커', '초콜릿', '쿠키'];

export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateProblemData = (gradeNum) => {
    let q = '', ans = '', exp = '';
    const name1 = getRandom(NAMES);
    const name2 = getRandom(NAMES.filter(n => n !== name1));
    const item = getRandom(ITEMS);

    if (gradeNum === 1) {
        const types = ['addition-total', 'subtraction-remain', 'comparison', 'sequence'];
        const type = getRandom(types);

        if (type === 'addition-total') {
            const n1 = Math.floor(Math.random() * 9) + 1;
            const n2 = Math.floor(Math.random() * 9) + 1;
            q = `${name1}는 ${item}를 ${n1}개 가지고 있고, ${name2}는 ${item}를 ${n2}개 가지고 있습니다. 두 사람이 가진 ${item}는 모두 몇 개인가요?`;
            ans = (n1 + n2).toString();
            exp = `${n1} + ${n2} = ${ans}입니다.`;
        } else if (type === 'subtraction-remain') {
            const n1 = Math.floor(Math.random() * 8) + 10;
            const n2 = Math.floor(Math.random() * 9) + 1;
            q = `바구니에 ${item}가 ${n1}개 있었습니다. 그중에서 ${name1}가 ${n2}개를 먹었습니다. 남은 ${item}는 몇 개인가요?`;
            ans = (n1 - n2).toString();
            exp = `${n1} - ${n2} = ${ans}입니다.`;
        } else if (type === 'comparison') {
            const n1 = Math.floor(Math.random() * 5) + 10;
            const n2 = Math.floor(Math.random() * 5) + 5;
            const diff = Math.abs(n1 - n2);
            const winner = n1 > n2 ? name1 : name2;
            q = `${name1}는 ${item}를 ${n1}개, ${name2}는 ${item}를 ${n2}개 가지고 있습니다. 누가 몇 개 더 많이 가지고 있나요?`;
            ans = diff.toString();
            exp = `${Math.max(n1, n2)} - ${Math.min(n1, n2)} = ${diff}이므로 ${winner}가 ${diff}개 더 많습니다.`;
        } else {
            const pos = Math.floor(Math.random() * 5) + 2;
            q = `줄을 서 있는 사람들 중에서 ${name1}는 앞에서 ${pos}번째에 서 있습니다. ${name1}의 앞에 서 있는 사람은 몇 명인가요?`;
            ans = (pos - 1).toString();
            exp = `${pos}번째이므로 앞에는 ${pos - 1}명이 있습니다.`;
        }
    } else if (gradeNum === 2) {
        const types = ['three-digit-sum', 'length-add', 'multiplication-basic', 'time-after'];
        const type = getRandom(types);

        if (type === 'three-digit-sum') {
            const n1 = Math.floor(Math.random() * 200) + 100;
            const n2 = Math.floor(Math.random() * 200) + 100;
            q = `어제 박물관에 방문한 사람은 ${n1}명이고, 오늘은 ${n2}명이 방문했습니다. 어제와 오늘 방문한 사람은 모두 몇 명인가요?`;
            ans = (n1 + n2).toString();
            exp = `${n1} + ${n2} = ${ans}명입니다.`;
        } else if (type === 'length-add') {
            const m = Math.floor(Math.random() * 2) + 1;
            const cm = Math.floor(Math.random() * 50) + 10;
            const addCm = Math.floor(Math.random() * 40) + 20;
            q = `연필 한 자루의 길이는 ${cm}cm이고, 다른 연필의 길이는 ${addCm}cm입니다. 두 연필을 일자로 이어 붙이면 전체 길이는 몇 cm가 될까요?`;
            ans = (cm + addCm).toString();
            exp = `${cm} + ${addCm} = ${ans}cm입니다.`;
        } else if (type === 'multiplication-basic') {
            const perBag = Math.floor(Math.random() * 4) + 2;
            const bags = Math.floor(Math.random() * 5) + 3;
            q = `한 봉지에 ${item}가 ${perBag}개씩 들어 있습니다. 이런 봉지가 ${bags}봉지 있다면 ${item}는 모두 몇 개인가요?`;
            ans = (perBag * bags).toString();
            exp = `${perBag}개씩 ${bags}묶음은 ${perBag} × ${bags} = ${ans}입니다.`;
        } else {
            const startH = Math.floor(Math.random() * 3) + 1;
            const duration = Math.floor(Math.random() * 30) + 20;
            q = `${startH}시에 시작한 만화 영화가 ${duration}분 동안 방영되었습니다. 영화가 끝난 시각은 몇 시 몇 분인가요?`;
            ans = `${startH}시 ${duration}분`; // This might need string handling in the component
            const rawAns = (startH * 100 + duration).toString(); // simple numeric representation for matching
            return { q, ans: duration, exp: `${startH}시에서 ${duration}분이 지나면 ${startH}시 ${duration}분입니다.` };
        }
    } else if (gradeNum === 3) {
        const types = ['three-digit-diff', 'division-share', 'fraction-part', 'weight-add', 'any-number', 'calendar', 'multi-step'];
        const type = getRandom(types);

        if (type === 'three-digit-diff') {
            const total = Math.floor(Math.random() * 500) + 400;
            const give = Math.floor(Math.random() * 300) + 100;
            q = `동화책의 전체 쪽수는 ${total}쪽입니다. 그중에서 지수가 ${give}쪽을 읽었다면 아직 읽지 않은 쪽수는 몇 쪽인가요?`;
            ans = (total - give).toString();
            exp = `${total} - ${give} = ${ans}쪽입니다.`;
        } else if (type === 'division-share') {
            const perChild = Math.floor(Math.random() * 7) + 3;
            const children = Math.floor(Math.random() * 6) + 2;
            const total = perChild * children;
            q = `사탕 ${total}개를 ${children}명의 친구들에게 똑같이 나누어 주려고 합니다. 한 명에게 몇 개씩 줄 수 있을까요?`;
            ans = perChild.toString();
            exp = `${total} ÷ ${children} = ${perChild}입니다.`;
        } else if (type === 'fraction-part') {
            const total = 12;
            const denom = getRandom([2, 3, 4, 6]);
            const count = total / denom;
            q = `맛있는 빵 ${total}개가 있습니다. 그중에서 1/${denom}을 먹었습니다. 먹은 빵은 몇 개인가요?`;
            ans = count.toString();
            exp = `${total}의 1/${denom}은 ${total} ÷ ${denom} = ${count}개입니다.`;
        } else if (type === 'any-number') {
            const any = Math.floor(Math.random() * 50) + 20;
            const sub = Math.floor(Math.random() * 15) + 5;
            const result = any - sub;
            q = `어떤 수에서 ${sub}를 뺐더니 ${result}이 되었습니다. 어떤 수는 얼마인가요?`;
            ans = any.toString();
            exp = `□ - ${sub} = ${result} 이므로, □ = ${result} + ${sub} = ${any}입니다.`;
        } else if (type === 'calendar') {
            const date = Math.floor(Math.random() * 10) + 5;
            const after = 14;
            q = `오늘은 5월 ${date}일 수요일입니다. 오늘로부터 2주일 후는 5월 몇 일인가요?`;
            ans = (date + after).toString();
            exp = `1주일은 7일이므로 2주일은 14일입니다. ${date} + 14 = ${ans}일입니다.`;
        } else if (type === 'multi-step') {
            const perBox = 8;
            const boxes = Math.floor(Math.random() * 4) + 3;
            const extra = Math.floor(Math.random() * 10) + 5;
            q = `연필이 한 타에 ${perBox}자루씩 들어있는 상자가 ${boxes}개 있고, 낱개로 ${extra}자루가 더 있습니다. 연필은 모두 몇 자루인가요?`;
            ans = (perBox * boxes + extra).toString();
            exp = `${perBox} × ${boxes} = ${perBox * boxes}이고, 여기에 ${extra}를 더하면 ${ans}입니다.`;
        } else {
            const kg = Math.floor(Math.random() * 3) + 1;
            const g = Math.floor(Math.random() * 800) + 100;
            const addG = Math.floor(Math.random() * 500) + 100;
            q = `사과의 무게는 ${kg}kg ${g}g이고, 배의 무게는 ${addG}g입니다. 사과와 배의 전체 무게는 몇 g인가요?`;
            ans = (kg * 1000 + g + addG).toString();
            exp = `${kg}kg ${g}g은 ${kg * 1000 + g}g입니다. 여기에 ${addG}g를 더하면 ${ans}g가 됩니다.`;
        }

    } else {
        q = `${gradeNum}학년 문장제 문제를 생성 중입니다.`;
        ans = "0";
        exp = "점검 중";
    }

    return { q, ans, exp };
};
