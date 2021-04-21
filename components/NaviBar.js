import React, { useContext } from "react"
import { Navbar, Nav } from "react-bootstrap"
import Link from "next/link"
import UserContext from "../UserContext"
import styles from "../styles/main.module.css"

export default function NaviBar() {
    const { user } = useContext(UserContext)
    return (
        <div>
            <Navbar expand="lg">
            <Navbar.Brand href="/" ><h4 className={styles.coin}>[coin]</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="float-xs-right"/>
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="justify-content-end" style={{ width: "100%"}}>
                    {
                        user.id !== null
                        ?
                        <React.Fragment>
                            <Nav.Link href="/categories">Categories</Nav.Link>
                            <Nav.Link href="/records">Records</Nav.Link>
                            <Nav.Link href="/charts/monthly-expense">Monthly Expense</Nav.Link>
                            <Nav.Link href="/charts/monthly-income">Monthly Income</Nav.Link>
                            <Nav.Link href="/logout">Log Out</Nav.Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Nav.Link href="/login">Log In</Nav.Link>
                            <Nav.Link href="/lgout">Register</Nav.Link>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
