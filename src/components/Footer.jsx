import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-purple-500/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Luxury Car Rentals</h3>
            <p className="text-gray-400 text-sm">
              Experience luxury and performance with our premium fleet of vehicles. Your journey to excellence starts here.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors block">About Us</Link>
              </li>
              <li>
                <Link to="/fleet" className="text-gray-400 hover:text-purple-400 transition-colors block">Our Fleet</Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-purple-400 transition-colors block">Locations</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-colors block">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors block">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-gray-400 hover:text-purple-400 transition-colors block">Terms of Use</Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-gray-400 hover:text-purple-400 transition-colors block">Cancellation Policy</Link>
              </li>
              <li>
                <Link to="/insurance" className="text-gray-400 hover:text-purple-400 transition-colors block">Insurance</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-purple-400 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@luxurycarrentals.com" className="hover:text-purple-400 transition-colors">info@luxurycarrentals.com</a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                <span>123 Luxury Drive, Premium City, PC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Luxury Car Rentals. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/customer-service" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Customer Service</Link>
              <Link to="/faq" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">FAQ</Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 