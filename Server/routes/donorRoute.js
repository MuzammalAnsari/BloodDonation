//donor route
const express = require("express");
const Donor = require("../models/donorModel");
const db = require('../db')
const router = express.Router();


router.get('/chicken', (req, res) => {
    var chicken={
        age:1,
        quantity:2,
        name:'hen'
    }
    res.send(chicken)
})



//post donor
router.post("/", async(req, res) => {
    // res.send('data saved')
    try {
        const data = req.body
        const donorData = new Donor(data);
        const savedDonor = await donorData.save();
        console.log(savedDonor);
        res.status(201).json(savedDonor); // Send back the saved donor data as JSON
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle error with a meaningful message
    }
});

module.exports = router;