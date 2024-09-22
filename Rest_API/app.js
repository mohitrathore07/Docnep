import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

import fileUpload from 'express-fileupload';
 
import Userrouter from './routes/user.router.js';
import Doctorrouter from './routes/doctor.router.js';
import Diseaserouter from './routes/disease.router.js';
import Testsrouter from './routes/test.router.js';
import Packagerouter from './routes/package.router.js';
import ClinicalSupplies from './routes/clinicalsupplies.router.js';
import CartSection from './routes/cart.router.js';
import Orders from './routes/order.router.js';


app.use(bodyParser.json({ limit: '10mb' })); // Adjust as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(fileUpload());

app.use(cors({
    origin: 'https://docnep.com'  // Allow requests from your frontend domain
}));

app.use("/user",Userrouter);
app.use("/adddoctor",Doctorrouter);
app.use("/adddisease",Diseaserouter);
app.use("/addtests",Testsrouter);
app.use("/addpackage",Packagerouter);
app.use("/addclinicalsupplies",ClinicalSupplies);
app.use("/addcart",CartSection);
app.use("/addorders",Orders);

app.listen(3001);
console.log("server invoked at link http://localhost:3001");