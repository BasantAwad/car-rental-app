import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import pinkCar from '@/components/imgs/pink-car.jpg'; 
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';


const LoginPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onAuthSuccess(response.data.user);

        // Start animation
        setIsAnimatingOut(true);

        // After slide out, show welcome, then redirect
        setTimeout(() => {
          setShowWelcome(true);
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1800); // Show welcome for 1.8s
        }, 900); // Slide out duration
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black">
      {/* Pink Car Image, always present */}
      <motion.img
        src={pinkCar}
        alt="Pink Car"
        initial={{ scale: 1, x: 0, filter: 'brightness(0.7) blur(0px)' }}
        animate={
          isAnimatingOut || showWelcome
            ? { scale: 1.1, x: 0, filter: 'brightness(1) blur(0px)' }
            : { scale: 1, x: 0, filter: 'brightness(0.7) blur(0px)' }
        }
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      />

      {/* Overlay for darkening image when form is present */}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={
          isAnimatingOut || showWelcome
            ? { opacity: 0 }
            : { opacity: 0.6 }
        }
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-black z-10"
      />

      {/* Login/Register Form */}
      <AnimatePresence>
        {!isAnimatingOut && !showWelcome && (
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100vw', opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-20 flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen bg-black/80 text-white px-8 py-12 shadow-2xl"
            style={{ backdropFilter: 'blur(2px)' }}
          >
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold mb-2 gradient-text">
                {isLogin ? 'Sign In' : 'Register'}
              </h2>
              <p className="mb-6 text-gray-400">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-400 hover:text-red-300 font-medium underline"
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </button>
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                {!isLogin && (
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                {error && (
                  <div className="bg-red-900/20 border border-red-500 rounded p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 text-white py-3"
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Register')}
                </Button>
              </form>
              {/* Social login buttons (optional) */}
              <div className="mt-8 flex justify-center gap-4">
                <Button className="bg-blue-800 hover:bg-blue-900" type="button">Facebook</Button>
                <Button className="bg-blue-500 hover:bg-blue-700" type="button">Twitter</Button>
                <Button className="bg-red-700 hover:bg-red-900" type="button">Google</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, type: 'spring' }}
              className="text-5xl md:text-6xl font-bold gradient-text drop-shadow-lg mb-4"
            >
              Welcome!
            </motion.h1>
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: 'spring' }}
              className="text-2xl md:text-3xl text-white drop-shadow-lg"
            >
              Enjoy your ride with AutoVista.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage; 