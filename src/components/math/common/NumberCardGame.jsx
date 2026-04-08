import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../common/Button';
import { updateCoins } from '../../../utils/storage/storageManager';
import confetti from 'canvas-confetti';
import { JsonLd, generateCourseSchema } from '../../seo/JsonLd';
import styles from './NumberCardGame.module.css';

const NumberCardGame = () => {
    const [difficulty, setDifficulty] = useState(3); // 3-digit or 4-digit
    const [cards, setCards] = useState([]);
    const [slots, setSlots] = useState([]);
    const [condition, setCondition] = useState('');
    const [targetAnswer, setTargetAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const generateProblem = () => {
        // Generate random distinct digits
        let tempCards = [];
        while (tempCards.length < difficulty) {
            const digit = Math.floor(Math.random() * 10);
            if (!tempCards.includes(digit)) tempCards.push(digit);
        }
        
        // Ensure 0 is not the only card, actually it's fine as long as they can form a valid number
        
        const sorted = [...tempCards].sort((a,b) => a - b);
        const types = ['largest', 'smallest', 'second-largest'];
        const type = types[Math.floor(Math.random() * 3)];
        
        let answerStr = '';
        if (type === 'largest') {
            setCondition(`${difficulty}장의 카드를 한 번씩만 사용하여 만들 수 있는 가장 큰 수를 구하세요.`);
            answerStr = [...sorted].reverse().join('');
        } else if (type === 'smallest') {
            setCondition(`${difficulty}장의 카드를 한 번씩만 사용하여 만들 수 있는 가장 작은 수를 구하세요. (단, 첫 자리에 0이 올 수 없습니다.)`);
            let smallest = [...sorted];
            if (smallest[0] === 0) {
                // Swap 0 with the first non-zero digit
                const temp = smallest[0];
                smallest[0] = smallest[1];
                smallest[1] = temp;
            }
            answerStr = smallest.join('');
        } else {
            setCondition(`${difficulty}장의 카드를 한 번씩만 사용하여 만들 수 있는 두 번째로 큰 수를 구하세요.`);
            let largest = [...sorted].reverse(); // e.g., 9,7,5
            // swap last two
            const temp = largest[largest.length - 1];
            largest[largest.length - 1] = largest[largest.length - 2];
            largest[largest.length - 2] = temp;
            answerStr = largest.join('');
        }

        setCards(tempCards.map(val => ({ id: Math.random(), value: val, used: false })));
        setSlots(Array(difficulty).fill(null));
        setTargetAnswer(answerStr);
        setFeedback(null);
    };

    useEffect(() => {
        generateProblem();
    }, [difficulty]);

    const handleCardClick = (cardIndex) => {
        if (cards[cardIndex].used) return; // Already in slot

        const emptySlotIndex = slots.findIndex(s => s === null);
        if (emptySlotIndex !== -1) {
            const newSlots = [...slots];
            newSlots[emptySlotIndex] = { ...cards[cardIndex], originalIndex: cardIndex };
            setSlots(newSlots);

            const newCards = [...cards];
            newCards[cardIndex].used = true;
            setCards(newCards);
        }
    };

    const handleSlotClick = (slotIndex) => {
        if (slots[slotIndex] === null) return;

        const cardToReturn = slots[slotIndex];
        const newSlots = [...slots];
        newSlots[slotIndex] = null;
        setSlots(newSlots);

        const newCards = [...cards];
        newCards[cardToReturn.originalIndex].used = false;
        setCards(newCards);
    };

    const checkAnswer = () => {
        if (slots.includes(null)) {
            alert('모든 칸을 채워주세요!');
            return;
        }

        const userAnswer = slots.map(s => s.value).join('');
        
        // Edge case: number shouldn't start with 0 unless it's a 1 digit number which is impossible here
        if (slots[0].value === 0) {
            setFeedback('zero-start');
            return;
        }

        if (userAnswer === targetAnswer) {
            confetti();
            updateCoins(20);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>🃏 숫자 카드 추리 게임</h1>
                <p className={styles.subtitle}>주어진 숫자 카드를 조건에 맞게 배열해 최고/최저의 수를 찾아내세요!</p>
                <div className={styles.levelBtns}>
                    <Button onClick={() => setDifficulty(3)} variant={difficulty === 3 ? 'primary' : 'secondary'}>3자리 수 (초급)</Button>
                    <Button onClick={() => setDifficulty(4)} variant={difficulty === 4 ? 'primary' : 'secondary'}>4자리 수 (중급)</Button>
                </div>
            </header>

            <main className={styles.gameBoard}>
                <div className={styles.conditionBox}>
                    <span className={styles.badge}>Mission</span>
                    <p>{condition}</p>
                </div>

                <div className={styles.slotsArea}>
                    {slots.map((slot, index) => (
                        <div 
                            key={`slot-${index}`} 
                            className={`${styles.slot} ${slot ? styles.filled : ''}`}
                            onClick={() => handleSlotClick(index)}
                        >
                            {slot ? slot.value : '?'}
                        </div>
                    ))}
                </div>

                <div className={styles.cardsArea}>
                    {cards.map((card, index) => (
                        <motion.button
                            key={card.id}
                            className={`${styles.card} ${card.used ? styles.used : ''}`}
                            onClick={() => handleCardClick(index)}
                            whileHover={!card.used ? { y: -5, scale: 1.05 } : {}}
                            whileTap={!card.used ? { scale: 0.95 } : {}}
                        >
                            {card.value}
                        </motion.button>
                    ))}
                </div>

                <div className={styles.actionArea}>
                    <Button onClick={checkAnswer} size="large" variant="accent" fullWidth disabled={slots.includes(null) || feedback === 'correct'}>
                        정답 제출하기!
                    </Button>
                </div>

                <AnimatePresence>
                    {feedback === 'correct' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={styles.fbCorrect}>
                            🎉 완벽합니다! 조건에 딱 맞는 숫자예요! (+20 코인)
                            <Button onClick={generateProblem} style={{ marginTop: '10px' }}>다음 문제 도전 👉</Button>
                        </motion.div>
                    )}
                    {feedback === 'zero-start' && (
                        <motion.div initial={{ x: -10 }} animate={{ x: [0, -10, 10, 0] }} className={styles.fbError}>
                            앗! 가장 높은 자릿수에는 '0'이 올 수 없어요. 다시 배치해보세요!
                        </motion.div>
                    )}
                    {feedback === 'incorrect' && (
                        <motion.div initial={{ x: -10 }} animate={{ x: [0, -10, 10, 0] }} className={styles.fbError}>
                            아쉽지만 정답이 아니에요. 카드의 크기를 다시 한 번 비교해보세요. 🤔
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>

            <JsonLd data={generateCourseSchema("수의 크기 비교", "주어진 숫자를 조합하여 조건에 맞는 가장 크거나 작은 수를 만드는 논리력을 기릅니다.")} />
        </div>
    );
};

export default NumberCardGame;
