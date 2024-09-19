import React, { useState , useEffect } from 'react';
import './show-all.css';
import {_addtestapiurl, _addpackageapiurl } from "../../Api.url";
import axios from 'axios';
import img from './img/471.png';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const ShowAll = () => {
    const navigate = useNavigate();

    const [filter , setFilter] = useState('all');

    const [ Tests,  setTests] = useState([]);
    const [TestfilteredDetails, setTestFilteredDetails] = useState([]);
    const [PackagefilteredDetails, setPackageFilteredDetails] = useState([]);

    const [visibleTests, setVisibleTests] = useState(6);
    const [visiblePackages, setVisiblePackages] = useState(6);
  

    const [ Package,  setPackage] = useState([]);

    useEffect(()=>{
        axios.get(_addtestapiurl + "fetch").then((response)=>{
          setTests(response.data);
          setTestFilteredDetails(response.data); 
        }).catch((error)=>{
            setTests([]);
            console.error(error);
        })
      },[]);
    
      useEffect(() => {
        if (filter === "all") {
          setTestFilteredDetails(Tests);
        } 
        else {
          const TestfilteredData = Tests.filter(e => e.Testtype === filter);
          setTestFilteredDetails(TestfilteredData);
        }
      }, [filter, Tests]);


    
    const inputstyle = {
        height: '35px',
        width: '300px'
    }

    const handleClick = () => {
        navigate('/showallpage2');
    }

  return (
     <>
     <div className='Show-all-main'>

        <div className='Show-all-filters'>
            <h2>Filters</h2>
            <div class="input-box">
                <select
                  class="form-control"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  required
                  style={inputstyle}
                >
                    <option>All</option>
                    <option>Diabetes Panel - Basic</option>
                    <option>Diabetes Panel - Essential</option>
                    <option>Diabetes Panel - Advance Male</option>
                    <option>Full Body Checkup - Essential</option>
                    <option>Thyroid Assessment - Basic</option>
                    <option>Thyroid Assessment - Essential</option>
            
                    <option>Diabetes Panel - Basic</option>
                    <option>Diabetes Panel - Essential</option>
                    <option>Diabetes Panel - Advance Male</option>
                    <option>Full Body Checkup - Essential</option>
                    <option>Thyroid Assessment - Basic</option>
                    <option>Thyroid Assessment - Essential</option>
                   
                    <option>Diabetes Panel - Basic</option>
                    <option>Diabetes Panel - Essential</option>
                    <option>Diabetes Panel - Advance Male</option>
                    <option>Full Body Checkup - Essential</option>
                    <option>Thyroid Assessment - Basic</option>
                    <option>Thyroid Assessment - Essential</option>
                   
                    <option>Diabetes Panel - Basic</option>
                    <option>Diabetes Panel - Essential</option>
                    <option>Diabetes Panel - Advance Male</option>
                    <option>Full Body Checkup - Essential</option>
                    <option>Thyroid Assessment - Basic</option>
                    <option>Thyroid Assessment - Essential</option>
                </select>
              </div>
        </div>

        <div className='Show-all-content'>

        {
           TestfilteredDetails.slice(0 , visibleTests).map((row)=>{
              return ( 
            <div  className="show-disease">

                <div className="get-appointment-show-all-content-div" >

                <div style={{display: 'flex' , gap: '45px'}}>
                  <img src={img} alt='img'></img> 
                  <div> 
                  <h2 className="show-content-Name" style={{fontSize: '27px'}}>Health Check Basic</h2>
                  <Link style={{fontWeight:'bold', color: 'black'}}>Details</Link>
                  </div>    
                </div>

                <div style={{display: 'flex' , gap: '75px'}}>
                  <p className="getA-doctor-details" style={{marginTop:'15px', fontWeight:'bold', }}>Fees: {row.Fees}</p>
                  <Link to={`/testappointment/${row._id}`}>
                  <button className="show-all-btn1" >Add Now</button>
                  </Link>
                </div>  
            </div>
            </div>
            )})
          }
        </div>
      </div>

      <div className='show-all-btn'>
      <button className="show-all-btns" style={{width: '300px', backgroundColor:'rgb(236, 64, 122)',color:'white',padding:'5px',border:'none',outline:'none'}} onClick={handleClick}>Show ALL</button>
      </div>
     </>
  )
}

export default ShowAll;
