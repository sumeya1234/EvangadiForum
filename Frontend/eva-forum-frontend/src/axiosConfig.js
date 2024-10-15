import axios from 'axios';

const token = localStorage.getItem('token');

const axiosBase = axios.create({
  baseURL: 'http://localhost:5500/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});


export default axiosBase;