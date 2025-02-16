import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import './header.css';
import Logo from './Logo/Final Logo_DOCnep.png';
const Header = () => {
  const [HeaderContent, setHeaderContent] = useState();
  const [HeaderContent2, setHeaderContent2] = useState();

  const logostyle = {
    width: '100px',
    height: '100px'
  }

  useEffect(()=> {
    if (localStorage.getItem("token") !== undefined && localStorage.getItem("role") === "user") {
      setHeaderContent (
        <>
        <div className='header_nav'>
                <Link to='/' className='header_links active'>Home</Link>
                <Link to='/getappointment' className='header_links'>Get Appointment</Link>
                <Link to='/labtests' className='header_links'>Labtests</Link>
                <Link to='/madicaluses' className='header_links'>Madicine Uses</Link>
                <Link to='/clinicalsuplies' className='header_links'>Clinical Suplies</Link>
                <Link to='/madicalpackages' className='header_links'>Madical Packages</Link>
                <Link to='/search' className='header_links'>Search</Link>
                <Link  className='header_links dropdown'>
                Settings
                <div className="dropdown-content">
                            <Link to="/changepassword" className='dropdown-item .first'>Change Password</Link>
                            <Link to="/editprofile" className='dropdown-item'>Edit Profile</Link>
                </div>
                </Link>
                <Link to='/cart' className='header_links'>Cart</Link>
                <Link to='/logout' className='header_links'>Logout</Link>
        </div>  
        </>
      )
    } 

  

    else if (localStorage.getItem("token") !== undefined && localStorage.getItem("role") === "admin") {
      setHeaderContent(<>
       <div className='header_nav'>
                <Link to='/' className='header_links active'>Home</Link>
                <Link to='/getappointment' className='header_links'>Get Appointment</Link>
                <Link to='/labtests' className='header_links'>Labtests</Link>
                <Link to='/madicaluses' className='header_links'>Madicine Uses</Link>
                <Link to='/clinicalsuplies' className='header_links'>Clinical Suplies</Link>
                <Link to='/madicalpackages' className='header_links'>Madical Packages</Link>

                <Link  className='header_links dropdown'>
                Add Content
                <div className="dropdown-content">
                            <Link to="/adddoctor" className='dropdown-item .first'>Add Doctor</Link>
                            <Link to="/adddisease" className='dropdown-item'>Add Dieases</Link>
                            <Link to="/addtests" className='dropdown-item'>Add Tests</Link>
                            <Link to="/addpackage" className='dropdown-item'>Add Package</Link>
                            <Link to="/addclinicalsuplies" className='dropdown-item'>Add Clinical Supplies</Link>
                </div>
                </Link>
                
                <Link  className='header_links dropdown'>
                Settings
                <div className="dropdown-content">
                            <Link to="/changepassword" className='dropdown-item .first'>Change Password</Link>
                            <Link to="/editprofile" className='dropdown-item'>Edit Profile</Link>
                            <Link to="/manageusers" className='dropdown-item'>Manage Users</Link>
                </div>
                </Link>
                

                <Link to='/logout' className='header_links'>Logout</Link>
        </div>  
      </>)
  }

    else {
      setHeaderContent (
        <>
        <div className='header_nav'>
                <Link to='/' className='header_links active'>Home</Link>
                <Link to='/getappointment' className='header_links'>Get Appointment</Link>
                <Link to='/labtests' className='header_links'>Labtests</Link>
                <Link to='/madicaluses' className='header_links'>Madicine Uses</Link>
                <Link to='/clinicalsuplies' className='header_links'>Clinical Suplies</Link>
                <Link to='/madicalpackages' className='header_links'>Madical Packages</Link>
                <Link to='/login' className='header_links'>Login</Link>
                <Link to='/search' className='header_links'>Search</Link>
                <Link to='/cart' className='header_links'>Cart</Link>
                <Link to='/register' className='header_links'>Register</Link>
        </div>  
        </>
      )
    }
  },[]);
  return (
    <>
    <div className='header'>
        <div className='header_logo'>
            <img src={Logo} style={logostyle}/>
        </div> 
        {HeaderContent}
    </div>
    </>
  )
}

export default Header;
