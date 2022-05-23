const mongoose = require("mongoose");

const PrescriptionTemplateSchema = new mongoose.Schema({
  DoctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
  },
  Diagnosis: {
    type: String,
  },
  Notes: {
    type: String,
  },
  Drugs: [{
    DrugName: String,
    Dosage: [{
      Dose: Number,
      Unit: String,
      Frequency: String,
    }],
    Instructions: String,
    Duration: String
  }]
});

module.exports = PrescriptionTemplates = mongoose.model(
  "prescriptionTemplate",
  PrescriptionTemplateSchema
);
