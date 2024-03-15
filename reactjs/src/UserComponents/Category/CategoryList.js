import React, { useEffect, useState } from 'react'
import Table from '../Table/Table';
import requestApi from '../../helpers/Api';
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { formatDateTime } from '../../helpers/common';
// import { toast } from 'react-toastify';
// import Papa from 'papaparse'
import { CSVLink } from 'react-csv';
const CategoryList = () => {
    const dispatch = useDispatch();
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
    const params = useParams()
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


    const handleMultiDelete = () => {
        console.log('multi delete =>', selectedRows)
        setShowModal(true)
        setDeleteType("multi")
    }



    const requestDeleteApi = () => {
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true))
            requestApi(`/category/${deleteItem}`, 'DELETE', []).then(response => {
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
            requestApi(`/category/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
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

    // const handleImportCSV = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         let file = event.target.files[0];
    //         if (file.type !== "text/csv") {
    //             toast.err('Only accept csv files...')
    //             return;
    //         }
    //         Papa.parse(file, {
    //             complete: function (result) {
    //                 let rawCSV = result.data
    //                 if (rawCSV.length > 0) {
    //                     if (rawCSV[0] && rawCSV.length === 8) {
    //                         if (rawCSV[0][0] !== "id"
    //                             || rawCSV[0][1] !== "name"
    //                             || rawCSV[0][2] !== "description"
    //                             || rawCSV[0][3] !== "created_at"
    //                             || rawCSV[0][4] !== "updated_at"

    //                         ) {
    //                             toast.error('Wrong format CSV file!')
    //                         } else {
    //                             console.log(rawCSV)

    //                             rawCSV.map((item, index) => {
    //                                 if (index > 0 && item.length === 4) {
    //                                     let obj = {}
    //                                     obj[1] = item.id
    //                                     obj[2] = item.name
    //                                     obj[3] = item.description
    //                                     obj[4] = item.created_at
    //                                     obj[5] = item.updated_at
    //                                     result.push(obj)


    //                                 }
    //                             })
    //                             setDataExport(result)
    //                             console.log('Check result:', result)
    //                         }
    //                     } else {
    //                         toast.error('Wrong format CSV file!')
    //                     }

    //                 } else
    //                     toast.error("Not found data on CSV file!")
    //                 console.log('Finished: ', result.data)
    //             }
    //         })
    //     }
    // }
    const getCategoryExport = (_event, done) => {
        let result = []
        if (CategoryList && CategoryList.length > 0) {
            result.push(['id', 'name', 'description', 'created_at', 'updated_at']);
            CategoryList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.name
                arr[2] = item.description
                arr[3] = item.created_at
                arr[4] = item.updated_at

                result.push(arr)
            })
            setDataExport(result);
            done();
        }

    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Thể loại</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Trang chủ</Link></li>
                        <li className="breadcrumb-item active">Danh sách thể loại</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to='/category/add'><i className='fa fa-plus'></i>Thêm mới</Link>
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' onClick={handleMultiDelete}><i className='fa fa-trash'></i>Delete</button>}
                        {/* <label htmlFor='test' className='btn btn-sm btn-warning me-1'><i className='fa-solid fa-file-import'></i> Import </label>
                        <input id='test' type='file' hidden
                            onChange={(event) => handleImportCSV(event)}
                        /> */}


                        <CSVLink
                            filename={"category.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={category}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getCategoryExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Export Excel </CSVLink>
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

        </div >

    )
}

export default CategoryList