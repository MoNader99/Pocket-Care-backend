const express = require('express');
const router = express.Router()
const DoctorController = require('../Controllers/Doctor-Controller')


const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './images/')

    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+ file.originalname)

    }
})    
const upload = multer({
    storage: storage
    })



// Gets back all the doctors`
// router.get('/', DoctorController.GetAllDoctors)

// Doctor Sign up
router.post('/', DoctorController.CreateNewDoctor )
// router.post('/',upload.single ('upload') )

// Get patients connected to each doctor
router.get('/:doctorId', DoctorController.GetPatientDataConnectedToDoctor)

// Doctor creating new patient 
router.post('/newpatient', DoctorController.CreateNewPatient)

router.get('/getdoctordata/:doctorId', DoctorController.getDoctorDataWithClinic)

router.post('/image', upload.single('file'), (req, res) => {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
  });


module.exports = router