const mongoose = require("mongoose");

const SavedDrugsSchema = new mongoose.Schema({
    DoctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        },
    DrugName:{
        type: String,
    },
    Dosage:{
        type: String,
    },
    Unit: {
        type: String,
    },
    Frequency:{
        type: String,
    }

});

module.exports = SavedDrugs = mongoose.model(
  "savedDrugs",
  SavedDrugsSchema
);
