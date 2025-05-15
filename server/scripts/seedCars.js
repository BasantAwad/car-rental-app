import 'dotenv/config';
import mongoose from 'mongoose';
import Car from '../models/Car.js';
import { logger } from '../utils/logger.js';

// Define car data to seed database (based on carsData.js)
const carsToSeed = [
  { 
    name: 'Polaris Slingshot', 
    type: 'Three-Wheeler', 
    pricePerDay: 150,
    imageUrl: '/imgs/main.png',
    features: ['Open-Air Design', 'Rear-Drive Layout', 'Sport Suspension', 'Waterproof Seats', 'Bluetooth Audio'], 
    seats: 2, 
    range: '250 miles',
    description: 'Experience the ultimate open-air driving with the Polaris Slingshot. A unique three-wheeler that combines motorcycle thrills with automotive comfort.',
    category: 'Sport',
    status: 'available',
    year: 2023,
    mileage: 1200,
    licensePlate: 'SLG-007'
  },
  { 
    name: 'Tesla Model S', 
    type: 'Electric Sedan', 
    pricePerDay: 75,
    imageUrl: '/imgs/teslla.png',
    features: ['Autopilot', 'Panoramic Roof', '0-60 in 2.5s', 'Premium Sound System', 'Full Self-Driving Capability (Beta)'], 
    seats: 5, 
    range: '390 miles',
    description: 'Experience the future of driving with the Tesla Model S. Unparalleled performance, cutting-edge technology, and zero emissions.',
    category: 'Luxury',
    status: 'available',
    year: 2023,
    mileage: 3500,
    licensePlate: 'ELC-123'
  },
  { 
    name: 'BMW M3', 
    type: 'Sports Sedan', 
    pricePerDay: 90,
    imageUrl: '/imgs/BMW.png',
    features: ['Twin-Turbo Engine', 'Adaptive M Suspension', 'M Sport Seats', 'Harman Kardon Surround Sound', 'Carbon Fiber Roof'], 
    seats: 5, 
    range: '300 miles',
    description: 'The BMW M3 combines track-level performance with everyday usability. A true driver\'s car with aggressive styling and thrilling dynamics.',
    category: 'Sports',
    status: 'available',
    year: 2022,
    mileage: 8900,
    licensePlate: 'BMW-345'
  },
  { 
    name: 'Ford Mustang GT', 
    type: 'Muscle Car', 
    pricePerDay: 80,
    imageUrl: '/imgs/Ford Mustang GT.png',
    features: ['5.0L V8 Engine', 'Performance Exhaust', 'Line Lock & Launch Control', 'Brembo Brakes', 'SYNC 3 Infotainment'], 
    seats: 4, 
    range: '280 miles',
    description: 'Unleash the iconic power of the Ford Mustang GT. With its roaring V8 and aggressive stance, it\'s an American legend.',
    category: 'Muscle',
    status: 'available',
    year: 2022,
    mileage: 12000,
    licensePlate: 'MST-500'
  },
  { 
    name: 'Audi R8', 
    type: 'Supercar', 
    pricePerDay: 250,
    imageUrl: '/imgs/Audi R8.png',
    features: ['Naturally Aspirated V10 Engine', 'Quattro All-Wheel Drive', 'Carbon Fiber Accents', 'Virtual Cockpit', 'Bang & Olufsen Sound System'], 
    seats: 2, 
    range: '250 miles',
    description: 'The Audi R8 is a masterpiece of engineering, offering breathtaking performance and stunning design. A true supercar experience.',
    category: 'Supercar',
    status: 'available',
    year: 2023,
    mileage: 4500,
    licensePlate: 'R8-V10'
  },
  { 
    name: 'Jeep Wrangler', 
    type: 'Off-road SUV', 
    pricePerDay: 70,
    imageUrl: '/imgs/Jeep Wrangler.png',
    features: ['Legendary 4x4 Capability', 'Removable Top and Doors', 'All-Terrain Tires', 'Uconnect Infotainment', 'Trail Rated Badge'], 
    seats: 4, 
    range: '350 miles',
    description: 'Conquer any terrain with the Jeep Wrangler. The ultimate adventure vehicle, ready for off-road exploration and open-air freedom.',
    category: 'SUV',
    status: 'available',
    year: 2021,
    mileage: 18000,
    licensePlate: 'JEP-444'
  },
  { 
    name: 'Porsche 911', 
    type: 'Sports Car', 
    pricePerDay: 200,
    imageUrl: '/imgs/Porsche 911 Carrera 4S.png',
    features: ['Rear-Engine Boxer Engine', 'PDK Dual-Clutch Transmission', 'Iconic Flyline Design', 'Porsche Communication Management (PCM)', 'Sport Chrono Package'], 
    seats: 2, 
    range: '300 miles',
    description: 'The Porsche 911 is the quintessential sports car, perfected over decades. Timeless design, exhilarating performance, and unmatched driving pleasure.',
    category: 'Sports',
    status: 'available',
    year: 2022,
    mileage: 9500,
    licensePlate: 'P911-S'
  },
  { 
    name: 'Maserati Granturismo', 
    type: 'Luxury Sports', 
    pricePerDay: 280,
    imageUrl: '/imgs/maserati.png',
    features: ['Italian Design', 'Premium Sound System', 'Sport Mode', 'Luxury Interior', 'V6 Twin-Turbo Engine'], 
    seats: 2, 
    range: '320 miles',
    description: 'Italian luxury sports car with elegant design and powerful performance. Experience the passion of Maserati.',
    category: 'Luxury',
    status: 'available',
    year: 2023,
    mileage: 5600,
    licensePlate: 'MAS-GT'
  },
  { 
    name: 'Nissan GTR', 
    type: 'Supercar', 
    pricePerDay: 220,
    imageUrl: '/imgs/nissanGTR.png',
    features: ['Twin-Turbo V6', 'All-Wheel Drive', 'Launch Control', 'Track Mode', 'Premium Interior'], 
    seats: 2, 
    range: '290 miles',
    description: 'Japanese supercar engineering at its finest. The GTR delivers incredible performance and reliability.',
    category: 'Sports',
    status: 'available',
    year: 2022,
    mileage: 7800,
    licensePlate: 'GTR-R35'
  },
  { 
    name: 'Rolls Royce Ghost', 
    type: 'Ultra Luxury', 
    pricePerDay: 400,
    imageUrl: '/imgs/rollsroyce.png',
    features: ['Handcrafted Interior', 'Suicide Doors', 'Starlight Headliner', 'Whisper-Quiet Cabin', 'Bespoke Options'], 
    seats: 4, 
    range: '350 miles',
    description: 'The pinnacle of luxury automotive craftsmanship. Experience unparalleled comfort and prestige.',
    category: 'Ultra Luxury',
    status: 'available',
    year: 2023,
    mileage: 2200,
    licensePlate: 'RR-GHST'
  },
  { 
    name: 'Bugatti Chiron', 
    type: 'Hypercar', 
    pricePerDay: 500,
    imageUrl: '/imgs/bugatti.png',
    features: ['W16 Quad-Turbo Engine', 'Carbon Fiber Construction', 'Speed Key', '1500+ HP', 'Fastest Production Car'], 
    seats: 2, 
    range: '260 miles',
    description: 'The ultimate hypercar. Pushing the boundaries of automotive engineering and speed.',
    category: 'Hypercar',
    status: 'available',
    year: 2022,
    mileage: 1800,
    licensePlate: 'BUG-W16'
  },
  { 
    name: 'McLaren 720S', 
    type: 'Supercar', 
    pricePerDay: 350,
    imageUrl: '/imgs/mclaren.png',
    features: ['Carbon Fiber Monocage', 'Active Aerodynamics', 'Track Mode', 'Lightweight Design', 'Formula 1 Heritage'], 
    seats: 2, 
    range: '280 miles',
    description: 'British supercar excellence. Formula 1 technology for the road.',
    category: 'Supercar',
    status: 'available',
    year: 2022,
    mileage: 3100,
    licensePlate: 'MCL-720'
  },
  { 
    name: 'Ferrari 488', 
    type: 'Supercar', 
    pricePerDay: 380,
    imageUrl: '/imgs/frari.png',
    features: ['V12 Engine', 'Racing Heritage', 'Manettino Dial', 'Italian Craftsmanship', 'Track-Focused Design'], 
    seats: 2, 
    range: '270 miles',
    description: 'The prancing horse. Italian passion and racing heritage in automotive form.',
    category: 'Supercar',
    status: 'available',
    year: 2022,
    mileage: 4200,
    licensePlate: 'FER-488'
  }
];

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://basantawad:BasantAwad014@cluster0.2wa4l9d.mongodb.net/carrental?retryWrites=true&w=majority";

// Seed function
const seedCars = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    logger.info('Connected to MongoDB for seeding cars');
    
    // Clear existing cars collection
    await Car.deleteMany({});
    logger.info('Cleared cars collection');
    
    // Insert new car documents
    const insertedCars = await Car.insertMany(carsToSeed);
    logger.info(`Successfully seeded ${insertedCars.length} cars`);

    console.log('=== Cars Seeded Successfully ===');
    insertedCars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.name} (${car._id})`);
    });
    
    mongoose.disconnect();
    logger.info('Database connection closed');
    
  } catch (error) {
    logger.error('Error seeding cars:', error);
    process.exit(1);
  }
};

// Run the seeding
seedCars(); 