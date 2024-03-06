import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'//chứa các hành động redux
import requestApi from '../../helpers/Api';//xử lý yêu cầu api
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostUpdate = () => {
    const dispatch = useDispatch()
    const { register, setValue, trigger, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [category, SetCategory] = useState([])
    // const [user, setUser] = useState([])
    const params = useParams()
    const [postData, setPostData] = useState({})
    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data)

        let formData = new FormData();
        for (let key in data) {
            if (key === 'thumbnail') {
                if (data.thumbnail[0] instanceof File)
                    formData.append(key, data[key][0])
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/post/api/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật bưu kiện thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/post'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {
                const res = await requestApi('/category', 'GET');
                console.log('res=>',res)
                SetCategory(res.data.data);
                const detailPost = await requestApi(`/post/api/${params.id}`, 'GET');
                console.log("detailPost=>", detailPost)
                const fields = ['title','summary', 'description', 'thumbnail', 'category', 'status'];
                fields.forEach(field => {

                    setValue(field, detailPost.data[field])// đặt giá cho mỗi trường = setvalue
                })
                setPostData({ ...detailPost.data, thumbnail: process.env.REACT_APP_API_URL + '/' + detailPost.data.thum })
                dispatch(actions.controlLoading(false))

            }
            renderData();
        } catch (err) {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        }
    }, [])


    const onThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();//file reader cho phép đọc file bất đồng bộ
            reader.onload = (e) => {
                setPostData({ ...postData, thumbnail: reader.result })
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
                                            <label className='form-label'>Summary:</label>
                                            <textarea rows={4}  {...register('summary', { required: 'Thêm bản tóm tắt.' })} type='text' className='form-control' placeholder='Nhập tóm tắt' />
                                            {errors.summary && <p style={{ color: 'red' }}>{errors.summary.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Description:</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    register('description',{required:'Description is required!'})
                                                }}
                                               
                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    console.log('data=>',data)
                                                    setValue('description',data)
                                                    trigger('description')
                                                }}
                                                
                                            />

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Thumbnail: </label><br />
                                            {postData.thumbnail && <img style={{ width: '300px' }} src={postData.thumbnail} className='mb-2' alt='...' />}
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

                                        {/* <div className='mb-3 mt-3'>
                                            <label className='form-label'>User:</label>
                                            <select {...register('user', { required: 'chọn người dùng' })} className='form-select'>
                                                <option value="">--Chọn người dùng--</option>
                                                {user.map(user => {
                                                    return <option key={user.id} value={user.id}>{user.first_name}</option>
                                                })}
                                            </select>
                                            {errors.user && <p style={{ color: 'red' }}>{errors.user.message}</p>}
                                        </div> */}

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

export default PostUpdate


