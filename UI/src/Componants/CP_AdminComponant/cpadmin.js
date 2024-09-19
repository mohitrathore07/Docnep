import { useState } from 'react';
import './cpadmin.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { _userapiurl } from '../../Api.url';
 
function CPAdmin () {
    let navigate = useNavigate();

    const [oldpass , setOldPass ]  = useState();
    const [newpass , setNewPass ]  = useState();
    const [confirmpass , setConfirmPass ]  = useState();
    const [output ,  setOutput]  = useState('');

    const handlesubmit = () => {
      axios.get(_userapiurl+"fetch?email="+localStorage.getItem("email")+"&password="+oldpass).then(()=>{
        if(newpass === confirmpass ) {
            let update_details = {"condition_obj": {"email":localStorage.getItem("email")}, "content_obj":{"password":newpass}};
            axios.patch(_userapiurl+"update",update_details).then(()=>{
                setOutput('password changed successfully...');
                setConfirmPass('');
                setNewPass('');
                setOldPass('');
            });
        }
        else {
        setOutput("New & Confirm Password Miss Match...");    
        setConfirmPass('');
        setNewPass('');
        }
      }).catch((error)=>{
        setOutput('Invalid Old  Password');
        setOldPass('');
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
                    <label for="opassword" className='login_label' >Old Password</label>
                    <input type="text" id="password" name="password" placeholder="Enter your Old Password" value={oldpass} onChange={e => setOldPass(e.target.value)} />

                    <label for="newpass" >New Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your New Password" value={newpass} onChange={e => setNewPass(e.target.value)} />

                    <label for="confirmpass" >Confirm Password</label>
                    <input type="password" id="password" name="password" placeholder="Confirm Password" value={confirmpass} onChange={e => setConfirmPass(e.target.value)} />

                    <button type="button" id='logbtn' onClick={handlesubmit}>Login</button>

                    <Link to="/login" className='login-signup login_link'>Forgot password?</Link>

                    <a className="nav-link"><Link to="/register" className='login-signup'>Don't have an account?</Link></a>
                </form>
            </div>
        </div>
        </>
    );
}

export default CPAdmin;