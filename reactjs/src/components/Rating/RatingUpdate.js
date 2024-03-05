import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'
// import { FaStar } from 'react-icons/fa'

const RatingUpdate = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [hover, SetHover] = useState([])
    // const [ratings, SetRating] = useState([])
    const [product, SetProduct] = useState([])
    const [user, SetUser] = useState([])
    const { register, setValue, handleSubmit, formState: { errors } } = useForm()
    const handleSubmitFormUpdate = async (data) => {
        console.log("data =>", data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/ratings/${params.id}`, 'PUT',data,'json')
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật đánh giá thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/ratings/'), 3000)
        } catch (error) {
            console.log("error=>", error)
            dispatch(actions.controlLoading(false))

        }
    }
    

    // useEffect(() => {
    //     dispatch(actions.controlLoading(true))
    //     try {
    //         const getDetailRating = async () => {
    //             const res = await requestApi('/product', 'GET');
    //             // const respone = await requestApi('/user','GET')
    //             // SetProduct(res.data.data);
    //             // SetUser(respone.data.data);
    //             const detailRating = await requestApi(`/ratings/${params.id}`, 'GET');
    //             console.log("detailRating=>", detailRating)
    //             const fields = ['rating','comment','product','user'];
    //             fields.forEach((field) => setValue(field, res.data[fields]))

    //         }
    //         getDetailRating()
    //     } catch (error) {
    //         console.log("error=>", error)
    //         dispatch(actions.controlLoading(false))

    //     }
    // })

    


    

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

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/user', 'GET').then(res => {
            console.log("res=>", res)
            SetUser(res.data.data)
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
                    <h1 class="mt-4">Update rating</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to='/ratings'>Rating</Link></li>
                        <li class="breadcrumb-item active">Update</li>
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
                                            <label className='form-label'>Rating:</label>
                                            {/* {[...Array(5)].map((star, index) => {
                                                const currentRating = index + 1;
                                            return(
                                                <label>
                                                    <input
                                                    type='radio'
                                                    name='rating'
                                                    value={currentRating}
                                                    onClick={()=> SetRating(currentRating)}

                                                    />
                                                    <FaStar 
                                                    className='star' 
                                                    size={50}
                                                    color={currentRating <= (hover || ratings) ? "#ffc107" : "#e4e5e9"}
                                                    onMouseEnter={() => SetHover(currentRating)}
                                                    onMouseLeave={() => SetHover(null)}
                                                    />
                                                    
                                                </label>
                                            )
                                            })} */}

                                            <input {...register('rating', { required: 'Rating is required.' })} type='text' className='form-control' placeholder='Enter rating' />
                                            {errors.rating && <p style={{ color: 'red' }}>{errors.rating.message}</p>}
                                            {/* <select value={ratings} onChange={(e) => SetRating(e.target.value)}>
                                                <option value="1">1 sao</option>
                                                <option value="2">2 sao</option>
                                                <option value="3">3 sao</option>
                                                <option value="4">4 sao</option>
                                                <option value="5">5 sao</option>
                                            </select>
                                            {errors.rating && <p style={{ color: 'red' }}>{errors.rating.message}</p>}  */}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Comment:</label>
                                            <input {...register('comment', { required: 'Comment is required.' })} type='text' className='form-control' placeholder='Enter comment' />
                                            {errors.comment && <p style={{ color: 'red' }}>{errors.comment.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Product:</label>
                                            <select {...register('product', { required: 'Chọn đánh giá' })} className='form-select'>
                                                <option value="">--Chọn sản phẩm--</option>
                                                {product.map(product => {
                                                    return <option key={product.id} value={product.id}>{product.name}</option>
                                                })}
                                            </select>
                                            {errors.product && <p style={{ color: 'red' }}>{errors.product.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>User:</label>
                                            <select {...register('user', { required: 'Chọn đánh giá' })} className='form-select'>
                                                <option value="">--Chọn người dùng--</option>
                                                {user.map(user => {
                                                    return <option key={user.id} value={user.id}>{user.first_name}</option>
                                                })}
                                            </select>
                                            {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
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

export default RatingUpdate