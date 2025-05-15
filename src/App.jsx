import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CarInfoPage from './pages/CarInfoPage';
import RentCarPage from './pages/RentCarPage';
import ReviewPage from './pages/ReviewPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import './App.css';

// Create a wrapper component to use useNavigate
function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleLoginClick = () => {
    if (user) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // User not logged in, redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="App">
      {location.pathname !== '/login' && (
        <Header user={user} onLoginClick={handleLoginClick} />
      )}
      
      <Routes>
        <Route path="/" element={<HomePage user={user} onLoginClick={handleLoginClick} />} />
        <Route path="/car/:id" element={<CarInfoPage user={user} onLoginClick={handleLoginClick} />} />
        <Route path="/login" element={<LoginPage onAuthSuccess={handleAuthSuccess} />} />
        <Route 
          path="/rent/:id" 
          element={
            <ProtectedRoute user={user}>
              <RentCarPage user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              {user?.role === 'admin' ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <UserDashboard user={user} onLogout={handleLogout} />
              )}
            </ProtectedRoute>
          } 
        />
        {/* Review routes */}
        <Route 
          path="/review/:carId/:rentalId" 
          element={
            <ProtectedRoute user={user}>
              <ReviewPage user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/review/:carId" 
          element={<ReviewPage user={user} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
