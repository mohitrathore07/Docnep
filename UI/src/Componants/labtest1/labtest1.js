import React from 'react'
import './labtest1.css';
import Labtest1img from './labtest1img/405@2x.webp';

const Labtest1 = () => {

    const imgstyle = {
        width : '100%',
        height: '100%',
    }
  return (
    <>
    <div className='labtest-1-main'>
        <img src={Labtest1img} style={imgstyle}/>
        <div className='labtest-1-content get-appointment-1-content-5'>
        Book Labtests : XRAY : Bloot tests etc.
        </div>
    </div>
    </>
  )
}

export default Labtest1
