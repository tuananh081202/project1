import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter';


const ProductAdd = () => {
    const dispatch = useDispatch()
    const { register, setValue, trigger, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [image, SetImage] = useState('')
    const [category, SetCategory] = useState([])
    // const [rating, SetRating] = useState([])
    const handleSubmitFormAdd = async (data) => {
        console.log('data form=>', data)

        let formData = new FormData();
        for (let key in data) {
            if (key === 'image') {
                formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/product/create', 'POST', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Thêm sản phẩm thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/product'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }


    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/category', 'GET').then(res => {
            console.log("res=>", res)
            SetCategory(res.data.data)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        })
    }, [])

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CustomUploadAdapter(loader)
        }
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                SetImage(reader.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }


    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">New product</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item "><Link to='/product'>product</Link></li>
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
                                            <label className='form-label'>Product Name:</label>
                                            <input  {...register('name', { required: 'Thêm tên sản phẩm.' })} type='text' className='form-control' placeholder='Nhập tên sản phẩm' />
                                            {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Description:</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    register('description', { required: 'Description is required!' })
                                                }}

                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    console.log('data=>', data)
                                                    setValue('description', data)
                                                    trigger('description')
                                                }}
                                                config={{
                                                    extraPlugins: [uploadPlugin]
                                                }}

                                            />

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Image: </label><br />
                                            {image && <img style={{ width: '300px' }} src={image} className='mb-2' alt='...' />}
                                            <div className='input-file'>
                                                <label htmlFor='file' className='btn-file btn-sm btn btn-primary'>Browse File</label>
                                                <input id='file' type='file' name='image' {...register('image', { required: 'Nhập ảnh sản phẩm', onChange: onImageChange })} className='form-control' accept='image/*' />
                                            </div>
                                            {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}

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
                                        {/* <div className='mb-3 mt-3'>
                                            <label className='form-label'>Rating:</label>
                                            <select {...register('rating', { required: 'chọn đánh giá' })} className='form-select'>
                                                <option value="">--Chọn đánh giá--</option>
                                                {rating.map(rating=>{
                                                    return <option key={rating.id} value={rating.id}>{rating.rating}</option>
                                                })}
                                            </select>
                                            {errors.rating && <p style={{color:'red'}}>{errors.name.rating}</p>}
                                        </div> */}
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

export default ProductAdd