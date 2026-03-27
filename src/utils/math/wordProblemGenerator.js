export const NAMES = ['철수', '영희', '민수', '지수', '수지', '민아', '도겸', '호시', '민호', '유진', '서준', '하은', '도윤', '채원', '사쿠라', '카즈하', '지아', '우진', '소윤', '준우', '예은', '하니', '민지', '혜인'];
export const ITEMS = ['사과', '포도', '구슬', '장난감', '딱지', '사탕', '연필', '지우개', '스티커', '초콜릿', '쿠키'];

export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateProblemData = (gradeNum, difficulty = 'mixed') => {
    let q = '', ans = '', exp = '', hint = '';
    const name1 = getRandom(NAMES);
    const name2 = getRandom(NAMES.filter(n => n !== name1));
    const item = getRandom(ITEMS);

    if (gradeNum === 1) {
        const basicTypes = ['addition-total', 'subtraction-remain', 'comparison', 'sequence'];
        const advancedTypes = ['advanced-number-condition', 'advanced-order-logic', 'advanced-reverse-calc', 'advanced-comparison-logic', 'advanced-shape-logic'];
        
        let targetTypes;
        if (difficulty === 'basic') targetTypes = basicTypes;
        else if (difficulty === 'advanced') targetTypes = advancedTypes;
        else targetTypes = [...basicTypes, ...advancedTypes];

        const type = getRandom(targetTypes);

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
        } else if (type === 'sequence') {
            const pos = Math.floor(Math.random() * 5) + 2;
            q = `줄을 서 있는 사람들 중에서 ${name1}는 앞에서 ${pos}번째에 서 있습니다. ${name1}의 앞에 서 있는 사람은 몇 명인가요?`;
            ans = (pos - 1).toString();
            exp = `${pos}번째이므로 앞에는 ${pos - 1}명이 있습니다.`;
        } else if (type === 'advanced-number-condition') {
            const base = Math.floor(Math.random() * 4) + 2; // 2~5
            const limit = base + Math.floor(Math.random() * 3) + 2; // base+2 ~ base+4
            const isEven = Math.random() > 0.5;
            q = `1부터 9까지의 수 중에서 ${base}보다 크고 ${limit}보다 작은 ${isEven ? '짝수' : '홀수'}는 무엇인가요?`;
            let possible = [];
            for(let i=base+1; i<limit; i++) {
                if(isEven && i%2===0) possible.push(i);
                if(!isEven && i%2!==0) possible.push(i);
            }
            ans = possible.join(', ');
            exp = `${base}보다 크고 ${limit}보다 작은 수는 (${Array.from({length: limit-base-1}, (_, i) => base+1+i).join(', ')})입니다. 이 중 ${isEven ? '짝수' : '홀수'}는 ${ans}입니다.`;
        } else if (type === 'advanced-order-logic') {
            const pos1 = Math.floor(Math.random() * 3) + 2;
            const gap = Math.floor(Math.random() * 2) + 2;
            q = `${name1}는 앞에서 ${pos1}번째에 서 있고, ${name2}는 ${name1}보다 ${gap}명 더 뒤에 서 있습니다. ${name2}는 앞에서 몇 번째인가요?`;
            ans = (pos1 + gap).toString();
            exp = `${pos1}번째에서 ${gap}명 더 뒤에 있으므로 ${pos1} + ${gap} = ${ans}번째입니다.`;
        } else if (type === 'advanced-reverse-calc') {
            const sub = Math.floor(Math.random() * 4) + 1;
            const res = Math.floor(Math.random() * 4) + 2;
            q = `어떤 수에서 ${sub}를 뺐더니 ${res}가 되었습니다. 어떤 수는 얼마인가요?`;
            ans = (res + sub).toString();
            exp = `거꾸로 계산하면 ${res} + ${sub} = ${ans}입니다.`;
        } else if (type === 'advanced-comparison-logic') {
            const items_shuffled = [...ITEMS].sort(() => Math.random() - 0.5);
            const [i1, i2, i3] = items_shuffled;
            q = `${i1}는 ${i2}보다 많고, ${i2}는 ${i3}보다 많습니다. 세 가지 중에서 가장 많은 것은 무엇인가요?`;
            ans = i1;
            exp = `${i1} > ${i2} 이고 ${i2} > ${i3} 이므로 가장 많은 것은 ${i1}입니다.`;
        } else if (type === 'advanced-shape-logic') {
            const shapes = [
                { name: '상자 모양', desc: '평평한 부분이 많고, 잘 쌓을 수 있지만 잘 굴러가지 않는 모양' },
                { name: '공 모양', desc: '어느 방향으로도 잘 굴러가지만 쌓을 수 없는 모양' },
                { name: '둥근 기둥 모양', desc: '세우면 쌓을 수 있고, 옆으로 눕히면 잘 굴러가는 모양' }
            ];
            const chosen = getRandom(shapes);
            q = `다음 특징을 가진 모양의 이름은 무엇인가요?\n"${chosen.desc}"`;
            ans = chosen.name;
            exp = `${chosen.name}의 특징입니다.`;
        }
    } else if (gradeNum === 2) {
        const basicTypes = ['three-digit-sum', 'length-add', 'multiplication-basic', 'time-after'];
        const advancedTypes = ['advanced-card-max-min', 'advanced-time-duration', 'advanced-reverse-multiply', 'advanced-length-overlap'];

        let targetTypes;
        if (difficulty === 'basic') targetTypes = basicTypes;
        else if (difficulty === 'advanced') targetTypes = advancedTypes;
        else targetTypes = [...basicTypes, ...advancedTypes];

        const type = getRandom(targetTypes);

        if (type === 'three-digit-sum') {
            const n1 = Math.floor(Math.random() * 200) + 100;
            const n2 = Math.floor(Math.random() * 200) + 100;
            q = `어제 박물관에 방문한 사람은 ${n1}명이고, 오늘은 ${n2}명이 방문했습니다. 어제와 오늘 방문한 사람은 모두 몇 명인가요?`;
            ans = (n1 + n2).toString();
            exp = `${n1} + ${n2} = ${ans}명입니다.`;
        } else if (type === 'length-add') {
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
        } else if (type === 'time-after') {
            const startH = Math.floor(Math.random() * 3) + 1;
            const duration = Math.floor(Math.random() * 30) + 20;
            q = `${startH}시에 시작한 만화 영화가 ${duration}분 동안 방영되었습니다. 영화가 끝난 시각은 몇 시 몇 분인가요?`;
            ans = `${startH}시 ${duration}분`;
            exp = `${startH}시에서 ${duration}분이 지나면 ${startH}시 ${duration}분입니다.`;
        } else if (type === 'advanced-card-max-min') {
            let digits = [];
            while(digits.length < 3) {
                let d = Math.floor(Math.random() * 9) + 1;
                if(!digits.includes(d)) digits.push(d);
            }
            digits.sort((a, b) => b - a);
            const maxNum = digits[0]*100 + digits[1]*10 + digits[2];
            digits.sort((a, b) => a - b);
            const minNum = digits[0]*100 + digits[1]*10 + digits[2];
            q = `숫자 카드 ${digits.join(', ')}를 한 번씩만 사용하여 만들 수 있는 세 자리 수 중 가장 큰 수와 가장 작은 수의 차는 얼마인가요?`;
            ans = (maxNum - minNum).toString();
            exp = `가장 큰 수(${maxNum}) - 가장 작은 수(${minNum}) = ${ans}입니다.`;
        } else if (type === 'advanced-time-duration') {
            const h1 = Math.floor(Math.random() * 3) + 2;
            const m1 = 30;
            const h_diff = 1;
            const m_diff = 15;
            q = `지금은 ${h1}시 ${m1}분입니다. ${h_diff}시간 ${m_diff}분 전의 시각은 몇 시 몇 분인가요?`;
            ans = `${h1 - h_diff}시 ${m1 - m_diff}분`;
            exp = `${h1}시에서 1시간 전은 ${h1-1}시이고, ${m1}분에서 15분 전은 ${m1-15}분입니다.`;
        } else if (type === 'advanced-reverse-multiply') {
            const n1 = Math.floor(Math.random() * 5) + 2;
            const res1 = n1 * (Math.floor(Math.random() * 4) + 2);
            const n2 = Math.floor(Math.random() * 5) + 5;
            const any = res1 / n1;
            q = `어떤 수에 ${n1}을 곱했더니 ${res1}이 되었습니다. 이 어떤 수에 ${n2}를 곱하면 얼마인가요?`;
            ans = (any * n2).toString();
            exp = `어떤 수는 ${res1} ÷ ${n1} = ${any}입니다. 따라서 ${any} × ${n2} = ${ans}입니다.`;
        } else if (type === 'advanced-length-overlap') {
            const len = Math.floor(Math.random() * 5) + 10;
            const overlap = Math.floor(Math.random() * 2) + 2;
            q = `길이가 ${len}cm인 종이 띠 2장을 ${overlap}cm가 겹치게 이어 붙였습니다. 이어 붙인 종이 띠 전체의 길이는 몇 cm인가요?`;
            ans = (len * 2 - overlap).toString();
            exp = `두 장의 길이를 더한 뒤 겹친 부분만큼 뺍니다. ${len} + ${len} - ${overlap} = ${ans}입니다.`;
        }
    } else if (gradeNum === 3) {
        const basicTypes = [
            'three-digit-diff', 'division-share', 'fraction-part', 'weight-add', 
            'any-number', 'calendar', 'multi-step', 'place-value-combined'
        ];
        const advancedTypes = [
            'custom-op', 'symbol-sum', 'torn-paper', 'mistake-calc', 
            'max-expr', 'card-digits-diff', 'inequality-max', 'approx-target-sum',
            'system-sub-add', 'division-cut', 'length-overlap', 'multiplication-puzzle',
            'time-spent', 'shape-sides', 'advanced-divide-check', 'advanced-fraction-sum', 'advanced-weight-logic'
        ];

        let targetTypes;
        if (difficulty === 'basic') targetTypes = basicTypes;
        else if (difficulty === 'advanced') targetTypes = advancedTypes;
        else targetTypes = [...basicTypes, ...advancedTypes];

        const type = getRandom(targetTypes);

        if (type === 'three-digit-diff') {
            const total = Math.floor(Math.random() * 500) + 400;
            const give = Math.floor(Math.random() * 300) + 100;
            q = `동화책의 전체 쪽수는 ${total}쪽입니다.\n그중에서 지수가 ${give}쪽을 읽었다면\n아직 읽지 않은 쪽수는 몇 쪽인가요?`;
            ans = (total - give).toString();
            hint = "전체 쪽수에서 읽은 쪽수를 빼보세요.";
            exp = `[풀이 과정]\n1. 전체 쪽수는 ${total}쪽입니다.\n2. 읽은 쪽수는 ${give}쪽입니다.\n3. 식: ${total} - ${give} = ${ans}\n따라서 남은 쪽수는 ${ans}쪽입니다.`;
        } else if (type === 'division-share') {
            const perChild = Math.floor(Math.random() * 7) + 3;
            const children = Math.floor(Math.random() * 6) + 2;
            const total = perChild * children;
            q = `사탕 ${total}개를 ${children}명의 친구들에게\n똑같이 나누어 주려고 합니다.\n한 명에게 몇 개씩 줄 수 있을까요?`;
            ans = perChild.toString();
            hint = "전체 개수를 친구 수로 나누어 보세요.";
            exp = `[풀이 과정]\n1. 사탕은 총 ${total}개입니다.\n2. 친구는 ${children}명입니다.\n3. 식: ${total} ÷ ${children} = ${perChild}\n따라서 한 명당 ${perChild}개씩 가지게 됩니다.`;
        } else if (type === 'fraction-part') {
            const total = 12;
            const denom = getRandom([2, 3, 4, 6]);
            const count = total / denom;
            q = `맛있는 빵 ${total}개가 있습니다.\n그중에서 1/${denom}을 먹었습니다.\n먹은 빵은 몇 개인가요?`;
            ans = count.toString();
            hint = "전체 개수를 분모만큼 등분한 것 중 하나를 생각해보세요.";
            exp = `[풀이 과정]\n1. 전체 빵은 ${total}개입니다.\n2. 1/${denom}은 전체를 ${denom}으로 나눈 것 중 1만큼의 크기입니다.\n3. 식: ${total} ÷ ${denom} = ${count}\n따라서 먹은 빵은 ${count}개입니다.`;
        } else if (type === 'any-number') {
            const any = Math.floor(Math.random() * 50) + 20;
            const sub = Math.floor(Math.random() * 15) + 5;
            const result = any - sub;
            q = `어떤 수에서 ${sub}를 뺐더니 ${result}이 되었습니다.\n어떤 수는 얼마인가요?`;
            ans = any.toString();
            hint = "거꾸로 계산해 보세요. 뺀 만큼 다시 더해주면 원래 수를 알 수 있어요.";
            exp = `[풀이 과정]\n1. 어떤 수(□)에서 ${sub}를 뺀 결과가 ${result}입니다.\n2. 거꾸로 계산하면 □ = ${result} + ${sub} 입니다.\n3. 계산: ${result} + ${sub} = ${any}\n따라서 어떤 수는 ${any}입니다.`;
        } else if (type === 'calendar') {
            const date = Math.floor(Math.random() * 10) + 5;
            const after = 14;
            q = `오늘은 5월 ${date}일 수요일입니다.\n오늘로부터 2주일 후는 5월 몇 일인가요?`;
            ans = (date + after).toString();
            hint = "1주일은 7일이에요. 2주일이 며칠인지 먼저 생각해보세요.";
            exp = `[풀이 과정]\n1. 1주일은 7일입니다.\n2. 2주일은 7이 2번이므로 14일입니다.\n3. 식: ${date} + 14 = ${ans}\n따라서 2주일 후는 5월 ${ans}일입니다.`;
        } else if (type === 'multi-step') {
            const perBox = 8;
            const boxes = Math.floor(Math.random() * 4) + 3;
            const extra = Math.floor(Math.random() * 10) + 5;
            q = `연필이 한 타에 ${perBox}자루씩 들어있는\n상자가 ${boxes}개 있고, 낱개로 ${extra}자루가 더 있습니다.\n연필은 모두 몇 자루인가요?`;
            ans = (perBox * boxes + extra).toString();
            hint = "상자에 든 연필을 먼저 구한 뒤 낱개를 더해보세요.";
            exp = `[풀이 과정]\n1. 상자에 든 연필: ${perBox} × ${boxes} = ${perBox * boxes}자루\n2. 여기에 낱개로 ${extra}자루가 더 있습니다.\n3. 식: ${perBox * boxes} + ${extra} = ${ans}\n따라서 총 ${ans}자루입니다.`;
        } else if (type === 'place-value-combined') {
            const n100 = Math.floor(Math.random() * 5) + 3;
            const n10 = Math.floor(Math.random() * 8) + 2;
            const n1 = Math.floor(Math.random() * 20) + 10;
            const gValue = n100 * 100 + n10 * 10 + n1;
            const baseNum = Math.floor(Math.random() * 300) + 100;
            const diffNum = Math.floor(Math.random() * 400) + 200;
            const nValue = baseNum + diffNum;
            q = `다음 ㄱ과 ㄴ인 두 수의 합(ㄱ+ㄴ)을 구하세요.\n\nㄱ. 100이 ${n100}개, 10이 ${n10}개, 1이 ${n1}개인 수\nㄴ. ${baseNum}보다 ${diffNum}만큼 더 큰 수`;
            ans = (gValue + nValue).toString();
            hint = "ㄱ과 ㄴ의 값을 각각 먼저 구한 뒤 더해보세요.";
            exp = `[풀이 과정]\n1. ㄱ 구하기: (100×${n100}) + (10×${n10}) + ${n1} = ${gValue}\n2. ㄴ 구하기: ${baseNum} + ${diffNum} = ${nValue}\n3. 계산: ${gValue} + ${nValue} = ${ans}\n따라서 합은 ${ans}입니다.`;
        } else if (type === 'custom-op') {
            const sym = getRandom(['☆', '☁', '☘', '☼', '☽']);
            const sub = Math.floor(Math.random() * 200) + 100;
            const n1 = Math.floor(Math.random() * 400) + 200;
            const n2 = Math.floor(Math.random() * 400) + 200;
            q = `어떤 기호 ${sym}에 대하여\nㄱ${sym}ㄴ = ㄱ + ㄴ - ${sub}\n라고 할 때, ${n1}${sym}${n2}의 값을 구하세요.`;
            ans = (n1 + n2 - sub).toString();
            hint = "제시된 규칙에 따라 숫자들을 대입해 보세요.";
            exp = `[풀이 과정]\n1. 규칙: 첫 번째 수와 두 번째 수를 더한 뒤 ${sub}를 뺍니다.\n2. 식: ${n1} + ${n2} - ${sub}\n3. 계산: ${n1 + n2} - ${sub} = ${ans}\n따라서 정답은 ${ans}입니다.`;
        } else if (type === 'symbol-sum') {
            const s1 = getRandom(['★', '♥', '●']);
            const s2 = getRandom(['◆', '▲', '♣']);
            const v1 = Math.floor(Math.random() * 400) + 300;
            const add1 = Math.floor(Math.random() * 300) + 200;
            const sum1 = v1 + add1;
            const v2 = Math.floor(Math.random() * 200) + 50;
            const diff = v1 - v2;
            q = `${s1} + ${add1} = ${sum1},\n${s1} - ${s2} = ${diff}\n일 때, ${s1}과 ${s2}의 합을 구하세요.`;
            ans = (v1 + v2).toString();
            hint = "첫 번째 식에서 먼저 기호 하나의 값을 구해보세요.";
            exp = `[풀이 과정]\n1. ${s1} 구하기: ${sum1} - ${add1} = ${v1}\n2. ${s2} 구하기: ${v1} - ${s2} = ${diff} 에서, ${s2} = ${v1} - ${diff} = ${v2}\n3. 식: ${v1} + ${v2} = ${ans}\n따라서 정답은 ${ans}입니다.`;
        } else if (type === 'torn-paper') {
            const num1 = Math.floor(Math.random() * 400) + 500;
            const diff = Math.floor(Math.random() * 300) + 150;
            const num2 = num1 - diff;
            q = `세 자리 수가 적힌 종이 2장 중 한 장이\n찢어져서 일의 자리 숫자만 보입니다.\n두 수의 차가 ${diff}일 때,\n찢어진 종이에 적힌 세 자리 수를 구하세요.\n(보이는 종이: ${num1}, 찢어진 종이의 끝자리: ${num2 % 10})`;
            ans = num2.toString();
            hint = "두 수의 차를 이용하여 '큰 수 - 차' 또는 '작은 수 + 차'를 생각해보세요.";
            exp = `[풀이 과정]\n1. 보이는 수가 ${num1}이고 차이가 ${diff}입니다.\n2. 찢어진 수는 ${num1} - ${diff} = ${num2} 또는 ${num1} + ${diff} 중 하나입니다.\n3. 끝자리 숫자가 ${num2 % 10}인 경우를 찾으면 ${num2}입니다.`;
        } else if (type === 'mistake-calc') {
            const any = Math.floor(Math.random() * 400) + 300;
            const subVal = Math.floor(Math.random() * 200) + 100;
            const wrongResult = any + subVal;
            q = `어떤 수에서 ${subVal}를 빼야 할 것을\n잘못하여 더했더니 ${wrongResult}가 되었습니다.\n바르게 계산한 값을 구하세요.`;
            ans = (any - subVal).toString();
            hint = "잘못 계산한 식을 통해 먼저 '어떤 수'를 구해보세요.";
            exp = `[풀이 과정]\n1. 어떤 수(□) + ${subVal} = ${wrongResult}\n2. □ = ${wrongResult} - ${subVal} = ${any}\n3. 바른 계산: ${any} - ${subVal} = ${ans}\n따라서 정답은 ${ans}입니다.`;
        } else if (type === 'max-expr') {
            const ns = []; while(ns.length<3) { const n=Math.floor(Math.random()*700)+100; if(!ns.includes(n)) ns.push(n); }
            ns.sort((a,b)=>b-a);
            q = `주어진 수(${ns.join(', ')})를 모두 사용하여\n□ + □ - □\n의 결과가 가장 크게 될 때의 값을 구하세요.`;
            ans = (ns[0] + ns[1] - ns[2]).toString();
            hint = "가장 큰 수 두 개를 더하고, 가장 작은 수를 빼보세요.";
            exp = `[풀이 과정]\n1. 결과가 가장 크려면 큰 수들끼리 더해야 합니다.\n2. 식: ${ns[0]} + ${ns[1]} - ${ns[2]}\n3. 계산: ${ns[0] + ns[1]} - ${ns[2]} = ${ans}\n따라서 정답은 ${ans}입니다.`;
        } else if (type === 'card-digits-diff') {
            let ds = []; while(ds.length<5) { let d=Math.floor(Math.random()*10); if(!ds.includes(d)) ds.push(d); }
            let res = [];
            for(let i=0;i<5;i++) { if(ds[i]===0)continue; for(let j=0;j<5;j++) { if(i===j)continue; for(let k=0;k<5;k++) { if(k===i||k===j)continue; res.push(ds[i]*100+ds[j]*10+ds[k]); } } }
            res.sort((a,b)=>a-b);
            const large = res[res.length-1], small2 = res[1];
            q = `수 카드(${ds.join(',')}) 중 3장을 뽑아 만든\n세 자리 수 중 가장 큰 수와\n두 번째로 작은 수의 차를 구하세요.`;
            ans = (large - small2).toString();
            hint = "어떤 수들이 만들어지는지 앞자리 숫자부터 차례로 생각해보세요.";
            exp = `[풀이 과정]\n1. 가장 큰 수: 9, 7, 0... 처럼 큰 숫자를 백의 자리에 배치해 찾습니다. (${large})\n2. 가장 작은 수는 백의 자리가 0이 될 수 없음을 주의하며 찾습니다. 0을 십의 자리에 넣으면 작아집니다.\n3. 차이: ${large} - ${small2} = ${ans}`;
        } else if (type === 'inequality-max') {
            const n1 = Math.floor(Math.random()*400)+500;
            const n2 = Math.floor(Math.random()*200)+100, n3 = Math.floor(Math.random()*200)+100;
            const limit = n1 - (n2 + n3);
            q = `${n1} - □ > ${n2} + ${n3}\n을 만족하는 가장 큰 자연수 □를 구하세요.`;
            ans = (limit - 1).toString();
            hint = "오른쪽 식의 합을 먼저 구한 뒤, □가 얼마보다 작아야 하는지 생각해보세요.";
            exp = `[풀이 과정]\n1. 우변 계산: ${n2} + ${n3} = ${n2 + n3}\n2. 식 정리: ${n1} - □ > ${n2 + n3} 이므로, □ < ${n1} - ${n2 + n3} = ${limit}\n3. □는 ${limit}보다 작아야 하므로 최댓값은 ${ans}입니다.`;
        } else if (type === 'approx-target-sum') {
            const base = Math.floor(Math.random()*300)+100;
            const target = base > 500 ? 1000 : 800;
            const diff = target - base;
            let bestVal = -1, minGap = 9999;
            for(let h=1;h<=9;h++) { for(let du=0;du<=9;du++) { let v = h*100+du*11; let gap=Math.abs(diff-v); if(gap<minGap){minGap=gap; bestVal=v;} } }
            q = `□는 십의 자리와 일의 자리가 같은 세 자리 수입니다.\n${base} + □ 가 ${target}에\n가장 가깝게 될 때 □를 구하세요.`;
            ans = bestVal.toString();
            hint = "먼저 target에서 base를 뺀 값을 구하고, 그 값에 가장 가까운 'XXY' 형태의 수를 찾아보세요.";
            exp = `[풀이 과정]\n1. 목표 차이: ${target} - ${base} = ${diff}\n2. 조건: 십의 자리와 일의 자리가 같은 세 자리 수 중 ${diff}에 가장 가까운 수를 찾습니다.\n3. 결과: ${bestVal}입니다.`;
        } else if (type === 'system-sub-add') {
            const v2 = Math.floor(Math.random()*200)+150;
            const diff = Math.floor(Math.random()*150)+100;
            const v1 = v2 + diff, sum = v1 + v2;
            const useNames = Math.random() > 0.5;
            if (useNames) {
                const item1 = getRandom(['야구공','축구공','농구공']), item2 = '탁구공';
                q = `${item1}은 ${item2}보다 ${diff}개 더 많고\n합계는 ${sum}개입니다.\n각각 몇 개씩인가요?\n(정답 예: 400, 264)`;
                ans = `${v1},${v2}`;
                hint = "합계에서 차이를 빼면 똑같은 구슬 두 묶음이 된다고 생각해보세요.";
                exp = `[풀이 과정]\n1. 차이 제거: ${sum} - ${diff} = ${sum - diff}\n2. 나누기: ${sum - diff} ÷ 2 = ${v2} (작은 쪽인 ${item2})\n3. 큰 쪽 구하기: ${v2} + ${diff} = ${v1} (큰 쪽인 ${item1})\n따라서 ${v1}, ${v2}입니다.`;
            } else {
                q = `나 = 가 - ${diff},\n가 + 나 = ${sum}\n일 때 가와 나의 값을 구하세요.\n(정답 예: 400, 257)`;
                ans = `${v1},${v2}`;
                hint = "나를 (가 - ${diff})로 생각해서 합계 식에 넣어보세요.";
                exp = `[풀이 과정]\n1. 대입식: 가 + (가 - ${diff}) = ${sum}\n2. 정리: 2 × 가 = ${sum} + ${diff} = ${sum + diff}\n3. 계산: 가 = ${v1}, 나 = ${v1} - ${diff} = ${v2}\n따라서 가=${v1}, 나=${v2}입니다.`;
            }
        } else if (type === 'division-cut') {
            const cuts = Math.floor(Math.random() * 5) + 3;
            const perPiece = Math.floor(Math.random() * 15) + 10;
            const totalLen = cuts * perPiece + perPiece;
            q = `길이가 ${totalLen}cm인 긴 밧줄을 똑같은 길이로\n${cuts}번 잘랐습니다. 잘린 밧줄 한 도막의 길이는\n몇 cm가 될까요?`;
            ans = perPiece.toString();
            hint = "밧줄을 자르면 생기는 도막의 수는 자른 횟수보다 1 많아요.";
            exp = `[풀이 과정]\n1. 자른 횟수가 ${cuts}번이면 생기는 도막은 ${cuts} + 1 = ${cuts + 1}개입니다.\n2. 식: ${totalLen} ÷ ${cuts + 1} = ${perPiece}\n따라서 한 도막의 길이는 ${perPiece}cm입니다.`;
        } else if (type === 'length-overlap') {
            const stripLen = Math.floor(Math.random() * 10) + 20;
            const overlap = Math.floor(Math.random() * 5) + 3;
            const count = 3;
            q = `길이가 ${stripLen}cm인 종이 띠 ${count}장을\n${overlap}cm씩 겹쳐서 길게 이어 붙였습니다.\n이어 붙인 종이 띠 전체의 길이는 몇 cm인가요?`;
            ans = (stripLen * count - overlap * (count - 1)).toString();
            hint = "겹친 부분(풀칠한 부분)은 몇 군데인지 생각해보세요.";
            exp = `[풀이 과정]\n1. 종이 띠 ${count}장을 이으면 겹치는 부분은 ${count - 1}군데입니다.\n2. 식: (${stripLen} × ${count}) - (${overlap} × ${count - 1})\n3. 계산: ${stripLen * count} - ${overlap * (count - 1)} = ${ans}\n따라서 전체 길이는 ${ans}cm입니다.`;
        } else if (type === 'multiplication-puzzle') {
            const digit = Math.floor(Math.random() * 7) + 2;
            const multiplier = getRandom([3, 4, 6, 7, 8, 9]);
            const result = (digit * 10 + 6) * multiplier;
            q = `□ 6 × ${multiplier} = ${result}\n일 때, □ 안에 들어갈 숫자를 구하세요.`;
            ans = digit.toString();
            hint = "결과값(${result})을 ${multiplier}로 나누어 보거나 수의 범위를 생각해보세요.";
            exp = `[풀이 과정]\n1. □6 = ${result} ÷ ${multiplier} = ${digit * 10 + 6}\n2. □자리에 있는 숫자는 ${digit}입니다.`;
        } else if (type === 'time-spent') {
            const startH = 9, startM = 30;
            const endH = 1, endM = Math.floor(Math.random() * 40) + 10;
            const totalMin = (endH + 12) * 60 + endM - (startH * 60 + startM);
            const resH = Math.floor(totalMin / 60), resM = totalMin % 60;
            q = `오전 ${startH}시 ${startM}분에 시작한 공부가\n오후 ${endH}시 ${endM}분에 끝났습니다.\n공부를 한 시간은 몇 시간 몇 분인가요?\n(정답 예: 3, 45)`;
            ans = `${resH},${resM}`;
            hint = "오후 1시는 13시로 생각해서 빼면 계산이 쉬워요.";
            exp = `[풀이 과정]\n1. 오후 ${endH}시 ${endM}분은 13시 ${endM}분입니다.\n2. 시는 시끼리, 분은 분끼리 뺍니다.\n3. 결과: ${resH}시간 ${resM}분입니다.`;
        } else if (type === 'shape-sides') {
            const sides = 3;
            const len = Math.floor(Math.random() * 10) + 8;
            q = `한 변의 길이가 ${len}cm인 정삼각형 ${getRandom([2, 3, 4])}개를\n겹치지 않게 이어 붙여 만든 도형의 모든 변의 합을 구하세요.\n(이어 붙인 그림이 있다고 생각할 때, 밖으로 드러난 변만 셉니다)`;
            // This is a bit too abstract without a drawing, let's simplify to sum of sides of one shape
            const count = getRandom([3, 4, 5]);
            q = `모든 변의 길이가 같은 정${count}각형이 있습니다.\n한 변의 길이가 ${len}cm일 때, 이 도형의 모든 변의 길이의 합은 몇 cm인가요?`;
            ans = (len * count).toString();
            hint = "정${count}각형은 변이 ${count}개이고 길이는 모두 같아요.";
            exp = `[풀이 과정]\n1. 정${count}각형의 변의 수는 ${count}개입니다.\n2. 식: ${len} × ${count} = ${len * count}\n따라서 합계는 ${ans}cm입니다.`;
        } else if (type === 'advanced-divide-check') {
            const divisor = Math.floor(Math.random() * 5) + 5;
            const quotient = Math.floor(Math.random() * 6) + 7;
            const remainder = Math.floor(Math.random() * (divisor - 1)) + 1;
            const num = divisor * quotient + remainder;
            q = `어떤 수를 ${divisor}로 나누었더니 몫이 ${quotient}이고 나머지가 ${remainder}였습니다. 어떤 수는 얼마인가요?`;
            ans = num.toString();
            hint = "검산식(나누는 수 × 몫 + 나머지)을 이용해 보세요.";
            exp = `[풀이 과정]\n1. 식: ${divisor} × ${quotient} + ${remainder}\n2. 계산: ${divisor * quotient} + ${remainder} = ${ans}\n따라서 정답은 ${ans}입니다.`;
        } else if (type === 'advanced-fraction-sum') {
            const denom = 7;
            const n1 = 2, n2 = 3;
            q = `전체를 7로 똑같이 나눈 것 중 ${n1}만큼과 ${n2}만큼을 더하면 전체의 얼마가 되나요? (분수로 답하세요)`;
            ans = `${n1 + n2}/${denom}`;
            hint = "분모는 그대로 두고 분자끼리 더해 보세요.";
            exp = `[풀이 과정]\n1. 식: ${n1}/${denom} + ${n2}/${denom} = ${ans}\n따라서 정답은 ${ans}입니다.`;
        } else if (type === 'advanced-weight-logic') {
            const base = 2000;
            const g1 = 400, g2 = 800;
            q = `무게가 2kg인 빈 상자에 ${g1}g짜리 물건과 ${g2}g짜리 물건을 넣었습니다. 상자 전체의 무게는 몇 g인가요?`;
            ans = (base + g1 + g2).toString();
            hint = "2kg을 2000g으로 바꾸어 계산해 보세요.";
            exp = `[풀이 과정]\n1. 2kg = 2000g\n2. 식: 2000 + ${g1} + ${g2} = ${ans}\n따라서 정답은 ${ans}g입니다.`;
        } else {
            const kg = Math.floor(Math.random()*3)+1, g = Math.floor(Math.random()*800)+100, addG = Math.floor(Math.random()*500)+100;
            q = `무게가 ${kg}kg ${g}g인 물건과\n${addG}g인 물건의 전체 무게는 몇 g인가요?`;
            ans = (kg*1000+g+addG).toString();
            hint = "kg을 g으로 바꾸어 단위를 통일한 뒤 더해보세요.";
            exp = `[풀이 과정]\n1. 단위 변환: ${kg}kg ${g}g = ${kg*1000+g}g\n2. 식: ${kg*1000+g} + ${addG} = ${ans}\n따라서 합계는 ${ans}g입니다.`;
        }
    } else if (gradeNum === 4) {
        const basicTypes = ['angle-sum-puzzle'];
        const advancedTypes = ['large-num-condition', 'fraction-add-sub-card', 'decimal-add-sub-puzzle', 'clock-hand-angle', 'polygon-angle-logic'];
        
        let targetTypes;
        if (difficulty === 'basic') targetTypes = basicTypes;
        else if (difficulty === 'advanced') targetTypes = advancedTypes;
        else targetTypes = [...basicTypes, ...advancedTypes];

        const type = getRandom(targetTypes);

        if (type === 'large-num-condition') {
            const count = 5;
            let cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5).slice(0, count);
            cards.sort((a,b) => b-a);
            const maxVal = parseInt(cards.join(''));
            cards.sort((a,b) => a-b);
            if(cards[0] === 0) { [cards[0], cards[1]] = [cards[1], cards[0]]; }
            const minVal = parseInt(cards.join(''));
            q = `숫자 카드 (${cards.sort().join(', ')})를 한 번씩만 사용하여 만들 수 있는 가장 큰 ${count}자리 수와 가장 작은 ${count}자리 수의 합은 얼마인가요?`;
            ans = (maxVal + minVal).toString();
            exp = `가장 큰 수: ${maxVal}\n가장 작은 수: ${minVal}\n두 수의 합: ${maxVal} + ${minVal} = ${ans}`;
        } else if (type === 'angle-sum-puzzle') {
            const a1 = Math.floor(Math.random() * 30) + 30;
            const a2 = Math.floor(Math.random() * 30) + 60;
            const sum = a1 + a2;
            q = `삼각형의 두 각이 각각 ${a1}도, ${a2}도일 때, 나머지 한 각은 몇 도인가요?`;
            ans = (180 - sum).toString();
            exp = `삼각형의 세 각의 합은 180도입니다. 180 - (${a1} + ${a2}) = ${ans}도입니다.`;
        } else if (type === 'fraction-add-sub-card') {
            const denom = 9;
            const n1 = 2, n2 = 5;
            q = `분모가 ${denom}인 진분수 중에서 ${n1}/${denom}보다 크고 ${n2}/${denom}보다 작은 분수는 모두 몇 개인가요?`;
            ans = (n2 - n1 - 1).toString();
            exp = `${n1+1}/${denom}, ..., ${n2-1}/${denom} 이므로 정답은 ${ans}개입니다.`;
        } else if (type === 'decimal-add-sub-puzzle') {
            const d1 = (Math.random() * 2 + 1).toFixed(2);
            const d2 = (Math.random() * 1 + 0.5).toFixed(2);
            q = `어떤 수에 ${d1}을 더했더니 ${d2}가 되어야 하는데 잘못하여 뺐더니 결과가 0.45가 되었습니다. 바르게 계산하면 얼마인가요?`;
            const any = parseFloat(d1) + 0.45;
            ans = (any + parseFloat(d1)).toFixed(2);
            exp = `어떤 수는 0.45 + ${d1} = ${any}입니다. 바른 계산은 ${any} + ${d1} = ${ans}입니다.`;
        } else if (type === 'clock-hand-angle') {
            const h = getRandom([3, 4, 9]);
            const m = 0;
            q = `${h}시 정각에 시침과 분침이 이루는 각도 중 작은 쪽은 몇 도인가요?`;
            ans = (h * 30).toString();
            exp = `시계의 숫자 한 칸(5분)마다 30도입니다. ${h}시이므로 30 * ${h} = ${ans}도입니다.`;
        } else if (type === 'polygon-angle-logic') {
            const n = getRandom([4, 5, 6]);
            q = `삼각형 ${n - 2}개로 나눌 수 있는 다각형의 모든 내각의 합은 몇 도인가요? (이 다각형은 ${n}각형입니다)`;
            ans = ((n - 2) * 180).toString();
            exp = `삼각형 하나의 내각의 합은 180도입니다. ${n-2}개의 삼각형이므로 180 * ${n-2} = ${ans}도입니다.`;
        }
    } else if (gradeNum === 5) {
        const basicTypes = ['shape-area-logic', 'mixed-calc-puzzle'];
        const advancedTypes = ['advanced-lcm-gcd', 'fraction-add-sub-diff', 'average-inference'];

        let targetTypes;
        if (difficulty === 'basic') targetTypes = basicTypes;
        else if (difficulty === 'advanced') targetTypes = advancedTypes;
        else targetTypes = [...basicTypes, ...advancedTypes];

        const type = getRandom(targetTypes);

        if (type === 'advanced-lcm-gcd') {
            const n1 = getRandom([6, 8, 12, 15]);
            const n2 = getRandom([10, 20]);
            // Simplified LCM for classroom example
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const lcm = (n1 * n2) / gcd(n1, n2);
            q = `어떤 버스 정류장에서 1번 버스는 ${n1}분마다, 2번 버스는 ${n2}분마다 출발합니다. 두 버스가 오전 8시에 동시에 출발했다면, 다음번에 두 버스가 다시 동시에 출발하는 시각은 몇 시 몇 분인가요?`;
            const hours = 8 + Math.floor(lcm / 60);
            const mins = lcm % 60;
            ans = `${hours}시 ${mins}분`;
            exp = `${n1}과 ${n2}의 최소공배수인 ${lcm}분 후에 동시에 출발합니다. 8시 + ${lcm}분 = ${ans}입니다.`;
        } else if (type === 'mixed-calc-puzzle') {
            const v1 = Math.floor(Math.random() * 20) + 10;
            const v2 = Math.floor(Math.random() * 10) + 5;
            const v3 = 2;
            const result = (v1 + v2) * v3;
            q = `( ${v1} + ( ) ) × ${v3} = ${result} 입니다. ( ) 안에 알맞은 수를 구하세요.`;
            ans = v2.toString();
            exp = `거꾸로 계산하면 ${result} ÷ ${v3} - ${v1} = ${v2}입니다.`;
        } else if (type === 'fraction-add-sub-diff') {
            q = `어떤 수에서 1/2을 뺐더니 1/3이 되었습니다. 어떤 수에서 1/4을 더하면 얼마인가요?(분수로 답하세요)`;
            // (1/3 + 1/2) = 5/6. 5/6 + 1/4 = 10/12 + 3/12 = 13/12
            ans = `13/12`;
            exp = `어떤 수는 1/3 + 1/2 = 5/6입니다. 5/6 + 1/4 = 10/12 + 3/12 = 13/12입니다.`;
        } else if (type === 'shape-area-logic') {
            const h = 8, b1 = 10, b2 = 6;
            q = `윗변이 ${b2}cm, 아랫변이 ${b1}cm, 높이가 ${h}cm인 사다리꼴의 넓이는 몇 cm²인가요?`;
            ans = ((b1 + b2) * h / 2).toString();
            exp = `(윗변 + 아랫변) × 높이 ÷ 2 = (${b1} + ${b2}) × ${h} ÷ 2 = ${ans}입니다.`;
        } else if (type === 'average-inference') {
            const s1 = 80, s2 = 90, s3 = 85;
            const target = 90;
            q = `국어 ${s1}점, 수학 ${s2}점, 영어 ${s3}점을 받았습니다. 네 과목의 평균 점수가 ${target}점이 되려면 사회 점수를 몇 점 받아야 하나요?`;
            ans = (target * 4 - (s1 + s2 + s3)).toString();
            exp = `네 과목의 총점은 ${target} × 4 = ${target * 4}점이어야 합니다. 현재 세 과목의 총점은 ${s1 + s2 + s3}점이므로 ${target * 4} - ${s1 + s2 + s3} = ${ans}점입니다.`;
        }
    } else if (gradeNum === 6) {
        const basicTypes = ['circle-area-combined', 'ratio-word-problem'];
        const advancedTypes = ['advanced-ratio-percent', 'ratio-distribution-logic', 'surface-area-logic'];

        let targetTypes;
        if (difficulty === 'basic') targetTypes = basicTypes;
        else if (difficulty === 'advanced') targetTypes = advancedTypes;
        else targetTypes = [...basicTypes, ...advancedTypes];

        const type = getRandom(targetTypes);

        if (type === 'advanced-ratio-percent') {
            const price = 20000;
            const rate = 15;
            q = `정가가 ${price}원인 옷을 ${rate}% 할인하여 팔고 있습니다. 이 옷의 할인된 가격은 얼마인가요?`;
            ans = (price * (100 - rate) / 100).toString();
            exp = `${price}원의 ${rate}%는 ${price * rate / 100}원입니다. ${price} - ${price * rate / 100} = ${ans}원입니다.`;
        } else if (type === 'ratio-distribution-logic') {
            const total = 1000;
            const r1 = 3, r2 = 2;
            q = `사탕 ${total}개를 형과 동생이 ${r1}:${r2}의 비율로 나누어로 가졌습니다. 형이 가진 사탕은 몇 개인가요?`;
            ans = (total * r1 / (r1 + r2)).toString();
            exp = `전체를 ${r1}+${r2}=${r1+r2}로 나눈 것 중 ${r1}만큼입니다. ${total} × (${r1}/${r1+r2}) = ${ans}입니다.`;
        } else if (type === 'circle-area-combined') {
            const r = 10;
            const pi = 3.14;
            q = `반지름이 ${r}cm인 원의 넓이는 몇 cm²인가요? (원주율: ${pi})`;
            ans = (r * r * pi).toString();
            exp = `반지름 × 반지름 × 원주율 = ${r} × ${r} × ${pi} = ${ans}입니다.`;
        } else if (type === 'surface-area-logic') {
            const a = 5, b = 4, c = 3;
            q = `가로 ${a}cm, 세로 ${b}cm, 높이 ${c}cm인 직육면체의 겉넓이는 몇 cm²인가요?`;
            ans = (2 * (a * b + b * c + c * a)).toString();
            exp = `(밑면 + 옆면 2개 + 앞면 2개) = 2 × (${a}×${b} + ${b}×${c} + ${c}×${a}) = ${ans}입니다.`;
        } else if (type === 'ratio-word-problem') {
            const total = 30;
            const girls = 12;
            q = `우리 반 학생 30명 중 여학생이 12명입니다. 우리 반 남학생 수에 대한 여학생 수의 비를 구하세요. (정답 예 : 12:18)`;
            const boys = total - girls;
            ans = `${girls}:${boys}`;
            exp = `남학생은 30 - 12 = 18명이므로 비는 ${girls}:${boys}입니다.`;
        }
    } else {
        q = `${gradeNum}학년 문장제 문제를 생성 중입니다.`;
        ans = "0"; exp = "점검 중";
    }

    return { q, ans, exp, hint };
};
