import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
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
