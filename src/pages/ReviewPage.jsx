import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Star, StarOff, Calendar, User, Clock } from 'lucide-react';
import { createReview, getCarById, getCarReviews } from '@/services/api';
import ReviewCard from '@/components/ReviewCard';

const ReviewPage = ({ user }) => {
  const { rentalId, carId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
    rentalId: rentalId || '',
    carId: carId || ''
  });
  
  // Fetch car details and existing reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Redirect to login if user is not authenticated
        if (!user) {
          navigate('/login', { state: { from: { pathname: `/review/${carId}/${rentalId}` } } });
          return;
        }
        
        // Fetch car details
        if (carId) {
          const carResponse = await getCarById(carId);
          setCar(carResponse.data.data);
          
          // Fetch reviews for this car
          const reviewsResponse = await getCarReviews(carId);
          setReviews(reviewsResponse.data.data);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load car data and reviews. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [carId, rentalId, user, navigate, toast]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle star rating selection
  const handleRatingChange = (rating) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };
  
  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!reviewForm.title || !reviewForm.comment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Submit review
      const response = await createReview(reviewForm);
      
      // Update reviews list
      setReviews(prev => [response.data.data, ...prev]);
      
      // Reset form
      setReviewForm({
        rating: 5,
        title: '',
        comment: '',
        rentalId: rentalId || '',
        carId: carId || ''
      });
      
      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your experience.",
        className: "bg-green-600 text-white border-green-700",
      });
      
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-purple-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Render error state if car not found
  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-400 mb-4">Car not found!</h2>
          <Button onClick={() => navigate('/')} className="bg-red-800 hover:bg-red-900">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 md:p-10"
    >
      {/* Back button */}
      <Button 
        variant="outline" 
        onClick={() => navigate('/dashboard')} 
        className="mb-8 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      {/* Car information header */}
      <div className="flex items-center mb-8">
        <div className="w-24 h-16 mr-4 rounded-md overflow-hidden shadow-md">
          <img 
            className="w-full h-full object-cover" 
            alt={car.name + " thumbnail"} 
            src={car.imageData || car.imageUrl} 
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Reviews for {car.name}</h1>
          <p className="text-purple-300">Share your experience or read what others have to say</p>
        </div>
      </div>
      
      {/* Review form */}
      {rentalId && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/60 rounded-xl shadow-2xl border border-purple-500/40 p-6 mb-10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Leave Your Review</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star rating */}
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-white">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-yellow-400 hover:scale-110 transition-transform"
                  >
                    {star <= reviewForm.rating ? (
                      <Star className="h-8 w-8 fill-yellow-400" />
                    ) : (
                      <StarOff className="h-8 w-8" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Review title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Review Title</Label>
              <Input
                id="title"
                name="title"
                value={reviewForm.title}
                onChange={handleChange}
                placeholder="Summarize your experience in a few words"
                className="bg-slate-700 border-purple-500/50 focus:border-purple-400"
                required
              />
            </div>
            
            {/* Review comment */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-white">Your Review</Label>
              <Textarea
                id="comment"
                name="comment"
                value={reviewForm.comment}
                onChange={handleChange}
                placeholder="Share your experience with this car..."
                rows={5}
                className="bg-slate-700 border-purple-500/50 focus:border-purple-400 resize-none"
                required
              />
            </div>
            
            {/* Submit button */}
            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </motion.div>
      )}
      
      {/* Reviews list */}
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Customer Reviews</h2>
        
        {reviews.length === 0 ? (
          <div className="text-center p-8 bg-slate-800/40 rounded-xl border border-gray-700">
            <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewPage; 