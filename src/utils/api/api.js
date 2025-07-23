import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://dokany-api-production.up.railway.app/";

export const authAPI = axios.create({
  baseURL: `${BASE_URL}auth/`,
});

export const sellerAPI = axios.create({
<<<<<<< HEAD
  baseURL: `${BASE_URL}`,
=======
  baseURL: `${BASE_URL}`, 
>>>>>>> 137ff76a3a4486d7d8ea772f849b7869dae3522b
});

sellerAPI.interceptors.request.use(
  async (config) => {
<<<<<<< HEAD
    const token = await AsyncStorage.getItem("token");
=======
    const token = await AsyncStorage.getItem('token');
>>>>>>> 137ff76a3a4486d7d8ea772f849b7869dae3522b

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const themeAPI = axios.create({
  baseURL: `${BASE_URL}/theme/`,
});

themeAPI.interceptors.request.use(
  async (config) => {
<<<<<<< HEAD
    const token = await AsyncStorage.getItem("token");

=======
    const token = await AsyncStorage.getItem('token');
    
>>>>>>> 137ff76a3a4486d7d8ea772f849b7869dae3522b
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
