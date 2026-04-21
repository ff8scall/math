
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seoData } from '../src/data/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Google Indexing API 연동 스크립트
 */

// 1. 설정
const DOMAIN = 'https://math.lego-sia.com';
const JSON_KEY_PATH = path.join(__dirname, '../google-indexing-key.json');
const urlList = seoData.map(route => `${DOMAIN}${route.path}`);

async function notifyGoogleIndexing() {
  console.log(`🚀 구글 인덱싱 API 호출 시작 (대상: ${urlList.length}개 URL)...`);

  // 키 파일 존재 여부 확인
  if (!fs.existsSync(JSON_KEY_PATH)) {
    console.error(`❌ 구글 인덱싱 키 파일을 찾을 수 없습니다: ${JSON_KEY_PATH}`);
    console.log('💡 서치콘솔에서 서비스 계정을 추가하고 키 파일을 다운로드했는지 확인해주세요.');
    return;
  }

  try {
    // 2. 인증 설정
    const auth = new google.auth.GoogleAuth({
      keyFile: JSON_KEY_PATH,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({
      version: 'v3',
      auth: client,
    });

    // 3. URL 순회 및 알림 전송
    for (const url of urlList) {
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ 구글 인덱싱 요청 성공: ${url} (상태: ${res.status})`);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            const error = err.response.data.error;
            console.error(`❌ 구글 인덱싱 실패 [${url}]: ${error.message}`);
            
            if (error.message.includes('quota') || error.status === 'RESOURCE_EXHAUSTED') {
                console.warn('⚠️ 할당량이 초과되었습니다. 나머지 요청을 중단합니다.');
                break;
            }
            
            if (error.message.includes('permission')) {
                console.error('💡 서비스 계정이 서치콘솔에 소유자로 등록되어 있는지 확인해주세요.');
                break;
            }
        } else {
            console.error(`❌ 알 수 없는 오류 발생 [${url}]:`, err.message);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('🏁 구글 인덱싱 API 작업이 완료되었습니다.');
  } catch (error) {
    console.error('❌ 구글 인덱싱 초기화 중 치명적 오류 발생:', error.message);
  }
}

notifyGoogleIndexing();
