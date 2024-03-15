
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as actions from '../../redux/actions'//chứa các hành động redux
import requestApi from '../../helpers/Api';//xử lý yêu cầu api
import { toast } from 'react-toastify'
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter'


const ProductUpdate = () => {
    const dispatch = useDispatch()
    const { register, setValue,trigger,  handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    //const [image, SetImage] = useState('')
    const [category, SetCategory] = useState([])
    const params = useParams()
    const [productData, setProductData] = useState({})
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
            const res = await requestApi(`/product/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật sản phẩm thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/product'), 3000)
        } catch (error) {
            console.log('error=> ', error)
            dispatch(actions.controlLoading(false))
        }
    }

    //Lấy dữ liệu danh mục  và lấy dữ liệu sản phẩm theo id
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {
                const res = await requestApi('/category', 'GET');
                SetCategory(res.data.data);
                const detailProduct = await requestApi(`/product/${params.id}`, 'GET');
                console.log("detailProduct=>", detailProduct)
                const fields = ['name', 'description', 'image', 'category', 'status'];
                fields.forEach(field => {

                    setValue(field, detailProduct.data[field])// đặt giá cho mỗi trường = setvalue
                })
                setProductData({ ...detailProduct.data, image: process.env.REACT_APP_API_URL + '/' + detailProduct.data.image })
                dispatch(actions.controlLoading(false))

            }
            renderData();
        } catch (err) {
            console.log('err=>', err)
            dispatch(actions.controlLoading(false))
        }
    }, [])

    function uploadPlugin(editor){
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>{
            return new CustomUploadAdapter(loader)
        }
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();//file reader cho phép đọc file bất đồng bộ
            reader.onload = (e) => {
                setProductData({ ...productData, image: reader.result })
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
                        <li className="breadcrumb-item "><Link to='/category'>product</Link></li>
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
                                            <lable className='form-lable'>Product Name:</lable>
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
                                            {productData.image && <img style={{ width: '300px' }} src={productData.image} className='mb-2' alt='...' />}
                                            <input type='file' name='image' {...register('image', { required: 'Thêm ảnh sản phẩm', onChange: onImageChange })} className='form-control' accept='image/*' />
                                            {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}

                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Category:</label>
                                            <select {...register('category', { required: 'chọn danh mục' })} className='form-select'>
                                                <option value="">--Chọn danh mục--</option>
                                                {category.map(cat => {
                                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                })}
                                            </select>
                                            {errors.category && <p style={{ color: 'red' }}>{errors.category.message}</p>}
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

export default ProductUpdate


