// 네 자리 수 (간단 버전)
import React, { useState } from 'react';
import Button from '../../common/Button';
import confetti from 'canvas-confetti';
import { updateCoins } from '../../../utils/storage/storageManager';
import styles from './FourDigitNumber.module.css';

const FourDigitNumber = () => {
    const [thousands, setThousands] = useState(3);
    const [hundreds, setHundreds] = useState(5);
    const [tens, setTens] = useState(2);
    const [ones, setOnes] = useState(7);
    const num = thousands * 1000 + hundreds * 100 + tens * 10 + ones;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>네 자리 수 🔢</h2>
            <div className={styles.numberDisplay}><span className={styles.bigNumber}>{num}</span></div>
            <div className={styles.placeValues}>
                <div className={styles.place}><div className={styles.label}>천</div><div className={styles.controls}><button onClick={() => setThousands(Math.max(1, thousands - 1))}>-</button><span>{thousands}</span><button onClick={() => setThousands(Math.min(9, thousands + 1))}>+</button></div></div>
                <div className={styles.place}><div className={styles.label}>백</div><div className={styles.controls}><button onClick={() => setHundreds(Math.max(0, hundreds - 1))}>-</button><span>{hundreds}</span><button onClick={() => setHundreds(Math.min(9, hundreds + 1))}>+</button></div></div>
                <div className={styles.place}><div className={styles.label}>십</div><div className={styles.controls}><button onClick={() => setTens(Math.max(0, tens - 1))}>-</button><span>{tens}</span><button onClick={() => setTens(Math.min(9, tens + 1))}>+</button></div></div>
                <div className={styles.place}><div className={styles.label}>일</div><div className={styles.controls}><button onClick={() => setOnes(Math.max(0, ones - 1))}>-</button><span>{ones}</span><button onClick={() => setOnes(Math.min(9, ones + 1))}>+</button></div></div>
            </div>
            <div className={styles.helpBox}><p>1000 = 천 1개 = 백 10개</p><p>{num} = {thousands}천 {hundreds}백 {tens}십 {ones}</p></div>
        </div>
    );
};

export default FourDigitNumber;
