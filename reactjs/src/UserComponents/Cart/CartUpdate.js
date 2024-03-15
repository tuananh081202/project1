
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'


const CartUpdate = () => {
    const dispatch = useDispatch()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [product, SetProduct] = useState([])
    //const [image,SetImage]= useState('')
    const [productData,setProductData] = useState({})
    const params = useParams()
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)

        let formData = new FormData();
        for (let key in data) {
            if (key === 'image') {
                if (data.image[0] instanceof File)
                    formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/cart/${params.id}`, 'PUT', formData, 'json','multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật giỏ hàng thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/cart'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }


    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {
                const res = await requestApi('/product', 'GET');
                SetProduct(res.data.data);
                const detailCart = await requestApi(`/cart/${params.id}`, 'GET');
                console.log("detailCart=>", detailCart)
                const fields = ['customerName','image','quantity', 'totalPrice', 'product', 'status'];
                fields.forEach(field => {

                    setValue(field, detailCart.data[field])
                })
                setProductData({ ...detailCart.data })
                dispatch(actions.controlLoading(false))

            }
            renderData();
        } catch (err) {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        }
    }, [])

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
            let reader = new FileReader();
            reader.onload = (e) => {
                setProductData({...productData,image: reader.result})
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">New cart</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item "><Link to='/cart'>Cart</Link></li>
                        <li className="breadcrumb-item active">Update New</li>
                    </ol>
                    <div className='card mb-4'>
                        <div className='card-header'>
                            <i className='fas fa-plus me-1'></i>
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
                                            <label className='form-label'>Image: </label><br />
                                            {productData.image && <img style={{ width: '300px' }} src={productData.image} className='mb-2' alt='...' />}
                                            <input type='file' name='image' {...register('image', { required: 'Nhập ảnh sản phẩm', onChange: onImageChange })} className='form-control' accept='image/*' />
                                            {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Quantity:</label>
                                            <input  {...register('quantity', { required: 'Quantity is required.' })} type='text' className='form-control' placeholder='Enter quantity' />
                                            {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Total Price:</label>
                                            <input {...register('totalPrice', { required: 'TotalPrice is required.' })} type='text' className='form-control' placeholder='Enter totalPrice' />
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
                                            <lable className='form-lable'>Status:</lable>
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

export default CartUpdate


