import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'

const PostAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [thumbnail, setThumbnail] = useState('')
    const [category, setCategory] = useState([])
    const [user, SetUser] = useState([])
    const handleSubmitFormAdd = async (data) => {
        console.log('data form=>', data)

        let formData = new FormData();
        for (let key in data) {
            if (key === 'thumbnail') {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/post/create', 'POST', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm bưu kiện thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/post'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/category', 'GET').then(res => {
            console.log("res=>", res)
            setCategory(res.data.data)
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

    const onThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(reader.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">New post</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item "><Link to='/post'>Post</Link></li>
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
                                            <label className='form-label'>Title:</label>
                                            <input  {...register('title', { required: 'Thêm tiêu đề.' })} type='text' className='form-control' placeholder='Nhập tiêu đề' />
                                            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Description:</label>
                                            <input  {...register('description', { required: 'Nhập mô tả' })} type='text' className='form-control' placeholder='Nhập tên sản phẩm' />
                                            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Thumbnail: </label><br />
                                            {thumbnail && <img style={{ width: '300px' }} src={thumbnail} className='mb-2' alt='...' />}
                                            <div className='input-file'>
                                                <label htmlFor='file' className='btn-file btn-sm btn btn-primary'>Browse File</label>
                                                <input id='file' type='file' name='thumbnail' {...register('thumbnail', { required: 'Nhập ảnh ', onChange: onThumbnailChange })} className='form-control' accept='image/*' />
                                            </div>
                                            {errors.thumbnail && <p style={{ color: 'red' }}>{errors.thumbnail.message}</p>}

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Category:</label>
                                            <select {...register('category', { required: 'chọn danh mục' })} className='form-select'>
                                                <option value="">--Chọn danh mục--</option>
                                                {category.map(category => {
                                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                                })}
                                            </select>
                                            {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
                                        </div>

                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>User:</label>
                                            <select {...register('user', { required: 'chọn người dùng' })} className='form-select'>
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

export default PostAdd