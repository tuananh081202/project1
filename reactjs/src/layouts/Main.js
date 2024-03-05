import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet} from 'react-router-dom'
import Footer from './Footer';

const Main = () => {
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

export default Main;