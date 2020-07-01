import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://playground-7d99d.firebaseio.com/',
});

export default instance;
