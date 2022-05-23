const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema({
  PatientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  MedicationName: {
    type: String,
  },
  StartingTime: {
    type: String,
  },
  NextTime: {
    type: String,
  },
  Duration: {
      type: String
  },
  Frequency: {
      type: String
  },
  IsStarted: {
      type: Boolean
  }
});

module.exports = Medication = mongoose.model("medication", MedicationSchema);
