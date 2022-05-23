const express = require('express');
const router = express.Router()
const AppointmentController = require('../Controllers/Appointment-Controller')



router.get('/', AppointmentController.GetAllAppointments)
router.post('/',AppointmentController.createNewAppointment)
router.get('/doctorId', AppointmentController.GetPatientDataConnected )


module.exports = router