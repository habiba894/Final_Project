// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// 🔐 Token Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 🌍 Country Service
export const countryService = {
  getCountries: (searchTerm) => 
    api.get('/countries', { params: searchTerm ? { search: searchTerm } : {} }),
  getCountryByName: (name) => 
    api.get(`/countries/${encodeURIComponent(name)}`),
  getWeather: (countryName) => 
    api.get('/weather', { params: { country: countryName } }),
  getCurrencyRates: (baseCode) => 
    api.get(`/currency/rates/${encodeURIComponent(baseCode)}`),
  convertCurrency: (amount, from, to) => 
    api.get('/currency/convert', { params: { amount, from, to } }),
  getRestaurants: (country) => 
    api.get('/restaurants', { params: { country } }),
  getHotels: (country) => 
    api.get('/hotels', { params: { country } }),
  getPopularPlaces: (country) => 
    api.get('/popular-places', { params: { country } }),
  
  // 🔐 Auth
  login: (credentials) => api.post('/auth/login', credentials),
  verifyToken: (token) => api.get('/auth/verify', { 
    headers: { Authorization: `Bearer ${token}` } 
  }),
};

// ✈️ Plans Service (NEW)
export const plansService = {
  getUserPlans: (userId) => api.get(`/plans/user/${userId}`),
  getPlanById: (planId) => api.get(`/plans/${planId}`),
  createPlan: (planData) => api.post('/plans', planData),
  updatePlan: (planId, planData) => api.put(`/plans/${planId}`, planData),
  deletePlan: (planId) => api.delete(`/plans/${planId}`),
  addPlaceToPlan: (planId, placeData) => api.post(`/plans/${planId}/places`, placeData),
  removePlaceFromPlan: (planId, placeId) => api.delete(`/plans/${planId}/places/${placeId}`),
};

export default { countryService, plansService };