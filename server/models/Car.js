import mongoose from 'mongoose';

/**
 * Mongoose schema for car/vehicle records
 * Defines the structure and validation rules for car data
 */
const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Car type is required'],
    trim: true
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: 0
  },
  imageUrl: {
    type: String,
    required: false,
    default: ''
  },
  imageData: {
    type: String, // Base64 encoded image data
    required: false
  },
  features: {
    type: [String],
    default: []
  },
  seats: {
    type: Number,
    default: 2,
    min: 1,
    max: 10
  },
  range: {
    type: String,
    default: 'Not specified'
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Car category is required'],
    enum: ['Luxury', 'Sports', 'SUV', 'Sedan', 'Muscle', 'Supercar', 'Hypercar', 'Sport', 'Ultra Luxury']
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance', 'reserved'],
    default: 'available'
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  mileage: {
    type: Number,
    default: 0
  },
  licensePlate: {
    type: String,
    default: 'Not assigned'
  },
  lastMaintenanceDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add a pre-validation to ensure either imageUrl or imageData is provided
carSchema.pre('validate', function(next) {
  if (!this.imageUrl && !this.imageData) {
    this.invalidate('imageUrl', 'Either imageUrl or imageData must be provided');
  }
  next();
});

// Create and export the Car model
export default mongoose.model('Car', carSchema); 