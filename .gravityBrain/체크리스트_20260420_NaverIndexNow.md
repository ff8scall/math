# ✅ 체크리스트: Naver IndexNow API 연동

## 📌 개요
- **작업명**: Naver IndexNow API 연동 및 멀티 키 시스템 구축
- **담당**: Antigravity
- **시작일**: 2026-04-20

## 🛠️ 작업 단계

### 1. 환경 설정 및 키 생성
- [x] Naver용 고유 키 생성 (`7c007da9c90cef3f9485956806191b31`)
- [x] Bing용 기존 키 확인 (`bbd0d9a6843c450eb3e9d811a0fd504a`)

### 2. 자동화 스크립트 수정 (`scripts/generate-seo.js`)
- [x] 상단 설정 영역에 `NAVER_INDEXNOW_KEY` 상수 추가
- [x] `public/` 디렉토리에 두 개의 키 파일(`.txt`)을 각각 생성하도록 로직 수정
- [x] `robots.txt` 생성 로직에 Naver 키 파일 예외 처리 추가
- [x] `submitToIndexNow` 함수 수정:
    - [x] 엔드포인트별로 적절한 키를 매핑하여 전송하도록 로직 변경
    - [x] Naver 엔드포인트(`https://searchadvisor.naver.com/indexnow`) 추가

### 3. 시스템 문서 업데이트
- [x] `SYSTEM_MAP.md`에 Naver 연동 정보 및 키 기록
- [x] `MEMORY.md`에 완료 사항 기록

### 4. 검증 및 배포 준비
- [x] `npm run build` (또는 해당 스크립트 실행)를 통해 파일 생성 여부 확인
- [x] 콘솔 로그를 통해 Naver 제출 시 200 응답 확인
- [x] Git Commit 및 Push를 통한 운영 환경 배포 완료 (c8eb249)

---
## 📝 비고
- Naver는 루트 디렉토리에 키 파일이 있는 것을 추천함.
- `keyLocation` 옵션은 루트가 아닐 때만 사용.
