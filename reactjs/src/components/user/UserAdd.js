import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'

const UserAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm();
    const handleSubmitFormAdd = async(data) =>{
        console.log('data form => ',data)
        dispatch(actions.controlLoading(true))
        try{
            const res = await requestApi('/user/create','POST',data);
            console.log('res =>',res)
            dispatch(actions.controlLoading(false)) 
            toast.success('Thêm người dùng thành công !!!',{position:'top-center',autoClose: 2000})
            setTimeout(()=> navigate('/user'), 3000)
        }catch(error){
            console.log('error=> ',error)
            dispatch(actions.controlLoading(false))
        }
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">New user</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to ='/user'>User</Link></li>
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
                                            <lable className='form-lable'>First name:</lable>
                                            <input  {...register('first_name',{ required:'First name is required.'})} type='text' className='form-control' placeholder='Enter first name'/>
                                            {errors.first_name && <p style={{color:'red'}}>{errors.first_name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Last name:</lable>
                                            <input {...register('last_name',{ required:'Last name is required.'})} type='text' className='form-control' placeholder='Enter last name'/>
                                            {errors.last_name && <p style={{color:'red'}}>{errors.last_name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Email:</lable>
                                            <input {...register('email',{ 
                                                required:'Email is required.',
                                                pattern:{
                                                    value:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                                    message:'Invalid email address'

                                                }
                                                })} type='email' className='form-control' placeholder='Enter email'/>
                                            {errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Password:</lable>
                                            <input {...register('password',{ required:'Password is required.'})} type='password' className='form-control' placeholder='Enter Password'/>
                                            {errors.password && <p style={{color:'red'}}>{errors.password .message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Status:</lable>
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

export default UserAdd