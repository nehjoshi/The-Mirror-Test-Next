"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { MdEmail } from 'react-icons/md';
import { FaUser, FaKey, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { ENDPOINTS } from '@/utils/endpoints';

const Register = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState("");

    const Submit = async () => {
        const res = await fetch(ENDPOINTS.REGISTER, {
            method: "POST",
            body: JSON.stringify({email, name, password})
        });
        const response = await res.json();
        console.log(response);
        if (response.token) sessionStorage.setItem("token", response.token);
    }


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
                            <input
                                type="text"
                                placeholder="Email"
                                className={styles.input}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <FaUser className={styles.icon} />
                            <input
                                type="text"
                                placeholder="Name"
                                className={styles.input}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <FaKey className={styles.icon} />
                            <input
                                type="password"
                                placeholder="Password"
                                className={styles.input}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <FaLock className={styles.icon} />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={styles.input}
                                onChange={e => setConfirm(e.target.value)}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                onClick={() => setChecked(prev => !prev)} />
                            <p>The Mirror Test collects data for generating your results and for research purposes. Your details are not sent to any third-party applications. By clicking submit, you consent to providing your data.</p>
                        </div>
                        <button
                            disabled={false}
                            className={styles.button}
                            onClick={Submit}>Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register