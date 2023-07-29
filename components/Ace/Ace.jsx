"use client";
import { useState } from "react";
import styles from "./Ace.module.css";
const Ace = ({ qno, question, SubmitResponse }) => {
  const [response, setResponse] = useState("");
  console.log("THe question is", question);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Question {qno}</h1>
      <p className={styles.text}>{question}</p>
      <div className={styles.btnWrapper}>
        <button
          className={`${styles.btn} ${response === "y" && styles.selected}`}
          onClick={() => setResponse("y")}>
          YES
        </button>
        <button
          className={`${styles.btn} ${response === "n" && styles.selected}`}
          onClick={() => setResponse("n")}>
          NO
        </button>
      </div>
      <button
        className={`${styles.next} ${!response && styles.disabled}`}
        onClick={() => SubmitResponse(response)}>
        NEXT
      </button>
    </div>
  )
}

export default Ace;