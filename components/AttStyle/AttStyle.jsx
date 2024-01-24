import { useState } from 'react';
import styles from "./AttStyle.module.css";
import { MdDone } from 'react-icons/md';

const AttStyle = ({ qno, question, SubmitResponse }) => {
    const [response, setResponse] = useState('');
  return (
    <div className={styles.container}>
            <h1 className={styles.heading}>Question {qno}</h1>
            <p className={styles.text}>{question}</p>
            <div className={styles.btnWrapper}>
                <button
                    className={`${styles.btn} ${response === "3" && styles.selected}`}
                    onClick={() => setResponse("3")}>
                    Strongly Agree
                </button>
                <button
                    className={`${styles.btn} ${response === "2" && styles.selected}`}
                    onClick={() => setResponse("2")}>
                    Agree
                </button>
                <button
                    className={`${styles.btn} ${response === "1" && styles.selected}`}
                    onClick={() => setResponse("1")}>
                    Disagree
                </button>
                <button
                    className={`${styles.btn} ${response === "0" && styles.selected}`}
                    onClick={() => setResponse("0")}>
                    Strongly Disagree
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
};

export default AttStyle;
