import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRoutes = () => {

    let token = localStorage.getItem('access_token') || false;
    return (
       token? <Outlet/> : <Navigate to='/user/login'/>
    )
 
}

export default UserPrivateRoutes