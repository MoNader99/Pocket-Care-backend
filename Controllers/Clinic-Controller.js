const Clinic = require ("../models/Clinic")


const GetClinicByDoctorID = async (req,res) =>{
    let speceficClinic;
    try{
        speceficClinic = await Clinic.find({ 
            "$or": [
                { "DoctorID": req.params.doctorId},
            ]
        }, { _id: 0 } ) 
        
         
        res.json(speceficClinic)
    }
    catch (err){
        res.json ({message:"err"});
    }
}


const CreateNewClinic = async (req,res) =>{
    const NewClinic = new Clinic (
        {DoctorID,
            Name,
            Address,
            Contact
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
        SavedClinic = await NewClinic.save()
        res.json(SavedClinic)
        
    } catch (error) {
        res.json({message: "err"})  
    }
}

exports.GetClinicByDoctorID = GetClinicByDoctorID;
exports.CreateNewClinic = CreateNewClinic;