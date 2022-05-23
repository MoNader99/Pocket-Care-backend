const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator") // to make sure to query the email as fast as possible in the database and to create a new user if only the email doesn't exist before

const PatientSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  
  LastName: {
    type: String,
    required: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  Age: {
    type: Number,
  },

  BirthDate: {
    type: Date,
    default: Date.now,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String, 
    minlength: 6,
    required: true,

  },
  MobileNumber: {
    type: String,
  },

  Address: {
    type: String,
  },

  // ProfileImage: {
  //   type: String,
  // }
 
 
});

PatientSchema.plugin(uniqueValidator) 
module.exports = Patient = mongoose.model("patient", PatientSchema);
