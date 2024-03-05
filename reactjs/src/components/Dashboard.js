import React, { useState, useEffect } from 'react'
import requestApi from '../helpers/Api';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [DashboardData, setDashboardData] = useState({});
    useEffect(() => {
        const promiseUser = requestApi('/user', 'GET')
        const promiseCategory = requestApi('/category', 'GET')
        const promiseProduct = requestApi('/product', 'GET')
        const promiseRating = requestApi('/ratings', 'GET')
        dispatch(actions.controlLoading(true))
        Promise.all([promiseUser, promiseCategory, promiseProduct, promiseRating]).then(res => {
            console.log('res=>', res)
            setDashboardData({
                ...DashboardData, totalUser: res[0].data.total, totalCategory: res[1].data.total, totalProduct: res[2].data.total, totalRating: res[3].data.total
            })
            dispatch(actions.controlLoading(false))

        }).catch(error => {
            console.log("error=>", error)
            dispatch(actions.controlLoading(false))
        })


    }, [])
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">

                    <h1 className="mt-4">Dashboard</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Tổng số người dùng
                                    {DashboardData.totalUser && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {DashboardData.totalUser}
                                    </span>)}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/user' className="small text-white stretched-link" >Người dùng</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Tổng số thể loại
                                    {DashboardData.totalCategory && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {DashboardData.totalCategory}
                                    </span>)}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/category' className="small text-white stretched-link" >Thể loại</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Tổng số sản phẩm
                                    {DashboardData.totalProduct && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {DashboardData.totalProduct}
                                    </span>)}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/product' className="small text-white stretched-link" >Sản phẩm</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Tổng số đánh giá
                                    {DashboardData.totalRating && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {DashboardData.totalRating}
                                    </span>)}</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to='/ratings' className="small text-white stretched-link" >Đánh giá</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;