const SavedDrugs = require("../models/SavedDrugs")

const GetAllSavedDrugs = async (req,res)=> {
    let savedDrugs
    try{
        savedDrugs = await SavedDrugs.find({ 
            "$or": [
                { "DoctorID": req.params.doctorID},
            ]
        }, { DoctorID: 0 } ) 
   
        res.json(savedDrugs)
    } catch (error) {
      // return next (new HttpError ("Couldn't find any patients", 404))
        res.status(404).json({message: "Couldn't find any saved drugs"})  
    }
}


const CreateNewDrug = async (req,res) =>{
    const NewSavedDrug = new SavedDrugs (
        {DoctorID,
            DrugName,
            Dosage,
            unit,
            frequency
        } = req.body
    )

    try {
        const doctorID = await Doctor.exists({ _id: DoctorID })

        if (!(doctorID)) {
            throw Error ('there is no Doctor with this ID')
        } 

        
    } catch (error) {
        res.json({message: error.message})
        return
    }
    try {
        SavedDrug = await NewSavedDrug.save()
        res.json(SavedDrug)
        
    } catch (error) {
        res.json({message: "err"})  
    }
}

//----------------------------------------------------- Delete Saved Drugs ---------------------------------------------------------
const DeleteSavedDrug = async (req,res) => {
    try {
        const DeletedDrug = await SavedDrugs.remove({_id: req.params.drugId})
        res.json(DeletedDrug)
        
    } catch (error) {
        res.json({message: err})
        return
        
    }
  } 

//----------------------------------------------------- Edit Saved Drugs ---------------------------------------------------------
  const EditSavedDrugs = async (req,res) => {
       const {
            DrugName,
            Dosage,
            Unit,
            Frequency
        } = req.body
    
      let savedDrug;
      try {
        savedDrug = await SavedDrugs.findById(req.params.drugId)
      } catch (error) {
          res.json({message: "This Drug Id doesn't exist"})
          return 
          
      }
      savedDrug.DrugName= DrugName
      savedDrug.Dosage = Dosage
      savedDrug.Unit = Unit
      savedDrug.Frequency = Frequency

      try {
          await savedDrug.save()
          res.json(savedDrug)
          
      } catch (error) {
        res.json({message: error})

          
      }
  }




exports.GetAllSavedDrugs = GetAllSavedDrugs
exports.CreateNewDrug = CreateNewDrug
exports.DeleteSavedDrug = DeleteSavedDrug
exports.EditSavedDrugs = EditSavedDrugs
