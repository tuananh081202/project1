import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const RatingRead = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:3000/ratings/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    })
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid-px4'>
                    <h1 className='mt-4'> Read Rating</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item'><Link to='/ratings'>Rating</Link></li>
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
                                    <h3>Detail of Rating</h3>
                                    <div className='col md-6'>
                                        <div className='mb-3 mt-3'>
                                            <strong>Id:{data.id}</strong>

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong>Rating:{data.rating}</strong>

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong>Comment:{data.comment}</strong>

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong>Product:</strong>

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <strong>User:</strong>

                                        </div>
                                        <Link to='/ratings/edit/:id' className='btn btn-warning'><i className='fa-sharp fa-thin fa-pencil'></i> Update </Link>
                                        <Link to="/ratings" className='btn btn-primary ms-3'><i class="fa-solid fa-backward-step"></i> Back </Link>

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

export default RatingRead