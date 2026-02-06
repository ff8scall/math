
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
  { path: '/grade/1/game', changefreq: 'daily', priority: 0.9, title: '수학 레이스' },
  { path: '/grade/3/arithmetic', changefreq: 'weekly', priority: 0.9, title: '덧셈과 뺄셈' },
  { path: '/grade/3/subtraction', changefreq: 'weekly', priority: 0.9, title: '받아내림 뺄셈' },
  { path: '/grade/3/multiplication', changefreq: 'weekly', priority: 0.9, title: '곱셈 (구구단)' },
  { path: '/grade/3/division', changefreq: 'weekly', priority: 0.9, title: '나눗셈' },
  { path: '/grade/3/fraction', changefreq: 'weekly', priority: 0.9, title: '분수와 소수' },
  { path: '/grade/3/geometry', changefreq: 'weekly', priority: 0.8, title: '평면도형' },
  { path: '/grade/3/length', changefreq: 'weekly', priority: 0.8, title: '길이와 시간' },
  { path: '/grade/3/clock', changefreq: 'weekly', priority: 0.8, title: '시계 보기' },
  { path: '/grade/3/quiz', changefreq: 'daily', priority: 0.8, title: '무한 퀴즈' },
  { path: '/grade/3/worksheet', changefreq: 'weekly', priority: 0.8, title: '학습지 만들기' },
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
