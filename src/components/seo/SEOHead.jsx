import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, keywords }) => {
  const baseTitle = "수학 탐험대 | 초등 3학년 수학 원리 학습";
  const finalTitle = title ? `${title} - 수학 탐험대` : baseTitle;
  const finalDesc = description || "초등학교 3학년을 위한 수학 원리 학습 및 문제 풀이 사이트입니다. 재미있는 시각화로 수학을 배워보세요!";
  const finalKeywords = keywords ? `${keywords}, 초등수학, 3학년수학, 수학원리` : "초등수학, 3학년수학, 수학원리, 덧셈, 뺄셈, 곱셈, 나눗셈, 분수";

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
