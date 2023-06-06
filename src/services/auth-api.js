import axios from 'axios';
import { apiUrl } from './axios_base.js';

axios.defaults.baseURL = apiUrl;

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = async credentials => {
  const { data } = await axios.post('/users/signup', credentials);

  return data;
};

export const logIn = async credentials => {
  const { data } = await axios.post('/users/login', credentials);
  token.set(data.token);
  return data;
};

export const logout = async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    return error.message;
  }
};

export const fetchCurrent = async persistedToken => {
  token.set(persistedToken);
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    return error.message;
  }
};
