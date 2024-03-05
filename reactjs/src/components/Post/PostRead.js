import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const PostRead = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:3000/post/api/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    })
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h1 className='mt-4'>Read Post</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item'><Link to='/post'>Post</Link></li>
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
                                    <h3>Detail of Post</h3>
                                    <div className='col-md-6' >
                                        <div className='mb-3 mt-3'>
                                            <strong> Title: {data.title} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Description: {data.description} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong className='form-label'>Thumbnail:{data.thumbnail} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong className='form-label'> Category </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong className='form-label'> User </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Status: {data.status} </strong>

                                        </div>
                                        <Link to="/post/api/edit/:id" className='btn btn-warning'><i class="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                        <Link to="/post" className='btn btn-primary ms-3'><i class="fa-solid fa-backward-step"></i> Back </Link>


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

export default PostRead