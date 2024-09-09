const { Schema, models, model } = require("mongoose");

const DonorInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
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
    min: 18, // Minimum age for donation
  },
  bloodGroup: {
    type: String,
    required: true,
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
  lastDonation: {
    type: String,
    required: true,
  },
});

export const DonorInfo = models?.DonorInfo || model('DonorInfo', DonorInfoSchema);
