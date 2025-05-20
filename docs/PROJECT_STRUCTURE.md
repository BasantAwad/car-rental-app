# Car Rental Application Project Structure

## Overview
This is a full-stack car rental application built with React (frontend), Node.js/Express (backend), and MongoDB (database). The project follows a modular architecture with clear separation of concerns.

## Project Structure

```
carrenting/
├── src/                    # Frontend source code
├── server/                 # Backend source code
├── public/                 # Static files
├── docs/                   # Documentation
├── scripts/               # Utility scripts
├── uploads/               # File uploads directory
├── logs/                  # Application logs
└── node_modules/          # Dependencies
```

## Frontend (src/)

The frontend is built with React and uses modern web development practices.

### Key Directories and Files:

#### Components (`src/components/`)
- Reusable UI components
- Layout components
- Form components
- Car-related components
- Authentication components

#### Pages (`src/pages/`)
- Main application pages
- Route-based components
- Page-specific layouts

#### Services (`src/services/`)
- API integration services
- Authentication services
- Data fetching utilities

#### Data (`src/data/`)
- Static data
- Mock data for development
- Constants and configurations

#### Lib (`src/lib/`)
- Utility functions
- Helper methods
- Custom hooks

#### Core Files
- `App.jsx`: Main application component
- `main.jsx`: Application entry point
- `index.css`: Global styles
- `App.css`: Application-specific styles

## Backend (server/)

The backend is built with Node.js and Express, following a modular architecture.

### Key Directories and Files:

#### Models (`server/models/`)
- `User.js`: User schema and model
- `Car.js`: Car/vehicle schema and model
- `Rental.js`: Rental transaction schema and model
- `Review.js`: Review schema and model

#### Routes (`server/routes/`)
- `carRoutes.js`: Car-related endpoints
- `reviewRoutes.js`: Review-related endpoints
- `analyticsRoutes.js`: Analytics and reporting endpoints

#### Middleware (`server/middleware/`)
- `auth.js`: Authentication middleware
- `errorHandler.js`: Global error handling
- `validation.js`: Request validation
- `fileUpload.js`: File upload handling

#### Utils (`server/utils/`)
- `logger.js`: Logging utility
- `advancedQueries.js`: Complex MongoDB queries
- Helper functions and utilities

#### Scripts (`server/scripts/`)
- Database seeding scripts
- Maintenance scripts
- Utility scripts

#### Core Files
- `index.js`: Main server file
- Configuration files
- Environment variables

## Database

The application uses MongoDB as its primary database, with the following collections:

### Collections
1. **Users**
   - User information
   - Authentication details
   - Role management

2. **Cars**
   - Vehicle information
   - Availability status
   - Pricing details

3. **Rentals**
   - Rental transactions
   - Booking details
   - Payment information

4. **Reviews**
   - User reviews
   - Ratings
   - Feedback

## Supporting Directories

### Public (`public/`)
- Static assets
- Images
- Icons
- Favicon

### Docs (`docs/`)
- `DATABASE.md`: Database documentation
- `PROJECT_STRUCTURE.md`: This file
- API documentation
- Setup guides

### Scripts (`scripts/`)
- Database seeding
- Data migration
- Maintenance tasks

### Uploads (`uploads/`)
- User-uploaded files
- Car images
- Temporary files

### Logs (`logs/`)
- Application logs
- Error logs
- Access logs

## Configuration Files

### Root Directory
- `package.json`: Project dependencies and scripts
- `vite.config.js`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `.gitignore`: Git ignore rules

## Development Tools

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

### Development
- ESLint
- Prettier
- Git
- npm/yarn

## Security Features
- JWT Authentication
- Password Hashing
- Role-based Access Control
- Input Validation
- Rate Limiting
- CORS Configuration

## Performance Optimizations
- Database Indexing
- Query Optimization
- Caching Strategies
- File Upload Optimization
- Error Handling

## Deployment
- MongoDB Atlas for database
- Environment-based configuration
- Production build optimization
- Error logging and monitoring 