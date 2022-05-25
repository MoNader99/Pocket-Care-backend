const Appointment = require("../models/Appointment")
const Doctor = require("../models/Doctor")
const Medication = require("../models/Medication")
const Prescription = require("../models/Prescription")

// ----------------------------------------------- Add Prescription to patient -----------------------------------------
const AddPrescription = async (req,res) => {
    
    const NewPrescription = new Prescription (req.body.Prescription)    

    try {
        Appointmentdata = await Appointment.find({ 
            "$or": [
                { "PatientID": req.body.PatientID,
                "DoctorID": req.body.DoctorID}
            ]
            },)
            Appointmentdata[0].PrescriptionID = NewPrescription._id
            
            const CreatedMedication = new Medication (req.body);
            
            CreatedMedication.MedicationName = NewPrescription.Drugs[0].DrugName
            CreatedMedication.Frequency = NewPrescription.Drugs[0].Dosage[0].Frequency 
            CreatedMedication.Duration = NewPrescription.Drugs[0].Duration

        SavedMedication = await CreatedMedication.save()
        SavedPrescription = await NewPrescription.save()
        SavedAppointment = await Appointmentdata[0].save()
        res.json(SavedPrescription)      

    } catch (error) {
        res.json({message: error.message})  
    }
}


// ----------------------------------------------- Get All Prescriptions of patient -----------------------------------------
const GetAllPatientPrescriptions = async (req,res) =>{
    try {
        const searchedAppointment  = await Appointment.find({ 
            "$or": [
                { "PatientID": req.params.patientId}
            ]
            },'-_id -DoctorID -AppointmentDate -FollowUpDate')

        console.log(searchedAppointment)

        let Data
        let PrescriptionsData = []
        for (i=0; i<searchedAppointment.length;i++)
        {
            if(searchedAppointment[i].PrescriptionID !== '') {
            Data = await Prescription.findById(searchedAppointment[i].PrescriptionID)
            PrescriptionsData.push(Data)
            }
        }
        res.json(PrescriptionsData)

        
    } catch (error) {
        res.json({message: error.message})
        
    }
}

exports.AddPrescription = AddPrescription
exports.GetAllPatientPrescriptions = GetAllPatientPrescriptions

