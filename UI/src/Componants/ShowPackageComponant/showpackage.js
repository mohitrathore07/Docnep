import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './showpackage.css';
import {_addpackageapiurl, _addtestapiurl } from "../../Api.url";
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

const ShowPackage = () => {
  const [ Package,  setPackage] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [filter , setFilter] = useState('all');

  useEffect(()=>{
    axios.get(_addpackageapiurl + "fetch").then((response)=>{
      setPackage(response.data);
      setFilteredDetails(response.data); 
    }).catch((error)=>{
        setPackage([]);
        console.error(error);
    })
  },[]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredDetails(Package);
    } 
    else {
      const filteredData = Package.filter(e => e.Testtype === filter);
      setFilteredDetails(filteredData);
    }
  }, [filter, Package]);


  var settings = {
    dots: true,
    infinite: filteredDetails.length > 1,
    autoplay: true,
    speed: 500,
    slidesToShow: Math.min(3, filteredDetails.length),
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <Arrow   className="slick-nextD" />,
    // prevArrow: <Arrow className="slick-prevD" />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, filteredDetails.length),
          slidesToScroll: 1,
          infinite: filteredDetails.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: Math.min(1, filteredDetails.length),
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const imgstyle = {
    width: "378px",
    height: "350px",
    objectFit: "content",

  };

  return (
    <>
      <div className="OurDoctor-container">

        <div className="our-doctor-heading">

            <div>

                <h1 style={{color: '#EE4C7C'}}>Popular Packages</h1>
                <div className="get-appointment-1-content-1">All the checks to keep your body healthy..</div>

            </div>

            <div className="our-doctor-filtersection">

                <h1 style={{color: '#EE4C7C'}}>Fiter</h1>
                <select class="form-control" value={filter} onChange={e => setFilter(e.target.value)} style={{height: '40px', paddingLeft: '10px'}} required >
                         
                            <option value='all'>All</option>
                            <option value='blood test'>Blood Test</option>
                            <option value='blood culture'>Blood Culture</option>
                            <option value='biospy'>Biospy</option>

                </select>

            </div>
        </div>

        <Slider {...settings}>
          {
           filteredDetails.map((row)=>{
              return ( 
            <div style = {{backgroundColor:'red'}} className="show-disease">

                <img src={`../assets/uploads/packageimages/${row.Packageiconnm}`} style={imgstyle}/>

                <div className="get-appointment-show-package-content">

                  <h2 className="getA-doctor-details getA-drName">{row.PackageName}:</h2>
                  <p className="getA-doctor-details">Fees: {row.Fees}</p>
                  <p className="getA-doctor-details">Discount: {row.PDiscount}</p>
                  <p className="getA-doctor-details">Details: {row.Details}</p>

                </div>

                <div className="btn-doctor" >
                  <Link to = {`/buyproduct/${row._id}`}>
                  <button className="show-doctor-btn">Book Now</button>
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

export default ShowPackage;
