import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* <footer className="footer text-faded text-center py-4">
       
         
            <div className='copyright py-4 text-center text-dark'>
              <div className='container'>
                <small>Copyright © Your Website 2024</small>
              </div>
            </div>
           
         
        
      </footer> */}
      <footer className='copyright py-4 text-center text-dark'>
        <div class="container">
          <div class="social-links">
            <a href="https://www.youtube.com"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://github.com/tuananh081202/project1.git"><i class="fa-brands fa-github"></i></a>
            <a href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i></a>
          </div>
          <div className='card-body'>
            <div className='copyright py-4 text-center text-dark'>
              <div className='container'>
                <small>Thực tập: <strong className='text-primary' >Tạo blog CRUD</strong>. 71DCTT22005 - Đặng Tuấn Anh - 71DCTT23</small>
              </div>
            </div>
          </div>

          <div className='container'>
            <small>Copyright © Your Website 2024</small>

          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer