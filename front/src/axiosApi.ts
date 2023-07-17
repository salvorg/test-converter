import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiURL } from './constants';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = () => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const headers = config.headers as AxiosHeaders;
    headers.set('apikey', "fca_live_InVUhbOymdH2ROZYTc9NSXga82J5CeVXC6L1J41e");

    return config;
  });
};

export default axiosApi;
