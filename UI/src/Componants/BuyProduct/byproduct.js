import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import img from "./img/400@2x.webp";
import btn from "./img/402@2x.webp";
import { useParams } from "react-router-dom";
import axios from "axios";
import { _addpackageapiurl } from "../../Api.url";

const ByProduct = () => {
    const params = useParams();

    const [drdetails , setDrDetails] = useState([]);
  const imgstyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const btnstyle = {
    width: '240px',
    height: '50px'
  }
  
  useEffect(()=>{
    axios.get(_addpackageapiurl+"fetch?_id="+params._id).then((response)=>{        
        setDrDetails(response.data);
    }).catch((error)=>{
        console.log(error);
    })
  },[]);

  return (
    <>
      <div className="Appointment-main">
        <div className="appointment-img-content">
          <div className="ac-first">
            <h2>Professional</h2>
            <h2>Doctors are Waiting</h2>
            <h2>to Help.</h2>
          </div>

          <div className="get-appointment-1-content-1">
            <span style={{display:'block'}}>Experience the best consultation you </span>
            <span>need for your body and mind.</span>
          </div>

          <div className="ac_img">
            <img src={btn} style={btnstyle}/>
          </div>
        </div>

        <img src={img} style={imgstyle} />
      </div>
      <div className="App">
        <InlineWidget url="https://calendly.com/mohitrathore8269" />
      </div>

      <div className="appointment-form">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdoPna-4C8MSh1QXLQHAmaQOM11fxvYOcpmXvA18LrLb84hVg/viewform?embedded=true" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      </div>

      <div className="appointment-details">
        {
          drdetails.map((row)=>{
            return (
              <div className="appointment-details-content">
                <div className="appointment-content">Package Name: {row.PackageName}</div>
                <div className="appointment-content">Package Details:  {row.Details}</div>

                <div className="btn-doctor" >
                  <button className="show-doctor-btn">Continue to Payment__</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default ByProduct;
