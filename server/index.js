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
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { authenticateToken, requireAdmin } from './middleware/auth.js';

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
app.post('/api/rentals', authenticateToken, validateRental, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }

    const rental = new Rental({
      ...req.body,
      userId: req.user.userId
    });
    
    const savedRental = await rental.save();
    
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

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'user'
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/login
 * @description Login user (including admin)
 * @access Public
 */
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check for admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { userId: 'admin', email, role: 'admin' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      return res.json({
        success: true,
        message: 'Admin login successful',
        token,
        user: {
          id: 'admin',
          name: 'Administrator',
          email,
          role: 'admin'
        }
      });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/auth/profile
 * @description Get user profile
 * @access Private
 */
app.get('/api/auth/profile', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return res.json({
        success: true,
        user: {
          id: 'admin',
          name: 'Administrator',
          email: req.user.email,
          role: 'admin'
        }
      });
    }
    
    const user = await User.findById(req.user.userId).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/rentals/:id
 * @description Delete a specific rental (Admin only)
 * @access Private (Admin only)
 */
app.delete('/api/rentals/:id', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }
    
    await Rental.findByIdAndDelete(id);
    logger.info('Rental deleted by admin:', { rentalId: id, adminId: req.user.userId });
    
    res.json({
      success: true,
      message: 'Rental deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/rentals/user
 * @description Get user's own rentals
 * @access Private
 */
app.get('/api/rentals/user', authenticateToken, async (req, res, next) => {
  try {
    const rentals = await Rental.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({
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