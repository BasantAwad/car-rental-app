import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import {
  getRentalStatistics,
  getUserRentalHistory,
  getCarAvailabilityAnalysis,
  getPopularCategories,
  getUserReviewStats,
  getCarPerformanceMetrics
} from '../utils/advancedQueries.js';

const router = express.Router();

/**
 * @route GET /api/analytics/rentals
 * @description Get rental statistics with revenue analysis
 * @access Private (Admin only)
 */
router.get('/rentals', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { startDate, endDate, category } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const statistics = await getRentalStatistics({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      category
    });

    res.status(200).json({
      success: true,
      data: statistics
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/analytics/user/:userId/history
 * @description Get detailed rental history for a user
 * @access Private (Admin or self)
 */
router.get('/user/:userId/history', authenticateToken, async (req, res, next) => {
  try {
    // Check if user is admin or requesting their own data
    if (req.user.role !== 'admin' && req.user.userId !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this data'
      });
    }

    const history = await getUserRentalHistory(req.params.userId);
    
    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/analytics/car/:carId/availability
 * @description Get car availability analysis
 * @access Private (Admin only)
 */
router.get('/car/:carId/availability', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const analysis = await getCarAvailabilityAnalysis(
      req.params.carId,
      new Date(startDate),
      new Date(endDate)
    );

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/analytics/categories
 * @description Get popular car categories with revenue analysis
 * @access Public
 */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await getPopularCategories();
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/analytics/user/:userId/reviews
 * @description Get user review statistics
 * @access Private (Admin or self)
 */
router.get('/user/:userId/reviews', authenticateToken, async (req, res, next) => {
  try {
    // Check if user is admin or requesting their own data
    if (req.user.role !== 'admin' && req.user.userId !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this data'
      });
    }

    const stats = await getUserReviewStats(req.params.userId);
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/analytics/car/:carId/performance
 * @description Get car performance metrics
 * @access Private (Admin only)
 */
router.get('/car/:carId/performance', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const metrics = await getCarPerformanceMetrics(req.params.carId);
    
    res.status(200).json({
      success: true,
      data: metrics
    });
  } catch (error) {
    next(error);
  }
});

export default router; 