import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import "./appointment.css";
import img from "./img/400@2x.webp";
import btn from "./img/402@2x.webp";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { _adddoctorapiurl } from "../../Api.url";

const Appointment = () => {
  const { _id } = useParams();
  const [drdetails, setDrDetails] = useState([]);


  
  useEffect(() => {
    axios
      .get(`${_adddoctorapiurl}fetch?_id=${_id}`)
      .then((response) => {
        setDrDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  }, [_id]);

  return (
    <div className="appointment-container">
      <div className="appointment-hero">
        <div className="appointment-hero-content">
          <h2>Professional Doctors are Waiting to Help.</h2>
          <p>
            Experience the best consultation you need for your body and mind.
          </p>
          <img src={btn} alt="Appointment Button" className="appointment-btn" />
        </div>
        <img src={img} alt="Appointment Hero" className="appointment-hero-img" />
      </div>

      <div className="calendly-widget">
        <InlineWidget url="https://calendly.com/mohitrathore8269" />
      </div>

      {/* <div className="appointment-form">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdoPna-4C8MSh1QXLQHAmaQOM11fxvYOcpmXvA18LrLb84hVg/viewform?embedded=true"
          width="700"
          height="520"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Appointment Form"
        >
          Loading…
        </iframe>
      </div> */}

    <div className="appointment-details">
      {drdetails.map((row, index) => {
        return (
            <div key={index} className="appointment-details-card">
              <div className="appointment-detail">
                <strong>Doctor Name:</strong> {row.DrName}
              </div>
              <div className="appointment-detail">
                <strong>Select Address:</strong> {row.DrAddress}
              </div>
              <Link to={`/payment`} state={{ "_idDr": row._id,"DrEmail": row.DrEmail, "amount": row.DrConsultancyFee}}>
                <button className="payment-btn">Continue to Payment</button>
              </Link>
            </div>
          );
        })}
      </div>;
    </div>
  );
};

export default Appointment;