import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OurDoctor.css';
import { _adddiseaseapiurl, _adddoctorapiurl } from "../../Api.url";
import { Link } from "react-router-dom";

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

const OurDoctors = () => {
  const [ OurDoctors , setOurDoctors] = useState([]);
  const [filteredDrDetails, setFilteredDrDetails] = useState([]);
  const [filter , setFilter] = useState('all');

  useEffect(()=>{
    axios.get(_adddoctorapiurl + "fetch").then((response)=>{
      setOurDoctors(response.data);
      setFilteredDrDetails(response.data); 
    }).catch((error)=>{
        console.error(error);
        setOurDoctors([]);
    })
  },[]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredDrDetails(OurDoctors);
    } 
    else {
      const filteredData = OurDoctors.filter(e => e.DrSpecialization === filter);

      setFilteredDrDetails(filteredData);
    }
  }, [filter, OurDoctors]);


  var settings = {
    dots: true,
    infinite: filteredDrDetails.length > 1,
    autoplay: true,
    speed: 500,
    slidesToShow: Math.min(3, filteredDrDetails.length),
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
    height: "400px",
    objectFit: "content",

  };

  return (
    <>
      <div className="OurDoctor-container">

        <div className="our-doctor-heading">

            <div>

                <h1 style={{color: '#EE4C7C'}}>Doctors</h1>
                <div className="get-appointment-1-content-1">Find the doctor as per your need.</div>

            </div>

            <div className="our-doctor-filtersection">

                <h1 style={{color: '#EE4C7C'}}>Fiter</h1>
                <select class="form-control" value={filter} onChange={e => setFilter(e.target.value)} style={{height: '40px', paddingLeft: '10px'}} required >
                <option value='all'>All</option>
                            <option value='Anesthesiologists'>Anesthesiologists</option>
                            <option value='cardiologists'>Cardiologists</option>
                            <option value='colonandrectalsurgeons'>Colon and Rectal Surgeons</option>
                </select>

            </div>
        </div>

        <Slider {...settings}>
          {
           filteredDrDetails.map((row)=>{
              return ( 
            <div style = {{backgroundColor:'red'}} className="show-disease">

                <img src={`../assets/uploads/doctorimage/${row.Driconnm}`} style={imgstyle}></img>

                <div className="get-appointment-show-doctor-content">

                  <h2 className="getA-doctor-details getA-drName" style={{textTransform:'uppercase'}}>{row.DrName}</h2>
                  <h2 className="getA-doctor-details">{row.DrSpecialization}</h2>
                  <h2 className="getA-doctor-details">&#36; {row.DrConsultancyFee}</h2>
                  <h2 className="getA-doctor-details">{row.DrAddress}</h2>
                  <p className="getA-doctor-details">Details: {row.DrDetails}</p>

                </div>

                <div className="btn-doctor" >
                  <Link to={`/appointment/${row._id}`}>
                  <button className="show-doctor-btn">Book Apointment</button>
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

export default OurDoctors;
