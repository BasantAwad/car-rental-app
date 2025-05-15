// This script converts existing image files to base64 format and updates the car database entries

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current file path and directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB Connection URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://basantawad:BasantAwad014@cluster0.2wa4l9d.mongodb.net/carrental?retryWrites=true&w=majority";

// Path to images directory
const IMAGES_DIR = path.join(dirname(__dirname), 'src', 'components', 'imgs');

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
  pricePerDay: Number,
  imageUrl: String,
  imageData: String,
  features: [String],
  seats: Number,
  range: String,
  description: String,
  category: String,
  status: String,
  year: Number,
  mileage: Number,
  licensePlate: String,
  lastMaintenanceDate: Date,
  createdAt: Date,
  updatedAt: Date
});

// Create a model from schema
const Car = mongoose.model('Car', carSchema);

// Convert image file to base64
const fileToBase64 = (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath);
    const base64Data = fileData.toString('base64');
    const fileType = path.extname(filePath).substring(1);
    return `data:image/${fileType};base64,${base64Data}`;
  } catch (error) {
    console.error(`Error converting file ${filePath} to base64:`, error);
    return null;
  }
};

// Get all image files from the directory
const getImageFiles = () => {
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
    });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
};

// Maps image file names to car names in the database
const imageNameToCarNameMap = {
  'main.png': 'Polaris Slingshot',
  'teslla.png': 'Tesla Model S',
  'BMW.png': 'BMW M3',
  'Ford Mustang GT.png': 'Ford Mustang GT',
  'Audi R8.png': 'Audi R8',
  'Jeep Wrangler.png': 'Jeep Wrangler',
  'Porsche 911 Carrera 4S.png': 'Porsche 911',
  'maserati.png': 'Maserati Granturismo',
  'nissanGTR.png': 'Nissan GTR',
  'rollsroyce.png': 'Rolls Royce Ghost',
  'bugatti.png': 'Bugatti Chiron',
  'mclaren.png': 'McLaren 720S',
  'frari.png': 'Ferrari 488'
};

// Update car entries with base64 images
const updateCarsWithBase64Images = async () => {
  try {
    // Get all image files
    const imageFiles = getImageFiles();
    
    if (imageFiles.length === 0) {
      console.log('No image files found in directory');
      return;
    }
    
    console.log(`Found ${imageFiles.length} image files`);
    
    // Process each image
    for (const imageFile of imageFiles) {
      const imageFilePath = path.join(IMAGES_DIR, imageFile);
      
      // Find the car that matches this image
      const carName = imageNameToCarNameMap[imageFile];
      
      if (!carName) {
        console.log(`No car mapping found for image: ${imageFile}`);
        continue;
      }
      
      // Convert image to base64
      const base64Image = fileToBase64(imageFilePath);
      
      if (!base64Image) {
        console.log(`Failed to convert image: ${imageFile}`);
        continue;
      }
      
      // Update the car document
      const car = await Car.findOne({ name: carName });
      
      if (!car) {
        console.log(`Car not found with name: ${carName}`);
        continue;
      }
      
      // Set the base64 data
      car.imageData = base64Image;
      
      // Save the updated car
      await car.save();
      
      console.log(`Updated car: ${carName} with base64 image data`);
    }
    
    console.log('Finished updating car images');
  } catch (error) {
    console.error('Error updating cars with base64 images:', error);
  }
};

// Main function
const main = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Update cars with base64 images
    await updateCarsWithBase64Images();
    
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