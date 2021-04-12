import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React from 'react';
import NaviBar from '../components/NaviBar';
import {Container} from 'react-bootstrap';

function MyApp({ Component, pageProps }) {

    return (
        <React.Fragment>
            <NaviBar />
            <Container>
                <Component {...pageProps} />
            </Container>
        </React.Fragment>
    )
}

export default MyApp
