import React, { useState, useRef } from "react";
import "./addclinicalsupplies.css";
import axios from "axios";
import { _addclinicalsuppliesapiurl } from "../../Api.url";

const AddClinicalSupplies = () => {

  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [Details, setDetails] = useState("");
  const [Productname, setProductname] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductPrice, setProductprice] = useState("");

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
    formData.append("ProductName", Productname);
    formData.append("ProductCategory", ProductCategory);
    formData.append("Details", Details);
    formData.append("Producticon", file);
    formData.append("Productprice", ProductPrice);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(_addclinicalsuppliesapiurl + "save", formData, config);
      setOutput("Supplies added successfully...");
      
      // Reset form fields
      setFile(null);
      setProductname("");
      setDetails("");
      setProductCategory("");
      setProductprice("");
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
          <h1 className="dr-heading">Add Clinical Supplies Details Here</h1>
          <p style={{ color: 'green' }}>{output}</p>
          <form className="doctor-add-form" onSubmit={handleSubmit}>
            <div className="fields">
              <div>
                <label htmlFor="productname">Product Name:</label>
                <input
                  type="text"
                  id="productname"
                  placeholder="Enter Product Name here"
                  value={Productname}
                  onChange={(e) => setProductname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="productCategory">Product Category:</label>
                <input
                  type="text"
                  id="productCategory"
                  placeholder="Enter Product Category here"
                  value={ProductCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="productprice">Product Price:</label>
                <input
                  type="number"
                  id="productprice"
                  placeholder="Enter Product Price"
                  value={ProductPrice}
                  onChange={(e) => setProductprice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="productimg">Product Images:</label>
                <input 
                  type="file" 
                  onChange={handleChange} 
                  required 
                  ref={fileInputRef} 
                />
              </div>
            </div>
            <div className="dr-fields">
              <label htmlFor="details">Product Details:</label>
              <textarea
                style={mystyle}
                id="details"
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

export default AddClinicalSupplies;
