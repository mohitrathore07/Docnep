import React from "react";
import './home.css';
import Home1 from "../home1componant/home1";
import Carousel from "../Carouselcomponant/carousel";
import ShowDoctor from "../ShowDoctorcomponant/ShowDoctor";
import ShowDisease from "../ShowDiseaseComponant/showdisease";
import HomeEnd1 from "../HomeEnd1Componant/Homeend1";
import HomeEnd2 from "../HomeEnd2Componant/Homeend2";

const Home = () => {

  return (
    <>      
    <div className="home">
        <Home1/>
        <Carousel/>
        <ShowDoctor/>
        <ShowDisease/>
        <HomeEnd1/>
        <HomeEnd2/>
       </div>
    </>
  )
};

export default Home;
