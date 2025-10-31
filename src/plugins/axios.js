import axios from 'axios';

const token = localStorage.getItem('psg_auth_token');
const api = axios.create(
  {
    baseURL: 'http://localhost:19003/api/',
  }
)

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api
