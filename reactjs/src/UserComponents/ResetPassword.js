import React, { useState } from 'react';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Xác thực mật khẩu
    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu mới không khớp.');
      return;
    }

    // Gọi API đổi mật khẩu (thay thế bằng logic thực tế)
    console.log('Đang đổi mật khẩu...');

    // Xóa thông báo lỗi sau khi submit
    setErrorMessage(null);
  };

  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        ...
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          ...
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Đổi mật khẩu</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Mật khẩu hiện tại:</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Mật khẩu mới:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
              </form>
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            ...
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
