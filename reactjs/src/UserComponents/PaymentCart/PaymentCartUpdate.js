import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import requestApi from '../../helpers/Api'
import { toast } from 'react-toastify'
import * as actions from '../../redux/actions'

const PaymentCartUpdate = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [product, setProduct] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data=>', data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/paymentcart/${params.id}`, 'PUT', data, 'json')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật thanh toán thành công!!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/paymentcart'), 3000)
        } catch (error) {
            console.log('error', error)
            dispatch(actions.controlLoading(false))

        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/product', 'GET').then(res => {
            console.log('res=>', res)
            setProduct(res.data.data)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [])


    return (
        <div id='layoutSidenav_content'>
            <main>
                <div class='container-fluid px-4'>
                    <h1 className='mt-4'>Update PaymentCart</h1>
                    <ol className='breadcrumb mb-4'>
                        <li className='breadcrumb-item'><Link to='/'>Dashboard</Link></li>
                        <li className='breadcrumb-item'><Link to='/paymentcart'>PaymentCart</Link></li>
                        <li className='breadcrumb-item active'>Update</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-flus me-1'></i>
                            Update
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
                                        <button type='button' onClick={handleSubmit(handleSubmitFormUpdate)} className='btn btn-success'>Submit</button>

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

export default PaymentCartUpdate