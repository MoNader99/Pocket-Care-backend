const mongoose = require("mongoose");

const PDConnectionSchema = new mongoose.Schema({
  DoctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  PatientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
 
});

module.exports = PDConnection = mongoose.model("connection", PDConnectionSchema);
