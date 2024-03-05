import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../helpers/common'
import requestApi from '../../helpers/Api'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { CSVLink } from 'react-csv'
import Table from '../Table/Table'
const PostList = () => {
    const dispatch = useDispatch();
    const [post, setPost] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [deleteItem, setDeleteItem] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [deleteType, setDeleteType] = useState('single')
    const [refresh, setRefresh] = useState(Date.now())
    const [selectedRows, setSelectedRows] = useState([])
    const [dataExport, setDataExport] = useState([])
    const columns = [
        {
            name: 'ID',
            element: row => row.id
        },
        {
            name: 'Title',
            element: row => row.title
        },
        {
            name: 'Description',
            element: row => row.description
        },
        {
            name: 'Thumbnail',
            element: row => <img width="100px" src={process.env.REACT_APP_API_URL + '/' + row.thumbnail} />
        },
        {
            name: 'Category',
            element: row => row.category.name
        },
        {
            name: 'User',
            element: row => row.user.first_name
        },
        {
            name: 'Status',
            element: row => row.status == 1 ? "Active" : 'Inactive'
        },
        {
            name: 'Created at',
            element: row => formatDateTime(row.created_at)
        },
        {
            name: 'Updated at',
            element: row => formatDateTime(row.updated_at)
        },
        {
            name: 'Actions',
            element: row => (
                <>
                    <Link to={`/post/api/${row.id}`} className='btn btn-sm btn-info me-1'><i class='fa-solid fa-book'></i> Read </Link>
                    <Link to={`/post/edit/api/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className="fa fa-pencil"></i> Edit </Link>
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
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true))
            requestApi(`/post/api/${deleteItem}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        } else {
            dispatch(actions.controlLoading(true))
            requestApi(`/post/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                setSelectedRows([])
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })

        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}`
        if (searchString) {
            query += `&search=${searchString}`;
        }
        requestApi(`/post${query}`, 'GET', []).then(reponse => {
            setPost(reponse.data.data)
            setNumofPage(reponse.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getPostExport = (_event, done) => {
        let result = []
        if (PostList && PostList.length > 0) {
            result.push(['id', 'title', 'description', 'category.name', 'thumbnail', 'user.first_name', 'status', 'created_at', 'updated_at']);
            PostList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.title
                arr[2] = item.description
                arr[3] = item.category.name
                arr[4] = item.thumbnail
                arr[5] = item.user.first_name
                arr[6] = item.created_at
                arr[7] = item.updated_at
                arr[8] = item.status
                result.push(arr)
            })
            setDataExport(result);
            done();
        }

    }

    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h1 className='mt-4'>Tables</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item active'>Tables</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to='/post/add'><i class="fa-solid fa-plus"></i>Add new</Link>
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger me-1'><i className='fa fa-trash'></i>Delete</button>}
                        <CSVLink
                            filename={"post.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={post}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getPostExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Export Excel
                        </CSVLink>

                    </div>
                    <Table
                        name='List Post'
                        data={post}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemsPerPage={setItemPerPage}
                        onKeySearch={(keyword) => {
                            console.log('keyword in user list comp=>', keyword)
                            setSearchString(keyword)
                        }}
                        onSelectedRows={rows => {
                            console.log('selected row in uselist', rows)
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

export default PostList