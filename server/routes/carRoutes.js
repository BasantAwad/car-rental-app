import express from 'express';
import Car from '../models/Car.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import { upload, fileToBase64, deleteFile } from '../middleware/fileUpload.js';
import path from 'path';

const router = express.Router();

/**
 * @route GET /api/cars
 * @description Get all cars
 * @access Public
 */
router.get('/', async (req, res, next) => {
  try {
    // Optional filtering by category or status
    const { category, status } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    const cars = await Car.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/cars/:id
 * @description Get a specific car by ID
 * @access Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/cars
 * @description Create a new car
 * @access Private (Admin only)
 */
router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res, next) => {
  try {
    const carData = { ...req.body };
    
    // If image was uploaded, convert to base64 and store it
    if (req.file) {
      const base64Image = fileToBase64(req.file.path);
      if (base64Image) {
        carData.imageData = base64Image;
        deleteFile(req.file.path); // Delete the file after converting
      }
    }
    
    const car = new Car(carData);
    const savedCar = await car.save();
    
    logger.info('New car added by admin:', { carId: savedCar._id, adminId: req.user.userId });
    
    res.status(201).json({
      success: true,
      data: savedCar,
      message: 'Car added successfully'
    });
  } catch (error) {
    // If file was uploaded but error occurred, clean up
    if (req.file) {
      deleteFile(req.file.path);
    }
    next(error);
  }
});

/**
 * @route PUT /api/cars/:id
 * @description Update a car
 * @access Private (Admin only)
 */
router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), async (req, res, next) => {
  try {
    const carData = { ...req.body };
    
    // If image was uploaded, convert to base64 and store it
    if (req.file) {
      const base64Image = fileToBase64(req.file.path);
      if (base64Image) {
        carData.imageData = base64Image;
        deleteFile(req.file.path); // Delete the file after converting
      }
    }
    
    const car = await Car.findByIdAndUpdate(req.params.id, carData, {
      new: true,
      runValidators: true
    });
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    logger.info('Car updated by admin:', { carId: car._id, adminId: req.user.userId });
    
    res.status(200).json({
      success: true,
      data: car,
      message: 'Car updated successfully'
    });
  } catch (error) {
    // If file was uploaded but error occurred, clean up
    if (req.file) {
      deleteFile(req.file.path);
    }
    next(error);
  }
});

/**
 * @route DELETE /api/cars/:id
 * @description Delete a car
 * @access Private (Admin only)
 */
router.delete('/:id', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    logger.info('Car deleted by admin:', { carId: req.params.id, adminId: req.user.userId });
    
    res.status(200).json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/cars/upload-batch
 * @description Upload images for existing cars
 * @access Private (Admin only)
 */
router.post('/upload-batch', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { carImages } = req.body;
    
    if (!carImages || !Array.isArray(carImages)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format. Expected array of car images'
      });
    }
    
    const results = [];
    
    for (const item of carImages) {
      const { carId, imageData } = item;
      
      if (!carId || !imageData) {
        results.push({
          carId: carId || 'unknown',
          success: false,
          message: 'Missing required fields'
        });
        continue;
      }
      
      try {
        const car = await Car.findById(carId);
        
        if (!car) {
          results.push({
            carId,
            success: false,
            message: 'Car not found'
          });
          continue;
        }
        
        car.imageData = imageData;
        await car.save();
        
        results.push({
          carId,
          success: true,
          message: 'Image updated successfully'
        });
      } catch (err) {
        results.push({
          carId,
          success: false,
          message: err.message
        });
      }
    }
    
    res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    next(error);
  }
});

export default router; 