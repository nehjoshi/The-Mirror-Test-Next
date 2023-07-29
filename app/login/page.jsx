"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '@/utils/endpoints';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { getProviders, signIn, useSession } from 'next-auth/react';

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const setProvidersFunction = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    console.log(session)
    setProvidersFunction();
    if (sessionStorage.getItem('token') || session?.user?.token) router.push('/dashboard');
  }, [])

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const res = await fetch(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    const response = await res.json();
    if (response.token) {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem("_id", response._id);
      router.push('/dashboard');
    }
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
            <span className={styles.or}>OR</span>
            <div className={styles.googleBtn}>
              {providers && Object.values(providers).map(provider => (
                <>
                  <div className={styles.logoContainer}>
                    <Image
                      src="/googleLogo.png"
                      width={25}
                      height={25}
                      alt="Google logo"
                    />
                  </div>
                  <div
                    className={styles.text}
                    key={provider.name}
                    onClick={() => signIn(provider.id)}>Sign in with Google
                  </div>
                </>
              ))}

            </div>
            <span onClick={() => router.push('/register')} className={styles.register}>Don't have an account? Register.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login