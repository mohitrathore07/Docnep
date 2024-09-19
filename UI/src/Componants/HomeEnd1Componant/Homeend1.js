import React from 'react'
import homeendimg1 from './Homeend1img/218@2x.webp';
import homeendimg2 from './Homeend1img/247@2x.webp';
import homeendimg3 from './Homeend1img/248.webp';
import {Link} from 'react-router-dom';

const HomeEnd1 = () => {
  return (
    <>
    <div className='home1' style={{marginTop: '100px', marginBottom: '100px'}}>
        <div className='home1_left'>
        <img src={homeendimg1} alt='' width={800} height={500}/>
        </div>
        <div className='home1_right' style={{marginLeft: '80px'}}>
        <img src={homeendimg2} alt='' width={520} height={400}/>
        <Link to='/clinicalsuplies'>
        <img src={homeendimg3} alt='' width={280} height={50} style={{marginLeft:'15px', marginBottom: '15px'}}/>
        </Link>
        </div>
    </div> 
    </>
  )
}

export default HomeEnd1
