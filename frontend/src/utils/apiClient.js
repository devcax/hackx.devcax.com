import axios from 'axios';

// Read backend configuration from environment variables using import.meta.env
const backendHost = import.meta.env.VITE_BACKEND_HOST || 'http://localhost';
const backendPort = import.meta.env.VITE_BACKEND_PORT || 5000;
const baseURL = `${backendHost}:${backendPort}`;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for request/response handling
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if not already in headers
    if (!config.headers['x-auth-token']) {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers['x-auth-token'] = token;
        console.log('Token added from localStorage:', token.substring(0, 10) + '...');
      }
    } else {
      console.log('Token already in headers');
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request - token may be invalid');
      // Optionally clear token and redirect to login
      // localStorage.removeItem('adminToken');
      // window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient; 