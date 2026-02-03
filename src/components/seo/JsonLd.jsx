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

export const generateCourseSchema = (name, description, provider = "수학 탐험대") => {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": name,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": provider,
            "sameAs": "https://freemath.example.com" // Replace with actual URL
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
