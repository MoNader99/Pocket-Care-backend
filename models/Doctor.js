const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const DoctorSchema = new mongoose.Schema({
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
    required: false,
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
    required: true,
  },
 
  AreaOfPractice: {
    type: String,
    required: true,
  },
  Biography: {
    type: String,
    default: "de7k",
  },
  Patients :[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  }],
  // ProfileImage: {
  //   data: Buffer,
  //   contentType: String
  // }
});

DoctorSchema.plugin(uniqueValidator) 

module.exports = Doctor =  mongoose.model("doctor", DoctorSchema);
