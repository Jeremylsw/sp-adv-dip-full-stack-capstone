import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import { selectAuthentication } from './authenticationReducer';
import axios from 'axios';
import config from './config';
import { useNavigate } from "react-router-dom";

const SignInSignUpForm = () => {
    const [authenticationInfo, setAuthenticationInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const authentication = useSelector(selectAuthentication);
    const apiUrl = config.apiUrl;
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    return (
        <div className='container-fluid'>
            <Navbar activeLink='login' />
            <div className='container d-flex flex-column align-items-center'>
                {
                    loginError &&
                    <div class="alert alert-danger" role="danger">
                        {loginError}
                    </div>
                }
                <h5 className='mt-4'>{authentication === 'register' ? 'Create Account?' : 'Sign In'}</h5>
                <div></div>
                <form className='w-50'>
                    {authentication === 'register' && (
                        <div className='my-4'>
                            <label className='form-label' htmlFor='name'>
                                Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                id='name'
                                placeholder='Enter your name'
                                value={authenticationInfo.name}
                                onChange={e => {
                                    setAuthenticationInfo({ ...authenticationInfo, name: e.target.value })
                                }}
                            />
                        </div>
                    )}

                    <div className='my-4'>
                        <label className='form-label' htmlFor='email'>
                            Email address
                        </label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            id='email'
                            placeholder='Enter your email@'
                            value={authenticationInfo.email}
                            onChange={e => {
                                setAuthenticationInfo({ ...authenticationInfo, email: e.target.value })
                            }}
                        />
                    </div>
                    <div className='my-4'>
                        <label className='form-label' htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            id='password'
                            placeholder='Enter your password'
                            value={authenticationInfo.password}
                            onChange={e => {
                                setAuthenticationInfo({ ...authenticationInfo, password: e.target.value })
                            }}
                        />
                    </div>
                    <div>
                        <button
                            type='button'
                            className='btn btn-primary w-50'
                            onClick={() => {
                                if (authentication == 'login') {
                                    axios.post(`${apiUrl}/admin/login`, authenticationInfo)
                                        .then(res => {
                                            // console.log(res.data);
                                            const token = res.data;
                                            if (token) {
                                                localStorage.setItem('authToken', token);
                                                navigate('/entityManager');
                                            }
                                        })
                                        .catch(err => {
                                            console.error('Error fetching data:', err);
                                            setLoginError(`${err}`);
                                        })
                                }
                                else {
                                    axios.post(`${apiUrl}/admin/register`, authenticationInfo)
                                        .then(res => {
                                            // console.log(res.data);
                                            const token = res.data;
                                            if (token) {
                                                localStorage.setItem('authToken', token);
                                                navigate('entityManager');
                                            }
                                        })
                                        .catch(err => {
                                            console.error('Error fetching data:', err);
                                            setLoginError(`${err}`);
                                        })
                                }
                            }}
                        >
                            {authentication === 'login' ? 'Login' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInSignUpForm;
