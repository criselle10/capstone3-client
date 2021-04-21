<Navbar expand="lg">
            <Link href='/'>
                <a className="navbar-brand">
                    <h4 className={styles.coin}>[coin]</h4>
                </a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navibar mr-auto">
                    {
                        user.id !== null
                        ?
                        <React.Fragment>
                            <Link href="/categories/">
                                <a className="nav-link" role="button">Categories</a>
                            </Link>
                            <Link href="/records/">
                                <a className="nav-link" role="button">Records</a>
                            </Link>
                            <Link href="/charts/monthly-expense">
                                <a className="nav-link" role="button">Monthly Expense</a>
                            </Link>
                            <Link href="/charts/monthly-income">
                                <a className="nav-link" role="button">Monthly Income</a>
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