import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams,useDispatch } from 'react-router-dom'
import axios from 'axios'

const CategoryRead = () => {
    

    const [data, setData] = useState([])
    const { id } = useParams()
    
    useEffect(() => {
        axios.get('http://localhost:3000/category/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }, [])
    

   
  
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div className='container-fluid px-4'>
                    <h1 className='mt-4'>Read Category</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item'><Link to='/category'>Category</Link></li>
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
                                    <h3>Detail of Category</h3>
                                    <div className='col-md-6' >
                                        <div className='mb-3 mt-3'>
                                            <strong>  Name: {data.name} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Description: {data.description} </strong>
                                        </div>                     
                     
                                        <Link to="/category/edit/:id" className='btn btn-warning'><i class="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                        <Link to="/category" className='btn btn-primary ms-3'><i class="fa-solid fa-backward-step"></i> Back </Link>
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

export default CategoryRead