import styles from "./Ace.module.css";
const Ace = ({qno, question}) => {
    console.log("THe question is", question);
  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Question {qno}</h1>
        <p className={styles.text}>{question}</p>
    </div>
  )
}

export default Ace;