import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import requestApi from '../../helpers/Api'
import { toast } from 'react-toastify'
import * as actions from '../../redux/actions'
import axios from 'axios'


const PaymentCartRead = () => {
    // 
    // const dispatch = useDispatch()
    const [product, setProduct] = useState([])
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:3000/paymentcart/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }, [])

   
  

    return (
        <div id='layoutSidenav_content'>
            <main>
                <div class='container-fluid px-4'>
                    <h1 className='mt-4'>Read PaymentCart</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item'><Link to='/paymentcart'>PaymentCart</Link></li>
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
                                    <h3>Detail of PaymentCart</h3>
                                    <div className='col-md-6' >
                                        <div className='mb-3 mt-3'>
                                            <strong> Customer Name: {data.customerName} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Payment Method: {data.paymentMethod} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong className='form-label'>Product: bap cai </strong>
                                            {product.map(product => {
                                                return <option key={product.id} value={product.id}>{product.name}</option>
                                            })}
                                        </div>


                                        <div className='mb-3 mt-3'>
                                            <strong> TotalPrice: {data.totalPrice} </strong>
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <strong> Status: {data.status} </strong>

                                        </div>
                                        <Link to="/paymentcart/edit/:id" className='btn btn-warning'><i class="fa-sharp fa-thin fa-pencil"></i> Update </Link>
                                        <Link to="/paymentcart" className='btn btn-primary ms-3'><i class="fa-solid fa-backward-step"></i> Back </Link>
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

export default PaymentCartRead