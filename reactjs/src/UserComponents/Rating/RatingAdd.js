import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'
// import ReactStarRatings from 'react-star-ratings';
// import { FaStar} from 'react-icons/fa'
// import StarRatings from 'react-star-ratings'

const RatingAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ratings,SetRating] = useState([])
    const [hover,SetHover]= useState([])
    const [product, SetProduct] = useState([])
    const [user, SetUser] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSubmitFormAdd = async (data) => {
        console.log('data form => ', data)
        // let formData = new FormData()
        // for (let key in data) {
        //     if (key === '') {
        //         formData.append(key, data[key][0])
        //     } else {
        //         formData.append(key, data[key]);
        //     }
        // }       
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/ratings/create', 'POST',data);
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm đánh giá thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/ratings'), 3000)
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

    

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/user', 'GET').then(res => {
           console.log("res=>",res)
           SetUser(res.data.data)
           dispatch(actions.controlLoading(false))
        }).catch(err=>{
            console.log('err=>',err)
            dispatch(actions.controlLoading(false))
        })
    },[])

    // const handleRatingChange = (newRating) => {
    //     SetRating(newRating);
    //   };
    
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">New Rating</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item "><Link to='/ratings'>rating</Link></li>
                        <li className="breadcrumb-item active">Add New</li>
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
                                            {/* <select value={rating} onChange={(e) => SetRating(e.target.value)}>
                                                <option value="1">1 sao</option>
                                                <option value="2">2 sao</option>
                                                <option value="3">3 sao</option>
                                                <option value="4">4 sao</option>
                                                <option value="5">5 sao</option>
                                            </select> */}
                                            
                                            {/* <ReactStarRatings
                                                ratingValue={ratings}
                                                
                                                starRatedColor="#ffd700"
                                            />
                                            {errors.rating && <p style={{ color: 'red' }}>{errors.rating.message}</p>} */}
                                            
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
                                            <select {...register('user', { required: 'chọn đánh giá' })} className='form-select'>
                                                <option value="">--Chọn người dùng--</option>
                                                {user.map(user => {
                                                    return <option key={user.id} value={user.MaNV}>{user.MaNV}</option>
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
                                        <button type='button' onClick={handleSubmit(handleSubmitFormAdd)} className='btn btn-success'>Submit</button>

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

export default RatingAdd