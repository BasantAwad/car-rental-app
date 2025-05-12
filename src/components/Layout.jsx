
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8 shadow-lg bg-black/30 backdrop-blur-md border-b border-red-900/20">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold flex items-center">
            <Car className="w-10 h-10 mr-3 text-red-800" />
            <span className="gradient-text">AutoVista</span>
          </Link>
          <div className="space-x-6">
            <Link to="/" className="text-lg hover:text-red-800 transition-colors duration-300">Home</Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="py-6 text-center text-gray-500 bg-black/30 border-t border-red-900/20">
        <p>&copy; {new Date().getFullYear()} AutoVista Rentals. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
