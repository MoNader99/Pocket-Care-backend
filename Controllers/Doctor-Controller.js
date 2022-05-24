const Clinic = require("../models/Clinic");
const Doctor = require("../models/Doctor");
const HttpError = require("../models/HTTP-Error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");





//----------------------------------------------- Create New Doctor --------------------------------------------------------
const CreateNewDoctor = async (req, res) => {
    const CreatedDoctor = new Doctor(
      ({
        FirstName,
        LastName,
        Age,
        Gender,
        Birthdate,
        Email,
        Password,
        MobileNumber,
        AreaOfPractice,
        biography,
      } = req.body)
    );
    try {
      let Password = req.body.Password;
      const salt = await bcrypt.genSalt(10);
      CreatedDoctor.Password = await bcrypt.hash(Password, salt);
  
      const SavedDoctor = await CreatedDoctor.save();
      const payload = {
        user: {
          id: SavedDoctor.id,
        },
      };
      jwt.sign(payload, "MySecretToken", (err, token) => {
        // if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send( {message: err.message} );
    }
  };
  

// //   ------------------------------------------------ Sign In Doctor --------------------------------------
  const SignInDoctor = async (req, res) => {
    try {
      const { Email, Password } = req.body;
      let doctor = await Doctor.findOne({ Email });
  
      if (!doctor) {
        res.status(400).json({ message: "invalid credentials" });
        // return true;
      }
      console.log(Password, doctor.Password);
     if (Password === doctor.Password)
     {
       res.json({"DoctorID" : doctor._id})
     }
     else {
       throw new Error ("Password is incorrect")
     }
     
    } catch (err) {
      res.json(err.message);
      // res.status(404).json({ message: err });
    }
  };

// ------------------------------------------- Doctor Changes his password ---------------------------------------
  const ChangePassowrd = async (req,res) => {
    try {
      const DoctorData = await Doctor.findById(req.body.doctorId)
      console.log(DoctorData)
      let SavedDoctor

      if(DoctorData.Password === req.body.oldPassword){
        const filter = { _id: req.body.doctorId };
        const update = { Password: req.body.newPassword };
         SavedDoctor = await Doctor.findOneAndUpdate(filter, update, {
          new: true
        });
       
      }
      else {
        throw new Error ("Old password is Incorrect") 
      }
        res.json(SavedDoctor)
      
    } catch (error) {
      res.json ({message: error.message})
      
    }
  }

// ---------------------------------------------- Doctor Create New patient profile -------------------------------------------
const CreateNewPatient = async (req,res) => {
    try {
        const CreatedPatient = new Patient ({
            FirstName,
            LastName,
            Age,
            Gender,
            Birthdate,
            Email,
            Password,
            MobileNumber,
            Address,
            }
            = req.body);

        const NewMedicalProfile = new MedicalProfile (
            {PatientID,
            Weight,
            Height,
            BloodGroup,
            ChronicDiseases,
            ChronicMedications,
            PastSurgeries,
            Allergies,
            FamilyHistory,
            SmokingHabits,
            ActivityLevel,
            AlcoholConsumption,
            Occupation,
            } = req.body)
        
        const SavedPatient = await CreatedPatient.save()
        const SavedMedicalProfile = await NewMedicalProfile.save()
        res.json(SavedPatient, SavedMedicalProfile)


        
        
    } catch (error) {
      res.json ({message: err})
        
    }
}



// ---------------------------------------------------------  Doctor Sign up ------------------------------------------------------
// const CreateNewDoctor = async (req,res,next) => {
//     console.log(req.file)
//     const CreatedDoctor = new Doctor ({
//         FirstName,
//         LastName,
//         Age,
//         Gender,
//         Birthdate,
//         Email,
//         Password,
//         MobileNumber,
//         AreaOfPractice,
//         biography,
//         }
//             = req.body);

//     let existingEmail
//     try {
//         existingEmail = await Doctor.findOne({Email: Email})  
//         console.log(existingEmail)
         
//      } catch (error) {
//          res.json({message: "Signing up failed, Please try again later"})
//      }
//      if (existingEmail) {
//         const error = new HttpError (
//             'This Doctor already exists, please login instaed', 422
//         )
//         return next(error)
//      }  

//     try{
//         const SavedDoctor = await CreatedDoctor.save()
//         res.json(SavedDoctor)
//         } catch (err){
//             res.json ({message: err})
//         }
// }

// ---------------------------------------------------- Get Doctor Data with his Clinic data --------------------------------------------------
const getDoctorDataWithClinic = async (req,res) =>{
  
    let doctorData;
    let Clinicdata
    let returnedDoctorArray=[];
    try{
       
        doctorData = await Doctor.findById(req.params.doctorId)
        Clinicdata = await Clinic.find(
    
            { "DoctorID": req.params.doctorId }, '-DoctorID'
              )
          
          returnedDoctorArray.push(doctorData)
          returnedDoctorArray.push(Clinicdata[0])
      
        res.json(returnedDoctorArray)
      }
    catch(err){
      res.json ({message: err})
    }
  } 




exports.SignInDoctor = SignInDoctor
exports.CreateNewDoctor = CreateNewDoctor
exports.ChangePassowrd = ChangePassowrd
exports.CreateNewPatient = CreateNewPatient
exports.getDoctorDataWithClinic = getDoctorDataWithClinic

