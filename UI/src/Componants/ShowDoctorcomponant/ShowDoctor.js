import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Showdoctor.css';

import { _adddoctorapiurl } from "../../Api.url";
import { Link } from "react-router-dom";

function  Arrow (props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "black"  }}
      onClick={onClick}
    />
  );
}

const ShowDoctor = () => {
  const [ DrDetails , setDrDetails] = useState([]);

  useEffect(()=>{
    axios.get(_adddoctorapiurl+"fetch").then((response)=>{
      setDrDetails(response.data);
      
    }).catch((error)=>{
      setDrDetails('no content');
    })
  },[]);

  var settings = {
    // dots: true,
    infinite: DrDetails.length > 1,
    autoplay: true,
    speed: 500,
    slidesToShow: Math.min(3, DrDetails.length),
    slidesToScroll: 1,
    initialSlide: 0,
  

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const imgstyle = {
    width: "85%",
    height: "460px",
    objectFit: "content",

  };

  return (
    <>
      <div className="showdoctor-container">
        <Slider {...settings}>
          {
            (DrDetails || []).map((row)=>{
              return ( 
            <div style = {{backgroundColor:'red'}} className="show-doctor">
                  <img src={`../assets/uploads/doctorimage/${row.Driconnm}`} style={imgstyle}></img>

                  <div className="show-doctor-content">

                  <h2 className="dr-name" style={{textTransform: 'uppercase'}}> {row.DrName}</h2>

                  <p className="dr-details">&#36; {row.DrConsultancyFee}</p>
                  <p className="dr-details dr-specialization">{row.DrSpecialization}</p>
                  <p className="dr-details">Address: {row.DrAddress}</p>
                  <p className="dr-details">Detials: {row.DrDetails}</p>
                  <p className="dr-details">Location: {row.DrLocation}</p>
                  </div>
              
                <div className="btn-doctor">
                  <Link to='/getappointment'>
                  <button className="show-doctor-btn">Get Appointment</button>
                  </Link>
                </div>
            </div>
            )})
          }
        </Slider>
      </div>
    </>
  );
};

export default ShowDoctor;
