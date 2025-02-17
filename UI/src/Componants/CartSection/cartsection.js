import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  _addcartapiurl,
  _addclinicalsuppliesapiurl,
  _adddiseaseapiurl,
  _adddoctorapiurl,
  _addpackageapiurl,
  _addtestapiurl,
} from "../../Api.url";

const CartSection = () => {
  const [cartdetails, setCartDetails] = useState([]);
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
      axios
        .get(`${_addcartapiurl}fetch?email=${userEmail}`)
        .then((response) => {
          setCartDetails(response.data);
          response.data.forEach((item) => {
            handleCollections(item.collection_name, item._cid, item.ProductName);
          });
        })
        .catch((error) => {
          console.error("Error fetching cart details:", error);
          setCartDetails([]);
        });
    }
  }, [userEmail]);

  const handleCollections = (collection_name, _cid, ProductName) => {
    let apiUrl = "";

    switch (collection_name) {
      case "test":
        apiUrl = `${_addtestapiurl}fetch?TestName=${ProductName}`;
        break;
      case "package":
        apiUrl = `${_addpackageapiurl}fetch?PackageName=${ProductName}`;
        break;
      case "doctor":
        apiUrl = `${_adddoctorapiurl}fetch?DrName=${ProductName}`;
        break;
      case "disease":
        apiUrl = `${_adddiseaseapiurl}fetch?DiseaseName=${ProductName}`;
        break;
      case "clinicalsupplies":
        apiUrl = `${_addclinicalsuppliesapiurl}fetch?ProductName=${ProductName}`;
        break;
      default:
        console.warn(`Unknown collection name: ${collection_name}`);
        return;
    }

    axios
      .get(apiUrl)
      .then((response) => {
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
    if (item.DrName) return item.DrName;
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
    const deletedetails = { data: { _cid: _cid } };
    axios
      .delete(_addcartapiurl + "delete", deletedetails)
      .then((response) => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._cid !== _cid)
        );
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const btnstyle = {
    backgroundColor: "rgb(236, 64, 122)",
    padding: "7px",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  };

  return (
    <div className="manage-users-main" style={{ width: "100%" }}>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        Your Cart
      </div>

      <div style={{ width: "80%", margin: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Item</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Price</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Quantity</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Total</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartitems.map((item, index) => (
              <tr key={item._cid} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{renderItemName(item)}</td>
                <td style={{ padding: "10px" }}>
                  ${item.Fees || item.Productprice || item.DrConsultancyFee}
                </td>
                <td style={{ padding: "10px" }}>{item.quantity}</td>
                <td style={{ padding: "10px" }}>
                  $
                  {(
                    (item.Fees || item.Productprice || item.DrConsultancyFee) *
                    item.quantity
                  ).toFixed(2)}
                </td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => handleIncrease(index)} style={btnstyle}>
                    +
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={() => handleDecrease(index)} style={btnstyle}>
                    -
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={() => handleDelete(item._cid)} style={btnstyle}>
                    Remove Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h3>Total Amount: ${totalAmount}</h3>
          <Link to="/payment" state={{ cartitems, totalAmount }}>
            <button style={btnstyle}>Proceed to Pay</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSection;