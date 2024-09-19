import axios from "axios";
import React, { useEffect, useState } from "react";
import { _addorderapiurl } from "../../Api.url";
import { useNavigate } from "react-router-dom";
import './showbooking.css';

const ShowBookings = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios
      .get(_addorderapiurl + "fetch")
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changeStatus = (s, _oid) => {
    let updatedetails;
    if (s === "block") {
      updatedetails = {
        condition_obj: { _oid: _oid },
        content_obj: { status: 0 },
      };
    } else if (s === "varify") {
      updatedetails = {
        condition_obj: { _oid: _oid },
        content_obj: { status: 1 },
      };
    } else {
      axios.delete(_addorderapiurl + "delete", { data: { _oid: _oid } })
        .then((response) => {
          navigate("/seebooking");
        });
      return;
    }

    axios.patch(_addorderapiurl + "update", updatedetails).then((response) => {
      navigate("/manageuser");
    });
  };

  return (
    <>
      <div className="manage-users-main">
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Show Bookings</div>

        <div>
          <table>
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Info</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((order) => (
                <tr key={order._id}>
                  <td>{order._oid}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    {order.status === 1 ? (
                      <font color="green">Confirmed</font>
                    ) : (
                      <font color="orange">Pending</font>
                    )}
                  </td>
                  <td>{order.info}</td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <strong>Product Name:</strong> {item.ProductName} <br />
                          <strong>Quantity:</strong> {item.quantity} <br />
                          <strong>Collection Name:</strong> {item.collection_name} <br />
                          <strong>User Email:</strong> {item.userEmail}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {order.status === 1 ? (
                      <font
                        onClick={() => changeStatus("block", order._oid)}
                        color="blue"
                        style={{ cursor: 'pointer' }}
                      >
                        Change to Pending
                      </font>
                    ) : (
                      <font
                        onClick={() => changeStatus("varify", order._oid)}
                        color="blue"
                        style={{ cursor: 'pointer' }}
                      >
                        Change to Confirmed
                      </font>
                    )}
                    <br />
                    <font
                      onClick={() => changeStatus("delete", order._oid)}
                      color="red"
                      style={{ cursor: 'pointer' }}
                    >
                      Delete
                    </font>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShowBookings;
