import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Rental from '../models/Rental.js';
import Review from '../models/Review.js';
import { logger } from '../utils/logger.js';

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://basantawad:BasantAwad014@cluster0.2wa4l9d.mongodb.net/carrental?retryWrites=true&w=majority";

// Sample reviews data to seed
const createSampleReviews = async () => {
  // Get first user from the database
  const user = await User.findOne({ role: 'user' });
  if (!user) {
    console.log('No regular user found to create sample reviews. Please create a user first.');
    return [];
  }
  
  // Get a rental for this user
  const rental = await Rental.findOne({ userId: user._id });
  if (!rental) {
    console.log('No rental found for this user. Please create a rental first.');
    return [];
  }
  
  // Sample reviews
  return [
    {
      userId: user._id,
      rentalId: rental._id,
      carId: rental.carId,
      rating: 5,
      title: "Amazing experience with this car!",
      comment: "I had a fantastic time driving this car. It handles beautifully and has incredible performance. The pickup and drop-off process was smooth, and the car was immaculately clean. Would definitely rent again!",
      reviewDate: new Date(),
      isVerified: true
    }
  ];
};

// Sample static reviews (not tied to actual rentals)
const staticReviews = [
  {
    rating: 5,
    title: "Best rental experience ever!",
    comment: "Absolutely amazing car! Perfect for a weekend getaway. The performance was outstanding, and it turned heads everywhere we went. The interior was spotless and had all the features I needed. The staff was also very helpful and professional.",
    reviewDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isVerified: true
  },
  {
    rating: 4,
    title: "Great car, minor issues",
    comment: "Really enjoyed driving this beauty. The power and handling were exceptional. Only giving 4 stars because the navigation system was a bit confusing at first. Otherwise, a fantastic rental that I would recommend to anyone looking for a luxury driving experience.",
    reviewDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    isVerified: true
  },
  {
    rating: 5,
    title: "Exceeded all expectations",
    comment: "From start to finish, renting this car was a dream. The online booking was simple, pickup was quick, and the car itself was even better than the pictures. It was perfectly maintained and a joy to drive. Will definitely be renting from here again!",
    reviewDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    isVerified: true
  },
  {
    rating: 3,
    title: "Good car, service could be better",
    comment: "The car itself was great - clean and well-maintained. However, I had to wait longer than expected for pickup, and the return process was a bit confusing. The driving experience made up for it though, as the performance was excellent.",
    reviewDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    isVerified: true
  }
];

// Seed function
const seedReviews = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    logger.info('Connected to MongoDB for seeding reviews');
    
    // Get all cars to distribute reviews
    const cars = await mongoose.model('Car').find();
    if (cars.length === 0) {
      console.log('No cars found in the database. Please seed cars first.');
      mongoose.disconnect();
      return;
    }
    
    // Create dynamic reviews based on actual users and rentals
    const dynamicReviews = await createSampleReviews();
    
    // Create static reviews for random cars
    const reviewsToCreate = [...dynamicReviews];
    
    // Assign static reviews to random cars
    staticReviews.forEach((review, index) => {
      const car = cars[index % cars.length]; // Distribute evenly across available cars
      
      // Try to find a user for this review
      User.findOne().skip(index % 5).exec().then(randomUser => {
        const userId = randomUser ? randomUser._id : new mongoose.Types.ObjectId();
        
        reviewsToCreate.push({
          ...review,
          userId,
          carId: car._id.toString(),
          rentalId: new mongoose.Types.ObjectId(), // Fake rental ID
        });
      });
    });
    
    // Wait for all the user promises to resolve
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear existing reviews
    await Review.deleteMany({});
    logger.info('Cleared reviews collection');
    
    // Insert reviews
    const insertedReviews = await Review.insertMany(reviewsToCreate);
    logger.info(`Successfully seeded ${insertedReviews.length} reviews`);

    console.log('=== Reviews Seeded Successfully ===');
    insertedReviews.forEach((review, index) => {
      console.log(`${index + 1}. "${review.title}" for car ${review.carId} (${review.rating} stars)`);
    });
    
    mongoose.disconnect();
    logger.info('Database connection closed');
    
  } catch (error) {
    logger.error('Error seeding reviews:', error);
    process.exit(1);
  }
};

// Run the seeding
seedReviews(); 