import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoData } from '../../data/seoData';

const SEOHead = ({ title, description, keywords, image, canonicalPath }) => {
  const DOMAIN = "https://math.lego-sia.com";
  const location = useLocation();
  const currentPath = location.pathname;

  // Find matching SEO data from centralized data
  let routeData = seoData.find(item => item.path === currentPath) || {};

  // Auto-generation for unknown routes (e.g., newly added curriculum topics)
  if (!routeData.path) {
    const pathParts = currentPath.split('/').filter(p => p);
    if (pathParts[0] === 'grade' && pathParts[1]) {
      const grade = pathParts[1];
      const topic = pathParts[2] ? pathParts[2].replace(/-/g, ' ') : '';
      routeData = {
        title: `${grade}학년 수학 ${topic ? ': ' + topic : '커리큘럼'} - 매쓰 펫토리`,
        description: `${grade}학년 수학 ${topic || ''} 과정을 재미있게 배워보세요. 원리부터 심화 문제까지 아이들의 눈높이에 맞춘 교육 콘텐츠가 준비되어 있습니다.`
      };
    }
  }

  const baseTitle = "매쓰 펫토리 | 초등 전학년 수학 원리 & 펫 키우기";

  // Priority: Prop > Route Data > Default
  const finalTitle = title
    ? `${title} - 매쓰 펫토리`
    : (routeData.title || baseTitle);

  const finalDesc = description
    || routeData.description
    || "초등학교 1학년부터 6학년까지, 공식 암기가 아닌 원리로 배우는 수학 학습 플랫폼 매쓰 펫토리! 나만의 펫을 키우고 방을 꾸미며 즐겁게 수학 실력을 키워보세요.";

  const finalKeywords = keywords
    ? `${keywords}, 매쓰펫토리, 초등수학, 전학년수학, 수학원리, 펫키우기`
    : (routeData.keywords || "매쓰펫토리, 초등수학, 전학년수학, 수학원리, 1학년수학, 2학년수학, 3학년수학, 4학년수학, 5학년수학, 6학년수학, 덧셈, 뺄셈, 곱셈, 나눗셈, 분수, 소수, 도형, 각도, 측정, 그래프, 학습지무료");

  const finalImage = image ? `${DOMAIN}${image}` : `${DOMAIN}/og-image.png`;
  const finalCanonical = canonicalPath ? `${DOMAIN}${canonicalPath}` : `${DOMAIN}${currentPath}`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Robots Advanced Signals for better indexing */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:site_name" content="매쓰 펫토리" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default SEOHead;

