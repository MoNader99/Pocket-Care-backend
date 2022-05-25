const express = require('express');
const router = express.Router()
const PatientController = require('../Controllers/Patient-Controller')

// patient login
router.post('/login',  async (req,res) =>{
    return PatientController.SignInPatient(req,res);
})

// Create new patient
router.post('/signup',async (req,res) => {
try{

    let exists = await PatientController.IsPatientExists(req,res);
    if (!exists) {
    console.log("patient can be added")

    return PatientController.CreateNewPatient(req,res);
    }
} catch (err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// Patient change password
router.post('/changepassword', PatientController.ChangePassowrd)

router.post('/',PatientController.CreateNewPatient )
router.get('/patientdata/:patientId', PatientController.getPatientData)
router.patch('/editdata/:patientId', PatientController.EditPatientData)
router.get('/getmedications/:patientId', PatientController.GetPatientMedications)
router.post('/findbyspeciality', PatientController.FindDoctorBySPeciality)
// router.delete("/:patientId", PatientController.DeletePatient)

module.exports = router