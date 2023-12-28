const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
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
  Avaliable :{
    type:Date,
  },
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
  }
  
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports= Request;