import "./register.css";
import { useState } from "react";
import { _userapiurl } from "../../Api.url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    let navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [city, setCity] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [mobile, setMobile] = useState();
  const [output, setOutput] = useState("");

  const handleSubmit = () => {
    const userdetails = {
      name: name,
      password: password,
      email: email,
      city: city,
      gender: gender,
      address: address,
      mobile: mobile,
    };

    axios.post(_userapiurl + "save", userdetails).then((response) => {
      setOutput("user registered successfully....");
      setName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setCity("");
      setAddress("");
      navigate('/login');
    }).catch((error)=> {
        setOutput("Something went wrong please try again..........");
    })
  };

  return (
    <>
      <div class="container_register">
        <div class="title">Registration</div>
        <br></br>
        <font color="blue">{output}</font>
        <div class="content">
          <form>
            <div class="user-details">
              <div class="input-box">
                <span class="details">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div class="input-box">
                <span class="details">Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Mobile Number</span>
                <input
                  type="tel"
                  placeholder="Enter your number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div class="input-box">
                <span class="details">City</span>
                <select
                  class="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option>Select City</option>
                  <optgroup label="MP">
                    <option>Indore</option>
                    <option>Ujjain</option>
                    <option>Bhopal</option>
                  </optgroup>
                  <optgroup label="MH">
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Nasik</option>
                  </optgroup>
                </select>
              </div>

              <div class="input-box address-box">
                <span class="details">Address</span>
                <textarea
                  name="address"
                  rows="3"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div class="gender-details">
              <span class="gender-title">Gender</span>
              <div class="category">
                <label for="dot-1">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    id="dot-1"
                  />
                  <span class="dot one"></span>
                  <span class="gender">Male</span>
                </label>
                <label for="dot-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    id="dot-2"
                  />
                  <span class="dot two"></span>
                  <span class="gender">Female</span>
                </label>
              </div>
            </div>
            <div class="button">
              <input type="button" value="Register" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
