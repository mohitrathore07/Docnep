import axios from "axios";
import React, { useEffect, useState } from "react";
import { _userapiurl } from "../../Api.url";
import { useNavigate } from "react-router-dom";
import './manageuser.css';

const ManageUser = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios.get(_userapiurl + "fetch?role=user").then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  const actionstyle = {
    Cursor: 'Pointer'
  }

  const changeStatus = (s, _id) => {
    if (s == "block") {
      let updatedetails = {
        condition_obj: { _id: _id },
        content_obj: { status: 0 },
      };
      axios.patch(_userapiurl + "update", updatedetails).then((response) => {
        navigate("/manageuser");
      });
    } else if (s == "varify") {
      let updatedetails = {
        condition_obj: { _id: _id },
        content_obj: { status: 1 },
      };
      axios.patch(_userapiurl + "update", updatedetails).then((response) => {
        navigate("/manageuser");
      });
    } else {
      let deletedetails = { data: { _id: _id } };
      axios.delete(_userapiurl + "delete", deletedetails).then((response) => {
        navigate("/manageuser");
      });
    }
  };

  return (
    <>
      <div className="manage-users-main">
        <div style={{fontSize:'1.5rem', fontWeight:'bold'}}>Edit Profile Here</div>

        <div>
          <table>
            <tr>
              <th>UserId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Gender</th>
              <th>City</th>
              <th>Info</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            {userDetails.map((row) => (
              <tr>
                <td>{row._id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.mobile}</td>
                <td>{row.address}</td>
                <td>{row.gender}</td>
                <td>{row.city}</td>
                <td>{row.info}</td>
                <td>
                  {row.status === 1 && <font color="green">Varified</font>}
                  {row.status === 0 && <font color="orange">Blocked</font>}
                </td>
                <td>
                  {row.status === 1 && (
                    <font
                      onClick={() => changeStatus("block", row._id)}
                      color="blue" style={{cursor:'pointer'}}
                    >
                      ChangeStatus
                    </font>
                  )}
                  {row.status === 0 && (
                    <font
                      onClick={() => changeStatus("varify", row._id)}
                      color="blue" style={{cursor:'pointer'}}  
                    >
                      ChangeStatus
                    </font>
                  )}
                  <br />
                  <font
                    onClick={() => changeStatus("delete", row._id)}
                    color="red" style={{cursor:'pointer'}}
                  >
                    Delete
                  </font>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
