import React, { useState, useEffect } from "react";

import { useNavigate, Link } from 'react-router-dom';

import {
  _addcartapiurl,
  _addclinicalsuppliesapiurl,
  _adddiseaseapiurl,
  _adddoctorapiurl,
  _addpackageapiurl,
  _addtestapiurl,
} from "../../Api.url";
import axios from "axios";

const CartSection = () => {
  const [cartdetails, setcartdetails] = useState([]);
  const [cartitems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      axios.get(`${_addcartapiurl}fetch?email=${userEmail}`).then((response) => {
          setcartdetails(response.data);

          response.data.forEach((item) => {
            handleCollections(item.collection_name, item._cid , item.ProductName);
          });
        })
        .catch((error) => {
          console.error(error);
          setcartdetails([]);
        });
    }
  }, [userEmail]);

  const handleCollections = (collection_name, _cid, ProductName) => {
    let apiUrl = "";
  
    if (collection_name === "test") {
      apiUrl = _addtestapiurl + "fetch?TestName=" + ProductName;
    } else if (collection_name === "package") {
      apiUrl = _addpackageapiurl + "fetch?PackageName=" + ProductName;
    } else if (collection_name === "doctor") {
      apiUrl = _adddoctorapiurl + "fetch?DrName=" + ProductName;
    } else if (collection_name === "disease") {
      apiUrl = _adddiseaseapiurl + "fetch?DiseaseName=" + ProductName;
    } else if (collection_name === "clinicalsupplies") {
      apiUrl = _addclinicalsuppliesapiurl + "fetch?ProductName=" + ProductName;
    } else {
      console.warn(`Unknown collection name: ${collection_name}`);
      return;
    }
  
    axios.get(apiUrl).then((response) => {
        const fetchedItems = response.data.map((item) => ({
          ...item,
          quantity: 1,
          _cid: _cid,
        }));
  
        setCartItems((prevItems) => {
            const newItems = fetchedItems.filter(
            (fetchedItem) =>
              !prevItems.some((prevItem) => prevItem._cid === fetchedItem._cid)
          );
          return [...prevItems, ...newItems];
        });
      })
      .catch((error) => {
        console.error(`Error fetching data for ${collection_name}:`, error);
      });
  };

  useEffect(() => {
    calculateTotal();
  }, [cartitems]);

  const calculateTotal = () => {
    const total = cartitems.reduce((sum, item) => {
      const price = item.Fees || item.Productprice || item.DrConsultancyFee || 0;
      return sum + price * item.quantity;
    }, 0);
    setTotalAmount(total.toFixed(2));
  };

  const renderItemName = (item) => {
    if (item.PackageName) return item.PackageName;
    if (item.TestName) return item.TestName;
    if (item.DrName) return item.DoctorName;
    if (item.DiseaseName) return item.DiseaseName;
    if (item.ProductName) return item.ProductName;
    return "Unknown Item";
  };

  const handleIncrease = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const btnstyle = {
    backgroundColor: 'rgb(236, 64, 122)',
    padding: '7px',
    color: '#fff',
    border: 'none',
    borderRadius: '7px'
  }

  const handleDecrease = (index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (_cid) => {
    let deletedetails = { "data": { "_cid": _cid } };
    axios.delete(_addcartapiurl + "delete", deletedetails).then((response) => {
        navigate("/");
    }).catch((error)=> {
      console.info(error);
    })
  }


  return (
    <>
      <div className="manage-users-main" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Your Cart          
        </div>

        <div style={{ width: "80%", margin: "auto" }}>
          <table style={{ width: "80%" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartitems.map((item, index) => (
                <tr key={item.ProductName || index}>
                  <td>{renderItemName(item)}</td>
                  <td>{item.Fees || item.Productprice || item.DrConsultancyFee}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(
                      (item.Fees ||
                        item.Productprice ||
                        item.DrConsultancyFee) * item.quantity
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => handleIncrease(index)} style={btnstyle}>+</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleDecrease(index)} style={btnstyle}>-</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleDelete(item._cid)} style={btnstyle}>Remove Item</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <h3>Total Amount: ${totalAmount}</h3>

            <Link to="/payment" state={{ cartitems , totalAmount }}>
              <button style={btnstyle}>Proceed to Continue to Pay</button>
            </Link>
       
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSection;
