const { Schema, models, model } = require("mongoose");

const DonorInfoSchema = new Schema({
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18, // Assuming a minimum age for donation
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Blood group options
    },
    district: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    lastDonationMonth: {
      type: String,
      required: true,
      enum: [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
    },
    lastDonationYear: {
      type: Number,
      required: true,
      min: 1900, // Assuming blood donation history starts from 1900
      max: new Date().getFullYear(),
    },
  });

  export const DonorInfo = models?.DonorInfo || model('DonorInfo', DonorInfoSchema)