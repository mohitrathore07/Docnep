import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './showdisease.css';
import { Link } from "react-router-dom";
import { _adddiseaseapiurl } from "../../Api.url";

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

const ShowDisease = () => {
  const [DiseaseDetails, setDiseaseDetails] = useState([]);

  useEffect(() => {
    axios.get(_adddiseaseapiurl + "fetch")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDiseaseDetails(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
          setDiseaseDetails([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching disease details:", error);
        setDiseaseDetails([]);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: DiseaseDetails.length > 1,
    autoplay: true,
    speed: 500,
    slidesToShow: Math.min(3, DiseaseDetails.length),
    slidesToScroll: 1,
    initialSlide: 0,
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
          {DiseaseDetails.length > 0 ? (
            DiseaseDetails.map((row, index) => (
              <div key={index} style={{ backgroundColor: 'red' }} className="show-disease">
                <img src={`../assets/uploads/diseaseimage/${row.Diseaseiconnm}`} style={imgstyle} alt="disease" />
                <div className="show-disease-content">
                  <h2 className="dr-name">{row.DiseaseName}</h2>
                  <p className="dr-details">Details: {row.Details}</p>
                </div>
                <div className="btn-doctor">
                  <Link to='/getappointment'>
                    <button className="show-doctor-btn">Book Appointment</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No disease details available.</p>
          )}
        </Slider>
      </div>
    </>
  );
};

export default ShowDisease;
