import React, { useState, useRef } from "react";
import "./adddoctor.css";
import axios from "axios";
import { _adddoctorapiurl } from "../../Api.url";

const AddDoctor = () => {
  const [output, setOutput] = useState("");
  const [drName, setDrName] = useState("");
  const [drEmail, setDrEmail] = useState("");
  const [drFees, setDrFees] = useState("");
  const [Address, setAddress] = useState("");
  const [Details, setDetails] = useState("");
  const [drPhone, setDrPhone] = useState("");
  const [Location, setLocation] = useState("");
  const [drSpecialization, setDrSpecialization] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const mystyle = {
    width: "100%",
    height: "100px",
    fontSize: "18px",
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let formData = new FormData();
    formData.append("DrName", drName);
    formData.append("DrEmail", drEmail);
    formData.append("DrPhone", drPhone);
    formData.append("DrConsultancyFee", drFees);
    formData.append("DrSpecialization", drSpecialization);
    formData.append("DrAddress", Address);
    formData.append("DrLocation", Location);
    formData.append("DrDetails", Details);
    formData.append("Dricon", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(_adddoctorapiurl + "save", formData, config);
      setOutput("Doctor added successfully...");
      
      setDrName('');
      setDrEmail('');
      setDrPhone('');
      setDrFees('');
      setDrSpecialization('');
      setAddress('');
      setLocation('');
      setDetails('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      setOutput("There was a problem, please recheck the details.");
    }
  };

  return (
    <>
      <div className="add-doctor-section">
        <div className="doctor-add">
          <h1 className="dr-heading">Doctor Details Here</h1>
          <p style={{ color: "green" }}>{output}</p>
          <form className="doctor-add-form" onSubmit={handleSubmit}>
            <div className="fields">
              <div>
                <label htmlFor="drname">Doctor's Name:</label>
                <input
                  type="text"
                  id="dname"
                  placeholder="Enter Doctor's Name"
                  value={drName}
                  onChange={(e) => setDrName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="drEmail">Doctor's Email:</label>
                <input
                  type="email"
                  id="drEmail"
                  placeholder="Enter Doctor's Email"
                  value={drEmail}
                  onChange={(e) => setDrEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="drPhone">Doctor's Mobile Number:</label>
                <input
                  type="tel"
                  id="drPhone"
                  placeholder="Enter Mobile Number"
                  value={drPhone}
                  onChange={(e) => setDrPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="drSpecialization">Doctor's Specialization:</label>
                <input
                  type="text"
                  id="drSpecialization"
                  placeholder="Enter Doctor's Specialization"
                  value={drSpecialization}
                  onChange={(e) => setDrSpecialization(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="drFees">Consultancy Fees:</label>
                <input
                  type="number"
                  id="drFees"
                  placeholder="Enter Consultancy Fees"
                  value={drFees}
                  onChange={(e) => setDrFees(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="file">Doctor's Image:</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleChange}
                  required
                  ref={fileInputRef}
                />
              </div>
            </div>
            <div className="dr-fields">
              <label htmlFor="drAddress">Doctor's Address:</label>
              <textarea
                style={mystyle}
                id="drAddress"
                placeholder="Enter Doctor's Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="dr-fields">
              <label htmlFor="drDetails">Doctor's Details:</label>
              <textarea
                style={mystyle}
                id="drDetails"
                placeholder="Enter Doctor's Details"
                value={Details}
                onChange={(e) => setDetails(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="dr-fields">
              <label htmlFor="drLocation">Doctor's Location:</label>
              <textarea
                style={mystyle}
                id="drLocation"
                placeholder="Enter Doctor's Location"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="btns">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
