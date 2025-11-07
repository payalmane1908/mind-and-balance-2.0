import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
          }
        }
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response from server. Make sure the backend is running on http://localhost:5000');
      error.message = 'Unable to connect to server. Please make sure the backend is running.';
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getProfile: () => api.get('/auth/profile')
};

// Mood tracking services
export const moodService = {
  addMoodEntry: (moodData) => api.post('/moods', moodData),
  getMoodHistory: () => api.get('/moods'),
  getMoodStats: () => api.get('/moods/stats')
};

// Journal services
export const journalService = {
  addJournalEntry: (entryData) => api.post('/journal', entryData),
  getJournalEntries: () => api.get('/journal'),
  getJournalEntry: (id) => api.get(`/journal/${id}`),
  updateJournalEntry: (id, entryData) => api.put(`/journal/${id}`, entryData),
  deleteJournalEntry: (id) => api.delete(`/journal/${id}`)
};

// Exercise services
export const exerciseService = {
  getExercises: () => api.get('/exercises'),
  getExercisesByCategory: (category) => api.get(`/exercises/category/${category}`),
  getExercise: (id) => api.get(`/exercises/${id}`),
  completeExercise: (id) => api.post(`/exercises/${id}/complete`)
};

// Affirmation services
export const affirmationService = {
  getAffirmations: () => api.get('/affirmations'),
  getAffirmationsByCategory: (category) => api.get(`/affirmations/category/${category}`),
  likeAffirmation: (id) => api.post(`/affirmations/${id}/like`),
  saveAffirmation: (id) => api.post(`/affirmations/${id}/save`)
};

// Dashboard services
export const dashboardService = {
  getDashboardData: () => api.get('/dashboard'),
  getUserStats: () => api.get('/dashboard/stats')
};

// Chatbot services
export const chatbotService = {
  sendMessage: (message) => api.post('/chatbot', { message })
};

export default api;