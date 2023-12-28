const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const appointmentsSchema = new Schema({
DName:{
    type: String,
    required: true,
  },
Did:{
    type: String,
    required: true,
},
PName:{
    type: String,
    required: true,
},
Pid:{
    type: String,
    required: true,
},
PFamilyMemberName:{
    type: String,
},
PFamilyMemberID:{
    type: String,
},
AppointmentDate:{
    type: Date,
    required: true,
},
}, { timestamps: true });

const Appointments = mongoose.model('Appointments', appointmentsSchema);
module.exports= Appointments;