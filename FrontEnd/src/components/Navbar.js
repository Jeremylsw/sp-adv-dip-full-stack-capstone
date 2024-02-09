import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login, register, selectAuthentication } from '../authenticationReducer';

const Navbar = () => {
    const dispatch = useDispatch();
    const authentication = useSelector(selectAuthentication);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">SP Travel</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-3">
                        <li className="nav-item">
                            <Link to="/" className={authentication === 'login' ? 'nav-link active' : 'nav-link'} onClick={() => {
                                dispatch(login())
                            }}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className={authentication === 'register' ? 'nav-link active' : 'nav-link'} onClick={() => {
                                dispatch(register())
                            }}>Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;