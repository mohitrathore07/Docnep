import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './showdisease.css';
import { Link } from "react-router-dom";

import { _adddiseaseapiurl } from "../../Api.url";

function  Arrow (props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "black" }}
      onClick={onClick}
    />
  );
}

const ShowDisease = () => {
  const [ DiseaseDetails , setDiseaseDetails] = useState([]);

  useEffect(()=>{
    axios.get(_adddiseaseapiurl + "fetch").then((response)=>{
      setDiseaseDetails(response.data);
    }).catch((error)=>{
      setDiseaseDetails('no content');
    })
  },[]);

  var settings = {
    dots: true,
    infinite: DiseaseDetails.length > 1,
    autoplay: true,
    speed: 500,
    slidesToShow: Math.min(3, DiseaseDetails.length),
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <Arrow   className="slick-nextD" />,
    // prevArrow: <Arrow className="slick-prevD" />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
    height: "350px",
    objectFit: "content",

  };

  return (
    <>
      <div className="showdisease-container">
        <Slider {...settings}>
          {
            DiseaseDetails.map((row)=>{
              return ( 
            <div style = {{backgroundColor:'red'}} className="show-disease">

                <img src={`../assets/uploads/diseaseimage/${row.Diseaseiconnm}`} style={imgstyle}></img>

                <div className="show-disease-content">

                  <h2 className="dr-name">{row.DiseaseName}</h2>
                  <p className="dr-details">Detials: {row.Details}</p>

                </div>

                <div className="btn-doctor">
                <Link to='/getappointment'>
                  <button className="show-doctor-btn">Book Appointment</button>
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

export default ShowDisease;
