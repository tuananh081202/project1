import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'
import { formatDateTime } from '../../helpers/common';
import Table from '../Table/Table';
import { Button, Modal } from 'react-bootstrap';



const UserAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const { register, handleSubmit, formState: { errors } } = useForm();
    const columns = [
        {
            name: "ID",
            element: row => row.id
        },
        // {
        //     name:"MaNV",
        //     element: row=>row.MaNV
        // },
        {
            name: "First name",
            element: row => row.first_name
        },
        {
            name: "Last name",
            element: row => row.last_name
        },
        {
            name: "Email",
            element: row => row.email
        },
        { 
            name:"Phone",
            element:row=>row.phone
        },
        {
            name:"Role",
            element: row=>row.roles 
        },
        {
            name: "Status",
            element: row => row.status == 1 ? "Active" : "Inactive"
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

                    <Link to={`/user/edit/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className="fa fa-pencil"></i> Edit </Link>
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

        requestApi(`/user/${deleteItem}`, 'DELETE', []).then(response => {
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
        requestApi(`/user${query}`, 'GET', []).then(response => {
            console.log('respone=>', response)
            setUser(response.data.data)
            setNumofPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })

    }, [currentPage, itemsPerPage, searchString, refresh])

    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/user/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm người dùng thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/user'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Người dùng</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Trang chủ</Link></li>
                        <li class="breadcrumb-item ">Danh sách người dùng</li>
                        <li class="breadcrumb-item active">Thêm người dùng</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
                            Add
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <div className='col-md-6'>
                                    <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Mã nhân viên:</lable>
                                            <input  {...register('MaNV', { required: 'MaNV is required.' })} type='text' className='form-control' placeholder='Nhập mã nhân viên' />
                                            {errors.MaNV && <p style={{ color: 'red' }}>{errors.MaNV.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>First name:</lable>
                                            <input  {...register('first_name', { required: 'First name is required.' })} type='text' className='form-control' placeholder='Enter first name' />
                                            {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Last name:</lable>
                                            <input {...register('last_name', { required: 'Last name is required.' })} type='text' className='form-control' placeholder='Enter last name' />
                                            {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name.message}</p>}
                                        </div>


                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Email:</lable>
                                            <input {...register('email', {
                                                required: 'Email is required.',
                                                pattern: {
                                                    // value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Email không hợp lệ'

                                                }
                                            })} type='email' className='form-control' placeholder='Enter email' />
                                            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Password:</lable>
                                            <input {...register('password', {
                                                required: 'Password is required.',
                                                // pattern: {
                                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                //     message:
                                                //         'Mật khẩu phải có ít nhất 8 ký tự: 1 chữ thường, 1 chữ hoa, 1 số và 1 ký hiệu đặc biệt.'
                                                // }
                                            })} type='password' className='form-control' placeholder='Enter Password' />
                                            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Roles:</label>
                                            <select {...register('roles')} className='form-select'>
                                                <option value='Admin'>Admin</option>
                                                <option value='User'>User</option>
                                            </select>
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-label'>Phone:</lable>
                                            <input {...register('phone', {
                                                required: 'Phone is required.',
                                                pattern: {
                                                    value: /^(\+?\d{1,3})?[- .]?\d{3}[- .]?\d{3}[- .]?\d{4}$/,
                                                    message:
                                                        'Định dạng số điện thoại không hợp lệ. Vui lòng nhập số hợp lệ.'
                                                }
                                            })} type='phone' className='form-control' placeholder='Enter Phone' />
                                            {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Status:</lable>
                                            <select {...register('status')} className='form-select'>
                                                <option value='1'>Active</option>
                                                <option value='2'>Inactive</option>
                                            </select>
                                        </div>
                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Submit</button>

                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                    <Table

                        name="Danh sách người dùng"
                        data={user}
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

export default UserAdd