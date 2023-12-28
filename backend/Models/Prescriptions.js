const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const prescriptionsSchema = new Schema({
DName:{
    type: String,
    required: true,
  },
PName:{
    type: String,
    required: true,
},
Did:{
    type: String,
    required: true,
},
Pid:{
    type: String,
    required: true,
},
AppointmentID:{
    type: String,
    required: true,
},
Prescription:{
    type: String,
    required:true,
},
AppointmentDate:{
    type: Date,
    required: true,
},
Status:{
    type: String,
    required: true,
    default:"Unfilled"
},
}, { timestamps: true });

const Prescriptions = mongoose.model('Prescriptions', prescriptionsSchema);
module.exports= Prescriptions;