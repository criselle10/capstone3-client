import React, { useContext } from "react"
import { Navbar, Nav } from "react-bootstrap"
import Link from "next/link"
import UserContext from "../UserContext"
import styles from "../styles/main.module.css"

export default function NaviBar() {
    const { user } = useContext(UserContext)
    return (
        <>
            <Navbar expand="lg">
            <Navbar.Brand href="/" ><h4 className={styles.coin}>[coin]</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="justify-content-end" style={{ width: "100%"}}>
                    {
                        user.id !== null
                        ?
                        <React.Fragment>
                            <Nav.Link href="/categories" className={styles.navigation}>Categories</Nav.Link>
                            <Nav.Link href="/records" className={styles.navigation}>Records</Nav.Link>
                            <Nav.Link href="/charts/monthly-expense" className={styles.navigation}>Monthly Expense</Nav.Link>
                            <Nav.Link href="/charts/monthly-income" className={styles.navigation}>Monthly Income</Nav.Link>
                            <Nav.Link href="/logout" className={styles.navigation}>Log Out</Nav.Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Nav.Link href="/login" className={styles.navigation}>Log In</Nav.Link>
                            <Nav.Link href="/lgout" className={styles.navigation}>Register</Nav.Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    )
}
