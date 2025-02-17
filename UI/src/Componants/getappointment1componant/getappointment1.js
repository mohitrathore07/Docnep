import React from 'react';
import './getappointment1.css';
import GetAppointment1img from './getappintmentimg/454@2x.webp';
import GetAppointment1imgbtn from './getappintmentimg/455@2x.webp';

const GetAppointment1 = () => {
    return (
        <div className='get-appointment-1'>
            <img src={GetAppointment1img} className='imgstyle' alt="Background" />

            <div className='get-appointment-1-content'>
                <div className='get-appointment-1-content-1'>Skip The Travel!</div>

                <div className='get-appointment-1-content-2'>
                    <h2>You Can Take Online</h2>
                    <h2>Consultaion Just</h2>
                    <h2>Here.</h2>
                </div>

                <div className='get-appointment-1-content-1'>
                    100’s Of Doctors are here on your hand.
                </div>

                <div className='get-appointment-1-content-4'>
                    <img src={GetAppointment1imgbtn} className='imgbtnstyle' alt="Button" />
                </div>

                <div className='get-appointment-1-content-5'>
                    Verified Doctors : Digital Prescription : Free Followup
                </div>
            </div>
        </div>
    );
};

export default GetAppointment1;