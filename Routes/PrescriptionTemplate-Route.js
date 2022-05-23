const express = require('express');
const router = express.Router()
const PrescriptionTemplateController = require('../Controllers/PrescriptionTemplate-Controller');


router.post('/', PrescriptionTemplateController.CreatePrescriptionTemplate)
router.get('/:doctorID', PrescriptionTemplateController.GetAllPrescriptionTemplates)
router.delete('/:prescriptionId', PrescriptionTemplateController.DeletePrescriptionTemplate)
router.patch('/:prescriptionId', PrescriptionTemplateController.EditPrescriptionTemplate)

module.exports = router