# 🧠 MEMORY (단기 기억 저장소)

## 📌 현재 진행 상황
- **[2026-04-19]** SEO 진단 결과 반영 완료: 메타 설명 보강 및 콘텐츠 볼륨 확장.
- **[2026-04-19]** IndexNow 403 이슈 분석 완료: 라이브 키 파일 확인 및 인증 대기 안내.

## 🎯 단기 목표
- [x] 프로젝트 구조 스캔 및 분석
- [x] `.gravityBrain` 디렉토리 초기화 및 시스템 문서 작성
- [x] IndexNow 연동 및 Sitemap 정합성 검증 완료
- [x] 메타 설명(Description) 길이 및 중복 문제 해결 (120/120 고유)
- [x] 주요 페이지 콘텐츠 볼륨 보강 (Curriculum, Home 상세 가이드 추가)
- [x] 최종 배포(Push) 및 자동화 파이프라인 가동 확인

## 📝 최근 결정 사항
- 프로젝트 독립성 유지: `indexNow` 키를 제외한 외부 의존성 배제.
- SEO 자동화 강조: `scripts/generate-seo.js`를 통한 빌드 타임 sitemap/rss 생성 및 IndexNow 제출.
- 상태 관리 전략: `localStorage` + `Custom Event`를 통한 견고한 데이터 동기화 확인.
