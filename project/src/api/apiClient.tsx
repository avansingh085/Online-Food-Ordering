import axios from 'axios';
import { getToken } from '../utils/token';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:3000', // your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token automatically
apiClient.interceptors.request.use(
  async (config) => {
    const token =await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access, e.g., redirect to login
//       console.warn('Unauthorized, logging out...');
//       localStorage.removeItem('access_token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
