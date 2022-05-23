const mongoose = require("mongoose");

const FollowUpSchema = new mongoose.Schema({
    DoctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
      },
      PatientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
      },
      PrescriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "prescription",
      },
      FollowUpDate:{
        type: Date,
        default: Date.now,
      }


});

module.exports = FollowUp = mongoose.model("followUp", FollowUpSchema);
