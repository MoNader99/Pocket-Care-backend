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

// Doctor Sign up
router.post('/signup',async (req,res) => {
  try{
  
      let exists = await DoctorController.IsDoctorExists(req,res);
      if (!exists) {
      console.log("Doctor can be added")
      return DoctorController.CreateNewDoctor(req,res);
      }
  } catch (err){
          console.error(err.message)
          res.status(500).send("Server Error")
      }
  })


// Doctor Sign in
router.post('/login', DoctorController.SignInDoctor)

// Doctor change password
router.post('/changepassword', DoctorController.ChangePassowrd)


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