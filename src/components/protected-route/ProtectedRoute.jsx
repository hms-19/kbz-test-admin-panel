import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {

    const [cookies, setCookie] = useCookies(["token"])

    if(cookies.token == null || !cookies.token){
        return <Navigate to="/login" />
    }

    return children

}

export default ProtectedRoute