import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User } from 'lucide-react';

const Header = ({ user, onLoginClick }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] py-6 px-4 sm:px-6 lg:px-8 shadow-lg bg-black/30 backdrop-blur-md border-b border-red-900/20 transition-all duration-300">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold flex items-center">
          <Car className="w-10 h-10 mr-3 text-red-800" />
          <span className="gradient-text">AutoVista</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-lg hover:text-red-800 transition-colors duration-300"
          >
            Home
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 flex items-center">
                <User className="mr-2 h-4 w-4" />
                {user.name}
              </span>
              <button 
                onClick={handleDashboardClick}
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
