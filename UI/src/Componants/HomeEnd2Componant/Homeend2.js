import React from 'react';
import homeend2img1 from './Homeend2img/219@2x.webp';
import './Homeend2.css';

const HomeEnd2 = () => {
  return (
    <div className='homeEnd2_container'>
      <div className='homeEnd2_left'>
        <h2>GETTING APPOINTMENT</h2>
        <h2>HAS NEVER BEEN THIS</h2>
        <h2>EASY</h2>
        <p className='homeEnd2_text'>
          From all over the world, we are committed to providing the best consultation from the best doctors around the globe. So, pick up your phone and book your appointment to understand what your body truly needs.
        </p>
      </div>
      <div className='homeEnd2_right'>
        <img src={homeend2img1} alt='Appointment Illustration' className='homeEnd2_img' />
      </div>
    </div>
  );
};

export default HomeEnd2;