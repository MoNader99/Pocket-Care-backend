
// -------------------------------------------- import Packages ----------------------------------
const mongoose = require('mongoose') // To connect to database
const express = require("express") // Importing express
const app = express() // Excute the package express



// To allow fetching from anywhere
var cors = require('cors');
app.use(cors())

const bodyParser = require('body-parser') // To convert body to JSON format


// To import link of database connection without showing it to everyone (access to env [dB connection])
require('dotenv/config')

app.use(bodyParser.json()) // to make sure that every time we hit any request it converts body to json

// // Middlewares (a function that excutes when routes are hitted)
// // we can also here use auth to authenticate users like when login 
// app.use('/posts', () => {
//     console.log("hhahahdjhjdhj")
// })


// // Using middleware to connect to different routes
// app.use('/posts', postsRoute) // everytime we go to '/posts' it will connect to postsRoute


// -------------------------------------------------- Connect to routes ------------------------------------------------- 
// Doctor Route
const doctorRoute = require('./Routes/Doctor-Route')
app.use('/doctor' ,doctorRoute) 

// Patient Route
const patientRoute = require('./Routes/Patient-Route')
app.use('/patient' ,patientRoute) // everytime we go to '/posts' it will connect to postsRoute

// PDConnection Route
const PDConnection = require('./Routes/PDConnection-Route');
app.use('/connection' ,PDConnection) 

// Appointment Route
const Appointment = require('./Routes/Appointment-Route');
app.use('/appointment' ,Appointment) 


// Clinic Route
const Clinic = require('./Routes/Clinic-Route');
app.use('/clinic' ,Clinic) 

// Medical Profile Route
const MedicalProfile = require('./Routes/MedicalProfile-Route');
app.use('/patient/medicalprofile' ,MedicalProfile) 

// Saved Drugs Route
const SavedDrugs = require('./Routes/SavedDrugs-Route')
app.use('/saveddrugs' ,SavedDrugs)

// Prescription Template Route
const PrescriptionTemplate = require('./Routes/PrescriptionTemplate-Route')
app.use('/prescriptiontemplate' ,PrescriptionTemplate)

// Prescription Route
const Prescription = require('./Routes/Prescription-Route')
app.use('/prescription' ,Prescription)



// -------------------------------------------------------------------------------------------------------------------------------
const HttpError = require('./models/Http-Error');


// Using middleware to handle errors
app.use((req,res,next) => {
    const error = new HttpError ("Couldn't find this route", 404)
    next(error)
})

app.use((error, req,res,next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || " Unknown error occured !"})
})



// Connect to dB
mongoose.connect(process.env.DB_CONNECTION)
    .then( () => {
        console.log(mongoose.connection.readyState); // Check the status of dB connection
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })




// How to start listening to the server
app.listen(3000) //port number