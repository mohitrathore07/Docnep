import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Header from "../Headercomponant/header";
import Header from "./Componants/Headercomponant/header.js";

import AddDoctor from "./Componants/adddoctorscomponant/adddoctor.js";
import Footer from "./Componants/Footercomponant/footer.js";
import Home from "./Componants/HomeComponant/home.js";
import Register from "./Componants/registercomponant/register.js";
import Login from "./Componants/logincomponant/login.js";
import AddDisease from "./Componants/AddDieaseComponant/adddisease.js";
import GetAppointment from "./Componants/GetAppointmentComponant/getappointment.js";

import Labtest from "./Componants/LabtestComponant/labtest.js";
import AddTests from "./Componants/AddtestsComponant/AddTest1.js";
import AddPackage from "./Componants/AddPackageComponant/AddPackage.js";
import ShowAllPage2 from "./Componants/show-all-page2/show-all-page2.js";
import Madicineuses from "./Componants/MadicineUsesComponant/Madicineuses.js";
import ClinicalSupplies from "./Componants/ClinicalSuppliesComponant/ClinicalSupplies.js";
import AddClinicalSupplies from './Componants/AddClinicalSuppliesComponant/addclinicalsupplies.js';
import Logout from "./Componants/LogoutComponant/logout.js";
import CPAdmin from "./Componants/CP_AdminComponant/cpadmin.js";
import EPAdmin from "./Componants/EPComponant/epadmin.js";
import Appointment from "./Componants/AppointmentComponant/appointment.js";
import FindDoctor from "./Componants/FindDoctorComponant/finddoctor.js";
import ManageUser from "./Componants/ManageUsersComponant/manageuser.js";
import ByProduct from "./Componants/BuyProduct/byproduct.js";
import TestAppointment from "./Componants/BookTestComponant/booktest.js";
import MadicalPackages from "./Componants/MadicalPackages/madicalpackage.js";
import CartSection from "./Componants/CartSection/cartsection.js";
import PaymentSection from "./Componants/PaymentSection/payment.js";
import ShowBookings from "./Componants/ShowBookingComponant/showbooking.js";

function App() {
  return (
    <>
      <Header />
      <div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<Home />}></Route>
          <Route path="/user" element={<Home />}></Route>
          
          <Route path="/register" element={<Register />}></Route>
          <Route path="/adddoctor" element={<AddDoctor />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/adddisease" element={<AddDisease />}></Route>
          <Route path="/getappointment" element={<GetAppointment/>}></Route>

          <Route path="/labtests" element={<Labtest/>}></Route>
          <Route path="/addtests" element={<AddTests/>}></Route>
          <Route path="/addpackage" element={<AddPackage/>}></Route>
          <Route path="/showallpage2" element={<ShowAllPage2/>}></Route>
          <Route path="/madicaluses" element={<Madicineuses/>}></Route>

          <Route path="/clinicalsuplies" element={<ClinicalSupplies/>}></Route>
          <Route path="/addclinicalsuplies" element={<AddClinicalSupplies/>}></Route>
          <Route path="/changepassword" element={<CPAdmin/>}></Route>
          <Route path="/editprofile" element={<EPAdmin/>}></Route>
          <Route path="/appointment/:_id" element={<Appointment/>}></Route>
          <Route path="/finddoctor/:Specialization" element={<FindDoctor/>}></Route>
          <Route path="/manageusers" element={<ManageUser/>}></Route>
          <Route path="/buyproduct/:_id" element={<ByProduct/>}></Route>
          <Route path="/testappointment/:_id" element={<TestAppointment/>}></Route>
          <Route path="/madicalpackages" element={<MadicalPackages/>}></Route>
          <Route path="/cart" element={<CartSection/>}></Route>
          <Route path="/payment" element={<PaymentSection/>}></Route>
          <Route path="/seebooking" element={<ShowBookings/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
