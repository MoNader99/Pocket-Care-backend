const mongoose = require("mongoose");

const ClinicSchema = new mongoose.Schema({
  DoctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  Name: {
    type: String,
  },
  Address: {
    type: String,
  },
  Contact: {
    type: [String],
  },
  // Location: {
  //   type: [String],
  // },
});

module.exports = Clinic = mongoose.model("clinic", ClinicSchema);
