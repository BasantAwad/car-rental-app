import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests that need authorization
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const getProfile = () => {
  return apiClient.get('/auth/profile');
};

// Cars API
export const getCars = (filters = {}) => {
  return apiClient.get('/cars', { params: filters });
};

export const getCarById = (id) => {
  return apiClient.get(`/cars/${id}`);
};

export const createCar = (carData) => {
  return apiClient.post('/cars', carData);
};

export const updateCar = (id, carData) => {
  return apiClient.put(`/cars/${id}`, carData);
};

export const deleteCar = (id) => {
  return apiClient.delete(`/cars/${id}`);
};

// Rentals API
export const createRental = (rentalData) => {
  return apiClient.post('/rentals', rentalData);
};

export const getUserRentals = () => {
  return apiClient.get('/rentals/user');
};

export const getAllRentals = () => {
  return apiClient.get('/rentals');
};

export const deleteRental = (id) => {
  return apiClient.delete(`/rentals/${id}`);
};

// Reviews API
export const getReviews = (filters = {}) => {
  return apiClient.get('/reviews', { params: filters });
};

export const getCarReviews = (carId) => {
  return apiClient.get(`/reviews/car/${carId}`);
};

export const getUserReviews = () => {
  return apiClient.get('/reviews/user');
};

export const createReview = (reviewData) => {
  return apiClient.post('/reviews', reviewData);
};

export const updateReview = (id, reviewData) => {
  return apiClient.put(`/reviews/${id}`, reviewData);
};

export const deleteReview = (id) => {
  return apiClient.delete(`/reviews/${id}`);
};

export default {
  login,
  register,
  getProfile,
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  createRental,
  getUserRentals,
  getAllRentals,
  deleteRental,
  getReviews,
  getCarReviews,
  getUserReviews,
  createReview,
  updateReview,
  deleteReview
}; 