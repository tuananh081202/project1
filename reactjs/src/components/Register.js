import React, { useState, useEffect } from 'react'
import requestApi from '../helpers/Api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [registerData, setRegisterData] = useState({})
    const [formErrors, setFormErrors] = useState({});
    const [isSummited, setIsSummited] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (event) => {
        let target = event.target;
        setRegisterData({
            ...registerData, [target.name]: target.value
        })
    }
    useEffect(() => {
        if (isSummited) {
            validateForm();
        }
    }, [registerData])

    const validateForm = () => {
        let isValid = true;
        const errors = {}
        if (registerData.first_name) {
            errors.first_name = "First name is required"
        }
        if (registerData.last_name) {
            errors.last_name = "Last name is required"
        }
        if (registerData.email === '' || registerData.email === undefined) {
            errors.email = "Please enter email"
        } else {
            let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerData.email);
            if (!valid) {
                errors.email = 'Email is not valid'
            }
        }
        if (registerData.password === '' || registerData.password === undefined) {
            errors.password = 'Password must be at least 8 characters'
        }
        else {
            let valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(registerData.password);
            if (!valid) {
                errors.password = 'Password is not valid'
            }
        }
        if (registerData.password !== registerData.confirmPassword) {
            errors.confirmPassword = 'Password don\'t match'
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false
        } else {
            setFormErrors({});
        }
        return isValid;
    }

    const onSummit = () => {
        console.log(registerData)
        let valid = validateForm();
        if (valid) {
            console.log('request register api')
            dispatch(actions.controlLoading(true))
            requestApi('/auth/register', 'POST', registerData).then((res) => {
                console.log('Registration successful!', res)
                dispatch(actions.controlLoading(false))
                navigate('/')
            }).catch(err => {
                dispatch(actions.controlLoading(false))
                console.log('err=>', err)
                if (typeof err.respone !== "undefined") {
                    if (err.respone.status !== 201) {
                        toast.error(err.respone.data.message, { position: "top-right" }
                        )
                    }
                } else {
                    toast.error("Server is down.Please try again !", { position: "top-center" })
                }
            })
        }

        setIsSummited(true)
    }
    return (
        <div id="layoutAuthentication" className='bg-primary'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="text" name='first_name' onChange={onChange} placeholder="Enter your first name" />
                                                        <label>First name</label>
                                                        {formErrors.first_name && <p style={{ color: 'red' }}>{formErrors.first_name}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" type="text" name='last_name' onChange={onChange} placeholder="Enter your last name" />
                                                        <label>Last name</label>
                                                        {formErrors.last_name && <p style={{ color: 'red' }}>{formErrors.last_name}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="email" name='email' onChange={onChange} placeholder="name@example.com" />
                                                <label>Email address</label>
                                                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="password" name='password' onChange={onChange} placeholder="Create a password" />
                                                        <label>Password</label>
                                                        {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" type="password" name='confirmPassword' onChange={onChange} placeholder="Confirm password" />
                                                        <label>Confirm Password</label>
                                                        {formErrors.confirmPassword && <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid">
                                                    <button className="btn btn-primary " type='button' onClick={onSummit}>Create Account</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to='/login'>Have an account? Go to login</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2024</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Register