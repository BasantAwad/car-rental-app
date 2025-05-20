# Car Rental Application Database Documentation

## Database Overview

The application uses MongoDB as its primary database, leveraging its flexible schema and powerful aggregation capabilities. The database is hosted on MongoDB Atlas for reliability and scalability.

## Schema Design

### Collections

1. **Users Collection**
   - Stores user information and authentication details
   - Fields:
     - `name`: String (required)
     - `email`: String (required, unique)
     - `password`: String (hashed)
     - `phone`: String (required)
     - `role`: String (enum: ['user', 'admin'])
     - `timestamps`: Created/Updated dates

2. **Cars Collection**
   - Stores vehicle information
   - Fields:
     - `name`: String (required)
     - `type`: String (required)
     - `pricePerDay`: Number (required)
     - `category`: String (enum: ['Luxury', 'Sports', 'SUV', etc.])
     - `features`: Array of Strings
     - `status`: String (enum: ['available', 'rented', 'maintenance'])
     - Additional metadata (year, mileage, etc.)

3. **Rentals Collection**
   - Tracks car rental transactions
   - Fields:
     - `carId`: ObjectId (ref: 'Car')
     - `userId`: ObjectId (ref: 'User')
     - `pickupDate`: Date
     - `returnDate`: Date
     - `totalPrice`: Number
     - Additional rental details

4. **Reviews Collection**
   - Stores user reviews for rentals
   - Fields:
     - `userId`: ObjectId (ref: 'User')
     - `rentalId`: ObjectId (ref: 'Rental')
     - `carId`: ObjectId (ref: 'Car')
     - `rating`: Number (1-5)
     - `comment`: String
     - `isVerified`: Boolean

## Query Patterns

### Basic Queries

1. **Find Available Cars**
```javascript
db.cars.find({ status: 'available' })
```

2. **Get User Rentals**
```javascript
db.rentals.find({ userId: ObjectId('user_id') })
```

3. **Get Car Reviews**
```javascript
db.reviews.find({ carId: ObjectId('car_id') })
```

### Advanced Queries

1. **Rental Statistics**
```javascript
db.rentals.aggregate([
  { $match: { pickupDate: { $gte: startDate, $lte: endDate } } },
  { $lookup: { from: 'cars', localField: 'carId', foreignField: '_id', as: 'carDetails' } },
  { $unwind: '$carDetails' },
  { $group: { _id: '$carId', totalRentals: { $sum: 1 }, totalRevenue: { $sum: '$totalPrice' } } }
])
```

2. **User Rental History with Details**
```javascript
db.rentals.aggregate([
  { $match: { userId: ObjectId('user_id') } },
  { $lookup: { from: 'cars', localField: 'carId', foreignField: '_id', as: 'carDetails' } },
  { $lookup: { from: 'reviews', localField: '_id', foreignField: 'rentalId', as: 'review' } }
])
```

3. **Car Availability Analysis**
```javascript
db.rentals.aggregate([
  { $match: { carId: ObjectId('car_id') } },
  { $group: {
    _id: null,
    totalRentals: { $sum: 1 },
    utilizationRate: { $avg: { $cond: [{ $eq: ['$status', 'rented'] }, 1, 0] } }
  }}
])
```

## Indexes

1. **Users Collection**
   - `email`: Unique index for fast lookups
   - `role`: Index for role-based queries

2. **Cars Collection**
   - `status`: Index for availability queries
   - `category`: Index for category-based filtering
   - Compound index on `{status, category}` for combined queries

3. **Rentals Collection**
   - `userId`: Index for user rental history
   - `carId`: Index for car rental history
   - Compound index on `{pickupDate, returnDate}` for date range queries

4. **Reviews Collection**
   - `carId`: Index for car reviews
   - `userId`: Index for user reviews
   - Compound index on `{carId, rating}` for rating analysis

## Data Relationships

1. **One-to-Many Relationships**
   - User to Rentals
   - Car to Rentals
   - Car to Reviews

2. **Many-to-One Relationships**
   - Rental to User
   - Rental to Car
   - Review to User
   - Review to Car

## Performance Considerations

1. **Query Optimization**
   - Use appropriate indexes
   - Implement pagination for large result sets
   - Use projection to limit returned fields

2. **Data Consistency**
   - Use transactions for critical operations
   - Implement proper validation
   - Handle concurrent updates

3. **Scalability**
   - Horizontal scaling through MongoDB Atlas
   - Efficient use of aggregation pipelines
   - Proper indexing strategy

## Security Measures

1. **Data Protection**
   - Password hashing using bcrypt
   - JWT-based authentication
   - Role-based access control

2. **Input Validation**
   - Schema-level validation
   - Application-level validation
   - Sanitization of user inputs

## Backup and Recovery

1. **Regular Backups**
   - Automated backups through MongoDB Atlas
   - Point-in-time recovery
   - Backup verification

2. **Disaster Recovery**
   - Multiple region deployment
   - Failover configuration
   - Recovery procedures

## Monitoring and Maintenance

1. **Performance Monitoring**
   - Query performance tracking
   - Index usage analysis
   - Resource utilization

2. **Regular Maintenance**
   - Index optimization
   - Data cleanup
   - Schema updates 