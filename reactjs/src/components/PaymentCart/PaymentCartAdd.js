import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'


const PaymentCartAdd = () => {
    const dispatch = useDispatch()
    const [product, SetProduct] = useState([])
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)

        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/paymentcart/create', 'POST', data, 'json');
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/paymentcart'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/product', 'GET').then(res => {
            console.log("res=>", res)
            SetProduct(res.data.data)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [])


    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">New cart</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to='/paymentcart'>PaymentCart</Link></li>
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
                                            <label className='form-label'>Customer Name:</label>
                                            <input  {...register('customerName', { required: 'customerName is required.' })} type='text' className='form-control' placeholder='Enter customerName' />
                                            {errors.customerName && <p style={{ color: 'red' }}>{errors.customerName.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Payment Method:</label>
                                            <select {...register('paymentMethod')} className='form-select'>
                                                <option value='MoMo'>MoMo</option>
                                                <option value='VNPay'>VNPay</option>
                                                <option value='PayPal'>PayPal</option>
                                            </select>

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Total Price:</label>
                                            <input {...register('totalPrice', { required: 'totalPrice is required.' })} type='text' className='form-control' placeholder='Enter totalPrice' />
                                            {errors.totalPrice && <p style={{ color: 'red' }}>{errors.totalPrice.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Product:</label>
                                            <select {...register('product', { required: 'chọn sản phẩm' })} className='form-select'>
                                                <option value="">--Chọn sản phẩm--</option>
                                                {product.map(product => {
                                                    return <option key={product.id} value={product.id}>{product.name}</option>
                                                })}
                                            </select>
                                            {errors.product && <p style={{ color: 'red' }}>{errors.product.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Status:</label>
                                            <select {...register('status')} className='form-select'>
                                                <option value='1'>Active</option>
                                                <option value='2'>Inactive</option>
                                            </select>

                                        </div>
                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Payment</button>

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

export default PaymentCartAdd