import axios from 'axios';
import Cookies from 'js-cookie';
import * as Constants from '../constants/constants';

const BASE_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for regular requests
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

// Create an Axios instance for authenticated requests
const axiosWithAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosWithAuth.interceptors.request.use(
    (config) => {
        const auth = Cookies.get(Constants.AUTH_COOKIE);
        if (auth) {
            config.headers.Authorization = `Bearer ${auth}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosWithAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 400) {
            Cookies.remove(Constants.AUTH_COOKIE);
        }
        return Promise.reject(error);
    });

  
export { axiosInstance, axiosWithAuth };