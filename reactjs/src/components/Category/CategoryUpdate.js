import React, { useEffect,useState } from 'react'
import {useForm} from 'react-hook-form'
import {Link,useNavigate,useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from '../../helpers/Api';
import { toast } from 'react-toastify'

const CategoryUpdate = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [categoryData, setCategoryData] = useState({})
    console.log("id category =>", params.id)
    const {register, setValue,handleSubmit, formState:{errors}} = useForm()

    useEffect(()=>{
        dispatch(actions.controlLoading(true))
        try {
            const getDetailCategory = async() =>{
                const res = await requestApi(`/category/${params.id}`,'GET')
                console.log("res =>",res)
                dispatch(actions.controlLoading(false))
                const fields=['name','description']
                
                fields.forEach(field => {

                    setValue(field, res.data[field])
                })
                
                dispatch(actions.controlLoading(false))
    
            }
            getDetailCategory()
        } catch (error) {
            console.log("error=>",error)
            dispatch(actions.controlLoading(false))
            
        }
    })

    const handleSubmitFormUpdate = async(data) => {
        console.log("data =>",data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/category/${params.id}`,'PUT',data,'json')
            console.log('res =>',res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật thể loại thành công !!!',{position:'top-center',autoClose: 2000})
            setTimeout(()=> navigate('/category'), 3000)
        } catch (error) {
            console.log("error=>",error)
            dispatch(actions.controlLoading(false))
            
        }
    }
  return (
    <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Update category</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                        <li class="breadcrumb-item "><Link to ='/category'>Category</Link></li>
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
                                            <lable className='form-lable'>Name:</lable>
                                            <input  {...register('name',{ required:'Name is required.'})} type='text' className='form-control' placeholder='Enter name'/>
                                            {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
                                        </div>
                                        <div className='mb-3 mt-3'>
                                            <lable className='form-lable'>Description:</lable>
                                            <input {...register('description',{ required:'Description is required.'})} type='text' className='form-control' placeholder='Enter description'/>
                                            {errors.description && <p style={{color:'red'}}>{errors.description.message}</p>}
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

export default CategoryUpdate