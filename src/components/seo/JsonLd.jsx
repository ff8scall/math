import React from 'react';
import { Helmet } from 'react-helmet-async';

export const JsonLd = ({ data }) => {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(data)}
            </script>
        </Helmet>
    );
};

export const generateCourseSchema = (name, description, provider = "매쓰 펫토리") => {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": name,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": provider,
            "sameAs": "https://math.lego-sia.com"
        }
    };
};

export const generateQuizSchema = (name, questions) => {
    return {
        "@context": "https://schema.org/",
        "@type": "Quiz",
        "name": name,
        "hasPart": questions.map(q => ({
            "@type": "Question",
            "educationalLevel": "primary school",
            "text": q.text,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
            }
        }))
    };
};

// "HowTo" schema is great for "How to solve addition" articles
export const generateHowToSchema = (name, stepList) => {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "step": stepList.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.text,
            // "image": step.image // visual guide image url
        }))
    };
};

/**
 * Generates BreadcrumbList schema to show the path to the page
 * @param {Array} items - List of { name, item (url) }
 */
export const generateBreadcrumbSchema = (items) => {
    const DOMAIN = "https://math.lego-sia.com";
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item.startsWith('http') ? item.item : `${DOMAIN}${item.item}`
        }))
    };
};
