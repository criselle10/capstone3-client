import React from 'react';
import styles from '../styles/main.module.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHighlighter } from '@fortawesome/free-solid-svg-icons';

export default function UserProfile() {
    return (
        <div>
            <h1 className={styles.grey}>HELLO FROM HOME!</h1>
            <FontAwesomeIcon icon={faHome} />
        </div>
    )
}
