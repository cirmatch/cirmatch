// utils/limiter.js
import rateLimit from 'express-rate-limit';

/**
 * Create a rate limiter for a route
 * @param {number} windowMinutes - Time window in minutes
 * @param {number} maxRequests - Maximum requests allowed per IP in the time window
 * @returns {import('express').RequestHandler} - Rate limiter middleware
 */
export const createLimiter = (windowMinutes, maxRequests) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // convert minutes to milliseconds
    max: maxRequests,
    message: 'Too many requests from this IP, please try again later.',
  });
};
