import React from 'react';
import styles from './about.module.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function About(){
    return (
        <>
            <Jumbotron className={styles.about}>
                <div className={styles.title}>
                    <h1>MNY Tracker</h1>
                </div>

                <div>
                    <p>The MNY Tracker application is an income and expense tracker that you can use for tracking and monitoring your budget.</p>
                    <p>I built this application as my capstone project 3. Build</p>
                </div>
            </Jumbotron>
        </>
    )
}