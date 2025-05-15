import mongoose from 'mongoose';

/**
 * Mongoose schema for car rental reviews
 * Defines the structure and validation rules for review data
 */
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  rentalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
    required: [true, 'Rental ID is required']
  },
  carId: {
    type: String,
    required: [true, 'Car ID is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    minlength: [3, 'Comment must be at least 3 characters']
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Create and export the Review model
export default mongoose.model('Review', reviewSchema); 