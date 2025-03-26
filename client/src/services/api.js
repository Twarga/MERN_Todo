import axios from 'axios';

// Configure API URL based on environment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle specific status codes
    if (response) {
      // Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('token');
        // You might want to redirect to login here
      }
      
      // Format error message
      const errorMessage = response.data.message || 'Something went wrong';
      return Promise.reject(new Error(errorMessage));
    }
    
    return Promise.reject(error);
  }
);

// Todo API services
export const todoService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/todos', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  },

  create: async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  update: async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  },

  toggleComplete: async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling todo ${id}:`, error);
      throw error;
    }
  },

  getStats: async () => {
    try {
      const response = await api.get('/todos/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching todo statistics:', error);
      throw error;
    }
  },
  
  getByDateRange: async (startDate, endDate) => {
    try {
      const response = await api.get('/todos/date-range', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching todos by date range:', error);
      throw error;
    }
  },
  
  getCount: async () => {
    try {
      const response = await api.get('/todos/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching todo counts:', error);
      throw error;
    }
  }
};

export default api;