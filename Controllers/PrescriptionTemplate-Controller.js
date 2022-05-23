const Doctor = require("../models/Doctor")
const PrescriptionTemplate = require("../models/PrescriptionTemplate")



// ----------------------------------------- Create Prescription Template ------------------------------------------------
const CreatePrescriptionTemplate = async (req,res) => {
    const NewPrescriptionTemplate = new PrescriptionTemplate (req.body)
    try {
        const doctorID = await Doctor.exists({ _id: req.body.DoctorID })

        if (!(doctorID)) {
            throw Error ('there is no Doctor with this ID')
        } 

        
    } catch (error) {
        res.json({message: error.message})
        return
    }
    try {
        SavedPrescription = await NewPrescriptionTemplate.save()
        res.json(SavedPrescription)
        
    } catch (error) {
        res.json({message: error})  
    }
}

// ------------------------------------------- Get Prescription templates made by each doctor ---------------------------------------

const GetAllPrescriptionTemplates = async (req,res)=> {
    let PrescriptionTemplates;
    try{
        PrescriptionTemplates = await PrescriptionTemplate.find({ 
            "$or": [
                { "DoctorID": req.params.doctorID},
            ]
        }, { _id: 0 } ) 
        
         
        res.json(PrescriptionTemplates)
  
    } catch (error) {
      // return next (new HttpError ("Couldn't find any patients", 404))
        res.status(404).json({message: "Couldn't find any Prescription template"})  
    }
}

// ---------------------------------------------- Delete Prescription Template -----------------------------------------
const DeletePrescriptionTemplate = async (req,res) => {
    try {
        const DeletedPrescription = await PrescriptionTemplate.remove({_id: req.params.prescriptionId})
        res.json(DeletedPrescription)
        
    } catch (error) {
        res.json({message: err})
        
    }
  } 

  //----------------------------------------------------- Edit Prescription ---------------------------------------------------------
  const EditPrescriptionTemplate = async (req,res,next) => {
    const {
        Diagnosis,
          Notes,
          Drugs: [{
            DrugName,
            Dosage: [{
             Dose,
              Unit,
              Frequency,
            }],
            Instructions,
            Duration,
          }]
     } = req.body
 
   let prescription;

   try {
    prescription = await PrescriptionTemplate.findById(req.params.prescriptionId)
   } catch (error) {
       res.json({message: "This Prescription Id doesn't exist"})
       return 
       
   }
   prescription.Diagnosis= Diagnosis
   prescription.Notes = Notes
   prescription.Drugs[0].DrugName = DrugName
   prescription.Drugs[0].Dosage[0].Dose = Dose
   prescription.Drugs[0].Dosage[0].Unit = Unit
   prescription.Drugs[0].Dosage[0].Frequency = Frequency
   prescription.Drugs[0].Instructions = Instructions
   prescription.Drugs[0].Duration = Duration

   try {
       await prescription.save()
       res.json(prescription)
       
   } catch (error) {
     res.json({message: error})

       
   }
}




exports.CreatePrescriptionTemplate = CreatePrescriptionTemplate
exports.GetAllPrescriptionTemplates = GetAllPrescriptionTemplates
exports.DeletePrescriptionTemplate = DeletePrescriptionTemplate
exports.EditPrescriptionTemplate = EditPrescriptionTemplate