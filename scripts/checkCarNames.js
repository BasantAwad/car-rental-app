// This script checks the actual car names in the database

import mongoose from 'mongoose';

// MongoDB Connection URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://basantawad:BasantAwad014@cluster0.2wa4l9d.mongodb.net/carrental?retryWrites=true&w=majority";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Create a schema for Car
const carSchema = new mongoose.Schema({
  name: String,
  type: String,
  imageUrl: String,
  imageData: String
}, { strict: false });

// Create a model from schema
const Car = mongoose.model('Car', carSchema);

// Main function
const main = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Get all cars
    const cars = await Car.find().select('_id name imageUrl');
    
    console.log('Cars in database:');
    cars.forEach(car => {
      console.log(`${car._id}: ${car.name} - ${car.imageUrl}`);
    });
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
};

// Run the script
main(); 