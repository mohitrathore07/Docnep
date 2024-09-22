import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ourdisease.css';
import { _adddiseaseapiurl} from "../../Api.url";
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

const Diseases = () => {
  const [ Disease,  setDisease] = useState([]);
  const [filteredDrDetails, setFilteredDrDetails] = useState([]);
  const [filter , setFilter] = useState('all');

  useEffect(()=>{
    axios.get(_adddiseaseapiurl + "fetch").then((response)=>{
      setDisease(response.data);
      setFilteredDrDetails(response.data); 
    }).catch((error)=>{
        console.error(error);
        setDisease([]);
    })
  },[]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredDrDetails(Disease);
    } 
    else {
      const filteredData = Disease.filter(e => e.Specialization === filter);
      

      setFilteredDrDetails(filteredData);

    }
  }, [filter, Disease]);


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
    width: "350px",
    height: "350px",
    objectFit: "content",
  };

  return (
    <>
      <div className="OurDoctor-container">

        <div className="our-doctor-heading">

            <div>

                <h1 style={{color: '#EE4C7C'}}>Disease</h1>
                <div className="get-appointment-1-content-1">Find the doctor as per the disease.</div>

            </div>

            <div className="our-doctor-filtersection">

                <h1 style={{color: '#EE4C7C'}}>Fiter</h1>
                <select class="form-control" value={filter} onChange={e => setFilter(e.target.value)} style={{height: '40px', paddingLeft: '10px'}} required >
                         
                            <option value='all'>All</option>
                            <option value='alphaviruses'>Alphaviruses</option>
                            <option value='alzheimersdisease'>Alzheimer's Disease</option>
                            <option value='arboviralencephalitis'>Arboviral Encephalitis</option>
                </select>

            </div>
        </div>

        <Slider {...settings}>
          {
           filteredDrDetails.map((row)=>{
              return ( 
            <div style = {{backgroundColor:'red'}} className="show-disease">

                <img src={`${process.env.PUBLIC_URL}/assets/uploads/diseaseimage/${row.Diseaseiconnm}`} style={imgstyle}></img>

                <div className="get-appointment-show-doctor-content">

                  <h2 className="getA-doctor-details getA-drName" style={{textTransform:'uppercase'}}>{row.DiseaseName}:</h2>
                  <p className="getA-doctor-details">{row.Details}</p>

                </div>

                <div className="btn-doctor" >
                <Link to={`/finddoctor/${row.Specialization}`}>
                  <button className="show-doctor-btn">Find Doctor</button>
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

export default Diseases;
