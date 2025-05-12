import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Zap, Gauge, Users } from 'lucide-react';

// Import images with correct paths
import mainCar from '@/components/imgs/main.png';
import teslaImg from '@/components/imgs/teslla.png';
import bmwImg from '@/components/imgs/BMW.png';
import mustangImg from '@/components/imgs/Ford Mustang GT.png';
import audiImg from '@/components/imgs/Audi R8.png';
import jeepImg from '@/components/imgs/Jeep Wrangler.png';
import porscheImg from '@/components/imgs/Porsche 911 Carrera 4S.png';
import maseratiImg from '@/components/imgs/maserati.png';
import nissanImg from '@/components/imgs/nissanGTR.png';
import rollsImg from '@/components/imgs/rollsroyce.png';
import bugattiImg from '@/components/imgs/bugatti.png';
import mclarenImg from '@/components/imgs/mclaren.png';
import ferrariImg from '@/components/imgs/frari.png';

// Update the carsData array with the correct image imports
const carsData = [
  { 
    id: '1', 
    name: 'Tesla Model S', 
    type: 'Electric Sedan', 
    price: '$75/day', 
    image: teslaImg, 
    features: ['Autopilot', 'Panoramic Roof', '0-60 in 2.5s'], 
    seats: 5, 
    range: '390 miles' 
  },
  { 
    id: '2', 
    name: 'BMW M3', 
    type: 'Sports Sedan', 
    price: '$90/day', 
    image: bmwImg, 
    features: ['Twin-Turbo Engine', 'Adaptive Suspension', 'Sport Seats'], 
    seats: 5, 
    range: '300 miles' 
  },
  { 
    id: '3', 
    name: 'Ford Mustang GT', 
    type: 'Muscle Car', 
    price: '$80/day', 
    image: mustangImg, 
    features: ['V8 Engine', 'Performance Exhaust', 'Line Lock'], 
    seats: 4, 
    range: '280 miles' 
  },
  { 
    id: '4', 
    name: 'Audi R8', 
    type: 'Supercar', 
    price: '$250/day', 
    image: audiImg, 
    features: ['V10 Engine', 'Quattro AWD', 'Carbon Fiber Accents'], 
    seats: 2, 
    range: '250 miles' 
  },
  { 
    id: '5', 
    name: 'Jeep Wrangler', 
    type: 'Off-road SUV', 
    price: '$70/day', 
    image: jeepImg, 
    features: ['4x4 Capability', 'Removable Top', 'All-Terrain Tires'], 
    seats: 4, 
    range: '350 miles' 
  },
  { 
    id: '6', 
    name: 'Porsche 911', 
    type: 'Sports Car', 
    price: '$200/day', 
    image: porscheImg, 
    features: ['Rear-Engine Layout', 'PDK Transmission', 'Iconic Design'], 
    seats: 2, 
    range: '300 miles' 
  },
  { 
    id: '7', 
    name: 'Maserati', 
    type: 'Luxury Sports', 
    price: '$280/day', 
    image: maseratiImg, 
    features: ['Italian Design', 'Premium Sound', 'Sport Mode'], 
    seats: 2, 
    range: '320 miles' 
  },
  { 
    id: '8', 
    name: 'Nissan GTR', 
    type: 'Supercar', 
    price: '$220/day', 
    image: nissanImg, 
    features: ['Twin-Turbo', 'All-Wheel Drive', 'Launch Control'], 
    seats: 2, 
    range: '290 miles' 
  },
  { 
    id: '9', 
    name: 'Rolls Royce', 
    type: 'Ultra Luxury', 
    price: '$400/day', 
    image: rollsImg, 
    features: ['Handcrafted Interior', 'Suicide Doors', 'Starlight Headliner'], 
    seats: 4, 
    range: '350 miles' 
  },
  { 
    id: '10', 
    name: 'Bugatti', 
    type: 'Hypercar', 
    price: '$500/day', 
    image: bugattiImg, 
    features: ['W16 Engine', 'Carbon Fiber', 'Speed Key'], 
    seats: 2, 
    range: '260 miles' 
  },
  { 
    id: '11', 
    name: 'McLaren', 
    type: 'Supercar', 
    price: '$350/day', 
    image: mclarenImg, 
    features: ['Carbon Fiber Monocage', 'Active Aero', 'Track Mode'], 
    seats: 2, 
    range: '280 miles' 
  },
  { 
    id: '12', 
    name: 'Ferrari', 
    type: 'Supercar', 
    price: '$380/day', 
    image: ferrariImg, 
    features: ['V12 Engine', 'Racing Heritage', 'Manettino Dial'], 
    seats: 2, 
    range: '270 miles' 
  }
];

const HomePage = () => {
  const featuredCar = carsData[5]; // Porsche 911 as featured

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Main display area */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
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
              alt="Main Car"
              className="w-full h-full object-contain car-shadow"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(136, 19, 55, 0.3))',
                transform: 'perspective(1000px)'
              }}
            />
          </motion.div>
        </div>
      </div>

      <section className="space-y-16">
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
              Experience the legendary Porsche 911 Carrera 4S. Where performance meets perfection.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="mt-12 z-10 relative"
          >
            <Link to={`/car/${featuredCar.id}`}>
              <Button size="lg" variant="default" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-10 py-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                Explore {featuredCar.name} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Our Premium Fleet</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsData.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border border-purple-500/30 overflow-hidden h-full flex flex-col">
                  <CardHeader>
                    <div className="relative h-48 w-full mb-4">
                      <img 
                        className="absolute inset-0 w-full h-full object-cover rounded-t-lg" 
                        alt={car.name + " image"} 
                        src={car.image} 
                      />
                    </div>
                    <CardTitle>{car.name}</CardTitle>
                    <CardDescription className="text-purple-400">{car.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-gray-300 mb-1"><Zap size={16} className="mr-2 text-yellow-400" /> {car.price}</div>
                    <div className="flex items-center text-gray-300 mb-1"><Gauge size={16} className="mr-2 text-blue-400" /> {car.range} range</div>
                    <div className="flex items-center text-gray-300"><Users size={16} className="mr-2 text-green-400" /> Seats: {car.seats}</div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/car/${car.id}`} className="w-full">
                      <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors duration-300">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default HomePage;
