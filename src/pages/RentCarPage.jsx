/**
 * @file src/pages/RentCarPage.jsx
 * @description Car rental form page component
 * @author Your Name
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, User, Mail, Phone, CalendarDays, Car, MapPin, Users, Shield, MessageSquare } from 'lucide-react';
import { getCarById, createRental } from '@/services/api';

/**
 * RentCarPage Component
 * @component
 * @returns {JSX.Element} Rendered component
 */
const RentCarPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        
        // Redirect to login if user is not authenticated
        if (!user) {
          navigate('/login', { state: { from: { pathname: `/rent/${id}` } } });
          return;
        }
        
        // Fetch car details from API
        const response = await getCarById(id);
        setCar(response.data.data);
        
        // Set default dates
        const today = new Date().toISOString().split('T')[0];
        setFormData(prev => ({ 
          ...prev, 
          pickupDate: today,
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '' 
        }));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Failed to load car data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchCar();
  }, [id, user, navigate]);

  /**
   * Form data state
   * @type {Object}
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    returnLocation: '',
    additionalDrivers: 0,
    insurance: false,
    specialRequests: '',
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-400 text-xl">Loading rental details...</p>
        </div>
      </div>
    );
  }

  // Show error if car not found
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

  /**
   * Handle form input changes
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    let total = car.pricePerDay * days;
    
    // Add cost for additional drivers
    total += formData.additionalDrivers * 20 * days;
    
    // Add insurance cost if selected
    if (formData.insurance) {
      total += 30 * days;
    }
    
    return total;
  };

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.pickupDate || !formData.returnDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate dates
    if (new Date(formData.returnDate) <= new Date(formData.pickupDate)) {
      toast({
        title: "Error",
        description: "Return date must be after pickup date.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create rental data object
      const rentalData = {
        carId: car._id,
        carName: car.name,
        pricePerDay: car.pricePerDay,
        totalPrice: calculateTotalPrice(),
        ...formData
      };
      
      // Send rental request to API
      await createRental(rentalData);
      
      toast({
        title: "Rental Submitted!",
        description: `Your request to rent ${car.name} has been received. Total price: $${calculateTotalPrice()}`,
        className: "bg-green-600 text-white border-green-700",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting rental:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit rental request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 md:p-10 bg-slate-800/60 rounded-xl shadow-2xl border border-purple-500/40"
    >
      {/* Back button */}
      <Button 
        variant="outline" 
        onClick={() => navigate(`/car/${id}`)} 
        className="mb-8 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Car Details
      </Button>

      {/* Car information header */}
      <div className="flex items-center mb-8">
        <div className="w-24 h-16 mr-4 rounded-md overflow-hidden shadow-md">
          <img 
            className="w-full h-full object-cover" 
            alt={car.name + " thumbnail"} 
            src={car.image} 
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Rent: {car.name}</h1>
          <p className="text-purple-300">Complete the form below to request your rental.</p>
        </div>
      </div>

      {/* Rental form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center">
            <User className="mr-2 h-4 w-4 text-purple-400" />Full Name
          </Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="John Doe" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-purple-400" />Email Address
          </Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="john.doe@example.com" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-purple-400" />Phone Number
          </Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="(123) 456-7890" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Date selection fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pickupDate" className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-purple-400" />Pickup Date
            </Label>
            <Input 
              id="pickupDate" 
              name="pickupDate" 
              type="date" 
              value={formData.pickupDate} 
              onChange={handleChange} 
              required 
              min={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnDate" className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-purple-400" />Return Date
            </Label>
            <Input 
              id="returnDate" 
              name="returnDate" 
              type="date" 
              value={formData.returnDate} 
              onChange={handleChange} 
              required 
              min={formData.pickupDate} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-purple-400" />Pickup Location
            </Label>
            <Input
              id="pickupLocation"
              name="pickupLocation"
              type="text"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnLocation" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-purple-400" />Return Location
            </Label>
            <Input
              id="returnLocation"
              name="returnLocation"
              type="text"
              placeholder="Enter return location"
              value={formData.returnLocation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="additionalDrivers" className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-purple-400" />Additional Drivers
            </Label>
            <Input
              id="additionalDrivers"
              name="additionalDrivers"
              type="number"
              min="0"
              max="3"
              value={formData.additionalDrivers}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center">
              <Shield className="mr-2 h-4 w-4 text-purple-400" />Insurance
            </Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="insurance"
                name="insurance"
                checked={formData.insurance}
                onChange={(e) => setFormData(prev => ({ ...prev, insurance: e.target.checked }))}
                className="h-4 w-4 text-purple-600"
              />
              <Label htmlFor="insurance">Add Full Coverage Insurance (+$30/day)</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequests" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4 text-purple-400" />Special Requests
          </Label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-slate-800 border-purple-500/40 text-white"
            rows="3"
            placeholder="Any special requests or requirements?"
          />
        </div>

        {/* Price Summary */}
        <div className="bg-slate-800/60 p-4 rounded-lg border border-purple-500/40">
          <h3 className="text-lg font-semibold mb-2">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price (${car.pricePerDay}/day)</span>
              <span>${car.pricePerDay}</span>
            </div>
            {formData.additionalDrivers > 0 && (
              <div className="flex justify-between">
                <span>Additional Drivers (${formData.additionalDrivers * 20}/day)</span>
                <span>${formData.additionalDrivers * 20}</span>
              </div>
            )}
            {formData.insurance && (
              <div className="flex justify-between">
                <span>Insurance ($30/day)</span>
                <span>$30</span>
              </div>
            )}
            <div className="border-t border-purple-500/40 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total Price</span>
                <span>${calculateTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-3 shadow-lg"
          >
            <Car className="mr-2 h-5 w-5" /> Submit Rental Request
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default RentCarPage;
