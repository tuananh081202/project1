import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const UserPublicRoutes = () => {

  let token= localStorage.getItem('access_token') || false;
  return (
    !token? <Outlet/> : <Navigate to='/'/>
  )
  
}

export default UserPublicRoutes