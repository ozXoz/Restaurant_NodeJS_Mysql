import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/auth/',
});



export default api;

