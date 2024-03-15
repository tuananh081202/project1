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

const CategoryAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [category, setCategory] = useState([])
    const [dataExport, setDataExport] = useState([])
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

    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/category/create', 'POST', data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm thể loại thành công !!!', { position: 'top-center', autoClose: 2000 })
            // setTimeout(() => navigate('/category'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">New category</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to='/category'>category</Link></li>
                        <li class="breadcrumb-item active">Add New</li>
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
                                            <label className='form-label'>Name:</label>
                                            <input  {...register('name', { required: 'Name is required.' })} type='text' className='form-control' placeholder='Enter name' />
                                            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Description:</label>
                                            <input {...register('description', { required: 'Description is required.' })} type='text' className='form-control' placeholder='Enter description' />
                                            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
                                        </div>

                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Submit</button>

                                    </div>
                                </form>

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

            </main >
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

export default CategoryAdd