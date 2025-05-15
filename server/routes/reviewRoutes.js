import express from 'express';
import Review from '../models/Review.js';
import Rental from '../models/Rental.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @route GET /api/reviews
 * @description Get all reviews (with optional filters)
 * @access Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { carId, userId, rating } = req.query;
    const filter = {};
    
    if (carId) filter.carId = carId;
    if (userId) filter.userId = userId;
    if (rating) filter.rating = parseInt(rating);
    
    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name')
      .populate('rentalId', 'pickupDate returnDate');
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/reviews/car/:carId
 * @description Get all reviews for a specific car
 * @access Public
 */
router.get('/car/:carId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ carId: req.params.carId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/reviews/user
 * @description Get all reviews by the logged-in user
 * @access Private
 */
router.get('/user', authenticateToken, async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('rentalId', 'carName pickupDate returnDate');
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/reviews
 * @description Create a new review
 * @access Private
 */
router.post('/', 
  authenticateToken,
  [
    body('rentalId').notEmpty().withMessage('Rental ID is required'),
    body('carId').notEmpty().withMessage('Car ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters'),
    body('title').notEmpty().withMessage('Review title is required')
  ], 
  async (req, res, next) => {
    try {
      // Validate form data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          message: errors.array()[0].msg 
        });
      }
      
      // Verify the rental belongs to the user
      const rental = await Rental.findById(req.body.rentalId);
      if (!rental) {
        return res.status(404).json({
          success: false,
          message: 'Rental not found'
        });
      }
      
      if (rental.userId.toString() !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: 'You can only review your own rentals'
        });
      }
      
      // Check if user already reviewed this rental
      const existingReview = await Review.findOne({ 
        userId: req.user.userId, 
        rentalId: req.body.rentalId 
      });
      
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this rental'
        });
      }
      
      // Create review
      const review = new Review({
        ...req.body,
        userId: req.user.userId,
        reviewDate: new Date()
      });
      
      const savedReview = await review.save();
      
      logger.info('New review submitted:', { 
        reviewId: savedReview._id, 
        userId: req.user.userId,
        carId: req.body.carId,
        rating: req.body.rating
      });
      
      res.status(201).json({
        success: true,
        data: savedReview,
        message: 'Review submitted successfully'
      });
      
    } catch (error) {
      next(error);
    }
});

/**
 * @route PUT /api/reviews/:id
 * @description Update a review
 * @access Private
 */
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if the review belongs to the user
    if (review.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }
    
    // Update review
    review = await Review.findByIdAndUpdate(req.params.id, 
      { 
        rating: req.body.rating,
        comment: req.body.comment,
        title: req.body.title,
        updatedAt: new Date()
      }, 
      { new: true, runValidators: true }
    );
    
    logger.info('Review updated:', { 
      reviewId: review._id, 
      userId: req.user.userId
    });
    
    res.status(200).json({
      success: true,
      data: review,
      message: 'Review updated successfully'
    });
    
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/reviews/:id
 * @description Delete a review
 * @access Private
 */
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if the review belongs to the user or user is admin
    if (review.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }
    
    await Review.findByIdAndDelete(req.params.id);
    
    logger.info('Review deleted:', { 
      reviewId: req.params.id, 
      userId: req.user.userId,
      isAdmin: req.user.role === 'admin'
    });
    
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
    
  } catch (error) {
    next(error);
  }
});

export default router; 