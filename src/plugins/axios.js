import axios from 'axios';

const token = localStorage.getItem('psg_auth_token');

axios.defaults.baseURL = 'https://capatare-beck-1.onrender.com/api/';
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}