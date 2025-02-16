import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClinicalSupplies.css";
import img from "./img/385@2x.webp";
import { _addclinicalsuppliesapiurl , _addcartapiurl } from "../../Api.url";
import { useNavigate } from "react-router-dom";

const ClinicalSupplies = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    axios.get(_addclinicalsuppliesapiurl + "fetch").then((response) => {
        setProducts(response.data);
        setFilteredDetails(response.data);
      }).catch((error) => {
        setProducts([]);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredDetails(Products);
    } else {
      const filteredData = Products.filter((e) => e.ProductCategory === filter);
      setFilteredDetails(filteredData);
    }
  }, [filter, Products]);

  const imgstyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const contentstyle = {
    color: "white",
    fontSize: "50px",
    margin: "20px 0",
  };

  const spanstyle = {
    color: "#EE4C7C",
  };

  const productimgstyle = {
    width: "378px",
    height: "350px",
    objectFit: "content",
  };

  const handleSubmit = (item) => {
    const details = { ProductName: item.ProductName, _id: item._id, collection_name: item.collection_name, email : localStorage.getItem("email") };
    axios.post(_addcartapiurl + "save" ,details).then((response)=>{
    navigate('/cart');
    }).catch((error)=>{
      console.error(error);
    })
  }

  return (
    <>

    <div className="clinical-supplies">
        <div className="clinical-supplies-main">
          <img src={img} alt="img" style={imgstyle} />
          <div className="clinical-supplies-main-content">
            <h3
              style={{ color: "#fff", fontSize: "37px", marginBottom: "40px" }}
            >
              <span style={spanstyle}>MEDICAL</span> INSTRUMENT ON RENT
            </h3>
            <h2 style={contentstyle}>
              Get The <span style={spanstyle}>Instruments</span>
            </h2>
            <h2 style={contentstyle}>For Your Medical Needs</h2>
            <h2 style={contentstyle}>
              Delivered To <span style={spanstyle}>Your</span>
            </h2>
            <h2 style={contentstyle}>
              <span style={spanstyle}>Doorstep.</span>
            </h2>
          </div>
        </div>

        <div className="clinical-products">

          <div className="our-doctor-filtersection clinical-products-filter">
            
            <h1 style={{ color: "#EE4C7C" }}>Filter</h1>
            <select
              class="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ height: "40px", paddingLeft: "10px" }}
              required
            >
              <option value="all">All</option>
              <option value="adl">adl</option>
              <option value="medical imaging">medical imaging</option>
              <option value="emergency preparendness">
                emergency preparendness
              </option>
            </select>
          </div>

          <div className="products">

            {filteredDetails.map((row) => {
              return (
                <div className="show-clinical-products" >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/uploads/suppliesimages/${row.Producticonnm}`}
                    style={productimgstyle}
                  />

                  <div className="get-appointment-show-test-content">
                    <h2 className="getA-doctor-details getA-drName">
                      {row.ProductName}:
                    </h2>
                    <p className="getA-doctor-details">
                      Price: {row.Productprice}
                    </p>
                    <p className="getA-doctor-details">
                      Details: {row.Details}
                    </p>
                  </div>

                  <div className="btn-doctor">
                    <button className="show-doctor-btn" onClick={() => handleSubmit(row)}>Book Now</button>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
      </div>
    </>
  );
};

export default ClinicalSupplies;
