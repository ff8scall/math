# 📋 체크리스트: 20260421_GoogleIndexing

## 🎯 목표
Google Indexing API를 프로젝트 배포 파이프라인에 통합하여 신규/수정된 콘텐츠의 Google 검색 반영 속도를 극대화한다.

---

## 1. 환경 구성 및 사전 준비
- [x] `googleapis` 패키지 설치 (`npm install googleapis`)
- [x] 서치콘솔 권한 확인 (서비스 계정 이메일 추가 여부)
- [x] JSON 키 파일 접근성 확인 및 프로젝트 루트 이동 (`google-indexing-key.json`)
- [x] `.gitignore` 설정으로 키 파일 유출 방지

## 2. API 연동 개발 (Node.js)
- [x] `scripts/google-indexing.js` 작성
    - [x] JWT 인증 로직 구현
    - [x] `seoData.js`의 URL 리스트 추출 및 요청 본문 작성
    - [x] 루프 요청 처리 및 오류 제어 (상대 경로 참조 최적화)

## 3. 파이프라인 통합
- [x] `package.json`의 `build` 스크립트 수정 (구글 인덱싱 호출 추가)
- [x] `index` 커스텀 스크립트 추가 (`npm run index`)

## 4. 검증 및 마무리
- [x] 로컬 실행 테스트 및 응답 로그 확인 (120개 URL 성공 확인)
- [x] `.gravityBrain/MEMORY.md`, `SYSTEM_MAP.md`, `CORE_LOGIC.md` 갱신

---

## 📅 진행 로그
- **2026-04-21**: `/start-task` 실행.
- **2026-04-21**: `googleapis` 설치 및 스크립트 구현.
- **2026-04-21**: 키 파일 이동 및 보안 설정(.gitignore) 완료.
- **2026-04-21**: 로컬 테스트 성공 및 시스템 문서 최신화 완료. (작업 종료)
