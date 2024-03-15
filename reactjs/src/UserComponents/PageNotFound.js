import React from 'react'
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className='text-center'>
        <img 
        src='https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png'
        alt='not-found'
        />
        <Link className='mt-2 d-block' to='/'><i className='fa fa-arrow-left me-1'></i>Return to Dashboard</Link>
    </div>
  )
}

export default PageNotFound;






