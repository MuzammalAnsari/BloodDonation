const mongoose = require('mongoose');

const URL_LOCAL = 'mongodb://localhost:27017/BloodDonation'; // Corrected URL

// Connect to the database
mongoose.connect(URL_LOCAL, {
    useNewUrlParser: true,       // Ensure this option is used
    useUnifiedTopology: true     // Ensure this option is used
    // serverSelectionTimeoutMS: 30000 
})

const db = mongoose.connection;

// Defines event listener for db connection

db.on('connected', () => {
    console.log('connected to DB server');
});

db.on('disconnected', () => {
    console.log('disconnected to DB server');
});

db.on('error', ()=> {
    console.log('Database connection error');
});


module.exports = db;
