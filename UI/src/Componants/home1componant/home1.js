import React, { useEffect, useState } from 'react'
import './home1.css';
import Homeimg1 from './home1_images/192@2x.webp';
import Homeimg2 from './home1_images/193@2x.webp';
import Homebtn1 from './home1_images/195@2x.webp';

const Home1 = () => {


  const [Home , setHomeContent] = useState();

  useEffect(()=>{

    if (localStorage.getItem("token") !== undefined && localStorage.getItem("role") === "user") {
      setHomeContent (
        <>
         <div className='home1'>
        <div className='home1_left'>
        <img src={Homeimg1} alt='' width={600} height={450}/>
        <img src={Homebtn1} alt='' width={280} height={50} style={{marginLeft:'15px'}}/>
        </div>
        <div className='home1_right'>
          
            <img src={Homeimg2} alt='' width={600} height={600}/>
           
        </div>
    </div>
        </>
      )
    } 

    
    else if (localStorage.getItem("token") !== undefined && localStorage.getItem("role") === "admin") {
      setHomeContent (
        <>
         <div className='home1'>
        <div className='home1_left'>
        <img src={Homeimg1} alt='' width={600} height={450}/>
        <img src={Homebtn1} alt='' width={280} height={50} style={{marginLeft:'15px'}}/>
        </div>
        <div className='home1_right'>
          
            <img src={Homeimg2} alt='' width={600} height={600}/>
            
        </div>
    </div>
        </>
      )
  }

    else {
      setHomeContent (
        <>
         <div className='home1'>
        <div className='home1_left'>
        <img src={Homeimg1} alt='' width={600} height={450}/>
        <img src={Homebtn1} alt='' width={280} height={50} style={{marginLeft:'15px'}}/>
        </div>
        <div className='home1_right'>
        
            <img src={Homeimg2} alt='' width={600} height={600}/>
            
        </div>
    </div>
        </>
      )
    }
  },[]);

  return (
    <>
    {Home}
    </>
  )
}

export default Home1
