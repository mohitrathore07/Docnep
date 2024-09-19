import React, { useState, useRef } from "react";
import "./AddPackage.css";
import axios from "axios";
import { _addpackageapiurl } from "../../Api.url";

const AddPackage = () => {
  const [Fees, setFees] = useState("");
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [Details, setDetails] = useState("");
  const [PDiscount, setPDiscount] = useState("");
  const [Packagename, setPackageaName] = useState("");

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
    formData.append("Fees", Fees);
    formData.append("Details", Details);
    formData.append("Packageicon", file);
    formData.append("PDiscount", PDiscount);
    formData.append("PackageName", Packagename);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(_addpackageapiurl + "save", formData, config)
      .then((response) => {
        setOutput("Package added successfully...");
        setFees("");
        setDetails("");
        setPDiscount("");
        setPackageaName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      })
      .catch((error) => {
        console.log(error);
        setOutput("There's a problem, please re-check the details.");
      });
  };

  return (
    <>
      <div className="add-doctor-section">
        <div className="doctor-add">
          <h1 className="dr-heading">Add Package Details Here</h1>
          <p style={{ color: "green" }}>{output}</p>
          <form className="doctor-add-form" onSubmit={handleSubmit}>
            <div className="fields">
              <div>
                <label htmlFor="packagename">Package Name:</label>
                <input
                  type="text"
                  id="packagename"
                  placeholder="Enter Package Name here"
                  value={Packagename}
                  onChange={(e) => setPackageaName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="packagefee">Fees:</label>
                <input
                  type="number"
                  id="packagefee"
                  placeholder="Enter Package fee"
                  value={Fees}
                  onChange={(e) => setFees(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="packagediscount">Package Discount:</label>
                <input
                  type="number"
                  id="packagediscount"
                  placeholder="Enter Package Discount"
                  value={PDiscount}
                  onChange={(e) => setPDiscount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="packageimg">Package Images:</label>
                <input
                  type="file"
                  id="packageimg"
                  onChange={handleChange}
                  ref={fileInputRef}
                  required
                />
              </div>
            </div>

            <div className="dr-fields">
              <label htmlFor="packagedetails">Package Details:</label>
              <textarea
                style={mystyle}
                id="packagedetails"
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

export default AddPackage;
