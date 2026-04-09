
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seoData } from '../src/data/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const DOMAIN = 'https://math.lego-sia.com';

/**
 * Step 2: Lightweight Pre-rendering Script
 * This script runs after 'vite build'. It takes the built dist/index.html,
 * and for each route in seoData, it creates a subdirectory with its own index.html
 * containing the correct meta tags for crawlers.
 */
async function prerender() {
    console.log('🚀 Starting Lightweight Pre-rendering...');

    if (!fs.existsSync(INDEX_HTML_PATH)) {
        console.error('❌ dist/index.html not found. Please run "vite build" first.');
        return;
    }

    const template = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

    for (const route of seoData) {
        if (route.path === '/') continue; // Root is already handled by dist/index.html

        const routePath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
        const targetDir = path.join(DIST_DIR, routePath);
        const targetFile = path.join(targetDir, 'index.html');

        // Prepare metadata
        const title = route.title;
        const description = route.description;
        const keywords = route.keywords;
        const canonical = `${DOMAIN}${route.path}`;
        const image = `${DOMAIN}/og-image.png`;

        // Create directory
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Replace meta tags in the template
        // Using regex to find and replace the tags added in Step 1
        let html = template;

        // Title
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
        
        // Description
        html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
        
        // Keywords
        html = html.replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${keywords}" />`);

        // Open Graph
        html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
        html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`);
        html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`);
        html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`);
        
        // Twitter
        html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
        html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);

        // Canonical & Hreflang
        // We look for the link tags. Since they might be multiple, we replace them carefully.
        html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
        
        // Note: Special handling for hreflang could be added here if needed, 
        // but since they are the same for all pages (pointing to default/ko), it's mostly fine.

        fs.writeFileSync(targetFile, html);
        console.log(`✅ Pre-rendered: ${route.path}`);
    }

    console.log('🎉 Pre-rendering complete!');
}

prerender().catch(err => {
    console.error('❌ Pre-rendering failed:', err);
});
