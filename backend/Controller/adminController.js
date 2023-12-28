const adminstratorModel = require('../Models/Adminstrator.js');
const requestModel = require('../Models/Requests.js');
const doctorModel = require('../Models/Doctor.js');
const  mongoose  = require('mongoose');
const healthPackageModel = require('../Models/HealthPackage.js');

const nodemailer = require("nodemailer");
const OTP = require("../Models/OTP1.js");

const Patient = require('../Models/User.js');

const Login = async(req,res) => 
{
  const {Username,Password} = req.body;
  const reqdoctor = await adminstratorModel.findOne({ Username: Username});
  //console.log(Password!==reqdoctor.Password)
 if (!(reqdoctor)|| Password!=reqdoctor.Password) {
    return res.status(404).json({ error: 'No Account With this Username and Password were found!.' });
  }
  
 console.log(reqdoctor);
 
 res.status(200).json(reqdoctor);
}

const changepasswordadmin = async (req, res) => {
    const { userid, Password, newPassword} = req.body;
    const updateFields = {};
    updateFields.Password = newPassword;
    
    const updatedDoctor = await adminstratorModel.findOneAndUpdate(
      {_id: userid },
      updateFields,
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(updatedDoctor);
    res.status(200).json(updatedDoctor);
  };

  const getRequests = async (req, res) => {
    //retrieve all users from the database
    const doctors = await requestModel.find();
    res.status(200).json(doctors);
   }

  const acceptdoctor = async (req,res) => {
    const userId = req.query.userId;
    console.log(userId)
    // check if userId is not empty
    if(userId){
    const result = await  requestModel.findOne({_id:userId});
    console.log(result+"csd")
    const doctor = await doctorModel.create({Username:result.Username, Name:result.Name, Email:result.Email, Password:result.Password,DateOfBirth: result.DateOfBirth, HourlyRate:result.HourlyRate, Hospital:result.Hospital,EducationalBackground: result.EducationalBackground,SessionPrice:result.SessionPrice,Speciality:result.Speciality,Avaliable:result.Avaliable,ID:result.ID,MedicalLicense:result.MedicalLicense,MedicalDegree:result.MedicalDegree});
    console.log(doctor + "abc")
    await requestModel.findOneAndRemove({_id:userId})
    res.status(200).json(doctor)
    }else{
        res.status(400).json({error:"userId is required"})
    }
    //await doctorModel.create(result)
    //res.status(200).json(accepteddoc);
  }

  const rejectdoc = async (req,res) => {
    const userId = req.query.userId
    console.log(userId)
    if(userId){
      const result = await requestModel.findOneAndRemove({_id:userId})
      res.status(200).json(result)
    }
    else{
      res.status(404).json({error:"userId is required"})
    }
  }

  const resetpasswordadmin = async (req,res) => {
    const {otpreal,otp,Username,newPassword} = req.body
    console.log(otp+"a")
    if(otp === otpreal){
      try{
        
        const updateFields = {};
      updateFields.Password = newPassword;
    
      const updated = await Patient.findOneAndUpdate(
      {Username: Username },
      updateFields,
      { new: true }
    );
    console.log(updated)
    if(!updated){
      throw new Error('Username not found')
    }
    else{
      res.status(200).json({docid:updated._id})
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

  const addHealthPackage = async (req, res) => {
    const { packageName} = req.body;
  
    try {
      // Create a new health package
      const healthPackage = await healthPackageModel.create({
        
        description: description
        
      });
  
      res.status(200).json(healthPackage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  const verify = async (req, res) => {
    try {
      console.log("xghs");
      let { email, otp, newPassword } = req.body;
      const otpValidity = await verifyOTP({ email, otp });
      if (otpValidity) {
        const user =Patient.findOneAndUpdate(
          { Email:email },
          { Password: newPassword }
        );

        
        console.log(otpValidity);
      }
      res.status(200).json({ valid: otpValidity });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  //helper functions
  
  const verifyOTP = async ({ email, otp }) => {
    try {
      if (!(email && otp)) {
        throw Error("Provide values for Email and OTP");
      }
      const matchedOTPRecord = await OTP.findOne({ email:email });
      if (!matchedOTPRecord) {
        throw Error("No OTP Record Found");
      }
      const { expiresAt } = matchedOTPRecord;
      if (expiresAt < Date.now()) {
        await OTP.deleteOne({ email:email });
        throw Error("OTP has expired. Please request another one");
      }
      const otpInRecord = matchedOTPRecord.otp;
      if (otpInRecord == otp) {
        return true;
      } else return false;
    } catch (error) {
      throw error;
    }
  };
  
  const requestOTP =  async (req, res) => {
    try {
      const { email } = req.body;
      const subject = "Email Verification";
      message = "Verify your email with the code below";
      duration = 1;
      const createdOTP = await sendOTP({
        email,
        subject,
        message,
        duration,
      });
      res.status(200).json({docid:createdOTP.otp});
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  //helper functions
  const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
      if (!(email && subject && message)) {
        throw error("provide values for email, subject and message");
      }
      await OTP.deleteOne({ email });
      const generatedOTP = await generateOTP();
      console.log(generatedOTP);
      const mailOptions = {
        from: "el7a2niYaMeleegy@hotmail.com",
        to: email,
        subject,
        html: `<p>${message}</p><p style="color:tomato; font-size:25px; letter-spacing:2px;"><b>${generatedOTP}</b></p>`,
      };
      await sendEmail(mailOptions);
  
      const newOTP = await new OTP({
        email,
        otp: generatedOTP,
        createdAT: Date.now(),
        expiresAt: Date.now() + 3600000 * +duration,
      });
      const createdOTPRecord = await newOTP.save();
      return createdOTPRecord;
    } catch (error) {
      throw error;
    }
  };
  
  const generateOTP = async () => {
    try {
      return `${Math.floor(1000 + Math.random() * 9000)}`;
    } catch (error) {
      throw error;
    }
  };
  
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user: "el7a2niYaMeleegy@hotmail.com",
      pass: "PASSWORD12345678",
    },
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("ready for message");
      console.log(success);
    }
  });
  
  const sendEmail = async (mailOption) => {
    try {
      await transporter.sendMail(mailOption);
      return;
    } catch (error) {
      throw error;
    }
  };


module.exports = {Login,changepasswordadmin,acceptdoctor,rejectdoc,getRequests,resetpasswordadmin,addHealthPackage,verify,requestOTP};