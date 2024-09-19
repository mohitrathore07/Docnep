import React, { useState, useRef } from "react";
import "./Addtest1.css";
import axios from "axios";
import { _addtestapiurl } from "../../Api.url";

const AddTests = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [Details, setDetails] = useState("");
  const [Testname, setTestName] = useState("");
  const [Fees, setFees] = useState("");
  const [Testtype, setTesttype] = useState("");

  const fileInputRef = useRef(null);

  const mystyle = {
    width: "100%",
    height: "100px",
    fontSize: "18px",
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("TestName", Testname);
    formData.append("Details", Details);
    formData.append("Testicon", file);
    formData.append("Testtype", Testtype);
    formData.append("Fees", Fees);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(_addtestapiurl + "save", formData, config)
      .then((response) => {
        setOutput("Test added successfully...");
        setTestName("");
        setDetails("");
        setFees("");
        setTesttype("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      })
      .catch((error) => {
        setOutput("There's a problem, please re-check the details.");
      });
  };

  return (
    <>
      <div className="add-doctor-section">
        <div className="doctor-add">
          <h1 className="dr-heading">Add Tests Details Here</h1>
          <p style={{ color: "green" }}>{output}</p>
          <form className="doctor-add-form" onSubmit={handleSubmit}>
            <div className="fields">
              <div>
                <label htmlFor="testname">Test Name:</label>
                <input
                  type="text"
                  id="testname"
                  placeholder="Enter Test Name here"
                  value={Testname}
                  onChange={(e) => setTestName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="test-fees">Fees:</label>
                <input
                  type="text"
                  id="testfee"
                  placeholder="Enter test fee"
                  value={Fees}
                  onChange={(e) => setFees(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="test-type">Test Type:</label>
                <input
                  type="text"
                  id="testtype"
                  placeholder="Enter test type"
                  value={Testtype}
                  onChange={(e) => setTesttype(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="testimg">Test Images:</label>
                <input
                  type="file"
                  onChange={handleChange}
                  ref={fileInputRef}
                  required
                />
              </div>
            </div>

            <div className="dr-fields">
              <label htmlFor="testdetails">Test Details:</label>
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

export default AddTests;
