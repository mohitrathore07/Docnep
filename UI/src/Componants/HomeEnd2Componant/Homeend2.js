import React from 'react';
import homeend2img1 from './Homeend2img/219@2x.webp';
import './Homeend2.css';

const HomeEnd2 = () => {
  return (
    <>
    <div className='home1' style={{margin:'100px'}}>
        <div className='home1_left'>
          <h2>GETTING APPOINTMENT </h2>
          <h2>HAS NEVER BEEN THIS </h2>
          <h2>EASY</h2>
          <span className='homeend2'>From all over the world we are commited to provide the best </span>
          <span  className='homeend2'>consultaion from the best doctors around the globe, so get </span>
          <span  className='homeend2'>your phone up and book your appointment to know what your  </span>
          <span  className='homeend2'>body exactly want. </span>
        </div>
        <div className='home1_right' style={{marginRight: '150px'}}>
        <img src={homeend2img1} alt='' width={460} height={303} style={{ marginBottom: '15px'}}/>
        </div>
    </div> 
    </>
  )
}

export default HomeEnd2
