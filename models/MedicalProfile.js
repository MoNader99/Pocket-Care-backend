const mongoose = require("mongoose");

const MedicalProfileSchema = new mongoose.Schema({
  PatientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  Weight: {
    type: String,
  },
  Height: {
    type: String,
  },
  BloodGroup: {
    type: String,
  },
  ChronicDiseases: {
    type: [String],
  },
  ChronicMedications: {
    type: [String],
  },
  PastSurgeries: {
    type: [String],
  },
  Allergies: {
    type: [String],
  },
  FamilyHistory: {
    type: [String],
  },
  SmokingHabits: {
    type: String,
  },
  ActivityLevel: {
    type: String,
  },
  AlcoholConsumption: {
    type: String,
  },
  Occupation: {
    type: String,
  },
 
  
});

module.exports = MedicalProfile = mongoose.model(
  "medicalprofile",
  MedicalProfileSchema
);
