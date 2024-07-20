import React from 'react'
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
    const { auth, tokenData } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-body-secondary w-100" style={{width:"100%"}}>
        <div className="container-xxl">
            <a className="navbar-brand" href="/">   
                <img src={logo} alt="logo" style={{width: "35px", marginRight: "10px"}}/>
                <span className="fw-bold text-secondary">TaskHaven</span>
            </a>

            {/* toogle button for mobile navbar */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false"
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            {/* navbar links */}
            <div class="collapse navbar-collapse justify-content-end" 
            id="main-nav">
            <ul class="navbar-nav align-items-center">
                {auth? (
                    <>
                    <li className="nav-item my-1">
                        <span className="fw-bold text-secondary mx-4">Hi, {tokenData?.Name}</span>
                    </li>
                    <li class="nav-item ms-2 d-md-inline">
                        <button class="btn btn-secondary" onClick={logout}>Logout</button>
                    </li>
                    </>
                ) : (
                    <>
                    <li class="nav-item ms-2 d-md-inline my-1">
                        <button class="btn btn-secondary" onClick={handleLogin}>Login</button>
                    </li>
                    <li class="nav-item ms-2 d-md-inline">
                        <button class="btn btn-secondary" onClick={handleSignup}>SignUp</button>
                    </li>
                    </>
                )}
                
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar