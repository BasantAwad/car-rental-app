
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Users, Zap, Gauge, CheckCircle, Palette } from 'lucide-react';

const carsData = [
  { id: '1', name: 'Tesla Model S', type: 'Electric Sedan', price: '$75/day', baseImage: 'tesla-model-s-transparent', features: ['Autopilot', 'Panoramic Roof', '0-60 in 2.5s', 'Premium Sound System', 'Full Self-Driving Capability (Beta)'], seats: 5, range: '390 miles', description: 'Experience the future of driving with the Tesla Model S. Unparalleled performance, cutting-edge technology, and zero emissions.' },
  { id: '2', name: 'BMW M3', type: 'Sports Sedan', price: '$90/day', baseImage: 'bmw-m3-transparent', features: ['Twin-Turbo Engine', 'Adaptive M Suspension', 'M Sport Seats', 'Harman Kardon Surround Sound', 'Carbon Fiber Roof'], seats: 5, range: '300 miles', description: 'The BMW M3 combines track-level performance with everyday usability. A true driver\'s car with aggressive styling and thrilling dynamics.' },
  { id: '3', name: 'Ford Mustang GT', type: 'Muscle Car', price: '$80/day', baseImage: 'mustang-gt-transparent', features: ['5.0L V8 Engine', 'Performance Exhaust', 'Line Lock & Launch Control', 'Brembo Brakes', 'SYNC 3 Infotainment'], seats: 4, range: '280 miles', description: 'Unleash the iconic power of the Ford Mustang GT. With its roaring V8 and aggressive stance, it\'s an American legend.' },
  { id: '4', name: 'Audi R8', type: 'Supercar', price: '$250/day', baseImage: 'audi-r8-transparent', features: ['Naturally Aspirated V10 Engine', 'Quattro All-Wheel Drive', 'Carbon Fiber Accents', 'Virtual Cockpit', 'Bang & Olufsen Sound System'], seats: 2, range: '250 miles', description: 'The Audi R8 is a masterpiece of engineering, offering breathtaking performance and stunning design. A true supercar experience.' },
  { id: '5', name: 'Jeep Wrangler', type: 'Off-road SUV', price: '$70/day', baseImage: 'jeep-wrangler-transparent', features: ['Legendary 4x4 Capability', 'Removable Top and Doors', 'All-Terrain Tires', 'Uconnect Infotainment', 'Trail Rated Badge'], seats: 4, range: '350 miles', description: 'Conquer any terrain with the Jeep Wrangler. The ultimate adventure vehicle, ready for off-road exploration and open-air freedom.' },
  { id: '6', name: 'Porsche 911', type: 'Sports Car', price: '$200/day', baseImage: 'porsche-911-transparent', features: ['Rear-Engine Boxer Engine', 'PDK Dual-Clutch Transmission', 'Iconic Flyline Design', 'Porsche Communication Management (PCM)', 'Sport Chrono Package'], seats: 2, range: '300 miles', description: 'The Porsche 911 is the quintessential sports car, perfected over decades. Timeless design, exhilarating performance, and unmatched driving pleasure.' },
];

const colorOptions = [
  { name: 'Jet Black', value: '#000000' },
  { name: 'Arctic White', value: '#ffffff' },
  { name: 'Racing Red', value: '#ff0000' },
  { name: 'Sapphire Blue', value: '#0047ab' },
  { name: 'British Racing Green', value: '#004225' },
  { name: 'Solar Orange', value: '#ff7b00' },
];

const CarInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData.find(c => c.id === id);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [isCustomizing, setIsCustomizing] = useState(false);

  if (!car) {
    return <div className="text-center py-10 text-2xl text-red-400">Car not found!</div>;
  }

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
               src="https://images.unsplash.com/photo-1602912526679-59e34e95e3ea" />
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
            <p className="text-xl text-red-400">{car.type}</p>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-red-900/20">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Specifications</h2>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center"><Users className="mr-3 h-6 w-6 text-red-800" /> Seats: {car.seats}</div>
              <div className="flex items-center"><Zap className="mr-3 h-6 w-6 text-red-800" /> Price: {car.price}</div>
              <div className="flex items-center col-span-2"><Gauge className="mr-3 h-6 w-6 text-red-800" /> Range: {car.range}</div>
            </div>
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-red-900/20">
            <h2 className="text-2xl font-semibold mb-4 gradient-text">Features</h2>
            <ul className="space-y-2">
              {car.features.map((feature, index) => (
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
          >
            <Link to={`/rent/${car.id}`}>
              <Button size="lg" className="w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white text-lg py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <CalendarDays className="mr-2 h-5 w-5" /> Rent This Car
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarInfoPage;
