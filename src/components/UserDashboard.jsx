import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import { Star, Clock, Calendar, MessageSquare } from 'lucide-react';
import { getUserRentals, getUserReviews } from '@/services/api';
import { Button } from '@/components/ui/button';

const UserDashboard = ({ user, onLogout }) => {
  const [rentals, setRentals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Get user rentals
      const rentalResponse = await getUserRentals();
      setRentals(rentalResponse.data.data);
      
      // Get user reviews
      const reviewResponse = await getUserReviews();
      setReviews(reviewResponse.data.data);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Check if a rental has already been reviewed
  const hasReview = (rentalId) => {
    return reviews.some(review => review.rentalId === rentalId);
  };
  
  // Handle click to write a review
  const handleReviewClick = (rental) => {
    navigate(`/review/${rental.carId}/${rental._id}`);
  };

  return (
    <div className="pt-28">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome, {user.name}!</h2>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>

        <div className="user-info">
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="rentals-section">
          <h3>Your Rentals ({rentals.length})</h3>
          
          {loading ? (
            <p>Loading your rentals...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : rentals.length === 0 ? (
            <p>No rentals found. Start browsing cars!</p>
          ) : (
            <div className="rentals-grid">
              {rentals.map((rental) => {
                const isCompleted = new Date(rental.returnDate) < new Date();
                const hasReviewed = hasReview(rental._id);
                
                return (
                  <div key={rental._id} className="rental-card">
                    <h4>{rental.carName}</h4>
                    <div className="rental-dates">
                      <div className="rental-date">
                        <Calendar className="date-icon" />
                        <div>
                          <p className="date-label">Pickup:</p>
                          <p className="date-value">{formatDate(rental.pickupDate)}</p>
                        </div>
                      </div>
                      <div className="rental-date">
                        <Calendar className="date-icon" />
                        <div>
                          <p className="date-label">Return:</p>
                          <p className="date-value">{formatDate(rental.returnDate)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rental-info">
                      <p><Clock className="rental-icon" /> <strong>Status:</strong> 
                        <span className={`status ${isCompleted ? 'completed' : 'active'}`}>
                          {isCompleted ? 'Completed' : 'Active'}
                        </span>
                      </p>
                      <p><strong>Total:</strong> ${rental.totalPrice}</p>
                    </div>
                    
                    {isCompleted && (
                      <div className="rental-actions">
                        {hasReviewed ? (
                          <Button 
                            variant="ghost" 
                            className="review-btn reviewed"
                            onClick={() => navigate(`/review/${rental.carId}`)}
                          >
                            <Star className="btn-icon reviewed" /> See Reviews
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="review-btn"
                            onClick={() => handleReviewClick(rental)}
                          >
                            <MessageSquare className="btn-icon" /> Write Review
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Reviews Section */}
        <div className="reviews-section">
          <h3>Your Reviews ({reviews.length})</h3>
          
          {loading ? (
            <p>Loading your reviews...</p>
          ) : reviews.length === 0 ? (
            <p>You haven't written any reviews yet.</p>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <h4>{review.title}</h4>
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star 
                          key={index} 
                          className={`star-icon ${index < review.rating ? 'filled' : ''}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="review-date">{formatDate(review.reviewDate)}</p>
                  <p className="review-comment">{review.comment}</p>
                  <Button 
                    variant="link" 
                    className="view-car-btn"
                    onClick={() => navigate(`/review/${review.carId}`)}
                  >
                    View Car Reviews
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
