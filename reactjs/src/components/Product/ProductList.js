import React, { useEffect, useState } from 'react'
import Table from '../Table/Table';
import requestApi from '../../helpers/Api';
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../helpers/common';
//import { StarRating } from 'react-star-rating-component'; // Assuming you have a rating component
import { CSVLink } from 'react-csv';

const ProductList = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState([])
    const [numOfPage, setNumofPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())
    const [dataExport, setDataExport] = useState([])
  
 
    const columns = [
        {
            name: "ID",
            element: row => row.id
        },
        {
            name: "Product name",
            element: row => row.name
        },
        {
            name: "Category",
            element: row => row.category.name
        },
        // {
        //     name: "Description",
        //     element: row => row.description
        // },

        {
            name: 'Image',
            element: row => <img width="100px" src={process.env.REACT_APP_API_URL + '/' + row.image} />
        },

        {
            name: "Status",
            element: row => row.status == 1 ? "Active" : "Inactive"
        },
        // {
        //     name:"Rating",
        //     element: row => row.rating
        // },
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
                    <Link to={`/product/${row.id}`} className='btn btn-sm btn-info me-1'><i class='fa-solid fa-book'></i> Read </Link>
                    <Link to={`/product/edit/${row.id}`} className='btn btn-sm btn-warning me-1' ><i className="fa fa-pencil"></i> Edit </Link>
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

        requestApi(`/product/${deleteItem}`, 'DELETE', []).then(response => {
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
        dispatch(actions.controlLoading(true));
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;
        
        requestApi(`/product${query}`, 'GET', []).then(response => {
            console.log("res=>",response)
            setProduct(response.data.data);
            setNumofPage(response.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false));
        })
    }, [itemsPerPage, currentPage, searchString, refresh])

    const getProductExport = (_event, done) => {
        let result = []
        if (ProductList && ProductList.length > 0) {
            result.push(['id', 'name',  'description', 'status', 'image', 'created_at', 'updated_at']);
            ProductList.map(item => {
                let arr = [];

                arr[0] = item.id
                arr[1] = item.name
                arr[2] = item.description
                arr[3] = item.image
                arr[4] = item.created_at
                arr[5] = item.updated_at
                arr[6] = item.status
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
                    <h1 className="mt-4">Tables</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item active">Tables</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to='/product/add'><i className='fa fa-plus'></i>Add new</Link>
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' ><i className='fa fa-trash'></i>Delete</button>}
                        <CSVLink
                            filename={"product.csv"}
                            className="btn btn-sm btn-primary me-1"
                            data={product}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={(event, done) => getProductExport(event, done)}
                        ><i className='fa-solid fa-file-arrow-down'></i> Export Excel </CSVLink>

                    </div>
                    <Table
                        name="List Product"
                        data={product}
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
export default ProductList;