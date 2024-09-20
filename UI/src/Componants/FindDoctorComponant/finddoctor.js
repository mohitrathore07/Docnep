import React, { useEffect, useState } from "react";
import "./finddoctor.css";

import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { _adddoctorapiurl } from "../../Api.url";

const FindDoctor = () => {
    const params = useParams();

    const [drdetails , setDrDetails] = useState([]);

  const imgstyle = {
    width: "250px",
    height: '450px',
    objectFit: "contain",
  };

  const btnstyle = {
    width: '240px',
    height: '50px'
  }
  
  useEffect(()=>{
    axios.get(_adddoctorapiurl+"fetch?DrSpecialization="+params.Specialization).then((response)=>{        
        setDrDetails(response.data.data);
    }).catch((error)=>{
        console.log(error);
    })
  },[]);

  return (
    <>
    <div className="find-doctor-component"> 
      <div className="find-doctor-container">
    { 
     (drdetails || []).map((row) => {
      <div className="find-doctor-details">
      <img src={`../assets/uploads/doctorimage/${row.Driconnm}`} style={imgstyle}></img>

             <div className="find-doctor-content">

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
})}
      </div>
    </div>
  </>
  
  );
};

export default FindDoctor;


/* 
 drdetails.map((row)=>{
            return (
             <>
             <div className="find-doctor-details">
             <img src={`../assets/uploads/doctorimage/${row.Driconnm}`} style={imgstyle}></img>

                    <div className="find-doctor-content">

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
             </> 
            )
          })
*/