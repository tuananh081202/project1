import React from 'react'
import { Link } from 'react-router-dom'
// import './css/styles.css'


const Sidebar = () => {
    return (

        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">

                        <div className="nav-link" >
                            <div className="sb-nav-link-icon"><i ><img src='/assets/img/admin_avatar.jpg' alt='Admin' style={{ width: '30px' }} /></i></div>
                             Admin 
                            
                        </div>
                        <span className="admin-badge" >Quản trị viên</span>
                        
                        <div className="sb-sidenav-menu-heading">Interface</div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseDashboard" aria-expanded="false" aria-controls="collapseDashboard">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-gauge"></i></div>
                             Dashboard
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            User
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseUser" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/user/add' className='nav-link'>Add User</Link>
                                <Link to='/user' className='nav-link'>List Users</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Category
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/category/add' className='nav-link'>Add Category</Link>
                                <Link to='/category' className='nav-link'>List Category</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Product
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/product/add' className='nav-link'>Add Product</Link>
                                <Link to='/product' className='nav-link'>List Product</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseRating" aria-expanded="false" aria-controls="collapseRating">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Rating
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseRating" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/ratings/add' className='nav-link'>Add Rating</Link>
                                <Link to='/ratings' className='nav-link'>List Rating</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCart" aria-expanded="false" aria-controls="collapseCart">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Cart
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseCart" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/cart/add' className='nav-link'>Add Cart</Link>
                                <Link to='/cart' className='nav-link'>List Cart</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePaymentCart" aria-expanded="false" aria-controls="collapsePaymentCart">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Payment Cart
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapsePaymentCart" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/paymentcart/add' className='nav-link'>Add PaymentCart</Link>
                                <Link to='/paymentcart' className='nav-link'>List PaymentCart</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePost" aria-expanded="false" aria-controls="collapsePost">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Post
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapsePost" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/post/add' className='nav-link'>Add Post</Link>
                                <Link to='/post' className='nav-link'>List Post</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Pages
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to='/admin/login' className="nav-link" >Login</Link>
                                        <Link to='/admin/register' className="nav-link" >Register</Link>
                                        <Link to='/resetPassword' className='nav-link'>Reset Password</Link>

                                    </nav>
                                </div>


                            </nav>
                        </div>
                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <Link to="/Charts" className="nav-link" >
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Charts
                        </Link>

                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    CRUD
                </div>
            </nav>
        </div>

    )
}

export default Sidebar