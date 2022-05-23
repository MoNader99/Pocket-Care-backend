const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({

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

module.exports = Prescriptions = mongoose.model(
  "prescription",
  PrescriptionSchema
);
