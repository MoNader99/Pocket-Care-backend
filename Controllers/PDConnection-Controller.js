const PDConnection = require ('../models/PDConnection')
const Patient = require('../models/Patient');
const { default: mongoose } = require('mongoose');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

var today = new Date();
var todayDate = (today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()).toString();

var Td = new Date(todayDate)
let tomorrow =  new Date()

tomorrow.setDate(today.getDate() + 8)

var tmr = (tomorrow.getFullYear()+'-'+(tomorrow.getMonth()+1)+'-'+tomorrow.getDate()).toString();
var Tm = new Date(tmr)


// ---------------------------------------- Get All Connections between doctors and patients -------------------------------------------
const GetAllConnections = async (req,res)=> {
    try {
        const connection = await PDConnection.find(); 
        res.json(connection)
    } catch (error) {
        res.json({message: "err"})  
    }
}

// ---------------------------- Create connection between doctor and patient and make appointment date today -------------------------------------
const CreateNewConnection = async (req,res) => {

    const CreatedConnection = new PDConnection ({
        DoctorID,
        PatientID
    }
        = req.body);
        let patient;
        let doctor;
        try {
            patient = await Patient.findById(PatientID)
            doctor = await Doctor.findById(DoctorID)
            if (!(patient && doctor))
            {
                throw Error ('there is no user with this ID')
                
            } 
        } catch (err) {
            res.json ({message: err.message})
            return 
        }

        try{

            try{
                const resultDoctor = await PDConnection.exists({ DoctorID: DoctorID })
                const resultPatient = await PDConnection.exists({ PatientID: PatientID })

                if ((resultDoctor && resultPatient))
            {
                throw Error ('Connection already exists')
                
            } 
            
            }catch (err){
                res.json ({message: err.message})
                return
            }
            const CreatedAppointment = new Appointment ({
                DoctorID,
                PatientID,
                PrescriptionID,
                AppointmentDate, 
                FollowUpDate} 
                = {DoctorID, PatientID,"PrescriptionID" : "", "AppointmentDate": Td, "FollowUpDate": Tm });



              const SavedConnection = await CreatedConnection.save()
              const SavedAppointment = await CreatedAppointment.save()
              res.json({SavedConnection, SavedAppointment})

            } catch (err){
                res.json ({message: err.message})
                return
            }
}


// ----------------------------------------------- Get patients data connected to each doctor ------------------------------------------------
const getDoctorConnections = async (req,res) => {


    let doctorConnections;
    try{
        doctorConnections = await PDConnection.find({ 
            "$or": [
                { "DoctorID": req.params.doctorId},
            ]
        }, '-_id -DoctorID')

      try {
        var PatientData;
        let returnedPatientArray=[];
        try{
            for(var i=0;i<doctorConnections.length;i++)
            {
              PatientData = await Patient.findById(doctorConnections[i].PatientID)
              Appointmentdata = await Appointment.find({ 
                "$or": [
                    { "PatientID": doctorConnections[i].PatientID,
                    "DoctorID": req.params.doctorId}
                ]
                }, '-_id -DoctorID -PatientID -PrescriptionID')

                if(Appointmentdata.length >= 1){
                    PatientData["_doc"] = {...PatientData["_doc"],AppointmentDate:Appointmentdata[0].AppointmentDate}
                    PatientData["_doc"] = {...PatientData["_doc"],FollowUpDate:Appointmentdata[0].FollowUpDate}
                }
                
              returnedPatientArray.push(PatientData)
            }
            res.json(returnedPatientArray)
            
          }
        catch(err){
            res.json ({message:err.message});
        }
          
      } catch (err) {
        res.json ({message:"err1"});
      }
        
        
    }
    catch (err){
        res.json ({message:"err2"});
    }
}

// ------------------------------------------ Get patients who have appointment today ----------------------------------------

const getPatientDataOfToday = async (req,res) => {
    


    let doctorConnections;
    try{
        doctorConnections = await PDConnection.find({ 
            "$or": [
                { "DoctorID": req.params.doctorId},
            ]
        }, '-_id -DoctorID')

      try {
        var PatientData;
        let returnedPatientArray=[];
        try{
            for(var i=0;i<doctorConnections.length;i++)
            {
              PatientData = await Patient.findById(doctorConnections[i].PatientID)
              Appointmentdata = await Appointment.find({ 
                "$or": [
                    { "PatientID": doctorConnections[i].PatientID,
                    "DoctorID": req.params.doctorId}
                ]
                }, '-_id -DoctorID -PatientID -PrescriptionID')

                
                if(Appointmentdata.length >= 1){
                    PatientData["_doc"] = {...PatientData["_doc"],AppointmentDate:Appointmentdata[0].AppointmentDate}
                    PatientData["_doc"] = {...PatientData["_doc"],FollowUpDate:Appointmentdata[0].FollowUpDate}
                }
                
                 TodayDate= (PatientData["_doc"].AppointmentDate.getFullYear()+'-'+(PatientData["_doc"].AppointmentDate.getMonth()+1)+'-'+PatientData["_doc"].AppointmentDate.getDate()).toString();
                //  console.log(PatientData["_doc"].AppointmentDate)
                //  console.log(TodayDate)
                //  console.log(date)
           if (TodayDate === todayDate)
              {
                returnedPatientArray.push(PatientData)
              }
            }
            res.json(returnedPatientArray)
            
          }
        catch(err){
            res.json ({message:err.message});
        }
          
      } catch (err) {
        res.json ({message:"err1"});
      }
        
        
    }
    catch (err){
        res.json ({message:"err2"});
    }
}

// ------------------------------------------ Get patients who have follow up in the next 3 days ----------------------------------------

const getPatientDataOflastDays = async (req,res) => {


    let doctorConnections;
    try{
        doctorConnections = await PDConnection.find({ 
            "$or": [
                { "DoctorID": req.params.doctorId},
            ]
        }, '-_id -DoctorID')

        // console.log(doctorConnections)

      try {
        var PatientData;
        let returnedPatientArray=[];
        var today = new Date();
        var date = (today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()).toString();
        try{
            for(var i=0;i<doctorConnections.length;i++)
            {
              PatientData = await Patient.findById(doctorConnections[i].PatientID)
             
              Appointmentdata = await Appointment.find({ 
                "$or": [
                    { "PatientID": doctorConnections[i].PatientID,
                    "DoctorID": req.params.doctorId}
                ]
                }, '-_id -DoctorID -PatientID -PrescriptionID')
                // console.log(Appointmentdata)

                
                if(Appointmentdata.length >= 1){
                    PatientData["_doc"] = {...PatientData["_doc"],AppointmentDate:Appointmentdata[0].AppointmentDate}
                    PatientData["_doc"] = {...PatientData["_doc"],FollowUpDate:Appointmentdata[0].FollowUpDate}
                }
                
                // FollowUp= (PatientData["_doc"].FollowUpDate.getFullYear()+'-'+(PatientData["_doc"].FollowUpDate.getMonth()+1)+'-'+PatientData["_doc"].FollowUpDate.getDate()).toString();
           
                differenceDays = (PatientData["_doc"].FollowUpDate.getFullYear(),(PatientData["_doc"].FollowUpDate.getMonth()+1),PatientData["_doc"].FollowUpDate.getDate()) - (today.getFullYear(),(today.getMonth()+1),today.getDate()) 
                // console.log(FollowUp)
                // console.log(date)
           
           if ((differenceDays <= 3) && (differenceDays > 0 ))
              {
                returnedPatientArray.push(PatientData)
                console.log(differenceDays)
              }
              else if (differenceDays > 3){
                 return res.json('No patients have follow up in the next 3 days')
              }
            }
            res.json(returnedPatientArray)
            
          }
        catch(err){
            res.json ({message:err.message});
        }
          
      } catch (err) {
        res.json ({message:"err1"});
      }
        
        
    }
    catch (err){
        res.json ({message:"err2"});
    }
}

// --------------------------------------------- Get number of patients connected to each doctor --------------------------------------
const getPatientsNumber = async (req,res) => {

    let doctorConnections;
    try{
        doctorConnections = await PDConnection.find({ 
            "$or": [
                { "DoctorID": req.params.doctorId},
            ]
        }, '-_id -DoctorID')
    
        res.json({PatientCount : doctorConnections.length})
    }
    catch (err){
        res.json ({message:err.message});
    }
}

// ------------------------------------------------- Get patients by followup date ----------------------------------------------

const getPatientsByFollowUpDate = async (req,res) =>{
    let doctorConnections;
    try{
        doctorConnections = await PDConnection.find({ 
            "$or": [
                { "DoctorID": req.body.doctorId},
            ]
        }, '-_id -DoctorID')

      try {
        var PatientData;
        let returnedPatientArray=[];
        try{
            for(var i=0;i<doctorConnections.length;i++)
            {
              PatientData = await Patient.findById(doctorConnections[i].PatientID)
              Appointmentdata = await Appointment.find({ 
                "$or": [
                    { "PatientID": doctorConnections[i].PatientID,
                    "DoctorID": req.body.doctorId}
                ]
                }, '-_id -DoctorID -PatientID -PrescriptionID')
           
          if(Appointmentdata.length >= 1){
            PatientData["_doc"] = {...PatientData["_doc"],AppointmentDate:Appointmentdata[0].AppointmentDate}
            PatientData["_doc"] = {...PatientData["_doc"],FollowUpDate:Appointmentdata[0].FollowUpDate}
        }

        const date1 = new Date(req.body.followupdate);
        const date2 = new Date(PatientData["_doc"].FollowUpDate);

        
       if( date1.valueOf() === date2.valueOf())
       {
        returnedPatientArray.push(PatientData)

       }
         
           

            }
            return res.json(returnedPatientArray)
            
          }
        catch(err){
            res.json ({message:err.message});
        }
          
      } catch (err) {
        res.json ({message:"err1"});
      }
        
        
    }
    catch (err){
        res.json ({message:"err2"});
    }
}

// ------------------------------------------------- Get patients by Appointments date ----------------------------------------------

const getPatientsByAppointmentDate = async (req,res) =>{
  let doctorConnections;
  try{
      doctorConnections = await PDConnection.find({ 
          "$or": [
              { "DoctorID": req.body.doctorId},
          ]
      }, '-_id -DoctorID')

    try {
      var PatientData;
      let returnedPatientArray=[];
      try{
          for(var i=0;i<doctorConnections.length;i++)
          {
            PatientData = await Patient.findById(doctorConnections[i].PatientID)
            Appointmentdata = await Appointment.find({ 
              "$or": [
                  { "PatientID": doctorConnections[i].PatientID,
                  "DoctorID": req.body.doctorId}
              ]
              }, '-_id -DoctorID -PatientID -PrescriptionID')

          if(Appointmentdata.length >= 1){
                PatientData["_doc"] = {...PatientData["_doc"],AppointmentDate:Appointmentdata[0].AppointmentDate}
                PatientData["_doc"] = {...PatientData["_doc"],FollowUpDate:Appointmentdata[0].FollowUpDate}
            }

         const date1 = new Date(req.body.appointmentDate);
         const date2 = new Date(PatientData["_doc"].AppointmentDate);

        
       if( date1.valueOf() === date2.valueOf())
       {
        returnedPatientArray.push(PatientData)

       }

          }
          return res.json(returnedPatientArray)

          
        }
      catch(err){
          res.json ({message:err.message});
      }
        
    } catch (err) {
      res.json ({message:"err1"});
    }
      
      
  }
  catch (err){
      res.json ({message:"err2"});
  }
}

exports.GetAllConnections = GetAllConnections;
exports.CreateNewConnection = CreateNewConnection;
exports.getDoctorConnections = getDoctorConnections;
exports.getPatientDataOfToday = getPatientDataOfToday
exports.getPatientDataOflastDays = getPatientDataOflastDays
exports.getPatientsNumber = getPatientsNumber
exports.getPatientsByFollowUpDate = getPatientsByFollowUpDate
exports.getPatientsByAppointmentDate = getPatientsByAppointmentDate
