const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");


// To retrieve all appointments
const GetAllAppointments = async (req,res)=> {
    try {
        const appointment = await Appointment.find(); // to find out all the posts in dB
        res.json(appointment)
    } catch (error) {
        res.json({message: "err"})  
    }
}

const createNewAppointment = async (req,res) => {
   
    const newAppointment = new Appointment ({
       DoctorID,
       PatientID,
       PrescriptionID,
       AppointmentDate, 
       FollowUpDate} 
       = req.body);

    try {
        const patientID = await Patient.exists({ _id: PatientID })
        const doctorID = await Doctor.exists({ _id: DoctorID })

        if (!(patientID && doctorID)) {
            throw Error ('there is no user with this ID')
        } 

        
    } catch (error) {
        res.json({message: error.message})
        return
    }
    
       try {
       const SavedAppointment = await newAppointment.save()
       res.json(SavedAppointment)

        
    } catch (error) {
        res.json({message: "Couldn't create new appintment "})
        
    }
}

const GetPatientDataConnected = async (req,res)=> {
   
        
        const patientData = await Appointment.find()
        .populate("DoctorID PatientID")
        .then(p=>console.log(p))
        .catch(error=>console.log(error));
    
}
        
    //     .find({ 
    //         "$or": [
    //         { "DoctorID": req.params.doctorId},
    //         ]
    // }) // to find out all the posts in dB
//         res.json(patientData)
//     } catch (error) {
//         res.json({message: "err"})  
//     }
// }

exports.GetAllAppointments = GetAllAppointments;
exports.createNewAppointment = createNewAppointment;
exports.GetPatientDataConnected = GetPatientDataConnected