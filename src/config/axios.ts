import { default as $axios } from 'axios';
import { getToken } from '~/utils';
import { API_URL } from '../constant';

const axios = $axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && config?.headers) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axios;
