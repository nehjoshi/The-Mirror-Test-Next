import Link from 'next/link';
import styles from './page.module.css';
import { Merriweather_Sans } from 'next/font/google';

const merriweather = Merriweather_Sans({subsets: ['latin'], weight: '700'})

const Home = () => {
  return (
    <section className={styles.container}>
        <h1 className={` ${styles.heading} ${merriweather.className}`}>The Mirror Test</h1>
        <p className={styles.subHeading}>A test that offers a reflection of who you really are.</p>
        <div className={styles.buttonContainer}>
            <Link href='/login'className={styles.button}>Start your journey</Link>
            <Link href='/about' className={styles.button}>Read More</Link>
        </div>
        <hr className={styles.hr}/>
    </section>
  )
}

export default Home;