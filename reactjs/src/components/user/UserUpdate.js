import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, json, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'

const UserUpdate = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log("id user =>", params.id)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm()
    const handleSubmitFormUpdate = async (data) => {
        console.log("data =>", data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/user/${params.id}`, 'PUT', data, 'json');
            console.log('res =>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật người dùng thành công !!!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/user'), 3000)
        } catch (error) {
            console.log("error=>", error)
            dispatch(actions.controlLoading(false))

        }
    }


    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Update user</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to='/user'>User</Link></li>
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
                                            <lable className='form-lable'>Mã nhân viên:</lable>
                                            <input  {...register('MaNV', { required: 'MaNV is required.' })} type='text' className='form-control' placeholder='Nhập mã nhân viên' />
                                            {errors.MaNV && <p style={{ color: 'red' }}>{errors.MaNV.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>First name:</lable>
                                            <input  {...register('first_name', { required: 'First name is required.' })} type='text' className='form-control' placeholder='Enter first name' />
                                            {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Last name:</lable>
                                            <input {...register('last_name', { required: 'Last name is required.' })} type='text' className='form-control' placeholder='Enter last name' />
                                            {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name.message}</p>}
                                        </div>
 

                                        {/* <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Email:</lable>
                                            <input {...register('email', {
                                                required: 'Email is required.',
                                                pattern: {
                                                    // value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Email không hợp lệ'

                                                }
                                            })} type='email' className='form-control' placeholder='Enter email' />
                                            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Password:</lable>
                                            <input {...register('password', {
                                                required: 'Password is required.',
                                                // pattern: {
                                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                //     message:
                                                //         'Mật khẩu phải có ít nhất 8 ký tự: 1 chữ thường, 1 chữ hoa, 1 số và 1 ký hiệu đặc biệt.'
                                                // }
                                            })} type='password' className='form-control' placeholder='Enter Password' />
                                            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                        </div> */}
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Roles:</label>
                                            <select {...register('roles')} className='form-select'>
                                                <option value='Admin'>Admin</option>
                                                <option value='User'>User</option>
                                            </select>
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Phone:</lable>
                                            <input {...register('phone', {
                                                required: 'Phone is required.',
                                                pattern: {
                                                    value: /^(\+?\d{1,3})?[- .]?\d{3}[- .]?\d{3}[- .]?\d{4}$/,
                                                    message:
                                                        'Định dạng số điện thoại không hợp lệ. Vui lòng nhập số hợp lệ.'
                                                }
                                            })} type='phone' className='form-control' placeholder='Enter Phone' />
                                            {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
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
                <div className='card-body'>
                <div className='copyright py-4 text-center text-dark'>
                    <div className='container'>
                        <small>Thực tập: <strong className='text-primary' >Tạo blog CRUD</strong>. 71DCTT22005 - Đặng Tuấn Anh - 71DCTT23</small>
                    </div>
                </div>
            </div>
            </main>
        </div>
    )
}

export default UserUpdate