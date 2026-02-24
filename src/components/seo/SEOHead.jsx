import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, keywords, image, canonicalPath }) => {
  const DOMAIN = "https://free-math.vercel.app";
  const baseTitle = "매쓰 펫토리 | 초등 전학년 수학 원리 & 펫 키우기";
  const finalTitle = title ? `${title} - 매쓰 펫토리` : baseTitle;
  const finalDesc = description || "초등학교 1학년부터 6학년까지, 공식 암기가 아닌 원리로 배우는 수학 학습 플랫폼 매쓰 펫토리! 나만의 펫을 키우고 방을 꾸미며 즐겁게 수학 실력을 키워보세요.";
  const finalKeywords = keywords ? `${keywords}, 매쓰펫토리, 초등수학, 전학년수학, 수학원리, 펫키우기` : "매쓰펫토리, 초등수학, 전학년수학, 수학원리, 1학년수학, 2학년수학, 3학년수학, 4학년수학, 5학년수학, 6학년수학, 덧셈, 뺄셈, 곱셈, 나눗셈, 분수, 소수, 도형, 각도, 측정, 그래프, 학습지무료";
  const finalImage = image ? `${DOMAIN}${image}` : `${DOMAIN}/og-image.png`;
  const finalCanonical = canonicalPath ? `${DOMAIN}${canonicalPath}` : `${DOMAIN}${window.location.pathname}`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
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
