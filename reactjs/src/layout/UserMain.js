import React from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import { Outlet} from 'react-router-dom'
import Footer from '../layouts/Footer';

const UserMain = () => {
  return (
    <div>
       <Header/>
        <div id='layoutSidenav'>
            <Sidebar/>
            <Outlet/>

        </div>
       <Footer/>
    </div>
  )
}

export default UserMain;