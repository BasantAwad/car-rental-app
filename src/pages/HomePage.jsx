import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Zap, Gauge, Users } from 'lucide-react';
import { getCars } from '@/services/api';
import mainCar from '@/components/imgs/main.png';

const HomePage = ({ user, onLoginClick }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch cars from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getCars();
        setCars(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);
  
  // Set featured car as the first one (Polaris Slingshot)
  const featuredCar = cars.length > 0 ? cars[0] : null;

  // When user clicks "Rent Car" button, check if logged in
  const handleRentClick = (carId) => {
    if (user) {
      // User is logged in, proceed to rent
      navigate(`/rent/${carId}`);
    } else {
      // User not logged in, redirect to login
      navigate('/login', { state: { from: { pathname: `/rent/${carId}` } } });
    }
  };

  // When user clicks "View Details" button
  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-400 text-xl">Loading our amazing cars...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="space-y-16">
        {featuredCar && (
          <section className="relative text-center py-20 overflow-hidden rounded-xl bg-gradient-to-tr from-purple-600/20 via-transparent to-pink-600/20 backdrop-blur-sm shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 relative"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Drive Your Dreams</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-300 mb-10 max-w-3xl mx-auto">
                Experience the legendary {featuredCar.name}. Where performance meets perfection.
              </p>
            </motion.div>

            {/* Main car display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative w-full h-[400px] rounded-xl overflow-hidden my-12"
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
                  src={mainCar}
                  alt={featuredCar.name}
                  className="w-full h-full object-contain car-shadow"
                  style={{ 
                    filter: 'drop-shadow(0 0 30px rgba(136, 19, 55, 0.3))',
                    transform: 'perspective(1000px)'
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="mt-12 z-10 relative"
            >
              <Button 
                onClick={() => handleViewDetails(featuredCar._id)}
                size="lg" 
                variant="default" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-10 py-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Explore {featuredCar.name} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </section>
        )}

        <section>
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Our Premium Fleet</span>
          </h2>
          
          {cars.length === 0 ? (
            <p className="text-center text-gray-400">No cars available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="car-card bg-slate-800/50 border border-purple-500/30 overflow-hidden h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-center h-48 w-full mb-2 bg-transparent">
                        <img 
                          className="max-h-44 object-contain rounded-t-lg" 
                          alt={car.name + " image"} 
                          src={car.imageData || car.imageUrl} 
                        />
                      </div>
                      <CardTitle>{car.name}</CardTitle>
                      <CardDescription className="text-purple-400">{car.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-center text-gray-300 mb-1">
                        <Zap size={16} className="mr-2 text-yellow-400" /> ${car.pricePerDay}/day
                      </div>
                      <div className="flex items-center text-gray-300 mb-1">
                        <Gauge size={16} className="mr-2 text-blue-400" /> {car.range}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users size={16} className="mr-2 text-green-400" /> Seats: {car.seats}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        onClick={() => handleViewDetails(car._id)}
                        variant="outline" 
                        className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors duration-300"
                      >
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleRentClick(car._id)}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
                      >
                        Rent Car
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default HomePage;
