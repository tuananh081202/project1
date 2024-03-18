import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const onHandleLogout = () => {
        localStorage.removeItem('access_token');//xóa access token ra khỏi local storage
        localStorage.removeItem('refresh_token');
        navigate('/login');//chuyển hướng đăng nhập sang trang an toàn 
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                <Link to='/' className="navbar-brand ps-3" >CRUD</Link>

                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fa-solid fa-bars"></i></button>

                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">


                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i ><img src='/assets/img/admin_avatar.jpg' alt='Admin' style={{ width: '30px' }} /></i> Admin </a>


                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link to='/profile' className="dropdown-item" >Settings</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link to='/admin/login' className="dropdown-item" onClick={onHandleLogout}>Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Header;