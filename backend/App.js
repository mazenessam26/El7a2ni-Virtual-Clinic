// External variables
const express = require("express");

const mongoose = require('mongoose');
//const http = require("http");
//const { Server } = require("socket.io");
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const upload = multer();
require('dotenv').config();
// add MONGO_URI in .env file

const MongoURI = process.env.MONGO_URI;
const {createUser, createDoctor, createAdminstrator, deleteDoctor, deleteAdminstrator, deleteUser, getDoctor,editDoctorInfo,filterByDateOrStatus,searchForPatient, getUsers, getDoctors, addPackage, updatePackage, deletePackage,addFamilyInfo,getFamilyMembers, searchForDoctor, searchForDoctorspeciality, searchForDoctordate, addHealthRecords, Loginuser,changepassworduser,addHealthRecord, resetpassword, getHealthRecords, removeHealthRecords, addfamilymemberpatient, getTimeSlots, reserveTimeSlot, addavaliabletime, getWalletCredit, payWithWallet, getappointments, createnotification, getnotificationsuser, getnotificationsdoctor, viewPatPres, reschedule, getappointments2, getAdminstrators}= require('./Controller/userController')
const {Login, changepasswordadmin, acceptdoctor, getRequests, resetpasswordadmin, rejectdoc, addHealthPackage, requestOTP} = require('./Controller/adminController');
const {Logindoc, changepassworddoctor, resetpassworddoctor, addSlots, Followup, chat, allchat, rescheduleApp, getDrApp, addPres, viewDrPres, editDrPres} = require('./Controller/doctorController');
const {createBlog, getBlogs, editBlog} = require('./Controller/userControllerold');
//App variables
const app = express();
app.use(cors());








const port = process.env.PORT || "8000";
const user = require('./Models/User');
const { filterBlog } = require("./Controller/userControllerold");
const { verify } = require("jsonwebtoken");
app.use(session({
  secret: 'AAsdfg15',
  resave: false,
  saveUninitialized: false,
}));
// #Importing the userController
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

  const uploadFields = [
    {
      name: 'MedicalLicense'
    },
    {name: 'MedicalDegree'}
  ]
app.use(express.json())
app.post("/addUser",createUser);
app.post("/createDoctor",upload.fields(uploadFields),createDoctor);
app.post("/createAdminstrator",createAdminstrator);
app.delete("/deleteUser",deleteUser);
app.delete("/deleteDoctor",deleteDoctor);
app.delete("/deleteAdminstrator",deleteAdminstrator);
app.get("/getDocto",getDoctor);
app.put("/editDoctorInfo", editDoctorInfo);
app.get('/filterbydateorstatus',filterByDateOrStatus);
app.get("/patientsearch",searchForPatient);
app.get("/getPatients",getUsers);
app.get("/getDoctors",getDoctors);
app.get("/getAdminstrators",getAdminstrators);
app.post("/addPackage",addPackage);
app.put("/updatePackage",updatePackage);
app.delete("/deletePackage",deletePackage);
app.put("/addFamilyMember",addFamilyInfo);
app.get("/getFamilyMember",getFamilyMembers);
app.get("/doctorSearch",searchForDoctor);
app.get("/doctorSearchspeciality",searchForDoctorspeciality);
app.get("/doctorSearchdate",searchForDoctordate);
app.put("/addHealthRecords",addHealthRecords);
app.post("/loginadmin",Login);
app.post("/logindoctor",Logindoc);
app.post("/loginuser",Loginuser);
app.put("/changepasswordpatient", changepassworduser);
app.put("/changepassworddoctor", changepassworddoctor);
app.put("/changepasswordadmin", changepasswordadmin);
app.post("/addHealthrecords",upload.array('HealthRecords'), addHealthRecord);
app.post("/acceptdoc", acceptdoctor);
app.post("/rejectdoc", rejectdoc);
app.get("/getRequests",getRequests);
app.put("/resetpassword",resetpassword)
app.put("/resetpassworddoctor",resetpassworddoctor)
app.put("/resetpasswordadmin",resetpasswordadmin)
app.post("/followup",Followup)
app.post("/addhealthpackage",addHealthPackage)
app.post("/gethealthrecords",getHealthRecords)
app.post("/removehealthrecords",removeHealthRecords)
app.post('/addfamilymemberpatient',addfamilymemberpatient)
app.put("/addSlots",addSlots);
app.get("/getTimeSlots/:Username",getTimeSlots);
app.post("/reserveTimeSlot",reserveTimeSlot);
app.put("/addavaliabletime",addavaliabletime);
app.post("/createblog",createBlog);
app.post("/filterblog",filterBlog);
app.get("/getblogs",getBlogs);
app.post("/createUser",createUser);
app.put("/editblog/:blogId",editBlog);
app.put("/verify",verify);
app.post("/requestOTP",requestOTP)
app.get("chat/:userId",allchat);
app.post('/chat',chat)
app.post("/getappointments",getappointments);
app.post("/getappointments2",getappointments2);
app.post("/createnotification",createnotification);
app.post("/getnotificationsuser",getnotificationsuser)
app.post("/getnotificationsdoctor",getnotificationsdoctor)
app.post("/getWalletCredit", getWalletCredit);
app.post('/payWithWallet',payWithWallet );
app.post("/rescheduleApp",rescheduleApp);
app.get("/getDrApp/:Did",getDrApp);
app.post("/addPres",addPres);
app.get("/viewDrPres/:Did",viewDrPres);
app.get("/viewPatPres/:Pid",viewPatPres);
app.put("/editdrpres",editDrPres)
app.put("/reschedule",reschedule);
app.post('/payment', async (req, res) => {
  try {
      const { amount, token } = req.body;

      const charge = await stripe.charges.create({
          amount: amount, // Amount in cents
          currency: 'usd',
          source: token,
          description: 'Test payment',
      });

      res.status(200).send({ success: charge });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});


/*
                                                    End of your code
*/
