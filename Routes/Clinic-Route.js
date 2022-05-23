const express = require('express');
const router = express.Router()
const ClinicController = require('../Controllers/Clinic-Controller')


router.get('/:doctorId', ClinicController.GetClinicByDoctorID)
router.post('/',ClinicController.CreateNewClinic )

module.exports = router