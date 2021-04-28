import React,{useState,useEffect,useContext} from 'react';
import Router from 'next/router';
import {Form,Button,Alert} from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../../UserContext';
import {GoogleLogin} from 'react-google-login';
import styles from './login.module.css';

export default function Login(){

    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    function loginUser(e){
        e.preventDefault();

        fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.accessToken){
                localStorage.setItem('token', data.accessToken)

                fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/details', {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('id', data._id)                    
                    setUser({
                        id: data._id
                    }) 
                })

                setEmail('');
                setPassword('');

                Swal.fire({
                    icon: 'success',
                    title: 'Successfully logged in',
                    text: 'Thank you for logging in.',
                })

                Router.push('/categories')
            }else {
                if(data.error === 'does-not-exist'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Login failed',
                        text: 'user does not exist.'
                    })
                }else if(data.error === 'incorrect-password'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Login failed',
                        text: 'Password is incorrect.'
                    })
                }else if(data.error === 'login-type-error'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Login type error',
                        text: 'Make sure your email and password is correct.'
                    })
                }
            }
        })
    }

    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    }, [email, password]);

    function authenticateGoogleToken(response){
    
        fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/verify-google-id-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tokenId: response.tokenId
            })
        })
        .then(res => res.json())
        .then(data => {
            if(typeof data.accessToken !== 'undefined'){
                localStorage.setItem('token', data.accessToken)
                retrieveUserDetails(data.accessToken);

                Swal.fire(
                    'Google Logged In successfuly',
                    'Google ka na',
                    'success'
                )
                Router.push('/categories')
            }else {
                if(data.error === 'google-auth-error'){
                    Swal.fire(
                        'Google Auth Error',
                        'Google authentication procedure failed',
                        'error'
                    )
                }else if (data.error === 'login-type-error'){
                    Swal.fire(
                        'Login Type Error',
                        'You ma have registered through a different login procedure',
                        'error'
                    )
                }
            }
        })
    }
    
    function retrieveUserDetails(accessToken){
        fetch('https://guarded-escarpment-99106.herokuapp.com/api/users/details', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => {

            setUser({
                id: data._id,
            })
            localStorage.setItem('id', data._id)
            Router.push('/records');
        })
    }
    
    return(
        <>
            <div className={styles.loginBody}>
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <h1 className={styles.header1}>Track your money...</h1>
                        <img src='/015-money bag.png' alt='' className={styles.image} />
                    </div>
                    <div className="col-md-6">
                        <Form onSubmit={(e) => loginUser(e)} className={styles.login}>
                            <Form.Group controlId="userEmail" className={styles.loginForm}>
                                <Form.Label className={styles.emaillabel}>Email</Form.Label>
                                <Form.Control 
                                    type = "email"
                                    placeholder = "Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.emailTextInput}
                                />
                            </Form.Group>

                            <Form.Group controlId="userPassword" className={styles.loginForm}>
                                <Form.Label className={styles.label}>Password</Form.Label>
                                <Form.Control 
                                    type = "password"
                                    placeholder = "Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={styles.emailTextInput}
                                />
                            </Form.Group>
                            <div>
                                { isActive ? 
                                    <Button type="submit" id="submitBtn" className={styles.googleLogin}>
                                    Submit
                                    </Button>
                                    :
                                    <Button type="submit" id="submitBtn" className={styles.googleLogin} disabled>
                                    Submit
                                    </Button>
                                }
                                <GoogleLogin
                                    // to use google login, you need a proper client id. 
                                    clientId = '474495930535-48qnv1b69juke6b8v2kt83if30i24l19.apps.googleusercontent.com'
                                    // mutable text in button, changeable text
                                    buttonText = 'Login with Google'
                                    // This is for us to run a function successfully
                                    onSuccess = {authenticateGoogleToken}
                                    // Function to run if not successful
                                    onFailure = {authenticateGoogleToken}
                                    cookiePolicy = {'single_host_origin'}
                                    className={styles.googlecustombtn}  
                                />
                            </div>   
                        </Form>
                    </div>
                </div>
                <footer className={styles.footer} fluid='true'>
                    <p className={styles.mny}>mnyTracker</p> <p> &copy; 2021 All Rights Reserved</p>
                </footer>
            </div>
        </>
    )   
}