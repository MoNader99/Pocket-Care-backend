const express = require('express');
const router = express.Router()
const MedicalProfileController = require('../Controllers/MedicalProfile-Controller')

router.get('/:patientId', MedicalProfileController.GetMedicalProfileByPatientID)
router.post('/',MedicalProfileController.CreateMedicalProfile )

module.exports = router