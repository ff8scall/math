import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, keywords }) => {
  const baseTitle = "FreeMath | 초등 전학년 수학 원리 탐험대";
  const finalTitle = title ? `${title} - FreeMath` : baseTitle;
  const finalDesc = description || "초등학교 1학년부터 6학년까지, 공식 암기가 아닌 원리로 배우는 전학년 수학 학습 플랫폼입니다. 인터랙티브 교구와 퀴즈, 무제한 학습지 출력을 만나보세요!";
  const finalKeywords = keywords ? `${keywords}, 초등수학, 전학년수학, 수학원리, 학습지출력` : "초등수학, 전학년수학, 수학원리, 1학년수학, 2학년수학, 3학년수학, 4학년수학, 5학년수학, 6학년수학, 덧셈, 뺄셈, 곱셈, 나눗셈, 분수, 소수, 도형, 각도, 측정, 그래프, 학습지무료";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={finalKeywords} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:type" content="website" />
      {/* Add more meta tags as needed */}
    </Helmet>
  );
};

export default SEOHead;
