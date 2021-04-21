import React, {useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../UserContext';
import styles from '../styles/main.module.css';

export default function NaviBar(){
    const {user} = useContext(UserContext)
    return(
        <>
            <nav className={styles.navbar}>
                <div className='navbar-container'>
                    <Link href='/' className={styles.h4}>
                            <h4 className={styles.coin}>[coin]</h4>
                    </Link>
                    {
                        user.id !== null
                        ?
                        <React.Fragment>
                            <Link href="/categories/">
                                <a className={styles.link} role="button">Categories</a>
                            </Link>
                            <Link href="/records/">
                                <a className={styles.link} role="button">Records</a>
                            </Link>
                            <Link href="/charts/monthly-expense">
                                <a className={styles.link} role="button">Monthly Expense</a>
                            </Link>
                            <Link href="/charts/monthly-income">
                                <a className={styles.link} role="button">Monthly Income</a>
                            </Link> 
                            <Link href="/logout/">
                                <a className={styles.link} role="button">Logout</a>
                            </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link href="/login/">
                                <a className={styles.link} role="button">Login</a>
                            </Link>
                            <Link href="/register/">
                                <a className={styles.link} role="button">Register</a>
                            </Link>
                        </React.Fragment>
                    }
                </div>
            </nav>
        </>
    )
}