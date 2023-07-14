import Image from 'next/image';
import styles from './page.module.css';

const Login = () => {
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
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
            />
            <button className={styles.btn}>Login</button>
            <span className={styles.forgot}>Forgot Password?</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login