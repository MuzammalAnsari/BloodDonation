//mongoose 
const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    lastDonation:{
        type: Date,
        default: Date.now
    }
})


//model
const Donor = mongoose.model("Donor", donorSchema)
module.exports = Donor