import Car from '../models/Car.js';
import Rental from '../models/Rental.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

/**
 * Advanced MongoDB Queries Documentation
 * This file contains complex MongoDB queries using aggregation pipelines, lookups, and advanced operators.
 * Each query is documented with its purpose, parameters, and example usage.
 */

/**
 * Get car rental statistics with revenue analysis
 * @param {Object} options - Query options
 * @param {Date} options.startDate - Start date for analysis
 * @param {Date} options.endDate - End date for analysis
 * @param {string} options.category - Optional car category filter
 * @returns {Promise<Array>} Aggregated rental statistics
 */
export const getRentalStatistics = async ({ startDate, endDate, category }) => {
  const matchStage = {
    $match: {
      pickupDate: { $gte: startDate, $lte: endDate }
    }
  };

  if (category) {
    matchStage.$match.category = category;
  }

  return await Rental.aggregate([
    matchStage,
    {
      $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carDetails'
      }
    },
    {
      $unwind: '$carDetails'
    },
    {
      $group: {
        _id: {
          carId: '$carId',
          carName: '$carName',
          category: '$carDetails.category'
        },
        totalRentals: { $sum: 1 },
        totalRevenue: { $sum: '$totalPrice' },
        averageRentalDuration: {
          $avg: {
            $divide: [
              { $subtract: ['$returnDate', '$pickupDate'] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          }
        }
      }
    },
    {
      $sort: { totalRevenue: -1 }
    }
  ]);
};

/**
 * Get user rental history with car details and reviews
 * @param {string} userId - User ID to get history for
 * @returns {Promise<Array>} User's rental history with details
 */
export const getUserRentalHistory = async (userId) => {
  return await Rental.aggregate([
    {
      $match: { userId: userId }
    },
    {
      $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carDetails'
      }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'rentalId',
        as: 'review'
      }
    },
    {
      $unwind: {
        path: '$carDetails',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$review',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        rentalId: '$_id',
        carName: 1,
        pickupDate: 1,
        returnDate: 1,
        totalPrice: 1,
        carDetails: {
          category: 1,
          features: 1,
          imageUrl: 1
        },
        review: {
          rating: 1,
          comment: 1,
          reviewDate: 1
        }
      }
    },
    {
      $sort: { pickupDate: -1 }
    }
  ]);
};

/**
 * Get car availability analysis
 * @param {string} carId - Car ID to analyze
 * @param {Date} startDate - Start date for analysis
 * @param {Date} endDate - End date for analysis
 * @returns {Promise<Object>} Car availability statistics
 */
export const getCarAvailabilityAnalysis = async (carId, startDate, endDate) => {
  return await Rental.aggregate([
    {
      $match: {
        carId: carId,
        $or: [
          {
            pickupDate: { $lte: endDate },
            returnDate: { $gte: startDate }
          }
        ]
      }
    },
    {
      $group: {
        _id: null,
        totalRentals: { $sum: 1 },
        totalDays: {
          $sum: {
            $divide: [
              { $subtract: ['$returnDate', '$pickupDate'] },
              1000 * 60 * 60 * 24
            ]
          }
        },
        averageRentalDuration: {
          $avg: {
            $divide: [
              { $subtract: ['$returnDate', '$pickupDate'] },
              1000 * 60 * 60 * 24
            ]
          }
        }
      }
    }
  ]);
};

/**
 * Get popular car categories with revenue analysis
 * @returns {Promise<Array>} Category popularity and revenue statistics
 */
export const getPopularCategories = async () => {
  return await Car.aggregate([
    {
      $lookup: {
        from: 'rentals',
        localField: '_id',
        foreignField: 'carId',
        as: 'rentals'
      }
    },
    {
      $group: {
        _id: '$category',
        totalCars: { $sum: 1 },
        totalRentals: { $sum: { $size: '$rentals' } },
        averagePrice: { $avg: '$pricePerDay' }
      }
    },
    {
      $sort: { totalRentals: -1 }
    }
  ]);
};

/**
 * Get user review statistics
 * @param {string} userId - User ID to get statistics for
 * @returns {Promise<Object>} User's review statistics
 */
export const getUserReviewStats = async (userId) => {
  return await Review.aggregate([
    {
      $match: { userId: userId }
    },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        ratingDistribution: {
          $push: {
            rating: '$rating',
            title: '$title',
            carId: '$carId'
          }
        }
      }
    }
  ]);
};

/**
 * Get car performance metrics
 * @param {string} carId - Car ID to analyze
 * @returns {Promise<Object>} Car performance metrics
 */
export const getCarPerformanceMetrics = async (carId) => {
  return await Rental.aggregate([
    {
      $match: { carId: carId }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'rentalId',
        as: 'review'
      }
    },
    {
      $unwind: {
        path: '$review',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: null,
        totalRentals: { $sum: 1 },
        totalRevenue: { $sum: '$totalPrice' },
        averageRating: { $avg: '$review.rating' },
        utilizationRate: {
          $avg: {
            $cond: [
              { $eq: ['$status', 'rented'] },
              1,
              0
            ]
          }
        }
      }
    }
  ]);
}; 