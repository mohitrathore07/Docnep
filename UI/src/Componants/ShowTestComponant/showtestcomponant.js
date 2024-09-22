  import React, { useEffect, useState } from "react";
  import Slider from "react-slick";
  import axios from 'axios';
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import './showtestcomponant.css';
  import {_addtestapiurl , _addcartapiurl } from "../../Api.url";
  import { useNavigate } from "react-router-dom";

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

  const ShowTest = () => {
    const [ Tests,  setTests] = useState([]);
    const [filteredDetails, setFilteredDetails] = useState([]);
    const [filter , setFilter] = useState('all');
    const navigate = useNavigate();
    useEffect(()=>{
      axios.get(_addtestapiurl + "fetch").then((response)=>{
        setTests(response.data);
        setFilteredDetails(response.data); 
      }).catch((error)=>{
          setTests([]);
          console.error(error);
      })
    },[]);

    useEffect(() => {
      if (filter === "all") {
        setFilteredDetails(Tests);
      } 
      else {
        const filteredData = Tests.filter(e => e.Testtype === filter);
        setFilteredDetails(filteredData);
      }
    }, [filter, Tests]);


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

    const handleSubmit = (item) => {
      const details = { ProductName: item.TestName,  collection_name: item.collection_name, email : localStorage.getItem("email") };
      axios.post(_addcartapiurl + "save" ,details).then((response)=>{
            navigate('/cart');
      }).catch((error)=>{
        console.error(error);
      })
    }

    return (
      <>
        <div className="OurDoctor-container">

          <div className="our-doctor-heading">

              <div>

                  <h1 style={{color: '#EE4C7C'}}>Popular Tests</h1>
                  <div className="get-appointment-1-content-1">Popular test By Our Customers.</div>

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

                  <img src={`${process.env.PUBLIC_URL}/assets/uploads/testimages/${row.Testiconnm}`} style={imgstyle}/>

                  <div className="get-appointment-show-test-content">

                    <h2 className="getA-doctor-details getA-drName">{row.TestName}:</h2>
                    <p className="getA-doctor-details">Details: {row.Details}</p>
                    <p className="getA-doctor-details">Fees: {row.Fees}</p>
                    <p className="getA-doctor-details">Type: {row.Testtype}</p>

                  </div>

                <div className="btn-doctor" >                
                      <button className="show-doctor-btn"  onClick={() => handleSubmit(row)}>Book Now</button>
                </div>
              </div>
              )})
            }


          </Slider>
        </div>
      </>
    );
  };

  export default ShowTest;
