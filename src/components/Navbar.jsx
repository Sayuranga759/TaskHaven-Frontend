import React from 'react'
import logo from "../assets/logo.png";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

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
                {isLoggedIn ? (
                    <>
                    <li className="nav-item my-1">
                        <span className="fw-bold text-secondary mx-4">Hi, Sayuranga</span>
                    </li>
                    <li class="nav-item ms-2 d-md-inline">
                    <a href="/" class="btn btn-secondary">Logout</a>
                    </li>
                    </>
                ) : (
                    <>
                    <li class="nav-item ms-2 d-md-inline my-1">
                    <a href="/login" class="btn btn-secondary">Login</a>
                    </li>
                    <li class="nav-item ms-2 d-md-inline">
                    <a href="/signup" class="btn btn-secondary">SignUp</a>
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