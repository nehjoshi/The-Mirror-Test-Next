import Image from 'next/image';
import styles from './Card.module.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';
import Link from 'next/link';

const Card = ({ name, image, height, width, desc, link, noOfQuestions, percent }) => {
    return (
        <div className={styles.container} id={name}>
            <h1 className={styles.title}>{name}</h1>
            <hr className={styles.divider}/>
            <Image src={image} height={height} width={width} layout='intrinsic'/>
            <p className={styles.desc}>{desc}</p>
            <Link href={link} className={styles.btn}>Start</Link>
            <span className={styles.noOfQuestions}>{noOfQuestions} questions</span>
            <CircularProgressWithLabel className={styles.progress} percent={percent} />
        </div>
    )
}

export default Card