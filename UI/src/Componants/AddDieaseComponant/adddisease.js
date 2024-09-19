import React, { useState, useRef } from "react";
import "./adddisease.css";
import axios from "axios";
import { _adddiseaseapiurl } from "../../Api.url";

const AddDisease = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [Details, setDetails] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [Specialization, setSpecialization] = useState("");

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
    formData.append("Details", Details);
    formData.append("Diseaseicon", file);
    formData.append("DiseaseName", diseaseName);
    formData.append("Specialization", Specialization);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(_adddiseaseapiurl + "save", formData, config);
      setOutput("Disease added successfully...");
      setDetails("");
      setDiseaseName("");
      setSpecialization("");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      setOutput("There was a problem, please re-check the details.");
    }
  };

  return (
    <>
      <div className="add-doctor-section">
        <div className="doctor-add">
          <h1 className="dr-heading">Add Disease Details Here</h1>
          <p style={{ color: 'green' }}>{output}</p>
          <form className="doctor-add-form" onSubmit={handleSubmit}>
            <div className="fields">
              <div>
                <label htmlFor="diseasename">Disease Name:</label>
                <input
                  type="text"
                  id="dname"
                  placeholder="Enter Disease Name here"
                  value={diseaseName}
                  onChange={(e) => setDiseaseName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="drspecialization">Specialization:</label>
                <input
                  type="text"
                  id="drspecialization"
                  placeholder="Enter Specialization"
                  value={Specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="Diseaseimg">Disease Images:</label>
                <input 
                  type="file" 
                  onChange={handleChange} 
                  ref={fileInputRef} 
                  required
                />
              </div>
            </div>

            <div className="dr-fields">
              <label htmlFor="diseasedetails">Disease Details:</label>
              <textarea
                style={mystyle}
                value={Details}
                onChange={(e) => setDetails(e.target.value)}
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

export default AddDisease;
  