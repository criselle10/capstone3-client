import React,{useState,useEffect,useContext} from 'react';
import Router from 'next/router';
import {Form,Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../../UserContext';
import {GoogleLogin} from 'react-google-login';

export default function Login(){

    const {user, setUser} = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    function loginUser(e){
        e.preventDefault();

        fetch('http://localhost:4000/api/users/login', {
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

                fetch('http://localhost:4000/api/users/details', {
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
                    text: 'Thank you for logging in.'
                })

                Router.push('/records')
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
    
        fetch('http://localhost:4000/api/users/verify-google-id-token', {
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
        fetch('http://localhost:4000/api/users/details', {
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
         <Form onSubmit={(e) => loginUser(e)}>
            <Form.Group controlId="userEmail" className='mt-5'>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type = "email"
                    placeholder = "Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="userPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type = "password"
                    placeholder = "Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            { isActive ? 
                <Button variant="primary" type="submit" id="submitBtn" className='btn-block'>
                Submit
                </Button>
                :
                <Button type="submit" id="submitBtn" className='btn-block grey' disabled>
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
                className = 'w-100 text-center my-4 d-flex justify-content-center'
            />   
        </Form>
    )   
}