const userModel = require('../Models/User.js');
const doctorModel = require('../Models/Doctor.js');
const adminstratorModel = require('../Models/Adminstrator.js');
const requestModel = require('../Models/Requests.js');
const notificationModel = require('../Models/Notifications.js');
const appointmentsModel = require('../Models/Appointments.js');
const  mongoose  = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const nodemailer = require("nodemailer");

const prescriptionModel = require('../Models/Prescriptions.js');



//var id;

const createUser = async(req,res) => {
   //add a new user to the database with 
   //Name, Email and Age

   //const randomrecords = generateRandomHealthRecords();


   const{Username,Name,Email, Password,DateOfBirth,Gender,MobileNumber,EmergencyContactFullName,EmergencyContactNumber}= req.body;
   console.log(req.body);
   try{
      const user = await userModel.create({Username,Name,Email, Password,DateOfBirth,Gender,MobileNumber,EmergencyContactFullName,EmergencyContactNumber});
      console.log(user);
      res.status(200).json({docid:user._id})
      //res.redirect('/homepagePatient');
      //HealthRecords:randomrecords
   }catch(error){
      res.status(400).json({error:error.message})
   }
}

const createDoctor = async(req,res) => {
   const{Username, Name, Email, Password, DateOfBirth, HourlyRate, Hospital, EducationalBackground,Speciality,ID}= req.body;
   const {MedicalLicense,MedicalDegree} = req.files
   
   try{
      const hosRate = (HourlyRate*0.1);
      const SessionPrice = parseFloat(HourlyRate)+hosRate;
      //console.log(MedicalLicense);
      const Avaliable =new Date('2023-11-14');
      console.log(Avaliable);
      const doctor = await requestModel.create({Username, Name, Email, Password, DateOfBirth, HourlyRate, Hospital, EducationalBackground,SessionPrice,Speciality,Avaliable,ID,MedicalLicense:{dtype:MedicalLicense[0].mimetype , data:MedicalLicense[0].buffer},MedicalDegree:{dtype:MedicalDegree[0].mimetype , data:MedicalDegree[0].buffer}});
      console.log(doctor.MedicalDegree);
      res.status(200).json(doctor)
      //res.redirect('/homepageDoctor');
   }catch(error){
      res.status(400).json({error:error.message})
   }
}

const createAdminstrator = async(req,res) => {
   console.log("asdfg");
   const{Username,Password}= req.body;
   try{
      const adminstrator = await adminstratorModel.create({Username,Password});
      console.log(adminstrator);
      res.status(200).json({docid:adminstrator._id})
      //console.log(adminstrator);
      //res.redirect('http://localhost:3000/filter');
   }catch(error){
      res.status(400).json({error:error.message})
   }
   
}

const deleteDoctor = async (req, res) => {
   //delete a user from the database
   const Username = req.body.Username;
   const deletedUser = await doctorModel.findOneAndDelete({Username:Username});
   console.log(deletedUser);
    res.status(201).json(deletedUser);
    //res.status(204).send();

  }

const deleteUser = async (req, res) => {
   //delete a user from the database
   const Username = req.body.Username;
   const deletedUser = await userModel.findOneAndDelete({Username:Username});
   console.log(deletedUser);
    res.status(201).json(deletedUser);
    //res.status(204).send();

}
  
const deleteAdminstrator = async (req, res) => {
   //delete a user from the database
   const Username = req.body.Username;
   const deletedUser = await adminstratorModel.findOneAndDelete({Username:Username});
   console.log(deletedUser);
    res.status(201).json(deletedUser);
    //res.status(204).send();

}

const getDoctor = async (req, res) => {
   //retrieve all users from the database
   const id = '65296f5b5500dbdfb8cb8471';
  console.log(id)
   const reqdoctor = await doctorModel.findById(id );
   if (!reqdoctor) {
      return res.status(404).json({ error: 'Doctor not found.' });
    }
   console.log(reqdoctor);

   res.status(200).json(reqdoctor);
   //res.status(200).json(reqdoctor);
  
}

const editDoctorInfo = async (req, res) => {
   const { userid, newHourlyRate, newHospital,newEmail} = req.body;
   const updateFields = {};
   updateFields.HourlyRate = newHourlyRate;
   updateFields.Email = newEmail;
   updateFields.Hospital = newHospital;
   const updatedDoctor = await doctorModel.findOneAndUpdate(
     {_id: userid },
     updateFields,
     { new: true }
   );
   if (!updatedDoctor) {
     return res.status(404).json({ error: 'Doctor not found' });
   }
   console.log(updatedDoctor);
   res.status(200).json(updatedDoctor);
 };


 const filterByDateOrStatus = async (req, res) => {
   //retrieve all users from the database
   const id = req.params;
   const { Date, Status } = req.body;
   try {
     let appointments = await appointments.find({
       Doctor: id,
       Date: Date,
       Status: Status,
     });
     if (!appointments) {
       appointments = await appointments.find({
         Patient: id,
         Date: Date,
         Status: Status,
       });
     }
     if (!appointments) {
       res.status(404).json({ error: "no appointments found" });
       return;
     }
     res.status(200).json(appointments);
   } catch (error) {
     res.status(500).json(error);
   }
 };

 const searchForPatient = async (req, res) => {
   var Name = req.body.Name;
   console.log(Name);
   const patient = await userModel.findOne({ Name: Name });
   console.log(patient);
   if(!patient){
     return res.status(404).json({error: 'No patient with this name was found'})
   }
   console.log(patient);
   res.status(200).json(patient);
 }

 const getUsers = async (req, res) => {
   //retrieve all users from the database
   const users = await userModel.find();
   res.status(200).json(users);
  }

  const getDoctors = async (req, res) => {
   //retrieve all users from the database
   const doctors = await doctorModel.find();
   res.status(200).json(doctors);
  }

  const getAdminstrators = async (req, res) => {
    //retrieve all users from the database
    const users = await adminstratorModel.find();
    res.status(200).json(users);
   }

 const filterByApp = async (req, res) => {
   const upcoming_appointments = req.query.appointments;

  const patients = await Patient.find({}).sort({
    appointments: {
      $regex: new RegExp(upcoming_appointments, 'i')
    }
  });

  res.send(patients);
 }

 function generateRandomHealthRecords() {
  const height = Math.floor(Math.random() * (200 - 150 + 1) + 150); // Random height between 150 and 200
  const bloodTypes = ['A', 'B', 'AB', 'O']; // Possible blood types
  const bloodType = bloodTypes[Math.floor(Math.random() * bloodTypes.length)]; // Random blood type
  const avgBloodPressure = Math.floor(Math.random() * (140 - 90 + 1) + 90); // Random average blood pressure between 90 and 140

  return {
    height,
    bloodType,
    avgBloodPressure,
  };
}

function generateRandomDate() {
  const startDate = new Date('2023-10-14');
  const endDate = new Date('2023-10-16');
  console.log('a');
  const timeDiff = endDate.getTime() - startDate.getTime();
  console.log(timeDiff);
  const randomTime = Math.random() * timeDiff;
  console.log(randomTime);
  const randomDate = new Date(startDate.getTime() + randomTime);
  console.log(randomDate);

  return {
    randomDate
  };
}

const addPackage = async (req, res) => {
  const { Username, HealthPackage} = req.body;
  const updateFields = {};
  updateFields.HealthPackage = HealthPackage;
  
  const updatedUser = await userModel.findOneAndUpdate(
    {Username: Username },
    updateFields,
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log(updatedUser);
  res.status(200).json(updatedUser);
};

const updatePackage = async (req, res) => {
  const { Username, newHealthPackage} = req.body;
  const updateFields = {};
  updateFields.HealthPackage = newHealthPackage;
  
  const updatedUser = await userModel.findOneAndUpdate(
    {Username: Username },
    updateFields,
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log(updatedUser);
  res.status(200).json(updatedUser);
};

const deletePackage = async (req, res) => {
  const Username = req.body.Username;
  //const updateFields = {};
  //updateFields.HealthPackage = newHealthPackage;
  
  const updatedUser = await userModel.findOneAndUpdate(
    {Username: Username },
    {$set :{HealthPackage:null}},
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log(updatedUser);
  res.status(200).json(updatedUser);
};

const addFamilyInfo = async (req,res) => {
  const {userid,Name,NationalID,Age,Gender,Relation}=req.body
  //const {id}=req.params
  //console.log(id);
  //setID(id);
  try{
     const user = await userModel.findOneAndUpdate({_id:userid},{$push:{FamilyMembers:{
        Name:Name,NationalID:NationalID,Age:Age,Gender:Gender,Relation:Relation
     }}})
     console.log(user);
     await res.status(200).json(user)
  }
  catch(err){
     console.log(err)
  }
}
const getFamilyMembers = async (req,res) => {
  const Username = req.body.Username;
  //const id2 = getID();
  try{
     const FamilyMembers = await userModel.findOne({Username:Username})
     await res.status(200).json(FamilyMembers.FamilyMembers)
  }
  catch(err){
     console.log(err)
  }
}

function setID(ID){
  id = ID;
  console.log(id);
}

function getID(){
  return(id);
}

const searchForDoctor = async (req, res) => {
  const doctorId = req.params.id;
  console.log(doctorId);
  try {
    const doctor = await doctorModel.findById(doctorId);
    console.log(doctor);
    if (!doctor) {
      return res.status(404).json({ error: 'No doctor with this id was found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchForDoctorspeciality = async (req, res) => {
  
  var Speciality = req.body.Speciality;
  
  console.log(Speciality);
  
  
    const patient = await doctorModel.findOne({ Speciality: Speciality });
  
  console.log(patient);
  if(!patient){
    return res.status(404).json({error: 'No doctor with this Speciality was found'})
  }
  console.log(patient);
  //res.status(201).json({ Map: 'Patient registered successfully' });
  res.status(200).json(patient);
}

const searchForDoctordate = async (req, res) => {
  
  var Avaliable = req.body.Avaliable;
  
  console.log(Avaliable);
  
  
    const patient = await doctorModel.findOne({ Avaliable: Avaliable });
  
  console.log(patient);
  if(!patient){
    return res.status(404).json({error: 'No doctor is avaliable at this time'})
  }
  console.log(patient);
  //res.status(201).json({ Map: 'Patient registered successfully' });
  res.status(200).json(patient);
}

const addHealthRecords = async(req,res) => {
  const {Username,document} = req.body;
  console.log(document);
userModel.findOneAndUpdate({Username:Username},{$push:{HealthRecords:
  document
}})
.then ((err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
        res.status(200).json(document);
    }
});
}

const Loginuser = async(req,res) => 
{
  const {Username,Password} = req.body;
  var number = 200;
  var reqdoctor = await userModel.findOne({ Username: Username});
  if(!(reqdoctor)){
    reqdoctor = await adminstratorModel.findOne({Username:Username});
    number = 201;
  }
  //console.log(Password!==reqdoctor.Password)
 if (!(reqdoctor)|| Password!=reqdoctor.Password) {
    return res.status(404).json({ error: 'No Account With this Username and Password were found!.' });
  }
  
 console.log(reqdoctor._id);
 
 res.status(number).json({docid:reqdoctor._id});
}

const changepassworduser = async (req, res) => {
  const { userid, Password, newPassword} = req.body;
  const updateFields = {};
  updateFields.Password = newPassword;
  
  const updatedDoctor = await userModel.findOneAndUpdate(
    {_id: userid},
    updateFields,
    { new: true }
  );
  if (!updatedDoctor) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log(updatedDoctor);
  res.status(200).json(updatedDoctor);
};

const addHealthRecord = async (req,res) => {
  
  console.log("jbk")
  //console.log(id);
  //setID(id);
  try{
    const HealthRecords  = req.files;
    //console.log(HealthRecords)
    const userid = req.body.userid

    if (!HealthRecords) {
      console.log("jbk2")
      return res.status(400).json({ error: 'No document provided' });
    }

    // Assuming you want to store the document as a Buffer
    const documentData = HealthRecords[0].buffer;
    console.log(documentData)
    const documenttype =HealthRecords[0].mimetype;
    console.log("aaa"+documenttype)
    const result =await userModel.findOneAndUpdate({_id:userid},{$push:{HealthRecords:{data: documentData,dtype:documenttype}}})
    console.log(result)
    
    // Add the new health record
    //result.HealthRecords.push({ document: { data: documentData, type: HealthRecords[0].mimetype } });
    //console.log(result)
    //await result.save();
    console.log("jbk4")
    res.status(200).json({ message: 'Document uploaded successfully' });
  }
  catch(err){
     console.log(err)
  }
}

const resetpassword = async (req,res) => {
  const {otp,Username,newPassword} = req.body
  
  if(otp == 2421234){
    try{
      
      const updateFields = {};
    updateFields.Password = newPassword;
  
    const updated = await userModel.findOneAndUpdate(
    {Username: Username },
    updateFields,
    { new: true }
  );
  console.log(updated)
  if(!updated){
    throw new Error('Username not found')
  }
  else{
    res.status(200).json(updated)
  }
    }catch(error){
      res.status(404).json({error:"Username not found"})
    }
  }
  else{
    try{
      throw new Error('Wrong OTP')
    }catch(error){
      res.status(404).json({error:"Wrong OTP"})
    }
    }
}

const getHealthRecords = async (req, res) => {
  //retrieve all users from the database
  const Username = req.body.Username
  const doctors = await userModel.findOne({Username:Username});
  console.log(doctors)
  res.status(200).json(doctors);
 }

 const removeHealthRecords = async (req, res) => {
  const userId = req.query.userId;
  //const updateFields = {};
  //updateFields.HealthPackage = newHealthPackage;
  
  const updatedUser = await userModel.findOneAndUpdate(
    {_id: userId },
    {$set :{HealthRecords:null}},
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log(updatedUser);
  res.status(200).json(updatedUser);
};

const addavaliabletime = async (req, res) => {
  /*const userId = req.query.userId;
  const {Username} = req.params.Username
  
  const result = await  doctorModel.findOne({_id:userId});
  console.log(result+"csd")
  
  const user = await userModel.findOneAndUpdate({Username:Username},{$push :{Reserved:result.Avaliable[0]}},
    { new: true })
    console.log(user)

  await doctorModel.findOneAndUpdate({_id:userId},{$push :{reserved:user.Username}},
    { new: true })
    res.status(200).json(user)*/
    const Username = req.body.Username
    const Avaliable =new Date('2023-11-14');
    const result = await userModel.findOneAndUpdate({Username:Username},{$push :{Available:Avaliable}},
      { new: true })
      res.status(200).json(result)
};

const addfamilymemberpatient = async (req,res) => {
  const{Username,Email,Relation} = req.body //username of the patient and email of the patient that will be a family member to the patient that we took its username
  const familypatient = await userModel.findOne({Email:Email}) //the patient that will be a family member
  
  if(familypatient){
    const patient = await userModel.findOneAndUpdate({Username:Username},{$push:{FamilyMembers:{
      Name:familypatient.Name,Age:familypatient.Age,Gender:familypatient.Gender,Relation:Relation
   }}}) //adds the familypatient to his familymembers
   console.log(patient)
   res.status(200).json(patient)

  }
  else{
    res.status(404).json({error: 'Patient not found'})
  }
}

const getTimeSlots = async (req,res) => {
  const {Username} = req.params;
  try{

     const doctor = await doctorModel.findOne({Username:Username})
     await res.status(200).json(doctor.Available)
  }
  catch(err){
     console.log(err)
  }
}
const reserveTimeSlot = async (req,res) =>{
  const{Did,Pid,ADate} = req.body;
  const date=new Date(ADate)
  const user = await userModel.findOne({_id:Pid});
  const doctor = await doctorModel.findOne({_id:Did});
  try{
    const appointment = await appointmentsModel.create({DName:doctor.Name,PName:user.Name,Did,Pid,AppointmentDate:date})
    console.log(appointment)
    await res.status(200).json(appointment)
  }
  catch(err){
    res.status(404).json({error:err})
 }
}

const getWalletCredit = async (req, res) => {
  const _id = req.body._id; // Retrieve username from request body
  //console.log(Username);
  try {
      console.log("start");
      //console.log(Username);
      console.log("end");
      const user = await userModel.findOne({ _id: _id }); // Use the retrieved username
      console.log(user)
      await res.status(200).json(user);
  } catch (err) {
      console.log(err);
  }
};
const payWithWallet = async (req, res) => {
  try {
    const { amount, _id } = req.body; 
      const user = await userModel.findOne({ _id: _id });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.WalletCredit < amount) {
          return res.status(400).json({ message: "Insufficient wallet credit" });
      }
      user.WalletCredit -= amount;
      const updatedUser = await user.save();
      res.status(200).json({success: true,newWalletCredit: updatedUser.WalletCredit});
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while processing your request" });
  }
};

const getappointments = async (req, res) => {
  const userid = req.body.userid;
  console.log(userid);

  const user = await notificationModel.find({ doctorid: userid, isdoctor: true,Status:'Active' });

  if (user.length > 0) {
    const user1Ids = user.map(notification => notification.userid);
    const user1 = await userModel.find({ _id: { $in: user1Ids } });
    console.log(user1 + 'b');
    return res.status(200).json(user1);
  } else {
    const user2 = await notificationModel.find({ userid: userid, isuser: true,Status:'Active' });
    
    if (user2.length > 0) {
      const user2Ids = user2.map(notification => notification.doctorid);
      const user3 = await doctorModel.find({ _id: { $in: user2Ids } });
      console.log(user3 + 'd');
      return res.status(200).json(user3);
    } else {
      return res.status(404).json("User not found");
    }
  }
}

const getappointments2 = async (req, res) => {
  const userid = req.body.userid;
  console.log(userid);

  const user = await notificationModel.find({ doctorid: userid, isdoctor: true,Status:'Active' });

  if (user.length > 0) {
    const user1Ids = user.map(notification => notification.userid);
    const user1 = await userModel.find({ _id: { $in: user1Ids } });
    console.log(user1 + 'b');
    return res.status(200).json(user1);
  } 
}
const createnotification = async (req,res) =>
{
  const {userid,doctorid,subject,content} = req.body;
  const user = await userModel.findOne({_id:userid});
  const doctor = await doctorModel.findOne({_id:doctorid});
  const username = user.Username;
  console.log(username);
  const doctorname = doctor.Username;
  console.log(doctorname);
  var status = "Active";
  if(subject==="Appointment Cancelled"){
    await notificationModel.deleteMany({userid:userid,doctorid:doctorid,isuser:true});
    await notificationModel.deleteMany({userid:userid,doctorid:doctorid,isdoctor:true});
    await userModel.findOneAndUpdate({_id:userid},{WalletCredit:user.WalletCredit+doctor.SessionPrice})
    const deleted = await notificationModel.findOne({userid:userid,doctorid:doctorid,isdoctor:true});
    console.log(deleted+'e');
    status = "Cancelled"
  }
  else if(subject === "Followup Request"){
    status = "Pending"
  }
  const notification = await notificationModel.create({userid:userid , doctorid:doctorid , sender:doctorname,subject:subject,content:content +doctorname,isuser:true,Status:status});
  const notification2 = await notificationModel.create({userid:userid , doctorid:doctorid , sender:username,subject:subject,content:content +username,isdoctor:true,Status:status});
  console.log(notification);
  console.log(notification2);
  const mailOptions = {
    from: "el7a2niYaMeleegy@hotmail.com",
    to: "mazendarwish69@gmail.com",
    subject:subject,
    html: `<p>${content}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;">${username +" & "+doctorname}</p>`,
  };
  await sendEmail(mailOptions);
  res.status(200).json([notification,notification2]);
}


let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: "el7a2niYaMeleegy@hotmail.com",
    pass: "PASSWORD12345678",
  },
});

const sendEmail = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
    return;
  } catch (error) {
    throw error;
  }
};

const getnotificationsuser = async (req,res) =>
{
  const docid = req.body.docid;
  

  const user = await notificationModel.find({userid:docid,isuser:true}) 
  console.log(user);
  res.status(200).json(user);

}

const getnotificationsdoctor = async (req,res) =>
{
  const docid = req.body.docid;
  

  const user = await notificationModel.find({doctorid:docid,isdoctor:true}) 
  console.log(user);
  res.status(200).json(user);

}


const viewPatPres = async(req,res) =>{
  const {Pid} = req.params
  try{
    const pres = await prescriptionModel.find({Pid})
    res.status(200).json(pres)
  }
  catch(err){
    res.status(400).json(err)
  }


}

const reschedule = async(req,res) =>{
  const{userid,docid,DateOfBirth} = req.body;
  const updateFields = {};
    updateFields.DateOfBirth = DateOfBirth;
    
    const user = await userModel.findOneAndUpdate(
      {_id: userid },
      updateFields,
      { new: true }
    );
    console.log(user);
    const doctor = await doctorModel.findOneAndUpdate(
      {_id: docid },
      updateFields,
      { new: true }
    );
    console.log(doctor)
    res.status(200).json({user,doctor})
}






module.exports ={createUser,createDoctor,createAdminstrator,deleteUser,deleteDoctor,deleteAdminstrator,getDoctor,editDoctorInfo,filterByDateOrStatus,searchForPatient,getUsers,getDoctors,addPackage,updatePackage,deletePackage,addFamilyInfo,getFamilyMembers,searchForDoctor,searchForDoctorspeciality,searchForDoctordate,addHealthRecords,Loginuser,changepassworduser,addHealthRecord,resetpassword,getHealthRecords,removeHealthRecords,addfamilymemberpatient,getTimeSlots,reserveTimeSlot,addavaliabletime,getWalletCredit,payWithWallet,getappointments,createnotification,getnotificationsuser,getnotificationsdoctor,viewPatPres,reschedule,getappointments2,getAdminstrators};