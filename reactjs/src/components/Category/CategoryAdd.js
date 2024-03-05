import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'


const CategoryAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm();
    const handleSubmitFormAdd = async(data) =>{
        console.log('data form => ',data)
        dispatch(actions.controlLoading(true))
        try{
            const res = await requestApi('/category/create','POST',data);
            console.log('res =>',res)
            dispatch(actions.controlLoading(false)) 
            toast.success('Thêm thể loại thành công !!!',{position:'top-center',autoClose: 2000})
            setTimeout(()=> navigate('/category'), 3000)
        }catch(error){
            console.log('error=> ',error)
            dispatch(actions.controlLoading(false))
        }
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">New category</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to ='/category'>category</Link></li>
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
                                            <label className='form-label'>Name:</label>
                                            <input  {...register('name',{ required:'Name is required.'})} type='text' className='form-control' placeholder='Enter name'/>
                                            {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <label className='form-label'>Description:</label>
                                            <input {...register('description',{ required:'Description is required.'})} type='text' className='form-control' placeholder='Enter description'/>
                                            {errors.description && <p style={{color:'red'}}>{errors.description.message}</p>}
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

export default CategoryAdd