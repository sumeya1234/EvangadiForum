import axios from 'axios';

const token = localStorage.getItem('token');

const axiosBase = axios.create({
  // baseURL: 'http://localhost:5500/api', // using  local host 
  baseURL:'https://evan-forum-deploy.onrender.com/api',  // using Render
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});


export default axiosBase;