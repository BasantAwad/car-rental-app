/**
 * @file server/middleware/validation.js
 * @description Validation middleware for rental data
 * @author Your Name
 */

import { ApiError } from './errorHandler.js';

/**
 * Validates rental data before processing
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const validateRental = (req, res, next) => {
  const {
    carId,
    carName,
    name,
    email,
    phone,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation
  } = req.body;

  // Required fields validation
  const requiredFields = {
    carId: 'Car ID',
    carName: 'Car Name',
    name: 'Customer Name',
    email: 'Email',
    phone: 'Phone Number',
    pickupDate: 'Pickup Date',
    returnDate: 'Return Date',
    pickupLocation: 'Pickup Location',
    returnLocation: 'Return Location'
  };

  for (const [field, label] of Object.entries(requiredFields)) {
    if (!req.body[field]) {
      throw new ApiError(400, `${label} is required`);
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

  // Phone validation (basic format)
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(phone)) {
    throw new ApiError(400, 'Invalid phone number format');
  }

  // Date validation
  const pickup = new Date(pickupDate);
  const return_ = new Date(returnDate);
  const today = new Date();

  if (isNaN(pickup.getTime()) || isNaN(return_.getTime())) {
    throw new ApiError(400, 'Invalid date format');
  }

  if (pickup < today) {
    throw new ApiError(400, 'Pickup date cannot be in the past');
  }

  if (return_ <= pickup) {
    throw new ApiError(400, 'Return date must be after pickup date');
  }

  // Additional drivers validation
  if (req.body.additionalDrivers) {
    const additionalDrivers = parseInt(req.body.additionalDrivers);
    if (isNaN(additionalDrivers) || additionalDrivers < 0 || additionalDrivers > 3) {
      throw new ApiError(400, 'Additional drivers must be between 0 and 3');
    }
  }

  next();
}; 