import React, {useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../UserContext';
import styles from '../styles/main.module.css';

export default function NavBar(){
    const {user} = useContext(UserContext)
    return(
        <Navbar bg="light" expand="lg">
            <Link href='/'>
                <a className="navbar-brand">
                    <h4 className={styles.blue}>[coin]</h4>
                </a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav varian='tabs' className="mr-auto">
                    {
                        user.id !== null
                        ?
                        <React.Fragment>
                            <Link href="/">
                                <a className="nav-link" role="button">Home</a>
                            </Link>
                            <Link href="/categories/">
                                <a className="nav-link" role="button">Categories</a>
                            </Link>
                            <Link href="/records/">
                                <a className="nav-link" role="button">Records</a>
                            </Link>
                            <Link href="/">
                                <a className="nav-link" role="button">Monthly Expense</a>
                            </Link> 
                            <Link href="/logout/">
                                <a className="nav-link" role="button">Logout</a>
                            </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <Link href="/login/">
                            <a className="nav-link" role="button">Login</a>
                        </Link>
                        <Link href="/register/">
                            <a className="nav-link" role="button">Register</a>
                        </Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}