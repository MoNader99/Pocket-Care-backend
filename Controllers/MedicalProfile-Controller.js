const MedicalProfile = require("../models/MedicalProfile")


const GetMedicalProfileByPatientID = async (req,res) =>{
    let SpeceficMeidcalProfile;
    try{
        SpeceficMeidcalProfile = await MedicalProfile.find({ 
            "$or": [
                { "PatientID": req.params.patientId},
            ]
        }, { _id: 0 } ) 
        
         
        res.json(SpeceficMeidcalProfile)
    }
    catch (err){
        res.json ({message:"err"});
    }
}

const CreateMedicalProfile = async (req,res) =>{
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
        } = req.body
    )

    try {
        const patientID = await Patient.exists({ _id: PatientID })

        if (!(patientID)) {
            throw Error ('there is no Patient with this ID')
        } 

        
    } catch (error) {
        res.json({message: error.message})
        return
    }
    try {
        SavedMedicalProfile = await NewMedicalProfile.save()
        res.json(SavedMedicalProfile)
        
    } catch (error) {
        res.json({message: "err"})  
    }
}


exports.GetMedicalProfileByPatientID = GetMedicalProfileByPatientID;
exports.CreateMedicalProfile = CreateMedicalProfile;


