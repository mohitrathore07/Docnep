import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { _userapiurl } from '../../Api.url';
 
function Login () {
    let navigate = useNavigate();
    const [email , setEmail ]  = useState();
    const [password , setPassword ]  = useState();
    const [output ,  setOutput]  = useState();

    const handlesubmit = () => {
        const userdetails = {"email":email,"password":password};
        
        axios.post(_userapiurl+"login",userdetails).then((response)=>{
            let users = response.data.userDetails;
            localStorage.setItem('token',response.data.token);
            localStorage.setItem("name",users.name);
            localStorage.setItem("email",users.email);
            localStorage.setItem("_id",users._id);
            localStorage.setItem("city",users.city);
            localStorage.setItem("mobile",users.mobile);
            localStorage.setItem("address",users.address);
            localStorage.setItem("gender",users.gender);
            localStorage.setItem("info",users.info);
            localStorage.setItem("role",users.role);
            users.role==='admin'?navigate('/admin'):navigate('/user');
        }).catch((error)=>{
            setOutput("*Invalid user or varify ur account....");
            setEmail("");
            setPassword("");
        })
    }

    return (
        <>
          <div class="log_container">
            <div class="left-section">
                <h1>Help Us 24/7</h1>
                <h2>Welcome back</h2>
                <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                <img src="https://media.licdn.com/dms/image/C5612AQHhvBAZjanbsg/article-cover_image-shrink_600_2000/0/1633674492707?e=2147483647&v=beta&t=p7r8zSfIqOD6yAuN5JwgGjXh9xZL45NCtNhDk05KoKs" alt="Rocket Launch" />
            </div>
            <div class="right-section">
                <form action="#" id='form'>
                    <p style={{"color":"red"}}>{output}</p>
                    <label for="email" className='login_label' >Your Email</label>
                    <input type="text" id="email" name="email" placeholder="Enter your Email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label for="password" >Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your Password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type="button" id='logbtn' onClick={handlesubmit}>Login</button>

                    <Link to="/login" className='login-signup login_link'>Forgot password?</Link>

                    <a className="nav-link"><Link to="/register" className='login-signup'>Don't have an account?</Link></a>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;