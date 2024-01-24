"use client";
import { useState } from "react";
import styles from './BFT.module.css';
import { MdDone } from "react-icons/md";
const BFT = ({ qno, question, SubmitResponse }) => {
    const [response, setResponse] = useState("");
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Question {qno}</h1>
            <p className={styles.text}>{question}</p>
            <div className={styles.btnWrapper}>
                <button
                    className={`${styles.btn} ${response === "option_1" && styles.selected}`}
                    onClick={() => setResponse("option_1")}>
                    Disagree
                </button>
                <button
                    className={`${styles.btn} ${response === "option_2" && styles.selected}`}
                    onClick={() => setResponse("option_2")}>
                    Slightly Disagree
                </button>
                <button
                    className={`${styles.btn} ${response === "option_3" && styles.selected}`}
                    onClick={() => setResponse("option_3")}>
                    Neutral
                </button>
                <button
                    className={`${styles.btn} ${response === "option_4" && styles.selected}`}
                    onClick={() => setResponse("option_4")}>
                    Slightly Agree
                </button>
                <button
                    className={`${styles.btn} ${response === "option_5" && styles.selected}`}
                    onClick={() => setResponse("option_5")}>
                    Agree
                </button>
            </div>
            <button
                className={`${styles.next} ${!response && styles.disabled}`}
                onClick={() => SubmitResponse(response)}>
                NEXT
            </button>
            <span className={styles.notice}><MdDone />&nbsp;&nbsp;&nbsp;Your responses are being auto-saved.</span>
        </div>
    )
}

export default BFT;