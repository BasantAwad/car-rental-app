# Database Explanation: MongoDB and NoSQL Implementation

## MongoDB and NoSQL Basics

### What is NoSQL?
NoSQL (Not Only SQL) is a database paradigm that provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. Key characteristics include:
- Flexible schema
- Horizontal scaling
- High performance
- Easy to scale
- Document-oriented storage

### What is MongoDB?
MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. Key features include:
- Document-oriented storage
- Rich query language
- High availability
- Horizontal scalability
- Flexible schema

## Connection to Backend

### MongoDB Connection Setup
```javascript
// server/index.js
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://...";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info('Successfully connected to MongoDB Atlas!');
  } catch (error) {
    logger.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};
```

### Connection Event Handlers
```javascript
mongoose.connection.on('error', err => {
  logger.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  logger.info('MongoDB connection established successfully');
});
```

## Implementation in the Project

### 1. Schema Design
The project uses Mongoose (MongoDB ODM) to define schemas and models:

#### User Schema
```javascript
// server/models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });
```

#### Car Schema
```javascript
// server/models/Car.js
const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  category: { type: String, required: true },
  features: [String],
  status: { type: String, enum: ['available', 'rented', 'maintenance'] }
}, { timestamps: true });
```

### 2. CRUD Operations

#### Create Operations
```javascript
// Create a new rental
app.post('/api/rentals', async (req, res) => {
  const rental = new Rental({
    ...req.body,
    userId: req.user.userId
  });
  const savedRental = await rental.save();
});

// Create a new user
app.post('/api/auth/register', async (req, res) => {
  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    role: 'user'
  });
  await user.save();
});
```

#### Read Operations
```javascript
// Get all cars
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find().sort({ createdAt: -1 });
});

// Get user's rentals
app.get('/api/rentals/user', async (req, res) => {
  const rentals = await Rental.find({ userId: req.user.userId });
});
```

#### Update Operations
```javascript
// Update car status
app.put('/api/cars/:id', async (req, res) => {
  const car = await Car.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
});

// Update user profile
app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
});
```

#### Delete Operations
```javascript
// Delete rental
app.delete('/api/rentals/:id', async (req, res) => {
  await Rental.findByIdAndDelete(req.params.id);
});

// Delete car
app.delete('/api/cars/:id', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
});
```

### 3. Advanced Queries

#### Aggregation Pipeline
```javascript
// Get rental statistics
export const getRentalStatistics = async ({ startDate, endDate, category }) => {
  return await Rental.aggregate([
    {
      $match: {
        pickupDate: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carDetails'
      }
    },
    {
      $group: {
        _id: '$carId',
        totalRentals: { $sum: 1 },
        totalRevenue: { $sum: '$totalPrice' }
      }
    }
  ]);
};
```

#### Complex Lookups
```javascript
// Get user rental history with details
export const getUserRentalHistory = async (userId) => {
  return await Rental.aggregate([
    {
      $match: { userId: userId }
    },
    {
      $lookup: {
        from: 'cars',
        localField: 'carId',
        foreignField: '_id',
        as: 'carDetails'
      }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'rentalId',
        as: 'review'
      }
    }
  ]);
};
```

### 4. Query Optimization

#### Indexing
```javascript
// User model indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

// Car model indexes
carSchema.index({ status: 1 });
carSchema.index({ category: 1 });
carSchema.index({ status: 1, category: 1 });

// Rental model indexes
rentalSchema.index({ userId: 1 });
rentalSchema.index({ carId: 1 });
rentalSchema.index({ pickupDate: 1, returnDate: 1 });
```

#### Performance Optimizations
1. **Pagination**
```javascript
app.get('/api/cars', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const cars = await Car.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
});
```

2. **Projection**
```javascript
app.get('/api/users', async (req, res) => {
  const users = await User.find()
    .select('name email role')
    .sort({ createdAt: -1 });
});
```

### 5. Data Relationships

#### One-to-Many Relationships
- User to Rentals
- Car to Rentals
- Car to Reviews

#### Many-to-One Relationships
- Rental to User
- Rental to Car
- Review to User
- Review to Car

### 6. Error Handling

```javascript
// Global error handler
export const errorHandler = (err, req, res, next) => {
  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }

  // MongoDB validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // MongoDB cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found'
    });
  }
};
```

## Best Practices Implemented

1. **Schema Validation**
   - Required fields
   - Data type validation
   - Enum values
   - Custom validators

2. **Security**
   - Password hashing
   - Input sanitization
   - Role-based access control

3. **Performance**
   - Proper indexing
   - Query optimization
   - Pagination
   - Projection

4. **Error Handling**
   - Global error handler
   - Specific error types
   - User-friendly messages

5. **Data Consistency**
   - Transactions for critical operations
   - Validation middleware
   - Pre-save hooks 

## NoSQL Principles Implementation

### 1. Denormalization Strategy

#### When to Denormalize
1. **Read-Heavy Operations**
```javascript
// Car Schema with embedded features
const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  // Denormalized features array for quick access
  features: [String],
  // Denormalized category for filtering
  category: { type: String, required: true },
  // Denormalized status for quick availability checks
  status: { type: String, enum: ['available', 'rented', 'maintenance'] }
});
```

2. **Frequently Accessed Data**
```javascript
// Rental Schema with embedded car details
const rentalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  // Denormalized car details for quick access
  carDetails: {
    name: String,
    type: String,
    category: String
  },
  pickupDate: Date,
  returnDate: Date,
  totalPrice: Number
});
```

### 2. Embedding vs Referencing

#### Embedding Strategy
1. **One-to-One Relationships**
```javascript
// User Profile Schema with embedded address
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Embedded address document
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  }
});
```

2. **Small, Related Data**
```javascript
// Car Schema with embedded features and specifications
const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Embedded specifications
  specifications: {
    engine: String,
    transmission: String,
    fuelType: String,
    mileage: Number
  },
  // Embedded features array
  features: [String]
});
```

#### Referencing Strategy
1. **One-to-Many Relationships**
```javascript
// Rental Schema with references
const rentalSchema = new mongoose.Schema({
  // References to other collections
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  // Denormalized data for quick access
  carDetails: {
    name: String,
    type: String
  }
});
```

2. **Many-to-Many Relationships**
```javascript
// Review Schema with references
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental' },
  rating: Number,
  comment: String
});
```

### 3. Data Access Patterns

#### Read Optimization
```javascript
// Optimized query for car listings
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find()
    .select('name type pricePerDay category features status') // Projection
    .sort({ createdAt: -1 })
    .lean(); // Convert to plain JavaScript objects
});
```

#### Write Optimization
```javascript
// Optimized rental creation with embedded data
app.post('/api/rentals', async (req, res) => {
  const car = await Car.findById(req.body.carId);
  const rental = new Rental({
    userId: req.user.userId,
    carId: car._id,
    // Embed frequently accessed car details
    carDetails: {
      name: car.name,
      type: car.type,
      category: car.category
    },
    pickupDate: req.body.pickupDate,
    returnDate: req.body.returnDate,
    totalPrice: req.body.totalPrice
  });
  await rental.save();
});
```

### 4. Data Consistency

#### Atomic Operations
```javascript
// Atomic update for car status
app.put('/api/cars/:id/status', async (req, res) => {
  const car = await Car.findByIdAndUpdate(
    req.params.id,
    { 
      $set: { 
        status: req.body.status,
        lastUpdated: new Date()
      }
    },
    { new: true }
  );
});
```

#### Validation Rules
```javascript
// Schema-level validation
const rentalSchema = new mongoose.Schema({
  pickupDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Pickup date must be in the future'
    }
  },
  returnDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > this.pickupDate;
      },
      message: 'Return date must be after pickup date'
    }
  }
});
```

### 5. Performance Considerations

#### Indexing Strategy
```javascript
// Compound indexes for common queries
carSchema.index({ status: 1, category: 1, pricePerDay: 1 });
rentalSchema.index({ userId: 1, pickupDate: 1 });
```

#### Query Optimization
```javascript
// Optimized aggregation pipeline
export const getRentalStatistics = async ({ startDate, endDate }) => {
  return await Rental.aggregate([
    {
      $match: {
        pickupDate: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$carId',
        totalRentals: { $sum: 1 },
        totalRevenue: { $sum: '$totalPrice' },
        // Use embedded data when available
        carName: { $first: '$carDetails.name' }
      }
    }
  ]);
};
```

These NoSQL principles help optimize the application for:
- Faster read operations
- Reduced database queries
- Better scalability
- Improved performance
- Simplified data access patterns 