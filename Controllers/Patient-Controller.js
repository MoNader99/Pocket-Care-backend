const Patient = require("../models/Patient");
const HttpError = require("../models/Http-Error")
const PDConnection = require("../models/PDConnection");
const MedicalProfile = require("../models/MedicalProfile");

// // To retrieve all patients
// const GetAllPatients = async (req,res)=> {
//     try {
//         const patient = await Patient.find(); // to find out all the posts in dB
//         res.json(patient)
//     } catch (error) {
//       // return next (new HttpError ("Couldn't find any patients", 404))
//         res.status(404).json({message: "Couldn't find any patients"})  
//     }
// }

// Create New Patient
// const CreateNewPatient = async (req,res) => {
//     const CreatedPatient = new Patient ({
//         FirstName,
//         LastName,
//         Age,
//         Gender,
//         Birthdate,
//         Email,
//         Password,
//         MobileNumber,
//         Address,
//         }
//             = req.body);
//     try{
//         const SavedPatient = await CreatedPatient.save()
//         res.json(SavedPatient)
//         } catch (err){
//             res.json ({message: err})
//         }
// }

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
    res.json({token})
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
  try{


        // hashing the password
        let Password = req.body.Password;
        const salt = await bcrypt.genSalt(10);
        CreatedPatient.Password = await bcrypt.hash(Password,salt);

        const SavedPatient = await CreatedPatient.save()
        console.log("patient is saved")


        // create & send the secret token
        const payload = {
          user: {
            id: SavedPatient.id
          }
        }
        jwt.sign(payload,"MySecretToken", (err,token) =>{
          if (err) throw err;
          res.json({token})
        })
      } catch (err){
          res.json ({message: err})
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

exports.SignInPatient = SignInPatient;
exports.CreateNewPatient = CreateNewPatient;
exports.getPatientData = getPatientData;
exports.DeletePatient = DeletePatient;
exports.EditPatientData = EditPatientData

