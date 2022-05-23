const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    DoctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
      },
      PatientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
      },
      PrescriptionID: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "prescription",
      },
      AppointmentDate: {
        type: Date,
        // default: Date.now,
      },
      FollowUpDate: {
        type: Date,
        // default: Date.now,
      },
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
