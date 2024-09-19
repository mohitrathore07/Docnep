import React from 'react'
import './getappointment.css';
import GetAppointment1 from '../getappointment1componant/getappointment1';
import OurDoctors from '../OurDoctorComponant/OurDoctor';
import Diseases from '../OurDiseasesComponant/ourdisease';


const GetAppointment = () => {
  return (
    <>
    <div className='get-appointment-main'>
      <GetAppointment1/>
      <OurDoctors/>
      <Diseases/>
    </div>
    </>
  )
}

export default GetAppointment
