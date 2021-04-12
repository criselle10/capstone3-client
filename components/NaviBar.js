import React, {useState, useEffect, useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Link from 'next/link';
// import UserContext to have access to our global user state in this component.

export default function NavBar(){

    return(
        <Navbar bg="light" expand="lg">
            <Link href='/'>
                <a className="navbar-brand">Budget-Tracker</a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/">
                        <a className="nav-link" role="button">Home</a>
                    </Link>
                    <Link href="/register">
                        <a className="nav-link" role="button">Register</a>
                    </Link>	
                    <Link href="/login">
                        <a className="nav-link" role="button">Login</a>
                    </Link>						
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}