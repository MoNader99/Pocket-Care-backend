const Patient = require("../models/Patient");
const HttpError = require("../models/Http-Error")
const PDConnection = require("../models/PDConnection");
const MedicalProfile = require("../models/MedicalProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Medication = require("../models/Medication");
const Doctor = require("../models/Doctor");


// -------------------------------------------- Sign in Patient -----------------------------------------
const SignInPatient = async (req,res) => {
  try{
    const { Email , Password} = req.body;
    let patient = await Patient.findOne({Email});

    if (!patient){
      res.status(400).json({message: "invalid credentials"})
      // return true; 
    }
    console.log(Password,patient.Password);
  const isMatch = await bcrypt.compare(Password,patient.Password)
  
  if(isMatch) {

  const payload = {
    user: {
      id: patient.id
    }
  }
  jwt.sign(payload,"MySecretToken", (err,token) =>{
    if (err) throw err;
    res.json({"PatientId" : patient._id})
  })

  }else{
    res.status(400).send("Invalid credentials")
  }
} catch(err){
res.status(404).json({message: err})  
}

}


// --------------------------------------------------- Create New Patient (Patient Sign Up) -------------------------------------
const CreateNewPatient = async (req,res) => {
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

    const CreatedPatientMedicalProfile = new MedicalProfile ({
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
      }
          = req.body);
 

 
          try{

        // hashing the password
        let Password = req.body.Password;
        const salt = await bcrypt.genSalt(10);
        CreatedPatient.Password = await bcrypt.hash(Password,salt);

        // const SavedPatient = await CreatedPatient.save()
        console.log("patient is saved")


      //   // create & send the secret token
      //   const payload = {
      //     user: {
      //       id: SavedPatient.id
      //     }
      //   }
      //   jwt.sign(payload,"MySecretToken", (err,token) =>{
      //     if (err) throw err;
      //     res.json({token})
      //   })
      // } catch (err){
      //     res.json ({message: err})
      // }

        CreatedPatientMedicalProfile.PatientID = CreatedPatient._id 
        await CreatedPatient.save()
        await CreatedPatientMedicalProfile.save()
        res.status(200).json({message: "Sign up process succeed"})
         
       } catch (error) {
         res.status(404).json(error.message)
         
       }
}

// check if the patient exists before sign up
const IsPatientExists = async (req,res) =>{
  try{
        const { Email} = req.body;
        let patient = await Patient.findOne({Email});

        if (patient){
          res.status(400).json({message: "this email already exist"})
          return true; 
        }
        return false
  } catch(err){
    res.status(404).json({message: err})  

  }
}

// ------------------------------------------- Patient Changes his password ---------------------------------------
const ChangePassowrd = async (req,res) => {
  try {
    const PatientData = await Patient.findById(req.body.patientId)
    console.log(PatientData)
    let SavedPatient

    if(PatientData.Password === req.body.oldPassword){
      const filter = { _id: req.body.patientId };
      const update = { Password: req.body.newPassword };
       SavedPatient = await Patient.findOneAndUpdate(filter, update, {
        new: true
      });
     
    }
    else {
      throw new Error ("Old password is Incorrect") 
    }
      res.json(SavedPatient)
    
  } catch (error) {
    res.json ({message: error.message})
    
  }
}
// ---------------------------------------------- Get Patient data with Medical Profile -----------------------------------------------------
const getPatientData = async (req,res) =>{
  
  let patientdata;
  let medicalProfile
  let returnedPatientArray=[];
  try{
     
        patientdata = await Patient.findById(req.params.patientId)
        medicalProfile = await MedicalProfile.find(
  
              { "PatientID": req.params.patientId }, '-_id -PatientID'
          
            )
        console.log(medicalProfile)
        returnedPatientArray.push(patientdata)
        returnedPatientArray.push(medicalProfile[0])
    
      res.json(returnedPatientArray)
    }
  catch(err){
    res.json ({message: err})
  }
}

// ---------------------------------------------------- Delete Patient ----------------------------------------------------------
const DeletePatient = async (req,res) => {
  try {
      const RemovedPatient = await Patient.remove({_id: req.params.patientId})
      res.json(RemovedPatient)
      
  } catch (error) {
      res.json({message: err})
      
  }
} 

//----------------------------------------------------- Edit Patient Data ---------------------------------------------------------
const EditPatientData = async (req,res) => {
  const {
    FirstName,
    LastName,
    Age,
    Gender,
    Birthdate,
    Email,
    Password,
    MobileNumber,
    Address,
   } = req.body

 let savedPatient;
 try {
  editedPatient = await Patient.findById(req.params.patientId)
  medicalProfile = await MedicalProfile.find({ 
    "$or": [
        { "PatientID": req.params.patientId }
    ]
    }, )
    console.log(medicalProfile.Weight)


 } catch (error) {
     res.json({message: "This patient Id doesn't exist"})
     return 
     
 }
 savedPatient.FirstName= FirstName
 savedPatient.LastName = LastName
 savedPatient.Age = Age
 savedPatient.Gender = Gender
 savedPatient.Birthdate = Birthdate
 savedPatient.Email = Email
 savedPatient.Password = Password
 savedPatient.MobileNumber = MobileNumber
 savedPatient.Address = Address

 try {
     await savedPatient.save()
     res.json(savedPatient)
     
 } catch (error) {
   res.json({message: error})

     
 }
}

//----------------------------------------------- Get Patient Medications --------------------------------------------------------
const GetPatientMedications = async (req,res) => {
let PatientMedications
  try {
    
     PatientMedications = await Medication.find({ "$or": [
      { "PatientID": req.params.patientId }
  ]
  }, '-PatientID' )
  if (PatientMedications.length == 0 ) {
   res.status(404).json("Patient Id is not found")

  }
  else {
  res.json(PatientMedications)
  }
    
  } catch (error) {
    res.status(404).json(error.message)
  }

}

// -------------------------------------------- Find Doctor By speciality -------------------------------------------------------------
const FindDoctorBySPeciality = async (req,res) => {
  let DoctorSpeciality
  let ExistedDoctors = []
  let DoctorsResult = []
  try {
   
    DoctorSpeciality = await Doctor.find({ 
       "AreaOfPractice": req.body.speciality 
  
  }, '-Password ')


  if (DoctorSpeciality.length == 0 ) {
    res.status(404).json("No doctor with this speciality")
   }
   else {

    for (i=0; i<DoctorSpeciality.length; i++){
      ExistedDoctors.push(DoctorSpeciality[i])
      DoctorsResult.push(ExistedDoctors[i]._id)
    }
    res.json({"DoctorID": DoctorsResult})
   }
    
  } catch (error) {
    res.status(404).json(error.message)
    
  }

}





exports.SignInPatient = SignInPatient;
exports.CreateNewPatient = CreateNewPatient;
exports.ChangePassowrd = ChangePassowrd;
exports.getPatientData = getPatientData;
exports.DeletePatient = DeletePatient;
exports.EditPatientData = EditPatientData
exports.IsPatientExists = IsPatientExists
exports.GetPatientMedications = GetPatientMedications
exports.FindDoctorBySPeciality = FindDoctorBySPeciality

