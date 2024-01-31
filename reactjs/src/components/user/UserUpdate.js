import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {Link,useNavigate,useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'

const UserUpdate = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log("id user =>", params.id)
    const {register, setValue,handleSubmit, formState:{errors}} = useForm()

    useEffect(()=>{
        dispatch(actions.controlLoading(true))
        try {
            const getDetailUser = async() =>{
                const res = await requestApi(`/user/${params.id}`,'GET')
                console.log("res =>",res)
                dispatch(actions.controlLoading(false))
                const fields=['first_name','last_name','email','status']
                fields.forEach((field)=>setValue(field, res.data[fields]))
                    
            }
            getDetailUser()
        } catch (error) {
            console.log("error=>",error)
            dispatch(actions.controlLoading(false))
            
        }
    })

    const handleSubmitFormUpdate = async(data) => {
        console.log("data =>",data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/user/${params.id}`,'PUT')
            console.log('res =>',res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật người dùng thành công !!!',{position:'top-center',autoClose: 2000})
            setTimeout(()=> navigate('/user/'), 3000)
        } catch (error) {
            console.log("error=>",error)
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
                        <li class="breadcrumb-item "><Link to ='/user'>User</Link></li>
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
                                            <input {...register('email', { required: 'Email is required.' })} type='text' className='form-control' placeholder='Enter last name' />
                                            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
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

export default UserUpdate