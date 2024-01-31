import React from 'react'
import { Link } from 'react-router-dom'
const Profile = () => {
  return (
    <div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Profile</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item "><Link to='/'>Dashboard</Link></li>
                <li class="breadcrumb-item active">Update avatar</li>
            </ol>
            <div className='card mb-4'>
                <div className='card-header'>
                    <div className='row mb-3'>
                        <div className='col-md-4'>
                            <img src={'../assets/img/default-avatar.jpg'} className='img-thumbnail rounded mb-2' alt='...'/>
                            <div className='input-file float-start'>
                                <label htmlFor='file' className='btn-file btn-sm btn btn-primary'>Brower Files</label>
                                <input id='file' type='file' accept='image/*'/>                            
                            </div>
                            <button className='btn btn-sm btn-success float-end'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
)
}

export default Profile