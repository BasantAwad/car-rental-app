/**
 * @file server/index.js
 * @description Main server file for the Car Rental application backend
 * @author Your Name
 */

import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Rental from './models/Rental.js';
import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { validateRental } from './middleware/validation.js';

// Get current file path and directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express application
const app = express();

/**
 * Middleware Configuration
 * - CORS: Enables Cross-Origin Resource Sharing
 * - JSON: Parses incoming JSON payloads
 * - Logger: Custom logging middleware
 */
app.use(cors());
app.use(express.json());
app.use(logger);

/**
 * MongoDB Atlas Connection Configuration
 * Connection string includes:
 * - Username and password
 * - Cluster address
 * - Database name (carrental)
 * - Additional parameters for reliability
 */
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://basantawad:BasantAwad014@cluster0.2wa4l9d.mongodb.net/carrental?retryWrites=true&w=majority";

/**
 * MongoDB Connection Options
 * - useNewUrlParser: Use new URL string parser
 * - useUnifiedTopology: Use new Server Discovery and Monitoring engine
 * - serverSelectionTimeoutMS: How long to try selecting a server
 * - socketTimeoutMS: How long to wait for operations to complete
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info('Successfully connected to MongoDB Atlas!');
  } catch (error) {
    logger.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};

// Initialize database connection
connectDB();

/**
 * MongoDB Connection Event Handlers
 * - error: Logs any connection errors
 * - open: Logs successful connection
 */
mongoose.connection.on('error', err => {
  logger.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  logger.info('MongoDB connection established successfully');
});

/**
 * @route POST /api/rentals
 * @description Create a new rental record
 * @access Public
 * @param {Object} req.body - Rental data including:
 *   - carId: ID of the car being rented
 *   - carName: Name of the car
 *   - name: Customer's full name
 *   - email: Customer's email
 *   - phone: Customer's phone number
 *   - pickupDate: Date of car pickup
 *   - returnDate: Date of car return
 * @returns {Object} 201 - Created rental record
 * @returns {Object} 400 - Error message
 */
app.post('/api/rentals', validateRental, async (req, res, next) => {
  try {
    // Verify database connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }

    const rental = new Rental(req.body);
    logger.info('Attempting to save rental:', { rentalId: rental._id });
    
    const savedRental = await rental.save();
    logger.info('Successfully saved rental:', { rentalId: savedRental._id });
    
    res.status(201).json({
      success: true,
      data: savedRental,
      message: 'Rental created successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/rentals
 * @description Get all rental records
 * @access Public
 * @returns {Object} 200 - Array of rental records
 */
app.get('/api/rentals', async (req, res, next) => {
  try {
    const rentals = await Rental.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: rentals.length,
      data: rentals
    });
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});