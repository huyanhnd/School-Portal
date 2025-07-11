import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
