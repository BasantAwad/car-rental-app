/**
 * @file server/middleware/errorHandler.js
 * @description Global error handling middleware
 * @author Your Name
 */

import { logger } from '../utils/logger.js';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // true = user error, false = developer error
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // User errors (validation, bad input, etc.)
  if (err.name === 'ValidationError' || err.statusCode === 400) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Invalid input',
    });
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }

  // CastError (bad ObjectId)
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }

  // Developer/Server errors
  logger.error({
    error: {
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode
    },
    request: {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query
    }
  });

  // Only show generic message to user
  res.status(error.statusCode || 500).json({
    success: false,
    message: 'An unexpected error occurred. Please try again later.'
  });
}; 