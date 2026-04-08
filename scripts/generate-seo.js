
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { seoData } from '../src/data/seoData.js';

const DOMAIN = 'https://math.lego-sia.com';
const SITE_TITLE = '매쓰 펫토리 (Math Petory) | 초등 수학 원리 & 펫 키우기';
const SITE_DESC = '초등학교 1학년부터 6학년까지, 공식 암기가 아닌 원리로 배우는 수학 학습 플랫폼 매쓰 펫토리! 나만의 펫을 키우고 방을 꾸미며 즐겁게 수학 실력을 키워보세요.';

const routes = seoData;



const publicDir = path.join(__dirname, '../public');

// Ensure public dir exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 0. IndexNow Configuration
const INDEXNOW_KEY = '0efd7b4640e34f48b3761ae6215ac084';
const INDEXNOW_KEY_FILE = `${INDEXNOW_KEY}.txt`;
const INDEXNOW_KEY_LOCATION = `${DOMAIN}/${INDEXNOW_KEY_FILE}`;

// Generate IndexNow Key File in public root
fs.writeFileSync(path.join(publicDir, INDEXNOW_KEY_FILE), INDEXNOW_KEY);
console.log(`✅ IndexNow Key File (${INDEXNOW_KEY_FILE}) generated`);

// Helper to escape XML special characters
const escapeXml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

// 1. Generate Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${escapeXml(`${DOMAIN}${route.path}`)}</loc>
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
  <title>${escapeXml(SITE_TITLE)}</title>
  <link>${escapeXml(DOMAIN)}</link>
  <description>${escapeXml(SITE_DESC)}</description>
  <language>ko</language>
  ${routes.map(route => `
  <item>
    <title>${escapeXml(route.title)}</title>
    <link>${escapeXml(`${DOMAIN}${route.path}`)}</link>
    <description>${escapeXml(route.description || SITE_DESC)}</description>
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

// 5. Submit to IndexNow (Bing, Yandex, etc.)
const submitToIndexNow = async () => {
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  console.log(`🚀 Reading URLs from ${sitemapPath}...`);

  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ sitemap.xml not found!`);
    return;
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urlMatches = sitemapContent.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
  const urlList = Array.from(urlMatches).map(match => match[1]);

  if (urlList.length === 0) {
    console.error('❌ No URLs found in sitemap.xml');
    return;
  }

  const data = {
    host: new URL(DOMAIN).hostname,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urlList
  };

  console.log(`🚀 Host: ${data.host}`);
  console.log(`🚀 Key Location: ${data.keyLocation}`);
  console.log(`🚀 Submitting ${urlList.length} URLs to IndexNow...`);

  // Verify key file accessibility first
  try {
    const keyCheck = await fetch(data.keyLocation);
    if (!keyCheck.ok) {
      console.warn(`⚠️ Warning: Key file at ${data.keyLocation} returned status ${keyCheck.status}. Submission might fail.`);
    } else {
      const content = (await keyCheck.text()).trim();
      if (content !== INDEXNOW_KEY) {
        console.warn(`⚠️ Warning: Key file content mismatch! Found: "${content}", Expected: "${INDEXNOW_KEY}"`);
      } else {
        console.log(`✅ Key file verified at ${data.keyLocation}`);
      }
    }
  } catch (e) {
    console.warn(`⚠️ Warning: Could not verify key file: ${e.message}`);
  }

  const endpoints = [
    'https://www.bing.com/indexnow',
    'https://api.indexnow.org/indexnow'
  ];

  for (const endpoint of endpoints) {
    console.log(`📡 Sending to ${endpoint}...`);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log(`✅ IndexNow submission to ${new URL(endpoint).hostname} successful!`);
      } else {
        console.error(`❌ IndexNow submission to ${new URL(endpoint).hostname} failed with status: ${response.status}`);
        const text = await response.text();
        console.error('Response:', text);
      }
    } catch (error) {
      console.error(`❌ IndexNow submission to ${new URL(endpoint).hostname} error:`, error.message);
    }
  }
};

// Execute IndexNow submission
submitToIndexNow();
