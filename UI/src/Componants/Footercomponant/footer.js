import React from "react";
import { Link } from "react-router-dom";
import './footer.css';
import Copywrite from "../Copywritecomponant/copywrite";
import Logo from './Logo/Final Logo_DOCnep.png';

const Footer = () => {

  const logostyle = {
    width: '250px',
    height: '250px'
  }
  return (
    <>
      <footer className="footer">
        <div className="footer-section">
            
          <div className="footer-logo">
            <img src={Logo} style={logostyle}/>
          </div>
          
          <div className="footer-services">
            <h2>Our Services</h2>
            <div className="footer-links">
              <Link to="/x-rayc" className="f-links">X-RAY</Link>
              <Link to="/labtests" className="f-links">Labtests</Link>
              <Link to="/ayurvedicdoctors" className="f-links">Ayurvedic Doctors</Link>
              <Link to="/medicineuses" className="f-links">Medicine Uses</Link>
              <Link to="/nursingservies" className="f-links">Nursing Services</Link>
              <Link to="/trackyourperiods" className="f-links">Track Your Periods</Link>
              <Link to="/healthpackages" className="f-links">Health Packages</Link>
              <Link to="/medicalinstrumentsonrent" className="f-links">Medical Instrument on rent</Link>
              <Link to="/registerdoctor" className="f-links">Register as Doctor</Link>
            </div>
          </div>

          <div className="footer-sec">
            <Link to="/aboutus" className="f-links">About us</Link>
            <Link to="/contactus" className="f-links">Contact us</Link>
            <Link to="/faq" className="f-links">FAQ</Link>
            <Link to="/carrer" className="f-links">Carrer</Link>
          </div>

          <div className="footer-caption">
          <Link to="/gethealthtipsonemail" className="f-links">Get Health Tips on email</Link>
          <Link to="/subscribenewsletter" className="f-links">Subscribe Newsletter</Link>
          </div>
        </div>
      </footer>
      <Copywrite/>
    </>
  );
};

export default Footer;
