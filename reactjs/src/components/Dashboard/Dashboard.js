import React, { useState, useEffect } from 'react'
import requestApi from '../../helpers/Api';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../redux/actions'
import { formatDateTime } from '../../helpers/common';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import Table from '../Table/Table';

const Dashboard = () => {
    const dispatch = useDispatch()
    const [DashboardData, setDashboardData] = useState({});
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    // const params = useParams()
    const columns = [
        {
            name: "ID",
            element: row => row.id
        },
        {
            name: "Name",
            element: row => row.name
        },
        {
            name: "Description",
            element: row => row.description
        },
        {
            name: "Created at",
            element: row => formatDateTime(row.created_at)
        },
        {
            name: "Updated at",
            element: row => formatDateTime(row.updated_at)
        },

        {
            name: "Actions",
            element: row => (
                <>

                    <Link to={`/category/${row.id}`} className='btn btn-sm btn-info me-1'><i class="fa-solid fa-book"></i> Read </Link>
                    <Link to={`/category/edit/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className="fa fa-pencil"></i> Edit </Link>
                    <button type='button' className='btn btn-sm btn-danger me-1' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'></i> Delete</button>
                </>
            )
        }
    ]


    const handleDelete = (id) => {
        console.log('single delete with id =>', id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const requestDeleteApi = () => {

        requestApi(`/category/${deleteItem}`, 'DELETE', []).then(response => {
            setShowModal(false)
            setRefresh(Date.now())
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            setShowModal(false)
            dispatch(actions.controlLoading(false))
        })


    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`
        requestApi(`/category${query}`, 'GET', []).then(response => {
            console.log('response=>', response)
            setCategory(response.data.data)
            setNumofPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })

    }, [currentPage, itemsPerPage, searchString, refresh])

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
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Tổng số người dùng 
                                    
                                    {DashboardData.totalUser  && (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >
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
                            <div className="card bg-info text-white mb-4">
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
                    <Table
                        name="Danh sách thể loại"
                        data={category}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemsPerPage={setItemsPerPage}
                        onKeySearch={(keyword) => {

                            console.log('keyword in user list comp=>', keyword)
                            setSearchString(keyword)
                        }}
                        onSelectedRows={rows => {
                            console.log('selected row in uselist=>', rows)
                            setSelectedRows(rows)
                        }}
                    />
                </div>
            </main>
            <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete?

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                    <Button className='btn-danger' onClick={requestDeleteApi}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Dashboard;