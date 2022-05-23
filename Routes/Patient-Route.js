const express = require('express');
const router = express.Router()
const PatientController = require('../Controllers/Patient-Controller')


// Gets back all the posts
// router.get('/', PatientController.GetAllPatients)
router.post('/',PatientController.CreateNewPatient )
router.get('/patientdata/:patientId', PatientController.getPatientData)
router.patch('/editdata/:patientId', PatientController.EditPatientData)

// router.delete("/:patientId", PatientController.DeletePatient)

module.exports = router