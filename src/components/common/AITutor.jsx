import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AITutor.module.css';

/**
 * AITutor Component
 * - 펫 이미지와 함께 말풍선 힌트를 제공
 * - 소크라테스식 질문(Socratic Hinting) 로직을 포함
 */
const AITutor = ({ isVisible, problem, petId = 'cat_01', type = 'hint' }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isVisible && problem) {
            // 실제 서비스에서는 여기서 API 호출을 할 수 있습니다.
            // 현재는 정해진 룰에 따른 힌트를 생성합니다.
            generateSocraticHint(problem);
        }
    }, [isVisible, problem]);

    const generateSocraticHint = (p) => {
        const { q, exp } = p;
        let hint = "";

        // 룰 기반 힌트 생성 예시
        if (q.includes('+')) {
            hint = "일의 자리 숫자들부터 차근차근 더해볼까? 10이 넘으면 어떻게 해야 했지?";
        } else if (q.includes('-')) {
            hint = "뺄 수 없을 때는 옆에 있는 십의 자리 친구한테 10을 빌려와보자!";
        } else if (q.includes('×')) {
            hint = "곱셈은 같은 수를 여러 번 더하는 거야. 예를 들어 2 × 3은 2를 3번 더하는 거지!";
        } else {
            hint = exp || "문제를 다시 천천히 읽어보자. 어떤 원리가 숨어있을까?";
        }

        setMessage(hint);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={styles.tutorContainer}
                >
                    <div className={styles.bubble}>
                        <p>{message}</p>
                        <div className={styles.tail}></div>
                    </div>
                    <div className={styles.petContainer}>
                        {/* 실제 서비스에서는 petId에 따른 이미지를 렌더링합니다. */}
                        <div className={styles.petPlaceholder}>🐾</div>
                        <div className={styles.petStatus}>AI 튜터</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AITutor;
