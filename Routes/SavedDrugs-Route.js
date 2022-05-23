const express = require('express');
const router = express.Router()
const SavedDrugsController = require('../Controllers/SavedDrugs-Controller')


router.get('/:doctorID', SavedDrugsController.GetAllSavedDrugs)
router.post('/',SavedDrugsController.CreateNewDrug)
router.delete('/:drugId', SavedDrugsController.DeleteSavedDrug )
router.patch('/:drugId', SavedDrugsController.EditSavedDrugs)

module.exports = router