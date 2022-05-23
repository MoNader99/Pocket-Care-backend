const express = require('express');
const router = express.Router()
const PrescriptionController = require('../Controllers/Prescription-Controller');


router.post('/', PrescriptionController.AddPrescription)
router.get('/getprescriptions/:patientId', PrescriptionController.GetAllPatientPrescriptions)

module.exports = router