const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  userid : {
    type: Object,
    
    
  },
  doctorid:{
    type: Object,
    
  },
  isuser:{
    type:Boolean,
    default:false,
  },
  isdoctor:{
    type:Boolean,
    default:false,
  },
  Status:{
    type:String,
    default:"Active"

  },
  sender:{
    type:String,
  },
  subject:{
    type:String,
  },
  content:{
    type:String,
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationsSchema);
module.exports= Notification;