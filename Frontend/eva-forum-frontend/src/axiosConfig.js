import axios from 'axios';

const token = localStorage.getItem('token');

const axiosBase = axios.create({
  baseURL: 'http://localhost:5500/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// axiosBase.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// axiosBase.interceptors.response.use((response) => {
//   if (response.status === 401) {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   }
//   return response;
// }, (error) => {
//   return Promise.reject(error);
// });

export default axiosBase;