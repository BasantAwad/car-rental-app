import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Users, Zap, Gauge, CheckCircle, Palette, Star, MessageSquare } from 'lucide-react';
import { getCarById, getCarReviews } from '@/services/api';
import ReviewCard from '@/components/ReviewCard';

const colorOptions = [
  { name: 'Jet Black', value: '#000000' },
  { name: 'Arctic White', value: '#ffffff' },
  { name: 'Racing Red', value: '#ff0000' },
  { name: 'Sapphire Blue', value: '#0047ab' },
  { name: 'British Racing Green', value: '#004225' },
  { name: 'Solar Orange', value: '#ff7b00' },
];

const CarInfoPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        
        // Fetch car details
        const carResponse = await getCarById(id);
        setCar(carResponse.data.data);
        
        // Fetch car reviews
        const reviewsResponse = await getCarReviews(id);
        setReviews(reviewsResponse.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching car data:', err);
        setError('Failed to load car information. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchCarData();
  }, [id]);
  
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings';

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-red-500 border-r-transparent border-b-red-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-400 text-xl">Loading car details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !car) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-400 mb-4">{error || 'Car not found!'}</h2>
          <Button onClick={() => navigate('/')} className="bg-red-800 hover:bg-red-900">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleRentClick = () => {
    if (user) {
      navigate(`/rent/${car._id}`);
    } else {
      navigate('/login', { state: { from: { pathname: `/rent/${car._id}` } } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 bg-black/50 rounded-xl shadow-2xl border border-red-900/30"
    >
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-8 border-red-800 text-red-500 hover:bg-red-800 hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
      </Button>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="car-customizer"
          >
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotateY: [-2, 2, -2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
            >
              <img 
                className="w-full h-full object-contain car-shadow"
                alt={`${car.name} in ${selectedColor.name}`}
                style={{ filter: `drop-shadow(0 0 30px ${selectedColor.value}40) brightness(${selectedColor.name === 'Arctic White' ? 1.2 : 0.9})` }}
                src={car.imageData || car.imageUrl}
              />
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center p-4 bg-black/30 rounded-lg border border-red-900/20">
            <Button 
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="bg-red-800 hover:bg-red-900 text-white"
            >
              <Palette className="mr-2 h-4 w-4" />
              {isCustomizing ? 'Hide Customization' : 'Customize Colors'}
            </Button>

            <AnimatePresence>
              {isCustomizing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full flex flex-wrap gap-4 justify-center items-center mt-4"
                >
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`color-swatch ${selectedColor.name === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={color.name}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/30 p-6 rounded-lg border border-red-900/20">
            <h1 className="text-4xl font-bold gradient-text mb-2">{car.name}</h1>
            <div className="flex justify-between items-center">
              <p className="text-xl text-red-400">{car.type}</p>
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1 h-5 w-5" />
                <span className="text-white font-medium">{averageRating}</span>
                <span className="text-gray-400 text-sm ml-1">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-red-900/20">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Specifications</h2>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center"><Users className="mr-3 h-6 w-6 text-red-800" /> Seats: {car.seats}</div>
              <div className="flex items-center"><Zap className="mr-3 h-6 w-6 text-red-800" /> Price: ${car.pricePerDay}/day</div>
              <div className="flex items-center col-span-2"><Gauge className="mr-3 h-6 w-6 text-red-800" /> Range: {car.range}</div>
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-red-900/20">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Features</h2>
            <ul className="space-y-2">
              {car.features && car.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center text-lg"
                >
                  <CheckCircle className="mr-3 h-5 w-5 text-red-800 flex-shrink-0" /> 
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/30 p-6 rounded-lg border border-red-900/20">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Description</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{car.description}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex space-x-4"
          >
            <Button 
              onClick={handleRentClick}
              size="lg" 
              className="flex-1 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white text-lg py-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <CalendarDays className="mr-2 h-5 w-5" /> 
              {user ? 'Rent This Car' : 'Sign In to Rent'}
            </Button>
            
            <Button 
              onClick={() => navigate(`/review/${car._id}`)}
              size="lg"
              variant="outline"
              className="flex-1 border-red-800 text-red-400 hover:bg-red-800/30 text-lg py-6 shadow-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> 
              See Reviews
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-12 p-6 bg-black/30 rounded-lg border border-red-900/20">
        <h2 className="text-2xl font-semibold mb-6 gradient-text">Customer Reviews</h2>
        
        {reviews.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No reviews yet for this car. Be the first to share your experience!</p>
        ) : (
          <div className="space-y-6">
            {/* Show top 3 reviews */}
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
            
            {/* Show "See All Reviews" button if there are more than 3 reviews */}
            {reviews.length > 3 && (
              <div className="text-center mt-6">
                <Button 
                  onClick={() => navigate(`/review/${car._id}`)}
                  variant="outline"
                  className="border-red-800 text-red-400 hover:bg-red-800/30"
                >
                  See All {reviews.length} Reviews
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CarInfoPage;
