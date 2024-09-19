import React, { useState , useEffect } from 'react';
import './show-all-page2.css';
import {_addtestapiurl, _addpackageapiurl } from "../../Api.url";
import axios from 'axios';
import img from './img/471.png';
import { Link } from 'react-router-dom'

const ShowAllPage2 = () => {

    const [filter , setFilter] = useState('all');

    const [ Tests,  setTests] = useState([]);
    const [TestfilteredDetails, setTestFilteredDetails] = useState([]);
  

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


  return (
     <>
     <div className='Show-all-page2-main' style={{paddingTop:'150px'}}>

        <div className='Show-all-page2-filters'>
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
                    <option value='all'>All</option>
                    <option value='blood test'>Blood Test</option>
                    <option value='blood culture'>Blood Culture</option>
                    <option value='biospy'>Biospy</option>
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

        <div className='Show-all-page2-content'>

        {
           TestfilteredDetails.map((row)=>{
              return ( 
            <div  className="show-disease">

                <div className="get-appointment-show-all-page2-content-div" >

                <div style={{display: 'flex' , gap: '45px'}}>
                  <img src={img}></img> 
                  <div> 
                  <h2 className="show-content-Name" style={{fontSize: '21px'}}>Health Check Basic</h2>
                  <Link style={{fontWeight:'bold', color: 'black'}}>Details</Link>
                  </div>    
                </div>

                <div style={{display: 'flex' , gap: '75px'}}>
                  <p className="getA-doctor-details" style={{margin:'0 15px', fontWeight:'bold', }}>Fees: {row.Fees}</p>
                  <Link to={`/testappointment/${row._id}`}>
                  <button className="show-all-btn1" style={{padding:'15px 30px'}}>Add </button>
                  </Link>
                </div>  
            </div>
            </div>
            )})
          }
        </div>
      </div>
     </>
  )
}

export default ShowAllPage2;
