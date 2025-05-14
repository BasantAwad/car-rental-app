# Car Rental Application

A full-stack car rental application built with React (frontend) and Node.js/Express (backend) with MongoDB Atlas database.

## 🚗 Features

### User Features
- **User Registration & Authentication** - Secure user registration with password hashing
- **User Login/Logout** - JWT-based authentication system
- **Car Browsing** - View available cars with detailed information
- **Car Rental** - Book cars for specific dates (requires authentication)
- **User Dashboard** - View personal rental history
- **Responsive Design** - Works on desktop and mobile devices

### Admin Features
- **Admin Login** - Special admin credentials for management access
- **Admin Dashboard** - View all rentals in the system
- **Delete Rentals** - Remove rental records (admin-only)
- **User Management** - Monitor all user activities

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router DOM (for navigation)
- Axios (for API calls)
- CSS3 (responsive design)
- Local Storage (for auth token persistence)

### Backend
- Node.js & Express.js
- MongoDB Atlas (cloud database)
- Mongoose ODM
- JWT (JSON Web Tokens) for authentication
- bcryptjs (password hashing)
- dotenv (environment variables)

### Authentication & Security
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes (frontend and backend)
- Admin role-based access control
- Environment variables for sensitive data

## 📁 Project Structure

## Project Overview
A modern car rental web application built with React, Node.js, and MongoDB, offering a seamless experience for users to browse, view details, and rent premium vehicles.

## Target Audience
- Car enthusiasts looking to experience luxury and sports cars
- Business travelers needing temporary transportation
- Tourists seeking convenient travel options
- Individuals interested in test-driving high-end vehicles

## Why MongoDB (NoSQL)?
1. **Flexible Schema**: Car rental data can vary in structure (different car types, features, pricing models)
2. **Scalability**: Horizontal scaling for handling growing rental data
3. **Performance**: Fast read/write operations for real-time rental management
4. **JSON-like Documents**: Natural fit for JavaScript/React applications
5. **Easy Integration**: Seamless integration with Node.js/Express backend

## System Architecture

### Components
1. **Frontend Layer**
   - React components for UI
   - Client-side routing
   - Form handling and validation
   - API integration

2. **Backend Layer**
   - Express server
   - RESTful API endpoints
   - Data validation
   - Error handling

3. **Database Layer**
   - MongoDB collections
   - Data models
   - Indexing for performance

### Data Flow
1. User interacts with React frontend
2. Frontend makes API calls to Express backend
3. Backend processes requests and interacts with MongoDB
4. Data flows back through the same path

## Features
- Browse available cars with detailed information
- View car specifications and features
- Real-time price calculation
- Rental form with validation
- Responsive design for all devices
- Secure data handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the application
```bash
# Start backend server
cd server
npm start

# Start frontend development server
cd client
npm start
```

## Code Quality and Performance

### Code Organization
- Modular component structure
- Separation of concerns
- Reusable components
- Consistent naming conventions

### Performance Optimizations
- Lazy loading of images
- Efficient state management
- Optimized database queries
- Caching strategies

### Documentation
- JSDoc comments for functions and components
- Clear code structure
- README documentation
- API documentation

## Testing
1. Unit Tests
2. Integration Tests
3. End-to-End Tests

## Future Improvements
1. User authentication and authorization
2. Payment integration
3. Admin dashboard
4. Real-time availability updates
5. Review and rating system

## License
MIT License

## Authors
Basant Awad 

## 🔐 Authentication System

### User Registration
- Users register with name, email, phone, and password
- Passwords are hashed using bcrypt before storage
- Automatic JWT token generation upon successful registration

### User Login
- Email and password authentication
- JWT token returned for subsequent requests
- Token expires after 24 hours

### Admin Access
- Special admin credentials (set via environment variables)
- Admin role with additional permissions
- Can view and delete all rentals

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Rental Model
```javascript
{
  carId: String (required),
  carName: String (required),
  name: String (required),
  email: String (required),
  phone: String (required),
  pickupDate: Date (required),
  returnDate: Date (required),
  userId: ObjectId (ref: 'User', required),
  timestamps: true
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup
1. Clone the repository
2. Navigate to project directory
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

4. Create `.env` file in `/server` directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=admin@carrental.com
   ADMIN_PASSWORD=your_admin_password
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open new terminal in project root
2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (including admin)
- `GET /api/auth/profile` - Get user profile (protected)

### Rental Routes
- `POST /api/rentals` - Create rental (protected)
- `GET /api/rentals` - Get all rentals
- `GET /api/rentals/user` - Get user's rentals (protected)
- `DELETE /api/rentals/:id` - Delete rental (admin only)

## 🔒 Security Features

- **Password Hashing**: All passwords stored using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend and backend route protection
- **Role-Based Access**: Admin-only endpoints for management
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Request validation middleware
- **Error Handling**: Comprehensive error management

## 🌟 Usage

### For Users
1. **Register**: Click "Login/Signup" and create an account
2. **Browse Cars**: View available vehicles on the homepage
3. **Rent a Car**: Click "Rent Car" (login required if not authenticated)
4. **Dashboard**: Access your profile to view rental history

### For Admins
1. **Login**: Use admin credentials to access admin panel
2. **View All Rentals**: Monitor all rental activities
3. **Manage Rentals**: Delete rentals as needed
4. **User Oversight**: View user registration data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Additional Documentation

- [Database Report](./docs/database-report.md) - Detailed database architecture and implementation
