const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  Hospital: {
    type: String,
    required: true,
  },
  HourlyRate: {
    type: Number,
    required: true,
  },
  EducationalBackground: {
    type: String,
    required: true,
  },
  SessionPrice: {
    type: Number,
  },
  Speciality:{
    type: String,
  },
  Avaliable :[{
    type:Date,
  }],
  ID:{
    type:String
  },
  MedicalLicense:{
    dtype:String,
    data:Buffer
  },
  MedicalDegree:{
    dtype:String,
    data:Buffer
  },
  reserved:
    {
       type:String
    }
  
  
}, { timestamps: true });
/*
username: String,
  name: String,
  email: String,
  password: String,
  dob: Date,
  gender: String,
  mobileNumber: String,
  emergencyContact: {
    fullName: String,
    contactNumber: String,
*/ 

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports= Doctor;