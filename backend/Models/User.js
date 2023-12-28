const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthRecordsSchema = new mongoose.Schema({
  document: {
    data: Buffer,
    type: String  
  },
});


const userSchema = new Schema({
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
  Gender: {
    type: String,
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
  EmergencyContactFullName: {
    type: String,
    required: true,
  },
  EmergencyContactNumber: {
    type: Number,
    required: true,
  },
  HealthRecords :
     [{
      data: {type:Buffer},
      dtype: {type:String},
       
    }]
  ,
  Reserved :[{
    type:Date
  }],
  FollowUp :{
    type: Date
  },
  
  HealthPackage :{
    type: String,
  },
  WalletCredit: {
    type: Number,
    default: 10000, // Default value set to 100
  },
  FamilyMembers:[{
    Name:{type:String},
    NationalID:{type:String},
    Age:{type:Number},
    Gender:{type:String},
    Relation:{type:String}

  }]
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

const User = mongoose.model('User', userSchema);
module.exports= User;