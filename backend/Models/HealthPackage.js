const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
  
});

const HealthPackage = mongoose.model('HealthPackage', healthPackageSchema);

module.exports = HealthPackage;
