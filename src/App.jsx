import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarInfoPage from './pages/CarInfoPage';
import RentCarPage from './pages/RentCarPage';
import ReviewPage from './pages/ReviewPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import CustomerServicePage from './pages/CustomerServicePage';
import AboutUsPage from './pages/AboutUsPage';
import FleetPage from './pages/FleetPage';
import LocationsPage from './pages/LocationsPage';
import BlogPage from './pages/BlogPage';
import CancellationPolicyPage from './pages/CancellationPolicyPage';
import InsurancePage from './pages/InsurancePage';
import FAQPage from './pages/FAQPage';
import SitemapPage from './pages/SitemapPage';
import ContactPage from './pages/ContactPage';
import { Toaster } from './components/ui/toaster';
import './App.css';

// Create a wrapper component to use useNavigate
function AppContent() {
  const [user, setUser] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setShowHeader(false); // Hide header by default on homepage
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      {showHeader && location.pathname !== '/login' && (
        <Header user={user} onLoginClick={handleLoginClick} />
      )}
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage user={user} onLoginClick={handleLoginClick} setShowHeader={setShowHeader} />} />
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
          
          {/* Information pages */}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />
          <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
        </Routes>
      </main>

      {location.pathname !== '/login' && <Footer />}
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
