import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios'


const UserRead = () => {
    // 
    // const dispatch = useDispatch()
    // const [product, setProduct] = useState([])
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:3000/user/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }, [])

    return (
        <div id='layoutSidenav_content'>
            <main>
                <div class='container-fluid px-4'>
                    <h1 className='mt-4'>Read User</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item'><Link to='/user'>User</Link></li>
                        <li className='breadcrumb-item active'>Read</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-flus me-1'></i>
                            Read
                        </div>
                        <div className='card-body'>
                            <div className='row mb-3'>
                                <form>
                                    <h3>Detail of User</h3>
                                    <div className='col-md-6' >
                                        <div className='mb-3 mt-3'>
                                            <strong> First Name: {data.first_name} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Last Name: {data.last_name} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Email: {data.email} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Status: {data.status} </strong>

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong>Avatar: {data.avatar}</strong>
                                        </div>
                                        <Link to="/user/edit/:id" className='btn btn-warning'><i class="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                        <Link to="/user" className='btn btn-primary ms-3'><i class="fa-solid fa-backward-step"></i> Back </Link>
                                        {/* <button type='button' onClick={handleSubmit(handleSubmitFormRead)} className='btn btn-success'>Submit</button> */}

                                    </div>
                                </form>


                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UserRead