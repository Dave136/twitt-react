import { default as $axios } from 'axios';
import { API_URL } from '../constant';

const axios = $axios.create({
  baseURL: API_URL,
});

export default axios;
