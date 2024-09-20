import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Showdoctor.css';
import { _adddoctorapiurl } from "../../Api.url";
import { Link } from "react-router-dom";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "black" }}
      onClick={onClick}
    />
  );
}

const ShowDoctor = () => {
  const [DrDetails, setDrDetails] = useState([]);

  useEffect(() => {
    axios.get(_adddoctorapiurl + "fetch")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDrDetails(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
          setDrDetails([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
        setDrDetails([]);
      });
  }, []);

  const settings = {
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
    objectFit: "cover", // Changed to cover for better image scaling
  };

  return (
    <div className="showdoctor-container">
      <Slider {...settings}>
        {
          DrDetails.length > 0 ? (
            DrDetails.map((row, index) => (
              <div key={index} style={{ backgroundColor: 'red' }} className="show-doctor">
                <img 
                  src={`../assets/uploads/doctorimage/${row.Driconnm}`} 
                  style={imgstyle} 
                  alt={`${row.DrName}'s profile`}
                />
                <div className="show-doctor-content">
                  <h2 className="dr-name" style={{ textTransform: 'uppercase' }}>{row.DrName}</h2>
                  <p className="dr-details">&#36; {row.DrConsultancyFee || 'Consultancy Fee Not Available'}</p>
                  <p className="dr-details dr-specialization">{row.DrSpecialization || 'Specialization Not Available'}</p>
                  <p className="dr-details">Address: {row.DrAddress || 'Address Not Available'}</p>
                  <p className="dr-details">Details: {row.DrDetails || 'No Details Available'}</p>
                  <p className="dr-details">Location: {row.DrLocation || 'Location Not Available'}</p>
                </div>
                <div className="btn-doctor">
                  <Link to="/getappointment">
                    <button className="show-doctor-btn">Get Appointment</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No doctor details available.</p>
          )
        }
      </Slider>
    </div>
  );
};

export default ShowDoctor;
