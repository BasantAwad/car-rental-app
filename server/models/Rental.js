/**
 * @file server/models/Rental.js
 * @description Mongoose schema for rental records
 * @author Your Name
 */

import mongoose from 'mongoose';

/**
 * @typedef {Object} Rental
 * @property {string} carId - ID of the rented car
 * @property {string} carName - Name of the rented car
 * @property {string} name - Customer's full name
 * @property {string} email - Customer's email address
 * @property {string} phone - Customer's phone number
 * @property {Date} pickupDate - Date when the car will be picked up
 * @property {Date} returnDate - Date when the car will be returned
 * @property {Date} createdAt - Timestamp when the rental record was created
 */

/**
 * Mongoose schema for rental records
 * Defines the structure and validation rules for rental data
 */
const rentalSchema = new mongoose.Schema({
  carId: {
    type: String,
    required: [true, 'Car ID is required'],
  },
  carName: {
    type: String,
    required: [true, 'Car name is required'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
  },
  name: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  pickupDate: {
    type: Date,
    required: [true, 'Pickup date is required'],
  },
  returnDate: {
    type: Date,
    required: [true, 'Return date is required'],
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required'],
  },
  returnLocation: {
    type: String,
    required: [true, 'Return location is required'],
  },
  additionalDrivers: {
    type: Number,
    default: 0,
  },
  insurance: {
    type: Boolean,
    default: false,
  },
  specialRequests: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the Rental model
export default mongoose.model('Rental', rentalSchema); 