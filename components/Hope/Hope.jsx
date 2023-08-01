"use client";
import { useState } from "react";
import styles from "./Hope.module.css";
import { MdDone } from "react-icons/md";
const Hope = ({ qno, question, type, option1, option2, SubmitResponse }) => {
    const [response, setResponse] = useState("");
    console.log("THe question is", question);
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Question {qno}</h1>
            <p className={styles.text}>{question}</p>
            <div className={styles.btnWrapper}>
                <button
                    className={`${styles.btn} ${response === option1.value.toString() && styles.selected}`}
                    onClick={() => setResponse(option1.value.toString())}>
                    {option1.option}
                </button>
                <button
                    className={`${styles.btn} ${response === option2.value.toString() && styles.selected}`}
                    onClick={() => setResponse(option2.value.toString())}>
                    {option2.option}
                </button>
            </div>
            <button
                className={`${styles.next} ${!response && styles.disabled}`}
                onClick={() => SubmitResponse(type, response)}>
                NEXT
            </button>
            <span className={styles.notice}><MdDone />&nbsp;&nbsp;&nbsp;Your responses are being auto-saved.</span>
        </div>
    )
}

export default Hope;