# 🧠 MEMORY (단기 기억 저장소)

## 📌 현재 진행 상황
- **[2026-04-19]** IndexNow 및 SEO 정합성 검증 완료. 로컬 빌드 테스트 성공.
- 기술 스택 분석 완료: React + Vite + SEO 자동화 파이프라인.

## 🎯 단기 목표
- [x] 프로젝트 구조 스캔 및 분석
- [x] `.gravityBrain` 디렉토리 초기화
- [x] `SYSTEM_MAP.md` 및 `CORE_LOGIC.md` 작성 완료
- [x] IndexNow 연동 및 Sitemap 정합성 검증 완료 (120개 URL)
- [ ] 검증된 빌드 결과물 배포 진행

## 📝 최근 결정 사항
- 프로젝트 독립성 유지: `indexNow` 키를 제외한 외부 의존성 배제.
- SEO 자동화 강조: `scripts/generate-seo.js`를 통한 빌드 타임 sitemap/rss 생성 및 IndexNow 제출.
- 상태 관리 전략: `localStorage` + `Custom Event`를 통한 견고한 데이터 동기화 확인.
