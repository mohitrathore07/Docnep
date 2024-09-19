    import { useEffect, useState } from "react";
    import { _userapiurl } from "../../Api.url";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    function EPAdmin() {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [city, setCity] = useState();
    const [gender, setGender] = useState();
    const [M, setM] = useState();
    const [F, setF] = useState();
    const [address, setAddress] = useState();
    const [mobile, setMobile] = useState();
    const [output, setOutput] = useState("");
    const [userDetails , setUserDetails ] = useState();

    useEffect(()=>{
        axios.get(_userapiurl+"fetch?email="+localStorage.getItem("email")).then((response)=> {
            let userdetails = response.data[0];
            setName(userdetails.name);
            setEmail(userdetails.email);
            setCity(userdetails.city);
            setGender(userdetails.gender);
            setAddress(userdetails.address);
            setMobile(userdetails.mobile);
            setUserDetails(userdetails);

            if(userdetails.gender=="male") {
                setM('checked');
            }
            else {
                setF('checked');
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[]);

    const handleSubmit = () => {
        let update_details = {"condition_obj": {"email": localStorage.getItem("email")} , "content_obj":{"name":name , "email":email , "mobile":mobile, "city":city,"address":address, "gender":gender}};

        axios.patch(_userapiurl+"update",update_details).then((response)=>{
            setOutput("Profile edited successfully....");
            navigate("/logout");  
        }).catch((error)=>{
            console.log(error);
        })
    };

    return (
        <>
        <div class="container_register">
            <div class="title">Edit Profile Here</div>
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
                            <input type="radio" name="gender" value="male" checked={M} onChange={e => setGender(e.target.value)} id="dot-1" />
                            <span class="dot one"></span>
                            <span class="gender">Male</span>
                        </label>
                        <label for="dot-2">
                            <input type="radio" name="gender" value="female" checked={F} onChange={e => setGender(e.target.value)} id="dot-2" />
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

    export default EPAdmin;
