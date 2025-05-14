# Car Rental Application - Database Architecture Report

## Executive Summary

This document provides a comprehensive overview of the database architecture, implementation, and recent enhancements for the Car Rental Application. The system utilizes MongoDB Atlas with Mongoose ODM, featuring user authentication, role-based access control, and comprehensive rental management.

## Database Technology Stack

### Primary Database
- **Database**: MongoDB Atlas (Cloud-hosted MongoDB)
- **ODM**: Mongoose (Object Document Mapper)
- **Driver**: MongoDB Node.js Driver (via Mongoose)
- **Version**: MongoDB 6.0+ Atlas

### Security & Authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Authentication**: JWT (JSON Web Tokens)
- **Access Control**: Role-based (User/Admin)

## Database Connection Implementation

### Connection Configuration
```javascript
const MONGODB_URI = process.env.MONGODB_URI || 
  "mongodb+srv://username:password@cluster0.mongodb.net/carrental?retryWrites=true&w=majority";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};
```

### Connection Management
```javascript
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, connectOptions);
    logger.info('Successfully connected to MongoDB Atlas!');
  } catch (error) {
    logger.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
};
```

### Connection Event Handlers
- **Error Handling**: Logs connection errors and exits gracefully
- **Success Monitoring**: Confirms successful database connections
- **Reconnection Logic**: Automatic retry with write concerns

## Data Models & Schemas

### User Model (`models/User.js`)
```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6  // Hashed before storage
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});
```

**Key Features:**
- Unique email constraint for authentication
- Password validation (minimum 6 characters)
- Role-based access control
- Automatic timestamps

### Rental Model (`models/Rental.js`)
```javascript
const rentalSchema = new mongoose.Schema({
  carId: {
    type: String,
    required: true
  },
  carName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  // Links rental to authenticated user
  }
}, {
  timestamps: true
});
```

**Key Features:**
- Foreign key relationship with User model
- Date validation for rental periods
- User tracking for all rentals

## API Endpoints & Database Operations

### Authentication Operations

#### User Registration
```javascript
// POST /api/auth/register
- Hash password with bcrypt (10 rounds)
- Check for existing email (unique constraint)
- Create new user document
- Generate JWT token
- Return user data (excluding password)
```

#### User Login
```javascript
// POST /api/auth/login
- Support for both regular users and admin
- Password verification with bcrypt.compare()
- Admin credentials from environment variables
- JWT token generation with role information
```

#### Profile Management
```javascript
// GET /api/auth/profile
- Token verification middleware
- User data retrieval (password excluded)
- Special handling for admin profiles
```

### Rental Operations

#### Create Rental (Protected)
```javascript
// POST /api/rentals
- Requires authentication
- Associates rental with user ID
- Validates all required fields
- Database connection verification
```

#### View Rentals
```javascript
// GET /api/rentals (All rentals)
// GET /api/rentals/user (User's rentals only)
- Sorting by creation date (newest first)
- User-specific filtering for dashboard
```

#### Delete Rental (Admin Only)
```javascript
// DELETE /api/rentals/:id
- Admin role verification
- Rental existence check
- Audit logging for admin actions
```

## Security Implementation

### Password Security
- **Hashing Algorithm**: bcrypt with salt rounds (10)
- **Storage**: Only hashed passwords stored in database
- **Verification**: bcrypt.compare() for login validation

### Authentication Flow
1. User provides credentials
2. Password verification against hash
3. JWT token generation with user/role data
4. Token verification on protected routes
5. User context available in protected handlers

### Authorization Levels
- **Public**: Registration, login, view cars
- **User**: Create rentals, view own rentals, profile access
- **Admin**: All user permissions + delete any rental

## Database Operations Best Practices

### Error Handling
```javascript
- Connection state verification before operations
- Comprehensive try-catch blocks
- Structured error responses
- Logging for debugging and monitoring
```

### Data Validation
```javascript
- Mongoose schema validation
- Custom validation middleware
- Required field enforcement
- Type checking and constraints
```

### Performance Optimizations
```javascript
- Indexes on frequently queried fields (email, userId)
- Efficient sorting with database-level operations
- Connection pooling via Mongoose
- Proper error handling to prevent memory leaks
```

## Environment Configuration

### Required Environment Variables
```env
MONGODB_URI=mongodb+srv://...  # Atlas connection string
JWT_SECRET=your-secret-key     # Token encryption key
ADMIN_EMAIL=admin@domain.com   # Admin login email
ADMIN_PASSWORD=securePassword  # Admin login password
PORT=5000                      # Server port
```

### Database Configuration
- **Write Concern**: `w=majority` (ensures data written to majority of replica set)
- **Retry Writes**: `retryWrites=true` (automatic retry on transient errors)
- **Timeouts**: Configured for optimal reliability

## Monitoring & Logging

### Connection Monitoring
- Real-time connection status tracking
- Error logging for failed connections
- Success confirmation on establishment

### Operation Logging
- CRUD operation logging
- Authentication event tracking
- Admin action audit trail
- Error categorization and reporting

## Backup & Recovery

### Atlas Features
- Automatic backups (point-in-time recovery)
- Cross-region replication
- Disaster recovery capabilities
- High availability with replica sets

## Recent Enhancements

### Authentication System
- Added complete user registration/login system
- Implemented JWT-based authentication
- Created role-based access control

### Database Schema Updates
- Added User model with authentication fields
- Enhanced Rental model with user relationships
- Implemented proper foreign key constraints

### Admin Functionality
- Admin-specific login credentials
- Protected admin-only endpoints
- Comprehensive rental management capabilities

## Conclusion

The database architecture provides a robust, secure, and scalable foundation for the Car Rental Application. The implementation follows industry best practices for security, performance, and maintainability, with comprehensive authentication and authorization systems ensuring data integrity and user privacy.

## Future Considerations

- Database indexing optimization
- Query performance monitoring
- Advanced user role management
- Data analytics and reporting features
- Real-time notifications system 