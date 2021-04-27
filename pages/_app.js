import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React, {useState, useEffect} from 'react';
import NaviBar from '../components/NaviBar';
import {Container} from 'react-bootstrap';
import {UserProvider} from '../UserContext';

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState({
        id: null
    });

    const unsetUser = () => {
        localStorage.clear();
        setUser({
            id: null,
        })
    }

    useEffect(() => {
        setUser({
            id: localStorage.getItem('id'),
        })
    }, [])

    return (
        <div id="root">
            <UserProvider value={{user, setUser, unsetUser}}>
            <NaviBar />
                <Container>
                    <Component {...pageProps} />
                </Container>
            </UserProvider>            
        </div>
    )
}

export default MyApp
