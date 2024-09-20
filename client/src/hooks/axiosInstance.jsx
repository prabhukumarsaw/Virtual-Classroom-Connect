import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555/api/V1', // Replace with your API base URL
  withCredentials: true, // Include cookies with requests
});

// You can add interceptors or other configurations here if needed
// axiosInstance.interceptors.request.use(...);
// axiosInstance.interceptors.response.use(...);

export default axiosInstance;
