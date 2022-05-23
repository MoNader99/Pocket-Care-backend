const express = require('express');
const router = express.Router()
const PDConnectionController = require('../Controllers/PDConnection-Controller');



// Gets back all the posts
router.get('/', PDConnectionController.GetAllConnections)
router.post('/', PDConnectionController.CreateNewConnection)
router.get('/:doctorId', PDConnectionController.getDoctorConnections)
router.get('/today/:doctorId', PDConnectionController.getPatientDataOfToday)
router.get('/lastdays/:doctorId', PDConnectionController.getPatientDataOflastDays)

router.get('/patientsNO/:doctorId', PDConnectionController.getPatientsNumber )
router.post('/followupdate', PDConnectionController.getPatientsByFollowUpDate)
router.post('/appointmentdate', PDConnectionController.getPatientsByAppointmentDate)


module.exports = router