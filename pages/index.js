import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home(props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <span>moneyTracker</span>
                </h1>
                <img src='/coin.png' className={styles.coinimage}></img>
            </main>

            <footer className={styles.footer} fluid>
                <p>mnyTracker &copy; All Rights Reserved</p>
            </footer>
        </div>
    )
}
