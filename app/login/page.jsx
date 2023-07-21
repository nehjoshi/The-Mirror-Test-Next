"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import { ENDPOINTS } from '@/utils/endpoints';
import Loader from '@/components/Loader/Loader';
import {useRouter} from 'next/navigation';

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const res = await fetch(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({email, password})
    })
    const response = await res.json();
    if (response.token) router.push('/');
    else {
      setError(response.error);
    }
    console.log(response);
    setLoading(false);
  }
  

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.imgContainer}>
          <Image
            src="/login.png"
            alt="Login image"
            className={styles.img}
            fill={true}
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <h1 className={styles.title}>Login To Continue</h1>
            <input
              type="text"
              placeholder="Email"
              className={styles.input}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={e => setPassword(e.target.value)}
            />
            {loading && <Loader />}
            {!loading && <button className={styles.btn} onClick={handleLogin}>Login</button>}
            {error && <span className={styles.error}>{error}</span>}
            <span className={styles.forgot}>Forgot Password?</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login