import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const ReviewCard = ({ review }) => {
  // Format date
  const formattedDate = review.reviewDate 
    ? format(new Date(review.reviewDate), 'MMM dd, yyyy')
    : 'Unknown date';
  
  // Get user's name or placeholder if not available
  const userName = review.userId?.name || 'Anonymous User';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 rounded-lg shadow-md border border-purple-500/20 p-5 hover:border-purple-500/40 transition-all"
    >
      {/* Review header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white">{review.title}</h3>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <Star 
              key={index} 
              className={`h-5 w-5 ${index < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
            />
          ))}
        </div>
      </div>
      
      {/* Review metadata */}
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <User className="h-4 w-4 mr-1" />
        <span className="mr-3">{userName}</span>
        <Calendar className="h-4 w-4 mr-1" />
        <span>{formattedDate}</span>
      </div>
      
      {/* Review content */}
      <p className="text-gray-300 mb-3">
        {review.comment}
      </p>
      
      {/* Verified badge if applicable */}
      {review.isVerified && (
        <div className="bg-green-900/30 text-green-400 text-xs py-1 px-2 rounded-full inline-flex items-center">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Verified Rental
        </div>
      )}
    </motion.div>
  );
};

export default ReviewCard; 