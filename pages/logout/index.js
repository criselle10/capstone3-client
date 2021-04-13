import {useContext, useEffect} from 'react';
import UserContext from '../../UserContext';
import Router from 'next/router';

export default function Logout(){
    const {unsetUser} = useContext(UserContext)

    useEffect(() => {
        unsetUser()
        Router.push('/login')
    }, [])
    
    return null
}