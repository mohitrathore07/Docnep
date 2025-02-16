import React from 'react';
import './Madicineuses.css';
import img1 from './madicineimg/498@2x.webp';

const Madicineuses = () => {

    const imgstyle = {
        width: '460px',
        height: '300px'
    }

  return (
    <div className='madicine-uses-main'>
        <div className='madicine-uses-main-home'>
                <img src={img1} alt='img' style={imgstyle}/>
                <div >
                    <h2 className='main-home-heading'>FIND YOU A HOME NURSE</h2>
                    <p className='main-home-content '>At Home, No Problem book a home nurse if you need, they will help you with your medics your rest and all you have to pay is a little amount, resting on home can be a challenging task, Make it easy with us.</p>
                </div>
                <div style={{marginLeft:'45px'}}>


                <div className="btn-doctor">
                <h2 className='main-home-heading' style={{color: '#EE4C7C'}}>Rs. 2125</h2>
                <p style={{lineHeight:'100px' , fontSize: '21px'}}>Week</p>
                  <button className="show-doctor-btn">Book Now</button>
                </div>
                </div>
        </div>

        <div className='madicine-home-blogs'>
            
        </div>
    </div>
  )
}

export default Madicineuses
