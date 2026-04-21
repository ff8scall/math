# 📋 체크리스트: 20260421_Deployment

## 🎯 목표
현재 프로젝트의 최신 상태를 운영 환경(Vercel)에 배포하고, SEO 자동화 스크립트가 정상적으로 작동하는지 확인한다.

---

## 1. 사전 빌드 검증
- [ ] `npm run build` 실행
    - [ ] `generate-seo.js` (IndexNow, Sitemap, RSS 생성) 성공 확인
    - [ ] Vite 빌드 성공 확인
    - [ ] `post-build.js` 성공 확인

## 2. 형상 관리 및 푸시
- [ ] 변경 사항 스테이징 (`git add .`)
- [ ] 커밋 메시지 작성 (예: "docs: update memory and checklists for bing verification")
- [ ] GitHub 푸시 (`git push origin main`)

## 3. 배포 결과 확인
- [ ] Vercel 배포 대시보드 또는 사이트 접속을 통한 반영 확인
- [ ] `sitemap.xml`, `rss.xml` 등 SEO 파일 접근 가능 여부 확인

---

## 📅 진행 로그
- **2026-04-21**: 배포 태스크 시작. 사용자 승인 대기 중.
