
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://free-math.vercel.app';
const SITE_TITLE = '매쓰 펫토리 (Math Petory) | 초등 수학 원리 & 펫 키우기';
const SITE_DESC = '초등학교 1학년부터 6학년까지, 공식 암기가 아닌 원리로 배우는 수학 학습 플랫폼 매쓰 펫토리! 나만의 펫을 키우고 방을 꾸미며 즐겁게 수학 실력을 키워보세요.';

const routes = [
  { path: '/', changefreq: 'daily', priority: 1.0, title: '홈 - 매쓰 펫토리' },
  { path: '/myroom', changefreq: 'weekly', priority: 0.8, title: '내 방 꾸미기' },
  { path: '/shop', changefreq: 'weekly', priority: 0.8, title: '매쓰 펫토리 상점' },

  // 1학년
  { path: '/grade/1/number-counting', changefreq: 'weekly', priority: 0.7, title: '1학년: 숫자 세기' },
  { path: '/grade/1/shapes', changefreq: 'weekly', priority: 0.7, title: '1학년: 모양 찾기' },
  { path: '/grade/1/arithmetic', changefreq: 'weekly', priority: 0.7, title: '1학년: 기초 덧셈과 뺄셈' },
  { path: '/grade/1/quiz', changefreq: 'daily', priority: 0.8, title: '1학년: 수학 퀴즈' },

  // 2학년
  { path: '/grade/2/three-digit', changefreq: 'weekly', priority: 0.7, title: '2학년: 세 자리 수' },
  { path: '/grade/2/shapes', changefreq: 'weekly', priority: 0.7, title: '2학년: 여러 가지 모양' },
  { path: '/grade/2/arithmetic', changefreq: 'weekly', priority: 0.7, title: '2학년: 여러 가지 계산' },
  { path: '/grade/2/multiplication', changefreq: 'weekly', priority: 0.7, title: '2학년: 곱셈' },
  { path: '/grade/2/quiz', changefreq: 'daily', priority: 0.8, title: '2학년: 수학 퀴즈' },

  // 3학년 (기존 유지 및 추가)
  { path: '/grade/3/arithmetic', changefreq: 'weekly', priority: 0.9, title: '3학년: 덧셈과 뺄셈' },
  { path: '/grade/3/subtraction', changefreq: 'weekly', priority: 0.9, title: '3학년: 받아내림 뺄셈' },
  { path: '/grade/3/multiplication', changefreq: 'weekly', priority: 0.9, title: '3학년: 곱셈 (구구단)' },
  { path: '/grade/3/division', changefreq: 'weekly', priority: 0.9, title: '3학년: 나눗셈' },
  { path: '/grade/3/fraction', changefreq: 'weekly', priority: 0.9, title: '3학년: 분수와 소수' },
  { path: '/grade/3/geometry', changefreq: 'weekly', priority: 0.8, title: '3학년: 평면도형' },
  { path: '/grade/3/quiz', changefreq: 'daily', priority: 0.8, title: '3학년: 무한 퀴즈' },

  // 4학년
  { path: '/grade/4/large-numbers', changefreq: 'weekly', priority: 0.7, title: '4학년: 큰 수' },
  { path: '/grade/4/angles', changefreq: 'weekly', priority: 0.7, title: '4학년: 각도' },
  { path: '/grade/4/arithmetic', changefreq: 'weekly', priority: 0.7, title: '4학년: 곱셈과 나눗셈' },
  { path: '/grade/4/fraction', changefreq: 'weekly', priority: 0.7, title: '4학년: 분수의 덧셈과 뺄셈' },
  { path: '/grade/4/quiz', changefreq: 'daily', priority: 0.8, title: '4학년: 수학 퀴즈' },

  // 5학년
  { path: '/grade/5/mixed-arithmetic', changefreq: 'weekly', priority: 0.7, title: '5학년: 혼합 계산' },
  { path: '/grade/5/factors-multiples', changefreq: 'weekly', priority: 0.7, title: '5학년: 약수와 배수' },
  { path: '/grade/5/fraction-arithmetic', changefreq: 'weekly', priority: 0.7, title: '5학년: 분수의 덧셈과 뺄셈' },
  { path: '/grade/5/quiz', changefreq: 'daily', priority: 0.8, title: '5학년: 수학 퀴즈' },

  // 6학년
  { path: '/grade/6/fraction-division', changefreq: 'weekly', priority: 0.7, title: '6학년: 분수의 나눗셈' },
  { path: '/grade/6/decimal-division', changefreq: 'weekly', priority: 0.7, title: '6학년: 소수의 나눗셈' },
  { path: '/grade/6/ratio', changefreq: 'weekly', priority: 0.7, title: '6학년: 비와 비율' },
  { path: '/grade/6/quiz', changefreq: 'daily', priority: 0.8, title: '6학년: 수학 퀴즈' },

  // 공통 게임
  { path: '/grade/1/game', changefreq: 'daily', priority: 0.9, title: '수학 레이스 (1학년)' },
  { path: '/grade/2/game', changefreq: 'daily', priority: 0.9, title: '수학 레이스 (2학년)' },
  { path: '/grade/3/game', changefreq: 'daily', priority: 0.9, title: '수학 레이스 (3학년)' },
];

const publicDir = path.join(__dirname, '../public');

// Ensure public dir exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`).join('')}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated');

// 2. Generate RSS Feed
const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${SITE_TITLE}</title>
  <link>${DOMAIN}</link>
  <description>${SITE_DESC}</description>
  <language>ko</language>
  ${routes.map(route => `
  <item>
    <title>${route.title}</title>
    <link>${DOMAIN}${route.path}</link>
    <description>${route.title} - ${SITE_DESC}</description>
    <pubDate>${new Date().toUTCString()}</pubDate>
  </item>
  `).join('')}
</channel>
</rss>`;

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
console.log('✅ rss.xml generated');

// 3. Generate Robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log('✅ robots.txt generated');

// 4. Generate 404.html (Copy of index.html for static hosting fallback)
try {
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  fs.writeFileSync(path.join(publicDir, '404.html'), indexHtml);
  console.log('✅ 404.html generated');
} catch (error) {
  console.error('❌ Failed to generate 404.html:', error.message);
}
