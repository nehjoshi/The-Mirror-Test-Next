import Image from 'next/image';
import styles from './page.module.css';
import { MdEmail } from 'react-icons/md';
import {FaUser} from 'react-icons/fa';

const Register = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.boxLeft}>
                    <p className={styles.heading}>Create a new account</p>
                    <div className={styles.imgContainer}>
                        <Image src="/emotions.png" alt="Register image" className={styles.img} fill={true} />
                    </div>
                    <div className={styles.footer}>
                        <p>Jivan Safalya | The Mirror Test</p>
                    </div>
                </div>
                <div className={styles.boxRight}>
                    <div className={styles.formContainer}>
                        <div className={styles.formItem}>
                            <MdEmail className={styles.icon} />
                            <input type="text" placeholder="Email" className={styles.input} />
                        </div>
                        <div className={styles.formItem}>
                            <FaUser className={styles.icon} />
                            <input type="text" placeholder="Email" className={styles.input} />
                        </div>
                        <div className={styles.formItem}>
                            {/* <MdOutlineEmail className={styles.icon} /> */}
                            <input type="text" placeholder="Email" className={styles.input} />
                        </div>
                        <div className={styles.formItem}>
                            {/* <MdOutlineEmail className={styles.icon} /> */}
                            <input type="text" placeholder="Email" className={styles.input} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register